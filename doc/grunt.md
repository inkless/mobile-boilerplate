[back to Mobile Boilerplate](https://github.com/inkless/mobile-boilerplate#documentation) 

# Grunt

Information about the Gruntfile in the project.
After installed the dependancies by useing `npm install`. You may run some grunt task.

    grunt

Using grunt may run all the default task accordingly.

You may also run some specific task, e.g.

	grunt resizeimage

By this command, only the resizeimage task was run.

Followings were the list of all tasks.

## pages

Compress files in pages directory, uglify them and generate sourcemap.

## concat

Specify how files are concatenated, including a banner.

## uglify

Compress javascript files according to the config in Gruntfile.js

## cssmin

Compress css files according to the config in Gruntfile.js

## resizeimage

Compress images in img directory. Convert the files which has the `_2x` postfix to half of the original size.

## dist

Distribution related operations, such as adjust the path, sourcemap, etc.

## svn-commit-all

Add all files and commit them. This task isn't combined in the default task.

