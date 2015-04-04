module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
        spawn: false
      },

      // Styling
      scss: {
        files: 'components/**/*.scss',
        tasks: ['newer:imagemin', 'sync', 'compass:development', 'modernizr', 'newer:csslint']
      },

      // Scripting
      js: {
        files: ['components/*.js', 'components/app/**/*.js', '!components/app/_deferred/**/*.js'],
        tasks: ['requirejs:development', 'modernizr', 'newer:jshint'],
      },
      js_deferred: {
        files: ['components/app/_deferred/**/*.js'],
        tasks: ['newer:uglify:deferred_development', 'modernizr', 'newer:jshint'],
      },
      js_bower: {
        files: ['components/libs/**/*.js'],
        tasks: ['newer:uglify:external', 'requirejs:development'],
      },

      // HTML
      html: {
        files: ['*.html', 'components/app/**/*.html' , '!components/libs/**/*.html', '!build/**/*.html'],
        tasks: ['replace', 'newer:accessibility'],
      },

      // Images
      img_content: {
        files: 'img/**/*.{png,gif,jpg,svg}',
        tasks: ['newer:imagemin:content'],
      },
      img_background: {
        files: 'components/**/*.{png,gif,jpg,svg}',
        tasks: ['clean:css', 'newer:imagemin:backgrounds' , 'compass:development', 'clean:css', 'clean:svg', 'newer:csslint'],
      }
    },

    compass: {
      options: {
        asset_cache_buster: false,
        cssDir: 'build/assets/css',
        httpImagesPath: '/assets/img',
        imagesDir: 'build/assets/img',
        noLineComments: true,
        require: 'sass-css-importer',
        sassDir: 'components',
        specify: 'components/*.scss'
      },
      development: {
        options: {
          sourcemap: true,
          environment: 'development'
        }
      },
      production: {
        options: {
          httpPath: "/", // . = relative
          environment: 'production'
        }
      }
    },

    replace: {
      modules: {
        options: {
          patterns: [
            {
              match: /{app:{(.+)}}/g,
              replacement: function (match, placeholder) {
                return grunt.file.read('components/app/' + placeholder + '/' + placeholder + '.html');
              }
            },
            {
              match: /{deferred:{(.+)}}/g,
              replacement: function (match, placeholder) {
                return grunt.file.read('components/app/_deferred/' + placeholder + '/' + placeholder + '.html');
              }
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['*.html'],
            dest: 'build/'
          }
        ]
      }
    },

    requirejs: {
      options: {
        mainConfigFile: "components/travis-ci-test.js",
        name: "travis-ci-test",
        out: "build/assets/js/travis-ci-test.js",
        useStrict: true
      },
      development: {
        options: {
          generateSourceMaps: true,
          optimize: 'none'
        }
      },
      production: {
        options: {
          generateSourceMaps: false,
          optimize: 'uglify'
        }
      }
    },

    uglify: {
      deferred_development: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'components/app/_deferred',
          src: ['**/*.js'],
          dest: 'build/assets/js/deferred'
        }]
      },
      deferred_production: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'components/app/_deferred',
          src: ['**/*.js'],
          dest: 'build/assets/js/deferred'
        }]
      },
      external: {
        files: {
          'build/assets/js/libs/modernizr.js': ['components/libs/modernizr-shim/modernizr.min.js'],
          'build/assets/js/libs/require.js': ['components/libs/requirejs/require.js']
        }
      }
    },

    imagemin: {
      content: {
        files: [{
          flatten: true,
          expand: true,
          cwd: 'img',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'build/img'
        }]
      },
      backgrounds: {
        files: [{
          flatten: true,
          expand: true,
          cwd: 'components/app',
          src: ['**/*.{jpg,gif,png,svg}'],
          dest: 'build/assets/img'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['components/app/**/*.js']
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc',
        import: false
      },
      lax: {
        src: ['build/assets/css/**/*.css']
      }
    },

    accessibility: {
      options : {
        accessibilityLevel: 'WCAG2A',
        accessibilityrc: true,
        domElement: true
      },
      development : {
        files: [{
          expand  : true,
          cwd     : 'build/',
          src     : ['*.html']
        }]
      }
    },

    clean: {
      svg: {
        src: ["build/assets/img/**/*.svg"]
      },
      css: {
        src: ["build/assets/css/**/*.css"]
      },
      build: {
        src: ["build"]
      }
    },

    qunit: {
      foo: ['qunit/qunit-test-suite.html'],
      all: {
        options: {
          urls: [
            'http://localhost:8000/qunit/qunit-test-suite.html'
          ]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },

    sync: {
      webfonts: {
        files: [{
          flatten: true,
          expand: true,
          cwd: 'components/app',
          src: ['**/font/*.{ttf,eot,woff,svg}'],
          dest: 'build/assets/font'
        }],
        verbose: true
      },
      json: {
        files: [{
          flatten: true,
          expand: true,
          cwd: 'components/app',
          src: ['**/*.json'],
          dest: 'build/assets/json'
        }],
        verbose: true
      },
      favicon: {
        files: [{
          flatten: true,
          expand: true,
          cwd: '.',
          src: ['favicon.ico', 'apple-touch-icon.png'],
          dest: 'build'
        }],
        verbose: true
      }
    },

    modernizr: {
      dist: {
        "devFile" : "components/libs/modernizr-shim/modernizr.min.js",
        "outputFile" : "build/assets/js/libs/modernizr.js",
        "extra" : {
          "shiv" : false,
          "printshiv" : false,
          "load" : false,
          "mq" : false,
          "cssclasses" : true
        },
        "files" : {
          "src": ['components/app/**/*.js', 'build/**/*.css']
        }
      }
    },

    qunit_amd: {
      unit: {
          // include: [
          //     'test/lib/helper.js',
          //     'test/lib/sinon-1.5.1.js'
          // ],
          tests: [
              "components/app/foo/test-Foo.js"
          ],
          require: {
              baseUrl: './',
              paths: {
                'QUnit': 'components/libs/qunit/qunit/qunit',
                'jquery': 'components/libs/jquery/dist/jquery.min',

                // Test for Foo
                'foo': 'components/app/foo/foo',
                'test-Foo': 'components/app/foo/test-Foo'
              }
          }
      }
    }

  });

  grunt.loadNpmTasks('grunt-accessibility');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-qunit-amd');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', [
    'replace',
    'imagemin',
    'sync',
    'compass:development',
    'requirejs:development',
    'uglify:deferred_development',
    'uglify:external',
    'clean:svg',
    'clean:css',
    'modernizr',
    'csslint',
    'jshint',
    'accessibility'
  ]);

  grunt.registerTask('production', [
    'clean:build',
    'replace',
    'imagemin',
    'sync',
    'compass:production',
    'requirejs:production',
    'uglify:deferred_production',
    'uglify:external',
    'clean',
    'modernizr'
   ]);

   grunt.registerTask('test', ['connect', 'qunit:all']);

};
