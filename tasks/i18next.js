/*
 * grunt-i18next
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Ignacio Rivas
 * Licensed under the MIT license.
 * https://github.com/i18next/grunt-i18next/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask('i18next', 'Build locale files.', function() {
    var that = this;
    var x;
    var y;

    // default to all json files
    this.data.include = this.data.include || '**/*.json';

    var mergeRecursive = function(obj1, obj2) {
      for (var p in obj2) {
        try {
          // Property in destination object set; update its value.
          if (obj2[p].constructor === Object) {
            obj1[p] = mergeRecursive(obj1[p], obj2[p]);
          } else {
            obj1[p] = obj2[p];
          }
        } catch (e) {
          // Property in destination object not set; create it and set its value.
          obj1[p] = obj2[p];
        }
      }

      return obj1;
    };

    var iterateTroughFiles = function(abspath, rootdir, subdir, filename) {
      var outputDir;
      var outputFile;
      var originalFile;
      var destFile;
      var merged;

      if (grunt.file.isMatch(that.data.include, abspath)) {

        // if data.rename is not defined the dest has to be a single file
        outputFile = (that.data.rename) ? that.files[x].dest : that.data.dest + '/' + filename;
        outputDir = outputFile.substring(0, outputFile.lastIndexOf('/'));

        // If output dir doesnt exists, then create it
        if (!grunt.file.exists(outputDir)) {
          grunt.file.mkdir(outputDir);
        }

        originalFile = grunt.file.readJSON(abspath);

        // if dest file doenst exist, then just copy it.
        if (!grunt.file.exists(outputFile)) {
          grunt.file.write(outputFile, JSON.stringify(originalFile));
        } else {
          // read source file, read dest file. merge them. write it in dest file
          destFile = grunt.file.readJSON(outputFile);

          merged = mergeRecursive(destFile, originalFile);

          grunt.file.write(outputFile, JSON.stringify(merged));
        }
      }
    };

    for (x = 0; x < this.files.length; x++) {
      for (y = 0; y < this.files[x].src.length; y++) {
        grunt.file.recurse(this.files[x].src[y], iterateTroughFiles);
      }
    }
  });
};
