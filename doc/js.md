[back to Mobile Boilerplate](https://github.com/inkless/mobile-boilerplate#documentation) 

# The JavaScript

Information about the default JavaScript included in the project.

## vendor

This directory can be used to contain all 3rd party library code. e.g. `zepto.js`

## plugins

This directory can be used to contain all your plugins, such as jQuery/Zepto plugins and
other 3rd party scripts.

One approach is to put jQuery/Zepto plugins inside of a `(function($){ ...
})(jQuery || Zepto);` closure to make sure they're in the jQuery namespace safety
blanket.

## component

This directory can be used to contain all your component files, such as swipe, popup components.

## pages

If pages got lots of feature independantly, you can be use this directory to contain all your 
pages files.

## config.js

This file is for configs. This file should be loaded in all pages.

## core.js

Utilities, basic functions may be contained in this file. This file should be loaded in all pages.

## app.js

Like core.js, This file should be loaded in all pages. It handles all business/page related effects.
