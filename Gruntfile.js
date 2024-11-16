'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/main.min.css': 'src/css/main.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: 'src/**/*.scss',
                tasks: ['sass'],
            },
            fonts: {
                files: 'src/fonts/*',
                tasks: ['newer:copy:fonts'],
            },
            html: {
                files: 'src/**/*.html',
                tasks: ['newer:copy:html'],
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['newer:uglify'],
            },
            images: {
                files: 'src/**/*.{png,jpg,gif,svg}',
                tasks: ['newer:imagemin']
            }
        },
        copy: {
            html: {
                cwd: 'src',  // set working folder / root to copy
                src: '**/*.html',           // copy all files and subfolders
                dest: 'build/',    // destination folder
                expand: true,           // required when using cwd
            },
            docs: {
                cwd: 'src',
                src: '**/*.pdf',
                dest: 'build/',
                expand: true,
            },
            fonts: {
                cwd: 'src',
                src: 'fonts/*',
                dest: 'build/',
                expand: true,
            }
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    base: 'build',
                    port: 6600,
                    open: true
                },
            },
        },
        // concat: {   
        //     build: {
        //         src: [
        //             'src/js/vendor/*.js', // All JS in the vendor folder
        //             'src/js/main.js',  // This specific file
        //         ],
        //         dest: 'build/js/production.js',
        //     },
        // },
        uglify: {
            build: {
                // files: [{
                //     expand: true,
                //     cwd: 'src/js',
                //     src: '**/*.js',
                //     dest: 'build/js',
                // }]
                files: {
                    'build/js/main.min.js': ['src/js/main.js'],
                    // 'build/js/homepage.min.js': ['src/js/homepage.js'],
                    // src: 'src/js/main.js',
                    // dest: 'build/js/main.min.js',
                }
            },
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'build/img/',
                }],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');

    // Start web server
    grunt.registerTask('default', [
        'sass',
        'newer:imagemin',
        'uglify',
        'copy',
        'connect:server',
        'watch'
    ]);

    // grunt.registerTask('min', ['concat', 'uglify']);
}