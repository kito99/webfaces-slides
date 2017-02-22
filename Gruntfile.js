module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.initConfig({
		exec: {
			initBundle: 'bundle --path=.bundle/gems --binstubs=.bundle/.bin',
			readme: 'bundle exec asciidoctor "README.asc"',
			slides: 'bundle exec asciidoctor-revealjs "src/{*.asc,*.adoc}" -D out/html',
			pdf: 'bundle exec asciidoctor asciidoctor-pdf src/{*.asc,*.adoc} -D out/pdf',
			copyImages: 'cp -r src/images out/html',
			copySlideLib: 'cp -r src/reveal.js out/html',
			clean: 'rm -R out'
		},
		watch: {
			files: ['src/**/*'],
			tasks: ['default'],
		},
		'connect': {
			demo: {
				options: {
					open: true,
					keepalive: true,
					port: 9091,
					base: "./out/html"
				}
			}
		}
	});

	grunt.registerTask('init', ['exec:initBundle']);
	grunt.registerTask('server', ['connect']);
	grunt.registerTask('build-readme', ['exec:readme']);
	grunt.registerTask('build-slides', ['clean','exec:slides','exec:copyImages','exec:copySlideLib']);
	grunt.registerTask('build-pdf', ['exec:pdf']);
	grunt.registerTask('clean', ['exec:clean']);
	grunt.registerTask('default', ['build-readme', 'build-slides']);
};
