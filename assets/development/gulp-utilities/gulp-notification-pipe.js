var notifier = require('node-notifier'),
    extend = require('extend'),
    path = require('path'),
    defaults = {
        error: {
            title: 'Error running Gulp'
        },
        regular: {
            icon: path.join(__dirname, '/Content/Images/gulp-icon.png')
        },
        success: {
            title: 'Gulp notification',
            message: 'Successfully completed task!'
        }
    };

exports.NotificationPipe = function (taskFn, success = null) {
    return function(done) {
        var onSuccess = function() {
            notifier.notify(extend(defaults.regular, success.message ? extend(defaults.success, {message: success.message}) : defaults.success));
            done();
        }
        var onError = function(err) {
            notifier.notify(extend(defaults.regular, defaults.error, { message: err.message }));
            done(err);
            // process.exit(1); call at end
        }

        var outStream = taskFn(onSuccess, onError);

        if (outStream && typeof outStream.on == 'function') {
            outStream.on('end', onSuccess);
        }
    }
}