var isProvider = function(req, res, next) {
    if (req.session.providerID) {
        res.locals.providerID = req.session.providerID;
        return next();
    }
    else {
      res.redirect('/');
    }
}

module.exports = isProvider;
