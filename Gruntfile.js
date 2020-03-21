module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      browserify: {
        dist: {
          files: {
            'temp/<%= pkg.name %>.js': 'src/*.js',
          }
        }
      },
      babel: {
        options: {
          sourceMap: true,
          presets: ['@babel/preset-env']
        },
        dist: {
          files: {
              'temp/<%= pkg.name %>.js': 'temp/<%= pkg.name %>.js'
          }
        }
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'temp/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      },
      clean: ['dist']
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
  
    // Default task(s).
    grunt.registerTask('default', ['browserify', 'babel', 'uglify', 'clean']);
  
  };