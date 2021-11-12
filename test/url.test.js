const assert = require('assert');
const { expect } = require('chai');
let chai = require('chai');
const should = chai.should();
const request = require('supertest');
const { deserialize } = require('v8');
const app = require('../app')

describe('URL shortning test', function(done) {
describe('POST /url/shorten', function() {
    let userToken = {};
    it('return 403 if user not authenficated', function(done){
        request(app)
        .post('/url/shorten')
        .send({
            "longUrl":"https://thisisanacceptableURL.com"
        })
        .expect(403, done);
    })
    it('return 401 if token is not acceptable', function(done){
        request(app)
        .post('/url/shorten')
        .set({
            "x-access-token":"kfd cjfpidjpcidjf"
        })
        .send({
            "longUrl":"https://thisisanacceptableURL.com"
        })
        .expect(401, done);
    });
   
    var userInfoToken;
    describe('after random URL creation', function(){
        before(function(done){
             request(app)
            .post('/login')
            .send({
                "email": "john.doe@gmail.com",
                "password": "1234"
            })
            // * Might be a better way to do this
            .end((err, res)=>{
                userInfoToken = res.body.token;
                done()
            })
        })
        it('return 200 and short URL if user is authentificated and url was not yet shorten', function(done){
            request(app)
            .post('/url/shorten')
            .set({
                "x-access-token": userInfoToken
            })
            .send({
                "longUrl":"https://thisURLisValid.com"
            })
            .end((err, res)=>{
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.have.property('urlCode')
                expect(res.body).to.have.property('longUrl')
                expect(res.body).to.have.property('CreatedBy')
                expect(res.body.CreatedBy).not.to.be.null;
                done()
            })
        });
        
        it('return 200 if user is authentificated and url was already shorten', function(done){
            request(app)
            .post('/url/shorten')
            .set({
                "x-access-token": userInfoToken
            })
            .send({
                "longUrl":"https://thisURLisValid.com"
            })
            .end((err, res)=>{
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.have.property('urlCode')
                expect(res.body).to.have.property('longUrl')
                expect(res.body).to.have.property('CreatedBy')
                done()
            })
         });
        

    })

    describe('after speciific URL creation', function(){
        //Normal request with non existent url in db
        //existent url in db should be ok
        //existetn short code in db, should no be okay
        //shortURLwithSpace
        //shortURLwithdot
        //shortURLMissingOnlyOneCharforValidity
        
    })
})
})