module.exports = function(grunt) {
  'use strict';

  var Path = {
    LIB: 'src/**/*.js',
    SPECS: 'tests/*.spec.js'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // js linting options
    jshint: {
      all: ['Gruntfile.js', Path.LIB],
      jshintrc: '.jshintrc'
    },

    // Builds and run spec runner
    jasmine: {
      pivotal: {
        src: Path.LIB,
        options: {
          vendor: [
            'vendor/jquery/jquery-1.9.0.js',
            'vendor/underscore/lodash.js',
            'vendor/backbone/backbone.js'
          ],
          specs: Path.SPECS,
          keepRunner: true,
          helpers: 'vendor/jasmine-jquery/jasmine-jquery.js'
        }
      }
    },

    // Buids and minifies the sources
    uglify: {
      min: {
        files: {
          'dist/tree.min.js': [Path.LIB]
        }
      },
      concat: {
        options: {
          beautify: true,
          compress: false
        },
        files: {
          'dist/tree.js': [Path.LIB]
        }
      }
    }
  });

  // Load grunt tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // default build task
  grunt.registerTask('default', 'test');

  // Dev task
  grunt.registerTask('test', ['jshint:all', 'jasmine:pivotal']);

  // Build tasks
  grunt.registerTask('build', ['jshint:all', 'jasmine:pivotal', 'uglify:min', 'uglify:concat']);
};
