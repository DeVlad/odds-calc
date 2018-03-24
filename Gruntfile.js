module.exports = function (grunt) {
    // Project configuration.
    var pkg = require('./package.json');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        auto_install: {
            local: {},
            subdir: {
                options: {
                    cwd: '',
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    npm: '--production'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/*.js',
                dest: 'build/js/<%= pkg.name %>.min.js'
            }
        },
        validation: {
            options: {
                reset: grunt.option('reset') || false,
                stoponerror: false,
                //    remotePath: '',
                //    remoteFiles: [''],
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'], //ignores these errors
            },
            files: {
                src: ['src/*.html', 'src/*.htm']
            }
        },
        postcss: {
            options: {
                map: false, // inline sourcemaps 
                // or 
                /*map: {
                    inline: false, // save all sourcemaps as separate files... 
                    annotation: 'build/css/' // ...to the specified directory 
                },*/
                processors: [
        require('pixrem')(), // add fallbacks for rem units 
        require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes 
        require('cssnano')() // minify the result 
      ]
            },
            dist: {
                src: 'src/css/*.css',
                dest: 'build/css/style.min.css'
            }
        },
        img: {
            // using only dirs with output path 
            task1: {
                src: 'src/img',
                dest: 'build/img'
            }
        },
        processhtml: {
            build: {
                files: {
                    'build/index.html': ['src/index.html']
                }
            }
        },
        htmlmin: { // Task 
            dist: { // Target 
                options: { // Target options 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files 
                    'build/index.html': 'build/index.html' //, // 'destination': 'source' 
                        //'dist/contact.html': 'src/contact.html'
                }
            }
        },
        copy: {
            main: {
                files: [
      // includes files within path 
                    {
                        expand: true,
                        cwd: 'src/img',
                        src: ['**'],
                        dest: 'build/img/'
                    },

                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['favicon.ico'],
                        dest: 'build/'
                    }


      // includes files within path and its sub-directories 
     // {expand: true, src: ['path/**'], dest: 'dest/'},

      // makes all src relative to cwd 
    //  {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

      // flattens results to a single level 
     // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
    ]
            }
        },
        'gh-pages': {
            options: {
                base: 'build'
            },
            src: ['**']
        }
    });
    // Tasks
    grunt.loadNpmTasks('grunt-auto-install');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-w3c-html-validation');
    grunt.loadNpmTasks('grunt-postcss');
    //grunt.loadNpmTasks('grunt-newer');
    //grunt.loadNpmTasks('grunt-img');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-gh-pages');
    // Deploy to Github pages
    grunt.registerTask('deploy', ['gh-pages']);
    // Default tasks
    //grunt.registerTask('default', ['auto_install', 'validation', 'uglify', 'postcss', 'processhtml', 'htmlmin', 'copy']);
    grunt.registerTask('default', ['auto_install', 'validation', 'postcss', 'processhtml', 'htmlmin'])
};