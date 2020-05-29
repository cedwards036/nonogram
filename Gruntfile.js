module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      browserify: {
        dist: {
          src: [
            'src/create.js',
            'src/solve.js'
          ],
          dest: 'temp/common.js',
          // files: {
          //   'temp/<%= pkg.name %>.js': ['src/*.js', 'src/**/*.js'],
          // },
          options: {
            plugin: [
              ['factor-bundle', {outputs: ['temp/create.js', 'temp/solve.js']}]
            ]
          }
        }
      },
      babel: {
        options: {
          sourceMap: true,
          presets: ['@babel/preset-env']
        },
        dist: {
          // files: {
          //     'temp/<%= pkg.name %>.js': 'temp/<%= pkg.name %>.js'
          // }
          files: {
            'temp/create.js': 'temp/create.js',
            'temp/solve.js': 'temp/solve.js',
            'temp/common.js': 'temp/common.js'
          }
        }
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        },
        // build: {
        //   src: 'temp/<%= pkg.name %>.js',
        //   dest: 'build/<%= pkg.name %>.min.js'
        // }
        build: {
          files: {
            'build/create.js': 'temp/create.js',
            'build/solve.js': 'temp/solve.js',
            'build/common.js': 'temp/common.js'
          }
        }
      },
      clean: ['temp']
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
  
    // Default task(s).
    grunt.registerTask('default', ['browserify', 'babel', 'uglify', 'clean']);
  
  };