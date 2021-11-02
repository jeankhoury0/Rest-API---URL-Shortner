const assert = require('assert');
const request = require('supertest');
const app = require('../app')

describe('POST /login', function() {
  it('return 400 if request is empty', function(done) {
    request(app)
      .post('/login')
      .expect(400, done);
  });
  it('return 401 if uselrname/password invalid', function(done){
    request(app)
    .post('/login')
    .send({ 
      "email":"not-a-valid-user@gmail.com" , 
      "password":"000000"
  })
  // .expect(function(res){
  //   res.status=401
  // })
  .expect(401, done);
  })
});