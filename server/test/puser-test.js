import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import status from '../helpers/StatusCode';
import users from '../models/users';

const { expect } = chai;
chai.use(chaiHttp);

describe('0. incorrect route', () => {
  it('should return incorrect route ', (done) => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
});

// signup of user
// 1 emppty fi rstname
describe('1 . POST signup with empty first_name ,api/v1/auth/signup', () => {
  it('should return first_name is required ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[10])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
// 2 empyty lastname
describe('2. POST sign up with empty last_name, api/v1/auth/signup', () => {
  it('should return last_name is required ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[11])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
// 3 empyty password
describe('3. POST sign up with empty password, api/v1/auth/signup', () => {
  it('should return password is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[12])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
// 4 empyty address
describe('4. POST sign up with empty address, api/v1/auth/signup', () => {
  it('should return address is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[13])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
// 5 empty bio
describe('5. POST sign up with empty bio, api/v1/auth/signup', () => {
  it('should return bio is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[14])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
// 6 empty occupation
describe('6. POST sign up with empty occupation, api/v1/auth/signup', () => {
  it('should return occupation is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[15])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
// 7 empty expertise
describe('7. POST sign up with empty expertise, api/v1/auth/signup', () => {
  it('should return expertise is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[16])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
