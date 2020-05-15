process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);


describe('Signup route', function(){
    it('should return true', function(done){
        chai.request(server)
        .get('/users/signup')
        .end(function(err, res){
            expect(res).to.have.status(200)
            done();
        })
    });
    const newUser = {email: 'iphenomf9@gmail.com', password: "ajibola01"}
    it('should return true', async function(){
       chai.request(server)
        .post('/users/signup')
        .send(newUser)
        .end(function(err, res){
            if(res.status != 200){
                expect(res).to.have.status(400)
            } else {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('session').to.be.a('string');
                expect(res.body).to.have.property('session').to.not.be.null;
            };
        })
    });
});

describe('Login route', function(){
    it('should return true', function(done){
        chai.request(server)
        .get('/users/login')
        .end(function(err, res){
            expect(res).to.have.status(200)
            done();
        })
    });
    it('should return true', async function(){
        chai.request(server)
        .post('/users/login')
        .send({email: 'iphenom99@gmail.com', password: "ajibola01"})
        .end(function(err, res){ 
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('session').to.be.a('string');
            expect(res.body).to.have.property('session').to.not.be.null;
        })
    })
});
