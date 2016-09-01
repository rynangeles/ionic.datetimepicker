'use strict';

module.exports = function (grunt) {

  	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		concat: {
			options: {},
			dist: {
				src: ['src/*.js'],
				dest: 'dist/ion.datetime-picker.js',
			},
		},
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: 'dist',
					src: 'ion.datetime-picker.js',
					dest: 'dist'
				}]
			}
		},
		uglify: {
		dist: {
			files: {
				'dist/ion.datetime-picker.min.js': ['dist/ion.datetime-picker.js']
				}
			}
		},
		sass: {
			dist: { 
				options: {
					style: 'expanded'
				},
				files: {
					'dist/ion.datetime-picker.css': 'src/ion.datetime-picker.scss'
				}
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'dist',
					src: ['ion.datetime-picker.css'],
					dest: 'dist',
					ext: '.datetime-picker.min.css'
				}]
			}
		}
	});

	grunt.registerTask('default', [
		'concat',
		'ngAnnotate',
		'uglify',
		'sass',
		'cssmin'
	]);

};
