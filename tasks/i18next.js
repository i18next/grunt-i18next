/*
 * grunt-arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2012 Globant UI Developers
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask('buildLocales', 'Build Locale files.', function() {
    var that = this,
        len = this.filesSrc.length,
        outputDir,
        outputFile,
        originalFile,
        destFile,
        merged;

    var jsonConcat = function(object1, object2) {
      var key, a1, a2;
      for (key in object2) {
        if (object2.hasOwnProperty(key)) {
          a2 = object2[key];
          a1 = object1[key];
          if (a1) {
            a1.push.apply(a1, a2);
          } else {
            object1[key] = a2;
          }
        }
      }

      return object1;
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

          merged = jsonConcat(destFile, originalFile);

          grunt.file.write(outputFile, JSON.stringify(merged));
        }
      }
    };

    for (var x = 0; x < len; x++) {
      grunt.file.recurse(this.filesSrc[x], iterateTroughFiles);
    }
  });
};
