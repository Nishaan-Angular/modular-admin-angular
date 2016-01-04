var path = require('path');
var config = require('../config');

module.exports.task = function(gulp, plugins, paths) {

	// gulp.src(paths.app.styles.src)
	// 	.pipe(plugins.concat('app.less'))
	// 	.pipe(plugins.less({
	// 		paths: [ 
	// 			path.resolve( config.srcDir ),
	// 			path.resolve( config.bowerDir ),
	// 		]
	// 	}))
	// 	.on('error', plugins.util.log)
	// 	.pipe(plugins.autoprefixer())
	// 	.pipe(gulp.dest(paths.app.styles.dest));

	gulp.src(paths.app.styles.src)
		.pipe(plugins.concat('app.scss'))
		// .pipe(gulp.dest(paths.app.styles.dest))
		.pipe(
			plugins.sass({
				includePaths: [
					path.resolve( config.srcDir ),
					path.resolve( config.npmDir ),
					path.resolve( config.bowerDir ),
				]
			})
			.on('error', plugins.sass.logError)
		)
		.pipe(plugins.autoprefixer())
		.pipe(gulp.dest(paths.app.styles.dest));


	// gulp.src(paths.app.themes.src)
	// 	.pipe(plugins.less({
	// 		paths: [ 
	// 			path.resolve( config.srcDir ),
	// 			path.resolve( config.bowerDir ),
	// 		]
	// 	}))
	// 	.on('error', plugins.util.log)
	// 	.pipe(plugins.autoprefixer())
	// 	.pipe(gulp.dest(paths.app.themes.dest));
};