[back to Mobile Boilerplate](https://github.com/inkless/mobile-boilerplate#documentation) 

# The HTML

## DOCTYPE
The &lt;!DOCTYPE> declaration must be the very first thing in your HTML document, before the &lt;html> tag.
In HTML5 there is only one:

    <!DOCTYPE html>

## The order of meta tags, and `<title>`

As recommended by [the HTML5
spec](http://www.whatwg.org/specs/web-apps/current-work/complete/semantics.html#charset)
(4.2.5.5 Specifying the document's character encoding), add your charset
declaration early (before any ASCII art ;) to avoid a potential
[encoding-related security
issue](http://code.google.com/p/doctype/wiki/ArticleUtf7) in IE. It should come
in the first [1024
bytes](http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html#charset).

The charset should also come before the `<title>` tag, due to [potential XSS
vectors](http://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).

The meta tag for compatibility mode [needs to be before all elements except
title and meta](http://h5bp.com/f "Defining Document Compatibility - MSDN").
And that same meta tag can only be invoked for Google Chrome Frame if it is
within the [first 1024
bytes](http://code.google.com/p/chromium/issues/detail?id=23003).

## Mobile viewport

Different options are available when specifying viewport. But we recommend you this one:

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,user-scalable=no">
```

## Favicons and Touch Icons

The shortcut icons should be put in the root directory of your site. HTML5
Boilerplate comes with a default set of icons (include favicon and Apple Touch
Icons) that you can use as a baseline to create your own.

If your site or icons are in a sub-directory, you will need to reference the
icons using `link` elements placed in the HTML `head` of your document.

For a comprehensive overview, please read [Everything you always wanted to know
about touch icons](http://mathiasbynens.be/notes/touch-icons) by Mathias
Bynens.

## Different CSS and JavaScript files

In develop environment, we may need to load different files from production/distribution environment.

```html
<!-- CSS Develop -->
<link rel="stylesheet" type="text/css" href="../css/src/normalize.css">
<link rel="stylesheet" type="text/css" href="../css/src/base.css">
<link rel="stylesheet" type="text/css" href="../css/src/main.css">
<link rel="stylesheet" type="text/css" href="../css/src/responsive.css">
<link rel="stylesheet" type="text/css" href="../css/src/print.css">
<!-- CSS Distribution -->
<!-- <link rel="stylesheet" type="text/css" href="../css/dist/dist.min.css"> -->
```

We recommend you use your server to detect environment and load different files.

## The content area

The central part of the boilerplate template is pretty much empty. This is
intentional, in order to make the boilerplate suitable for both web page and
web app development.

