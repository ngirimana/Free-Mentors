import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import status from '../helpers/StatusCode';
import session from '../models/sessions';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
const emptyToken = '';
let mentorToken;
let menteeToken;
const invalidToken = 'hbsdvjsd vsdbvjsdnvjds vsdbvjsjcnjsd';
const notExistToken = jwt.sign({
  id: 0, email: 'gbd@gmail.com', is_admin: false, is_mentor: false,
},
  process.env.SECRETEKEY);

describe('6. POST SESSIONS,/api/v2/sessions ', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'safari@gmail.com',
      password: 'password123',
    }).then((res) => {
      menteeToken = res.body.data.token;
      done();
    });
  });
  it('should return Such user is not found ', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(session[1])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return empty token ', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'application/json')
      .send(session[3])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return empty token ', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', emptyToken)
      .set('Accept', 'application/json')
      .send(session[3])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return empty token ', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', notExistToken)
      .set('Accept', 'application/json')
      .send(session[3])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return post session successfully ', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(session[3])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.REQUEST_SUCCEEDED);
        expect(res.body.status).to.equal(status.REQUEST_SUCCEEDED);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return post session alredy exist ', (done) => {
    chai.request(app)
      .post('/api/v2/sessions')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(session[3])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.REQUEST_CONFLICT);
        expect(res.body.status).to.equal(status.REQUEST_CONFLICT);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
