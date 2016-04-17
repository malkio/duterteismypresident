module.exports = function(grunt){

	var globalconfig = {
		htmlpath: 'app/*.html',
		scsspath: 'app/assets/sass/',
		jspath: 'app/assets/js/'
	};

	// Project ocnfiguration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// grunt-express will serve the files from the
		// folders listend in `bases`
		// on specified `port` and `hostname`
		express: {
			all: {
				options: {
					port: 9000,
					hostname: "localhost",
					bases: ["app"],

					livereload: true
				}
			}
		},

		// grunt watch will monitor the projects files
		watch: {
			html: {
				// Replace with whatever you want to trigger the update of the files
				// Either as a string for a single entry
				// or an Array of String for multiple entries
				// You can use globing patterns like `css/**/*css`
				// See https://github.com/gruntjs/grunt-contrib-watch#files
				files: globalconfig.htmlpath,
				tasks: ['htmlhint'],
				options: {
					livereload:true
				}
			},
			styles: {
				files: globalconfig.scsspath+"/*.scss",
				tasks: ['sass'],
				options: {
					livereload:true
				}
			},
			js: {
				files: globalconfig.jspath+"/*.js",
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			}

		},

		// grunt open will open your browser at the project's URL
		open: {
			all: {
				// Gets the port from connect configuration
				path: 'http://localhost:<%= express.all.options.port%>'
			}
		},

		sass: {
			dist: {
				files: {
					'app/assets/styles/main.css': 'app/assets/sass/main.scss'
				}
			}
		},
		jshint: {
			all: ['GruntFile.js', 'app/assets/js/*.js']
		},
		htmlhint: {
			html1: {
				options: {
					'tag-pair': true
				},
				src: [globalconfig.htmlpath]
			}
		}
	});

	// IMPORT module

	grunt.loadNpmTasks('grunt-parallel');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	// set default task(s)
	grunt.registerTask('build', [
		'htmlhint',
		'jshint',
		'sass:dist'
		]);
	grunt.registerTask('server', [
		'express',
		'open',
		'watch'
		]);
};