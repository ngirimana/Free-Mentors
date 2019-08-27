import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import status from '../helpers/StatusCode';
import reviews from '../models/reviews';

const { expect } = chai;
chai.use(chaiHttp);
let menteeToken = jwt.sign({ id: 1, is_admin: false, is_mentor: false }, 'secretKey');
let adminToken = jwt.sign({ id: 1, is_admin: false, is_mentor: true }, 'secretKey');

describe('50 . POST sessions ,/api/v1/sessions/sessionId/review', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return Such user is not found ', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/8/review')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(reviews[0])
      .then((res) => {
        console.log('===================', res.body, '=============================');
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('Your session with mentioned id is not found!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});


describe('51 . POST user can review mentor When session is not integer', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session id is not integer ', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/q/review')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(reviews[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('Session id should be an integer');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('52 . POST user can review mentor successfully', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session id is not accepted ', (done) => {
    chai.request(app)
      .post('/api/v1/sessions/1/review')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(reviews[0])
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
});
