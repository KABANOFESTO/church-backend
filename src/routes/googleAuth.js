const express = require('express');
const session = require('express-session');
const passport = require('passport');
const googleRouter = express();

googleRouter.use(session({ secret: 'cats' }));
googleRouter.use(passport.initialize());
googleRouter.use(passport.session());

require("./auth");

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

googleRouter.get('/', (req, res) => {
    res.send('<a href="/google/auth/google">Login with Google</a>');
});


googleRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

googleRouter.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/google/protected',
        failureRedirect: '/google/auth/failure'
    })
);
googleRouter.get('/auth/failure', (req, res) => {
    res.send('something went wrong..');
});


googleRouter.get('/protected', isLoggedIn, (req, res) => {
    res.send('Hello!');
})

module.exports = googleRouter;