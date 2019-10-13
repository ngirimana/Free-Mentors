import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import status from '../helpers/StatusCode';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
let adminToken;
const emptyToken = '';
let mentorToken;
const invalidToken = 'hbsdvjsd vsdbvjsdnvjds vsdbvjsjcnjsd';
const notExistToken = jwt.sign({
  id: 0, email: 'gbd@gmail.com', is_admin: false, is_mentor: false,
},
process.env.SECRETEKEY);
describe(' 3. Patch user to mentor,/api/v2/user/:id', () => {
  it('should return mentors are not available', (done) => {
    chai.request(app)
      .get('/api/v2/mentors')
      .set('x-auth-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('Mentors are not available');
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'safari@gmail.com',
      password: 'password123',
    }).then((res) => {
      adminToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });

  it('should return Id should be an integer ', (done) => {
    chai.request(app)
      .patch('/api/v2/user/q')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('User id should be an integer');
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
  it('should return  User not found ', (done) => {
    chai.request(app)
      .patch('/api/v2/user/90000')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('The user with  id is not found!.');
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
  it('should return non-exist user token ', (done) => {
    chai.request(app)
      .patch('/api/v2/user/q')
      .set('x-auth-token', notExistToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.status).to.equal(status.UNAUTHORIZED);
        done();
      });
  });
  it('should return server error ', (done) => {
    chai.request(app)
      .patch('/api/v2/user/q')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.SERVER_ERROR);
        expect(res.status).to.equal(status.SERVER_ERROR);
        done();
      });
  });
  it('should return server error ', (done) => {
    chai.request(app)
      .patch('/api/v2/user/q')
      .set('x-auth-token', emptyToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
  it('should return User account changed to mentor', (done) => {
    chai.request(app)
      .patch('/api/v2/user/2')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.REQUEST_SUCCEEDED);
        expect(res.body.status).to.equal(status.REQUEST_SUCCEEDED);
        done();
      });
  });
  it('should return  User is already a mentor!', (done) => {
    chai.request(app)
      .patch('/api/v2/user/2')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_CONFLICT);
        expect(res.body.error).to.equal('The user with this id is already a mentor!.');
        expect(res.status).to.equal(status.REQUEST_CONFLICT);
        done();
      });
  });
});
describe('4. admin: GET all Mentor,/api/v1/mentors ', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'safari@gmail.com',
      password: 'password123',
    }).then((res) => {
      adminToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });

  it('should return all mentors', (done) => {
    chai.request(app)
      .get('/api/v2/mentors')
      .set('x-auth-token', adminToken)
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEEDED);
        expect(res.status).to.equal(status.REQUEST_SUCCEEDED);
        done();
      });
  });
});
describe('5. mentor:GET specific mentor,/api/v2/mentors/:id ', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'niyo@gmail.com',
      password: 'amani444444',
    }).then((res) => {
      mentorToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return The User associated with this token doesn\'t exist.', (done) => {
    chai.request(app)
      .get('/api/v2/mentors/2')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
  it('should return not found', (done) => {
    chai.request(app)
      .get('/api/v2/mentors/90000')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
  it('should return  specific mentor', (done) => {
    chai.request(app)
      .get('/api/v2/mentors/2')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEEDED);
        expect(res.status).to.equal(status.REQUEST_SUCCEEDED);
        done();
      });
  });
});
