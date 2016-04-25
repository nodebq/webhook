var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');
var config = require('../config.js')

var hook = {
    name:"web hook"
};

hook.hook = function (req, res) {
    if(req.body.repository.name == )
    console.log(req.body.repository.name);
    res.end(fyscu.out(code.success));
    return;
};

module.exports = hook;