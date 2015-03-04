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
    var that = this,
        len = this.filesSrc.length,
        outputDir,
        outputFile,
        originalFile,
        destFile,
        merged;

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

    var iterateTroughFiles = function(abspath, rootdir, subdir, filename){
      if (abspath.indexOf('/.svn') === -1){
        outputDir = that.data.dest;
        outputFile = outputDir + '/' + filename;

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

    for (var x = 0; x < len; x++) {
      grunt.file.recurse(this.filesSrc[x], iterateTroughFiles);
    }
  });
};
