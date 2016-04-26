var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');
var config = require('../config.js');
var child = require('child_process');

var hook = {
    name: "webhook"
};

hook.hook = function (req, res) {
    // console.log(req.body.hook);
    if (!req.body.hook) {
        if (req.body.repository.name) {
            // console.log(req.body.repository.name);
            var hook = config.project[req.body.repository.name];
            if (hook.method == 'github') {
                var shell = 'git pull ';

                var childHook = child.exec(shell, {
                    cwd: hook.href
                }, function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (hook.language == 'node') {
                        var childHook2 = child.exec('pm2 restart ' + hook.pm2name, function () {
                            console.log('stdout: ' + stdout);
                            console.log('stderr: ' + stderr);
                            if (error !== null) {
                                console.log('exec error: ' + error);
                                console.log(fyscu.out(code.childProcessError));
                                return;
                            }
                        });
                    }
                    if (error !== null) {
                        console.log('exec error: ' + error);
                        console.log(fyscu.out(code.childProcessError));
                        return;
                    }
                    res.end(fyscu.out(code.success));
                    return;

                })
            } else {
                console.log('paramsError');
                res.end(fyscu.out(code.paramError));
                return;
            }
        } else {
            console.log('paramsError');
            res.end(fyscu.out(code.paramError));
            return;
        }

    } else {
        // JSON.parse(req.body.hook);
        // console.log(config.project[req.body.hook.push_data.repository]);
        if (req.body.hook.push_data.repository) {
            var hook = config.project[req.body.hook.push_data.repository.name];
            if (hook.method == 'oschina' && hook.password == req.body.hook.password) {

                var shell = 'git pull ';

                var childHook = child.exec(shell, {
                    cwd: hook.href
                }, function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (hook.language == 'node') {
                        var childHook2 = child.exec('pm2 restart ' + hook.pm2name, function () {
                            console.log('stdout: ' + stdout);
                            console.log('stderr: ' + stderr);
                            
                            if (error !== null) {
                                console.log('exec error: ' + error);
                                console.log(fyscu.out(code.childProcessError));
                                return;
                            }
                        });
                    }
                    if (error !== null) {
                        console.log('exec error: ' + error);
                        console.log(fyscu.out(code.childProcessError));
                        return;
                    }
                    res.end(fyscu.out(code.success));
                    return;
                });
            } else {
                console.log('paramsError1');
                res.end(fyscu.out(code.paramError));
                return;
            }
        } else {
            console.log('paramsError2');
            res.end(fyscu.out(code.paramError));
            return;
        }

    }


};

module.exports = hook;