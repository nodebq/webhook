var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');

var hook = {
    name:"web hook"
};

hook.hook = function (req, res) {
    console.log(req.body);
    res.end(fyscu.out(code.success));
    return;
};

module.exports = hook;