var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');
var config = require('../config.js');
var child = require('child_process');

var hook = {
    name:"web hook"
};

hook.hook = function (req, res) {
    if(req.body.repository.name){
        console.log(req.body);

        if(hook.method=='github'){
            var hook = config.project[req.body.repository.name];
            if(hook.language=='node'){
                var shell = 'cd '+hook.href+' & git pull & pm2 restart '+hook.pm2name;
            }else {
                //shiyixia
                var shell = 'cd '+hook.href+' & git pull ';
            }
        }else if(hook.method=='oschina'&&hook.password==req.body.password){
            var hook = config.project[req.body.hook_name];
            if(hook.language=='node'){
                var shell = 'cd '+hook.href+' & git pull & pm2 restart '+hook.pm2name;
            }else{
                var shell = 'cd '+hook.href+' & git pull ';
            }
        }else {
            console.log("I don't know which platform or your password id is wrong");
            res.end(fyscu.out(code.success));
            return;
        }
        var childHook = child.exec(shell,function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        })
    }else {
        console.log(fyscu.out(code.paramError));
        return;
    }


};

module.exports = hook;