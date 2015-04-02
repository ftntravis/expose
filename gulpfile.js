var gulp = require('gulp'),
    babel = require('gulp-babel');

gulp.task('scripts', function () {

    gulp.src('scripts/index.js')
        .pipe(babel())
        .pipe(gulp.dest(''));
});