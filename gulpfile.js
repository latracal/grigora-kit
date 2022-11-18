var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' )( require( 'sass' ) );
var rename = require( 'gulp-rename' );
const minifyjs = require( 'gulp-minify' );
var concat = require('gulp-concat');

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

// blocks-sass-style
gulp.task( 'blocks-sass-style', function () {
	return gulp
		.src( [ 'src/blocks/**/style.scss' ] )
		.pipe( sass() )
		.pipe( gulp.dest( 'assets/css/blocks/' ) );
} );

// blocks-sass-minify
gulp.task( 'blocks-sass-style-minify', function () {
	return gulp
		.src( [ 'src/blocks/**/style.scss' ] )
		.pipe( sass( { outputStyle: 'compressed' } ) )
		.pipe(
			rename( function ( path ) {
				path.extname = '.min.css';
			} )
		)
		.pipe( gulp.dest( 'assets/css/blocks/' ) );
} );

// blocks-sass-editor
gulp.task( 'blocks-sass-editor', function () {
	return gulp
		.src( [ 'src/blocks/**/editor.scss' ] )
		.pipe( sass() )
		.pipe(concat('editor.css'))
		.pipe( gulp.dest( 'assets/css/blocks/' ) );
} );

// blocks-sass-editor-minify
gulp.task( 'blocks-sass-editor-minify', function () {
	return gulp
		.src( [ 'src/blocks/**/editor.scss' ] )
		.pipe( sass( { outputStyle: 'compressed' } ) )
		.pipe(concat('editor.css'))
		.pipe(
			rename( function ( path ) {
				path.extname = '.min.css';
			} )
		)
		.pipe( gulp.dest( 'assets/css/blocks/' ) );
} );

// blocks-sass-editor-style
gulp.task( 'blocks-sass-editor-style', function () {
	return gulp
		.src( [ 'src/blocks/**/style.scss' ] )
		.pipe( sass() )
		.pipe(concat('style.css'))
		.pipe( gulp.dest( 'assets/css/blocks/' ) );
} );

// blocks-sass-editor-style-minify
gulp.task( 'blocks-sass-editor-style-minify', function () {
	return gulp
		.src( [ 'src/blocks/**/style.scss' ] )
		.pipe( sass( { outputStyle: 'compressed' } ) )
		.pipe(concat('style.css'))
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
	gulp.watch(
		'src/blocks/**/*.scss',
		gulp.series( 'blocks-sass-style', 'blocks-sass-style-minify', 'blocks-sass-editor', 'blocks-sass-editor-minify', 'blocks-sass-editor-style', 'blocks-sass-editor-style-minify' )
	);
	gulp.watch( 'js-front/*.js', gulp.series( 'compress-js' ) );
	gulp.watch( 'js-front/*.mjs', gulp.series( 'compress-js' ) );
} );

// Default task
gulp.task(
	'default',
	gulp.series(
		'sass',
		'sass-minify',
		'blocks-sass-style',
		'blocks-sass-style-minify',
		'blocks-sass-editor',
		'blocks-sass-editor-minify',
		'blocks-sass-editor-style',
		'blocks-sass-editor-style-minify',
		'compress-js',
		'watch'
	)
);
