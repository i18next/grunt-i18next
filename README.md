# grunt-i18next [![Build Status](https://travis-ci.org/i18next/grunt-i18next.png?branch=master)](https://travis-ci.org/i18next/grunt-i18next) [![npm version](https://badge.fury.io/js/grunt-i18next.svg)](https://badge.fury.io/js/grunt-i18next) [![devDependency Status](https://david-dm.org/i18next/grunt-i18next/dev-status.svg)](https://david-dm.org/i18next/grunt-i18next#info=devDependencies)

Bundle language resource files for i18next.


## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-i18next --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-i18next');
```

## i18next task
_Run this task with the `grunt i18next` command._

This multi task supports all the file mapping format Grunt supports. Please read [Globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns) and [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) for additional details.Note the following task configuration properties: 

##### src
This required property specifies the *folders* (not files!) the plugin should look for translation json files.

##### include
This optional custom property specifies which files to include. If it is omitted, all json files will be included in the specified `src` folders. Any grunt globbing pattern can be used (array or string).

##### dest
The destination folder.

##### rename
See grunt documentation. Used to rewrite destination URLs. Amongst other things it allows one task to create multiple output files.

##### cwd
See grunt documentation. 

For more general information on specifying targets, files and options see the grunt [Configuring Tasks](http://gruntjs.com/configuring-tasks) guide. 


### Simple Usage Example

This task finds any files in locales folders and merges the ones that have the same file name. The resulting merged files are placed in _application/languages_.

```js
i18next: {
  locales:{
    src: ['application/**/locales'],
    dest: 'application/languages'
  }
}
```

### Complex Usage Example

This task finds .json files in folders that are direct descendents of _src/languages_, excluding files called "ignore-this.json". The task merges all the files in each src folder separately. The resulting files have file names "translation-combined.json", and are placed under _application/languages_ in their own subfolders that match the src subfolders.

```js
i18next: {
  complex: {
    cwd: 'src/languages',
    expand: true,
    src: ['*/'],
    include: ['**/*.json', '!**/ignore-this.json'],
    rename: function(dest, src) {
      return dest + '/' + src + 'translation-combined.json';
    },
    dest: 'application/languages'
  }
}
```

## Release History

* 2016-07-21 v0.1.0 Added support for include and rename
* 2015-03-04 v0.0.2 Renamed to grunt-i18next
* 2013-09-28 v0.0.1 First version
