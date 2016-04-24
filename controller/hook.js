var hook = {
    name:"web hook"
};

hook.hook = function (req, res) {
    console.log(req.body);
    return;
};


module.exports = hook;