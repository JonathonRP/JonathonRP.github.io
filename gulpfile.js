"use strict";

var gulp = require('gulp'),
    del = require('del'),
    { NotificationPipe } = require('./gulp-utilities/gulp-notification-pipe.js'),
    sass = require('gulp-sass')(require('sass')),
    postcss = require('gulp-postcss'),
    preset_env = require('postcss-preset-env'),
    ts = require('gulp-typescript'),
    webserver = require('gulp-webserver'),
    clean_css = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    // imagemin = require('gulp-imagemin'),
    // responsive = require('gulp-responsive'),
    seo = require('gulp-seo'),
    rename = require('gulp-rename'),
    stylesLoc = './src/styles/*.scss',
    scriptsLoc = './src/scripts/*.ts',
    stylesDest = './public/styles',
    scriptsDest = './public/scripts',
    plugins = [
        preset_env({stage: 3, autoprefixer: {add: true, grid: "autoplace"}})
    ],
    devWebserver = null,
    watchStyles = null,
    watchScripts = null;

// Setup for notification tasks
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

    return devWebserver = gulp.src('./public')
        .pipe(webserver({
            fallback: './index.html',
            livereload: true
        }).on('error', error));
}

function destroyDevelopmentWebserver(success, error) {
    if (devWebserver == null) return;

    return gulp.series(gulp.parallel(watchStyles.close(), watchScripts.close()), devWebserver.close());
}

function CleanCSS(success, error) {
    return gulp.src(`${stylesDest}/*.css`)
        .pipe(clean_css({level: 2}))
        .pipe(gulp.dest(stylesDest));
}

function Uglify(success, error) {
    return gulp.src(`${scriptsDest}/*.js`, {allowEmpty: true})
        .pipe(uglify())
        .pipe(gulp.dest(scriptsDest));
}

function ServeIndex(success, error) {
    return gulp.src('./src/resume.html')
    .pipe(rename({ basename: 'index'}))
    .pipe(gulp.dest('./public'));
}

// Notification tasks
gulp.task('dev: BuildStyles', NotificationPipe(compileCSS, {message: "CSS compiled!"}));
gulp.task('dev: BuildScripts', NotificationPipe(compileJS, {message: "JavaScript compiled!"}));
gulp.task('dev: BuildPublic', NotificationPipe(ServeIndex, {message: "Public dist ready!"}));
gulp.task('dev: StartWebserver', NotificationPipe(buildDevelopmentWebserver, {message: "Dev webserver started!"}));
gulp.task('dev: StopWebserver', NotificationPipe(destroyDevelopmentWebserver, {message: "Dev webserver stopped!"}));

gulp.task('prod: MinifyStyles', NotificationPipe(CleanCSS, {message: "CSS minified!"}));
gulp.task('prod: MinifyScripts', NotificationPipe(Uglify, {message: "JavaScript minified!"}));

// silent tasks
gulp.task('clean', function() {
    return del([`${stylesDest}/*.css`, `${scriptsDest}/*.js`], {force: true});
});
gulp.task('hotreload: WatchStyles', function() {
    if (watchStyles != null) return;

    return watchStyles = gulp.watch(stylesLoc, gulp.task('dev: BuildStyles'));
});
gulp.task('hotreload: WatchScripts', function() {
    if (watchScripts != null) return;

    return watchScripts = gulp.watch(scriptsLoc, gulp.task('dev: BuildScripts'));
});
gulp.task('hotreload: WatchHtml', function() {
    return gulp.watch('./src/resume.html', gulp.task('dev: BuildPublic'));
});

gulp.task('prod: SEO', function() {
    // gulp.src('./assets/images')
    //     .pipe(responsive({
    //         '*.png': [
    //             {
    //                 width: 200,
    //                 rename: {
    //                     suffix: '-200'
    //                 }
    //             },
    //             {
    //                 width: 800,
    //                 rename: {
    //                     suffix: '-800'
    //                 }
    //             },
    //             {
    //                 width: 1000,
    //                 rename: {
    //                     suffix: '-1000'
    //                 }
    //             }
    //         ],
    //         '*.jfif': [
    //             {
    //                 width: 200,
    //                 rename: {
    //                     suffix: '-200'
    //                 }
    //             },
    //             {
    //                 width: 800,
    //                 rename: {
    //                     suffix: '-800'
    //                 }
    //             },
    //             {
    //                 width: 1000,
    //                 rename: {
    //                     suffix: '-1000'
    //                 }
    //             }
    //         ]
    //     }))
    //     .pipe(imagemin([
    //         imagemin.mozjpeg({quality: 80, progressive: true}),
    //         imagemin.optipng({optimizationLevel: 1})
    //     ]))
    //     .pipe(gulp.dest('./assets/img'));
    return gulp.src('./src/resume.html')
    .pipe(seo({
        list: ['og', 'se', 'schema', 'twitter'],
        meta: {
            type: 'website',
            author: 'Jonathon Reese Perry',
            webauthor: 'Jonathon Reese Perry',
            locale: 'en_US',
            url: 'https://JonathonRP.github.io/Resume/',
            image: 'https://JonathonRP.github.io/Resume/assets/images/profile.png',
            title: 'Jonathon Reese Perry Software Developer Resume',
            description: 'Hard working and detail oriented professional, seeking a software development position where I can use my skills and contribute to the growth of a company.',
            site_name: 'Software Developer Resume',
            keywords: ['Software Developer', 'Web Developer', 'MVC 5', 'C#', '.Net', 'SQL'],
            robots: {
                index: true,
                follow: true
            },
            revisitAfter: '1 month'
        }
    }))
    .pipe(rename({ basename: 'index'}))
    .pipe(gulp.dest('./public'));
});

// logical grouping tasks
gulp.task('dev: build', gulp.series('clean', gulp.parallel('dev: BuildStyles', 'dev: BuildScripts', 'dev: BuildPublic')));
gulp.task('start debugging', gulp.series('dev: build', gulp.parallel('hotreload: WatchStyles', 'hotreload: WatchScripts', 'dev: StartWebserver')));

gulp.task('prod: build', gulp.series('dev: build', gulp.parallel('prod: MinifyStyles', 'prod: MinifyScripts', 'prod: SEO')));