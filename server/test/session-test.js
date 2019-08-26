import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import status from '../helpers/StatusCode';
import session from '../models/sessions';

const { expect } = chai;
chai.use(chaiHttp);


let menteeToken = jwt.sign({ id: 1, is_admin: false, is_mentor: false }, 'secretKey');


describe('32 . POST sessions ,/api/v1/sessions', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chadrack@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return Such user is not found ', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(session[1])
      .then((res) => {
        console.log('===================', res.body, '=============================');
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe('33 . POST sessions with id not for mentor ,/api/v1/sessions', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chadrack@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return Such user is not mentor ', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(session[2])
      .then((res) => {
        console.log('===================', res.body, '=============================');
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe('34 . POST sessions successfully ,/api/v1/sessions', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chadrack@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return Such user is not mentor ', (done) => {
    console.log(session[2]);
    chai.request(app)
      .post('/api/v1/sessions')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(session[3])
      .then((res) => {
        console.log('===================', res.body, '=============================');
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
