var env = process.env.NODE_ENV || "development";

var isProvider = function(req, res, next) {
    if (req.session.providerID || env === "test") {
        res.locals.providerID = req.session.providerID;
        return next();
    }
    else {
      res.redirect('/');
    }
}

module.exports = isProvider;
