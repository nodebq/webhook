var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');
var config = require('../config.js');
var child = require('child_process');

var hook = {
    name:"web hook"
};

hook.hook = function (req, res) {
    var hook = config.project[req.body.repository.name];
    if(hook.language=='node'){
        var shell = 'cd '+hook.href+' & git pull & pm2 restart '+hook.pm2name;
    }else {

    }
    var childHook = child.exec(shell,function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    })
};

module.exports = hook;