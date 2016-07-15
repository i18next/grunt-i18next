/*
 * grunt-i18next
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Ignacio Rivas
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var Path = {
    TESTS: 'test/*_test.js',
    LOCALES: 'test/sample/**/locales',
    BUILD_PATH: 'test/sample/languages'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: [Path.BUILD_PATH]
    },

    i18next: {
      spreadOut: {
        src: [Path.LOCALES],
        dest: Path.BUILD_PATH
      },
      together: {
        cwd: 'test/sample/loc',
        expand: true,
        src: ['*/'],
        include: ['**/*.json', '!**/ignore-this.json'],
        rename: function(dest, src) {
          return dest + src + 'translation-combined.json';
        },
        dest: Path.BUILD_PATH + '/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: [Path.TESTS]
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first lint the files and clean the "tmp"
  // dir, then run this plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'i18next', 'nodeunit']);

  // By default, run all tests.
  grunt.registerTask('default', ['test']);
};