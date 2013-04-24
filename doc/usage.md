[back to Mobile Boilerplate](https://github.com/inkless/mobile-boilerplate#documentation) 

# Usage

After downloaded or cloned Mobile Boilerplate, most of stuffs were done, but
you also need to do the following:

1. Make sure node.js were installed

Once you have cloned or downloaded HTML5 Boilerplate, creating a site or app
usually involves the following:

1. Make sure you have node.js and grunt-cli installed. see [README.md](https://github.com/inkless/mobile-boilerplate).
2. Install dependancy packages:

        cd {yourdir} && npm install

3. Package files using grunt:

        grunt

4. Run your site locally to see how it works, e.g. open pages/index.html

## Basic structure

A basic Mobile Boilerplate site initially looks something like this:

```
.
├── css
│   ├── src
│   │   ├── normalize.css
│   │   ├── base.css
│   │   ├── main.css
│   │   ├── responsive.css
│   │   └── print.css
│   └── dist
│       └── dist.min.css
├── doc
├── img
├── js
│   ├── src
│   │   ├── component
│   │   ├── pages
│   │   ├── config.js
│   │   ├── core.js
│   │   └── app.js
│   ├── plugins
│   ├── vendor
│   │   └── zepto.min.js
│   ├── test
│   └── dist
│       ├── pages
│       ├── dist.js
│       ├── dist.min.js
│       └── dist.min.map
├── pages
│   ├── index.html
│   └── 404.html
├── Gruntfile.js
├── humans.txt
├── robots.txt
├── crossdomain.xml
├── favicon.ico
└── [apple-touch-icons]
```

What follows is a general overview of each major part and how to use them.

### css

This directory should contain all your project's CSS files. It includes some
initial CSS to help get you started from a solid foundation. [About the
CSS](css.md).

### doc

This directory contains all the HTML5 Boilerplate documentation. You can use it
as the location and basis for your own project's documentation.

### js

This directory should contain all your project's JS files. Libraries, plugins,
and custom code can all be included here. It includes some initial JS to help
get you started. [About the JavaScript](js.md).

### pages/index.html

This is the default HTML skeleton that should form the basis of all pages on
your site. If you are using a server-side templating framework, then you will
need to integrate this starting HTML with your setup.

Make sure that you update the URLs for the referenced CSS and JavaScript if you
modify the directory structure at all.

### pages/404.html

A helpful custom 404 to get you started.

### humans.txt

Edit this file to include the team that worked on your site/app, and the
technology powering it.

### robots.txt

Edit this file to include any pages you need hidden from search engines.

### crossdomain.xml

A template for working with cross-domain requests. [About
crossdomain.xml](crossdomain.md).

### icons

Replace the default `favicon.ico` and apple touch icons with your own. 