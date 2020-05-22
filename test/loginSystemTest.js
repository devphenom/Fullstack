process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);
models = require('../models')


describe('Signup route', function(){
    const newUser = {email: 'sample0@email.com', password: "mypassword"}
    before(function(done){
        models.User.destroy({
            where : {},
            truncate: true
        }).then(()=>{done()})
    });
    it('should get the signup page', function(done){
        chai.request(server)
        .get('/users/signup')
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    });
    it('should save user to database and return a token', function(done){
        chai.request(server)
         .post('/users/signup')
         .send(newUser)
         .end(function(err, res){
             expect(res).to.have.status(200)
             expect(res.body).to.be.an('object')
             expect(res.body).to.have.property('session').to.be.a('string');
             expect(res.body).to.have.property('session').to.not.be.null;
             done();
         })
     });
    it('should return an error message of User already registered', function(done){
        chai.request(server)
         .post('/users/signup')
         .send(newUser)
         .end(function(err, res){
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error').to.be.a('string');
            expect(res.body).to.have.property('error', 'Email already in use')
            done();
        })
    });
    it('should return an error message of email not valid', function(done){
        chai.request(server)
         .post('/users/signup')
         .send({email: 'sample0emailcom', password: "mypassword"})
         .end(function(err, res){
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error').to.be.a('string');
            expect(res.body).to.have.property('error', 'Please use a valid email.')
            done();
        })
    });
    it('should return an error message of email not valid', function(done){
        chai.request(server)
         .post('/users/signup')
         .send({email: 'sample00@email.com', password: "mypas"})
         .end(function(err, res){
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error').to.be.a('string');
            expect(res.body).to.have.property('error', 'Password too short, min of 8 characters and max of  25')
            done();
        })
    });
    
});

describe('Login route', function(){
    it('should get the login page', function(done){
        chai.request(server)
        .get('/users/login')
        .end(function(err, res){
            expect(res).to.have.status(200)
            done();
        })
    });
    it('should log the user in and return a token', function(done){
        chai.request(server)
        .post('/users/login')
        .send({email: 'sample0@email.com', password: "mypassword"})
        .end(function(err, res){ 
            if(err) {
                expect(res).to.have.status(400)
            } else {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('session').to.be.a('string');
                expect(res.body).to.have.property('session').to.not.be.null;
                done()
            }
        })
    })
});
