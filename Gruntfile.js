/*global require, module:false */
module.exports = function (grunt) {
    'use strict';

    var distJs = 'dist/js/';

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            js: {
                src: ['src/js/*.js'],
                dest: distJs + '<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.js.dest %>',
                dest: distJs + '<%= pkg.name %>.min.js'
            }
        },

        jslint: {
            client: {
                src: ['<%= concat.js.src %>', 'tests/*.spec.js', 'Gruntfile.js'],
                directives: {
                    browser: true,
                    unparam: true,
                    regexp: true,
                    nomen: true,
                    plusplus: true
                }
            }
        },

        jasmine: {
            'gifv-player': {
                src: 'src/js/gifv-player.js',
                options: {
                    specs: 'tests/*.spec.js',
                    vendor: [
                        'bower_components/jquery/jquery.js'
                    ],
                    helpers: 'tests/helpers/*.js',
                    junit: {
                        path: 'tests/reports/',
                        consolidate: true
                    },
                    keepRunner: true,
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'tests/reports/coverage.json',
                        report: [
                            {
                                type: 'lcov',
                                options: {
                                    dir: 'tests/reports/'
                                }
                            },
                            {
                                type: 'text-summary'
                            }
                        ]
                    },
                    // phantom options
                    '--web-security' : false,
                    '--local-to-remote-url-access' : true,
                    '--ignore-ssl-errors' : true
                }
            }
        },

        coveralls: {
            options: {
                force: true
            },
            main_target: {
                src: "tests/reports/lcov.info"
            }
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jslint']
            },
            test: {
                files: 'tests/*.spec.js',
                tasks: ['jstest']
            },
            buildJS: {
                files: ['<%= concat.js.src %>'],
                tasks: ['jstest', 'js']
            }
        },

        connect: {
            server: {
                options: {
                    port: 9002,
                    base: '.'
                }
            }
        },

        buddyjs: {
            src: ['<%= concat.js.src %>'],
            options: {}
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release version: %VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: '%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin master',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-buddyjs');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-coveralls');

    // Custom tasks
    grunt.registerTask('jstest', ['jasmine', 'jslint', 'buddyjs']);
    grunt.registerTask('js', ['concat:js', 'uglify']);
    grunt.registerTask('server', ['connect:server', 'watch']);
    grunt.registerTask('ci', ['jasmine', 'coveralls']);

    // Default task.
    grunt.registerTask('default', ['jstest', 'js']);
};
