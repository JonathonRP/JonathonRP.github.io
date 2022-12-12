"use strict";

import { src, task } from 'npm:gulp';
import del from 'npm:del';
import { NotificationPipe } from './utilities/gulp-notification-pipe.cjs';
import publish from 'npm:gulp-gh-pages';
import { site_root } from './src/lib/utils/constants.ts';

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