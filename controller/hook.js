var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');
var config = require('../config.js');
var child = require('child_process');

var hook = {
    name: "webhook"
};

hook.hook = function (req, res) {
    console.log(req.body.hook);
    if (!req.body.hook) {
        if (req.body.repository.name) {
            var hook = config.project[req.body.repository.name];
            if (hook.method == 'github') {
                if (hook.language == 'node') {
                    var shell = 'cd ' + hook.href + ' & git pull & pm2 restart ' + hook.pm2name;
                } else {
                    //shiyixia
                    var shell = 'cd ' + hook.href + ' & git pull ';
                }
                var childHook = child.exec(shell, function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
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
        // console.log(req.body.hook);
        if(config.project[req.body.hook.repository]){
            var hook = config.project[req.body.hook.repository.name];
            if (hook.method == 'oschina' && hook.password == req.body.password) {

                if (hook.language == 'node') {
                    var shell = 'cd ' + hook.href + ' & git pull & pm2 restart ' + hook.pm2name;
                } else {
                    var shell = 'cd ' + hook.href + ' & git pull ';
                }
                var childHook = child.exec(shell, function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                })
            }else {
                console.log('paramsError1');
                res.end(fyscu.out(code.paramError));
                return;
            }
        }else{
            console.log('paramsError2');
            res.end(fyscu.out(code.paramError));
            return;
        }

    }


};

module.exports = hook;