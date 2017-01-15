module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify', 'watch']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                src: 'src/js/app.js',
                dest: 'src/js/generated-js.js'
            },
            options: {
                browserifyOptions: {
                    debug: true
                }
            },
        },
        watch: {
            files: 'src/**/*.js',
            tasks: ['default']
        },
        karma: {
            unit: {
                configFile: "karma.conf.js"
            }
        },
    });
}