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
const p = 'dfbgjsbvjbjdxbc jdxfbjdfvjdjfvx jdzx vjdx zdzjxv jzxbv jdz';

describe('52 . POST sessions  when id not found,/api/v1/sessions/sessionId/review', () => {
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


describe('53 . POST user can review mentor When session is not integer', () => {
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
describe('54 . POST user can review mentor successfully', () => {
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
describe('55 . POST user can review mentor successfully,wrong input', () => {
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
      .send(reviews[1])
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
});


describe('56 . DELETE admin can delete review demeed inappropriate,when id not integer', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chadrack@gmail.com', password: 'safari1006' }).then((res) => {
      adminToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session id is not found ', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/q/review')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
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


describe('57 . DELETE admin can delete review demeed inappropriate,when id not found', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chadrack@gmail.com', password: 'safari1006' }).then((res) => {
      adminToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session id is not integer ', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/9/review')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('Review is not found!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('58 . DELETE admin can delete review demeed inappropriate successfully', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chadrack@gmail.com', password: 'safari1006' }).then((res) => {
      adminToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return deleted session  ', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/1/review')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
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

describe('59 . DELETE admin can delete review demeed inappropriate with invalid token', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      adminToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return deleted session  ', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/1/review')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.FORBIDDEN);
        expect(res.body.status).to.equal(status.FORBIDDEN);

        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe('56 . DELETE admin can delete review demeed inappropriate with invalid token', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      adminToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return deleted session  ', (done) => {
    chai.request(app)
      .delete('/api/v1/sessions/1/review')
      .set('x-auth-token', p)
      .set('Accept', 'application/json')
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
});
