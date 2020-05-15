const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);

describe('GET /', function(){
    it('have a status code 200 and return an object', function(done){
        chai.request(server)
            .get('/')
            .end(function(err, res){
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.status).to.equal('Success')
                done();
            })
    })
});

describe('POST /data', function(){
    it('should return a string', function(done){
        chai.request(server)
            .post('/data')
            .end(function(err, res){
                if(err) return err
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('string')
                done();
            })
    })
})

describe('GET /data', function(){
    it('should return 200 response code', function(done){
        chai.request(server)
            .get('/data')
            .end(function(err, res){
                expect(res).to.have.status(200)
                done();
            })
    })
    it('should test for data', function(done){
        chai.request(server)
            .get('/data')
            .end(function(err, res){
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('data').to.be.a('string')
                expect(res.body).to.have.property('data', 'Hello world')
                done();
            })
    })
})