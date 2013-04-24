[back to Mobile Boilerplate](https://github.com/inkless/mobile-boilerplate#documentation) 

# Miscellaneous

## .gitignore

Mobile Boilerplate includes a basic project-level `.gitignore`. This should
primarily be used to avoid certain project-level files and directories from
being kept under source control. Different development-environments will
benefit from different collections of ignores.

OS-specific and editor-specific files should be ignored using a "global
ignore" that applies to all repositories on your system.

For example, add the following to your `~/.gitconfig`, where the `.gitignore`
in your HOME directory contains the files and directories you'd like to
globally ignore:

```gitignore
[core]
    excludesfile = ~/.gitignore
```

* More on global ignores: http://help.github.com/ignore-files/
* Comprehensive set of ignores on GitHub: https://github.com/github/gitignore
