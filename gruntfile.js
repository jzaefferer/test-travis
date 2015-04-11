module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    qunit: {
      foo: ['qunit/qunit-test-suite.html'],
      all: {
        options: {
          urls: [
            'http://localhost:10000/qunit/qunit-test-suite.html'
          ]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 10000,
          base: '.'
        }
      }
    }



  });


  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'qunit:all']);

};
