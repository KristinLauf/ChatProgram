module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      foo: {
        src: [
          "src/js/*.js",
          "src/js/services/*.js",
          "src/js/directives/*.js",
          "src/js/controllers/*.js",
        ], 
      },
    },
	concat: {
		js : {
			src :[
			  "src/js/*.js",
			  "src/js/services/*.js",
			  "src/js/directives/*.js",
			  "src/js/controllers/*.js",
			],
			dest : "build/combined.js"
		}
    },

	uglify: {
		build: {
			 files: {
			'build/output.min.js': ["build/combined.js"]
		  }
		}
	}

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};