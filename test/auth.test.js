/**
 * Testing library for the routes:
 * 
 * POST /login
 * POST /register
 * @author Jean Khoury
 * 
 */

const assert = require('assert');
const request = require('supertest');
const app = require('../app')
const mongoose = require('mongoose')

describe('Authentification Test', function() {

describe('POST /register', function(){

  it('return 400 if request is empty' , function(done){
    request(app)
    .post('/register')
    .expect(400, done);
  })

  it('return 400 if request if missing password' , function(done){
    request(app)
    .post('/register')
    .send({
        "firstName": "Jean",
        "lastName": "Jeajn",
        "email": "tarik@gmail.com",
        "password": ""
    })
    .expect(400, done);
  })

  before(function(){
    mongoose.connection.db.dropDatabase();
  })
  it('return 201 and token if user creation is valid' , function(done){
    request(app)
    .post('/register')
    .send({
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@gmail.com",
        "password": "1234"
    })
    .expect(201)
    .then(res =>{
      assert(res.body.token)
      done();
    })
    .catch(err=>done(err));
  });

  it('return 409 when user already exist' , function(done){
    request(app)
    .post('/register')
    .send({
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@gmail.com",
        "password": "1234"
    })
    .expect(409, done);
  })

})


describe('POST /login', function() {

  it('return 400 if request is empty', function(done) {
    request(app)
      .post('/login')
      .expect(400, done);
  });
  it('return 401 if username/password invalid', function(done){
    request(app)
    .post('/login')
    .send({ 
      "email":"not-a-valid-user@gmail.com" , 
      "password":"000000"
  })
  .expect(401, done);
  })

  it('return 200 and token if username exist (login is valid)', function(done) {
    request(app)
    .post('/login')
    .send({ 
      "email":"john.doe@gmail.com" , 
      "password":"1234"
    })
    .expect(200)
    .then(res =>{
      assert(res.body.token)
      done();
    })
    .catch(err=>done(err));

  })
});
})