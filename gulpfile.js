var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var rename = require("gulp-rename");
const minifyjs = require('gulp-minify');
 

//sass
gulp.task('sass', function () {
    return gulp.src(['scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('assets/css/'));
});

//sass-minify
gulp.task('sass-minify', function () {
    return gulp.src(['scss/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename(function (path) {
            path.extname = ".min.css"
          }))
        .pipe(gulp.dest('assets/css/'));
});

// js minify
gulp.task('compress-js', function() {
  return gulp.src(['js/*.js', 'js/*.mjs'])
    .pipe(minifyjs({
      // mangle: false
      ext:{
        min:'.min.js'
    },
    }))
    .pipe(gulp.dest('assets/js/'))
});

// watch
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', gulp.series('sass', 'sass-minify'));
    gulp.watch('scss/**/*.scss', gulp.series('sass', 'sass-minify'));
    gulp.watch('js/*.js', gulp.series('compress-js'));
    gulp.watch('js/*.mjs', gulp.series('compress-js'));
});

// Default task
gulp.task('default', gulp.series('sass', 'sass-minify', 'compress-js', 'watch'));