var glob = require('glob');
var path = require('path');

var gulp 	= require('gulp');
var plugins = require('gulp-load-plugins')();

var utils = require('./utils/utils');

/********************************************
*			Configs And Paths
*********************************************/

var config = require('./config');

var paths = {
	app: 	require('./paths/app')
};


/********************************************
*   		Load Build Tasks
*********************************************/

var buildTasks = utils.loadTasks(gulp, plugins, paths);

gulp.task('build', buildTasks);

/*********************************************
*				 Other Tasks
**********************************************/

// Local server pointing on build folder
gulp.task('connect', function() {
	plugins.connect.server({
		root: config.destDir,
		port: config.port || 3333,
		livereload: true
	});
});


// Rerun the task when a file changes
gulp.task('watch', function() {
	// When template changes recompile .html pages
	plugins.watch(paths.app.pages.src, function() {
	    gulp.start('app-pages');
	});

	// When script changes recompile scripts
	plugins.watch(paths.app.scripts.src, function() {
	    gulp.start('app-scripts');
	});

	// When style changes recompile styles
	plugins.watch(paths.app.styles.src, function() {
	    gulp.start('app-styles');
	});

	// When theme changes recompile themes
	plugins.watch(paths.app.themes.src, function() {
	    gulp.start('app-themes');
	});
});

// Builds and deploys to github pages
gulp.task('deploy', ['build'], function() {
	return gulp.src('../dist/**/*')
		.pipe(plugins.ghPages({
			cacheDir: '../.deploy'
		}));
});



/********************************************
*				Main Tasks
*********************************************/


// // Run this task for development
gulp.task('develop', [
	'build',
	'watch', 
	'connect'
]);

gulp.task('default', ['develop']);