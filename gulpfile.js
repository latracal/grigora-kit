var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' )( require( 'sass' ) );
var rename = require( 'gulp-rename' );
const minifyjs = require( 'gulp-minify' );

//sass
gulp.task( 'sass', function () {
	return gulp
		.src( [ 'scss/*.scss' ] )
		.pipe( sass() )
		.pipe( gulp.dest( 'assets/css/' ) );
} );

//sass-minify
gulp.task( 'sass-minify', function () {
	return gulp
		.src( [ 'scss/*.scss' ] )
		.pipe( sass( { outputStyle: 'compressed' } ) )
		.pipe(
			rename( function ( path ) {
				path.extname = '.min.css';
			} )
		)
		.pipe( gulp.dest( 'assets/css/' ) );
} );

// blocks-sass
gulp.task( 'blocks-sass', function () {
	return gulp
		.src( [ 'src/blocks/**/*.scss' ] )
		.pipe( sass() )
		.pipe( gulp.dest( 'assets/css/blocks/' ) );
} );

// blocks-sass-minify
gulp.task( 'blocks-sass-minify', function () {
	return gulp
		.src( [ 'src/blocks/**/*.scss' ] )
		.pipe( sass( { outputStyle: 'compressed' } ) )
		.pipe(
			rename( function ( path ) {
				path.extname = '.min.css';
			} )
		)
		.pipe( gulp.dest( 'assets/css/blocks/' ) );
} );

// js minify
gulp.task( 'compress-js', function () {
	return gulp
		.src( [ 'js-front/*.js', 'js-front/*.mjs' ] )
		.pipe(
			minifyjs( {
				// mangle: false
				ext: {
					min: '.min.js',
				},
			} )
		)
		.pipe( gulp.dest( 'assets/js/' ) );
} );

// watch
gulp.task( 'watch', function () {
	gulp.watch( 'scss/*.scss', gulp.series( 'sass', 'sass-minify' ) );
	gulp.watch( 'scss/**/*.scss', gulp.series( 'sass', 'sass-minify' ) );
	gulp.watch( 'src/blocks/**/*.scss', gulp.series( 'blocks-sass', 'blocks-sass-minify' ) );
	gulp.watch( 'js-front/*.js', gulp.series( 'compress-js' ) );
	gulp.watch( 'js-front/*.mjs', gulp.series( 'compress-js' ) );
} );

// Default task
gulp.task(
	'default',
	gulp.series(
		'sass',
		'sass-minify',
		'blocks-sass',
		'blocks-sass-minify',
		'compress-js',
		'watch'
	)
);
