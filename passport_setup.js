let localStrategy = require('passport-local').Strategy;

let bcrypt  = require('bcrypt')
let models = require('./models')
let jwt = require('jsonwebtoken');


module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });
    passport.deserializeUser(function(id, done) {
        models.User.findOne({
            where : {
                'id' : id
            }
        }).then(user => {
            if (user == null) {
                done(new Error('wrong user id.'))
            }
            done(null, user);
        })
    })
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        return models.User.findOne({
            where: {
                'email' : email
            },
        }).then(user => {
            if (user == null) {
				req.flash('message', 'Incorrect credentials.')
                return done(null, false)
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                if(isMatch){
                    jwt.sign({user : user}, 'secretkey', (err, token) => {
                        console.log({success: true, token: token})
                    })
                    return done(null, user);
                } else {
                    console.log({success: false, message: "Password is not correct"})
                    return done(null, false, { message: 'Password is not correct'})
                }
            })
        }).catch(err => {
            done(err, false)
        })
    }))
}