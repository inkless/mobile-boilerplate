module.exports = function(grunt) {

	"use strict";

	var longBanner = [
		"/*! ",
		" * Project Name v<%= pkg.version %> ",
		" * (c) 2013 Corp, Inc. ",
		" * ",
		" * http://xxx/ license ",
		" * ",
		" * Date: <%= grunt.template.today('yyyy-mm-dd') %> ",
		" */",
		""].join("\n");

	var shortBanner = [
		"/*! Project Name v<%= pkg.version %> ",
		" (c) 2013 Corp, Inc. ",
		" http://xxx/ license ",
		" Date: <%= grunt.template.today('yyyy-mm-dd') %> */"].join("|");

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			options: {
				separator: ";",
				banner: longBanner
			},
			dist: {
				dest: "js/dist/dist.js",
				src: [
					"js/src/config.js",
					"js/src/core.js",
					//"js/src/component/*.js",
					"js/src/app.js"
				]
			}
		},
		cssmin: {
			all: {
				options: {
					banner: shortBanner
				},
				files: {
					"css/dist/dist.min.css": [
						"css/src/normalize.css",
						"css/src/base.css",
						"css/src/helper.css",
						"css/src/main.css",
						"css/src/responsive.css",
						"css/src/print.css"
					]
				}
			}
		},
		uglify: {
			all: {
				files: {
					"js/dist/dist.min.js": ["js/dist/dist.js"]
				},
				options: {
					banner: shortBanner,
					sourceMap: "js/dist/dist.min.map"
					// ,
					// beautify: {
					// 	ascii_only: true
					// }
				}
			}
		}
	});

	// Process files for distribution
	grunt.registerTask("dist", function() {
		var files = grunt.file.expand({
			filter: "isFile"
		}, "js/dist/*");

		var pageFiles = grunt.file.expand({
			filter: "isFile"
		}, "js/dist/pages/*");

		var replaceFn = function(filename, isPages) {
			var map,
			fs = require("fs"),
				text = fs.readFileSync(filename, "utf8");

			// Modify map/min so that it points to files in the same folder;
			// see https://github.com/mishoo/UglifyJS2/issues/47
			if (/\.map$/.test(filename)) {
				if (isPages) {
					text = text.replace(/"js\/dist\/pages\//g, "\"");
					text = text.replace(/"(js\/src\/pages\/)/g, "\"../../../$1");
				} else  {
					text = text.replace(/"js\/dist\//g, "\"");
				}
				fs.writeFileSync(filename, text, "utf-8");
			} else if (/\.min\.js$/.test(filename)) {
				// Wrap sourceMap directive in multiline comments (#13274)
				text = text.replace(/\n?(\/\/@\s*sourceMappingURL=)(.*)/,

				function(_, directive, path) {
					if (isPages) map = "\n" + directive + path.replace(/^js\/dist\/pages\//, "");
					else map = "\n" + directive + path.replace(/^js\/dist\//, "");
					return "";
				});
				if (map) {
					text = text.replace(/(^\/\*[\w\W]*?)\s*\*\/|$/,

					function(_, comment) {
						return (comment || "\n/*") + map + "\n*/";
					});
				}
				fs.writeFileSync(filename, text, "utf-8");
			}
		};

		files.forEach(function(filename) {
			replaceFn(filename);
		});
		pageFiles.forEach(function(filename) {
			replaceFn(filename, true);
		});
		grunt.log.writeln("Dist files updated.");
	});

	// pack all pages files
	grunt.registerTask("pages", function() {
		var files = grunt.file.expand({
			filter: "isFile"
		}, "js/src/pages/*");

		var config = grunt.config.get(["uglify"]);

		files.forEach(function(filename) {
			var fileArr = filename.split("/");
			var name = fileArr[fileArr.length - 1];
			var pureName = name.substr(0, name.length - 3);

			config[pureName] = {
				files: {},
				options: {
					sourceMap: "js/dist/pages/"+pureName+".min.map"
				}
			};

			config[pureName].files["js/dist/pages/" + pureName + ".min.js"] = ["js/src/pages/" + pureName + ".js"];
		});

		grunt.config.set("uglify", config);

		grunt.log.writeln("Pages built.");

	});

	grunt.registerTask("resizeimage", function() {
		var done = this.async();
		var files = grunt.file.expand({
			filter: "isFile"
		}, "img/*_2x.*");

		var todo = files.length;
		var completeOne = function() {
			-- todo;
			if (!todo) done();
		};
		var im = require('imagemagick');

		files.forEach(function(filename) {
			// dest name
			var dest = filename.replace(/^(.*\/[^\/]+)_2x\.([^\.]+)$/, "$1.$2");
			// if exist, do nothing
			if (grunt.file.isFile(dest)) {
				grunt.log.writeln("File " + dest + " exists, do nothing.");
				completeOne();
				return;
			}

			im.identify(filename, function(err, features) {
				if (err) throw err;
				// { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
				grunt.log.writeln("File size: "+ features.width + "x" + features.height);

				var width = features.width / 2;
				var height = features.height / 2;

				grunt.log.writeln("Resizing to: "+ width + "x" + height);

				im.convert([filename, '-resize', width + 'x' + height, dest], function(err, stdout) {
					if (err) throw err;
					completeOne();
					grunt.log.writeln("File " + filename + " resized.");
				});

			});
		});
	});


	grunt.registerTask("svn-commit-all", function() {
		var done = this.async();
		var exec = require('child_process').exec, child;

		grunt.log.writeln("Updating...");
		exec('svn up ../ | svn st ../', function (error, stdout, stderr) {
			if (error !== null) {
     			grunt.log.writeln('exec error: ' + error);
     			done(false);
     			return;
    		}
			grunt.log.writeln(stdout);

			grunt.log.writeln("Adding files...");
			exec("svn add `svn st ../ |grep ? |awk '{print $2}'` ../", function (error, stdout, stderr) {
				if (error !== null) {
	     			grunt.log.writeln('exec error: ' + error);
	     			done(false);
	     			return;
	    		}
				grunt.log.writeln(stdout);

				grunt.log.writeln("Commit files...");
				exec("svn commit ../ -m 'commit by grunt @" + new Date() + "'", function (error, stdout, stderr) {
					if (error !== null) {
		     			grunt.log.writeln('exec error: ' + error);
		     			done(false);
		     			return;
		    		}
					grunt.log.writeln(stdout);
					done();
				});
				
			});
		});
	});

	// Load grunt tasks from NPM packages
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	// Default task
	// grunt.registerTask("default", ["build", "uglify", "dist"]);
	grunt.registerTask("default", ["pages", "concat", "uglify", "cssmin", "resizeimage", "dist"]);
};