module.exports = function(grunt) {

  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      ngadmin_js: {
        expand: true,
        cwd: './node_modules/ng-admin/build/',
        src: '**/*.js',
        dest: './client/js/',
      },
      ngadmin_css: {
        expand: true,
        cwd: './node_modules/ng-admin/build/',
        src: '**/*.css',
        dest: './client/css/',
      },
    },
    jshint: {
      beforeconcat: ['./src/js/**/*.js'],
      afterconcat: ['./dist/js/scripts.js']
    },
		connect: {
			server: {
				options: {
					livereload:true,
					open: false,
					hostname:'localhost',
					base:'./client/'
				}
			}
		},
    watch: {
      scripts: {
        files: [
        	'**/*.hbs',
        	'./src/{,*/}*.styl',
        	'./src/{,*/}*.css',
        	'./src/{,*/}*.js',
        	'./src/{,*/}*.json'
      	],
        tasks: ['http','assemble','stylus','concat','jshint','copy'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register task(s)
  grunt.registerTask('default', ['copy','jshint']);
  grunt.registerTask('serve', ['copy','jshint','connect','watch']);

};