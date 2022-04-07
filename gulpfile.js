"use strict";

import pkg from 'gulp';
const { src, task } = pkg;
import del from 'del';
import { NotificationPipe } from './utilities/gulp-notification-pipe.cjs';
import publish from 'gulp-gh-pages';
import { site_root } from './src/lib/utils/constants.js';

// Setup for notification tasks
function deploy(_success, error) {
    return src(`${site_root}/**/*`)
    .pipe(publish({
        branch: "site_root"
    }).on('error', error))
}

// Notification tasks
task('prod: deploy', NotificationPipe(deploy, {message: "Deployed!"}));

// silent tasks
task('clean', function() {
    return del([`${site_root}/**/*`], {force: true});
});