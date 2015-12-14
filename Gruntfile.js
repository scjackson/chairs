var webpack = require('webpack');
module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      chairs: {
        options: {
          port: 1337,
          base: 'src/',
        },
      },
    },
    webpack: {
      chairs: {
        entry: './src/index.js',
        output: {
          path: './src/',
          filename: 'chairs.js',
        },
        watch: true,
        keepalive: true,
        plugins: [
          new webpack.optimize.UglifyJsPlugin()
        ],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.registerTask('default', ['connect:chairs', 'webpack:chairs']);
};
