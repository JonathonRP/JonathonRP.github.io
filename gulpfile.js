"use strict";

var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass')(require('sass')),
    postcss = require('gulp-postcss'),
    preset_env = require('postcss-preset-env'),
    ts = require('gulp-typescript'),
    webserver = require('gulp-webserver'),
    { NotificationPipe } = require('./assets/development/gulp-utilities/gulp-notification-pipe.js'),
    stylesLoc = './*.scss',
    scriptsLoc = './*.ts',
    stylesDest = './assets/css',
    scriptsDest = './assets/js',
    plugins = [
        preset_env({stage: 3, autoprefixer: {add: true, grid: "autoplace"}})
    ],
    devWebserver = null,
    watchStyles = null,
    watchScripts = null;

function compileCSS(success, error) {
    return gulp.src(stylesLoc)
        .pipe(sass().on('error', error))
        .pipe(postcss(plugins).on('error', error))
        .pipe(gulp.dest(stylesDest));
}

function compileJS(success, error) {
    return gulp.src(scriptsLoc)
        .pipe(ts({noImplicitAny: true}).on('error', error))
        .pipe(gulp.dest(scriptsDest));
}

function buildDevelopmentWebserver(success, error) {
    if (devWebserver != null) return;

    return devWebserver = gulp.src('./')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            open: true
        }).on('error', error));
}

function destroyDevelopmentWebserver(success, error) {
    if (devWebserver == null) return;

    devWebserver.close();
}

gulp.task('buildStyles', NotificationPipe(compileCSS, {message: "CSS compiled!"}));
gulp.task('buildScripts', NotificationPipe(compileJS, {message: "JavaScript compiled!"}));
gulp.task('startDevWebserver', NotificationPipe(buildDevelopmentWebserver, {message: "Dev webserver started!"}));
gulp.task('stopDevWebserver', NotificationPipe(destroyDevelopmentWebserver, {message: "Dev webserver stopped!"}));

gulp.task('clean', function() {
    return del([`${stylesDest}/**`, `${scriptsDest}/**`], {force: true});
});
gulp.task('startWatchingStyles', function() {
    if (watchStyles != null) return;

    return watchStyles = gulp.watch(stylesLoc, gulp.task('buildStyles'));
});
gulp.task('startWatchingScripts', function() {
    if (watchScripts != null) return;

    return watchScripts = gulp.watch(scriptsLoc, gulp.task('buildScripts'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('buildStyles', 'buildScripts')));
gulp.task('start debugging', gulp.parallel('startWatchingStyles', 'startWatchingScripts', 'startDevWebserver'));