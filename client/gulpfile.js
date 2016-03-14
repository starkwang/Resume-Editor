var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var webpackConfig = require('./webpack.config');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');

gulp.task('default', ['clean', 'watch', 'webpack', 'sass']);

gulp.task("webpack", function() {
    return gulp
        .src('./')
        .pipe(webpack(webpackConfig))
        //.pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('sass', function() {
    gulp.src(['style/index.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['webpack']);
    gulp.watch('src/*.js', ['webpack']);
    gulp.watch('style/*.scss',['sass']);
});

gulp.task('clean', function() {
    return gulp.src(['build/'], {
            read: false
        })
        .pipe(clean());
});
