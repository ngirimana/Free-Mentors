import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import status from '../helpers/StatusCode';
import users from '../models/users';

const { expect } = chai;
chai.use(chaiHttp);

const adminToken = jwt.sign({ id: 1, is_admin: true, is_mentor: false }, 'process.env.SECRETEKEY');
const mentorToken = jwt.sign({ id: 1, is_admin: false, is_mentor: true }, 'process.env.SECRETEKEY');
const menteeToken = jwt.sign({ id: 1, is_admin: false, is_mentor: false }, 'process.env.SECRETEKEY');
const invalidToken = jwt.sign({ id: 0, is_admin: false, is_mentor: false }, 'process.env.SECRETEKEY');

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
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/signup')
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

describe('POST sign up successfully, api/v2/auth/signup', () => {
  it('should return signup successful', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.RESOURCE_CREATED);
        expect(res.body.status).to.equal(status.RESOURCE_CREATED);
        done();
      });
  });
});
describe('POST email already exist, api/v2/auth/signup', () => {
  it('should return {email} already exists', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(status.REQUEST_CONFLICT);
        done();
      });
  });
});
describe('POST sign up with short password api/v2/auth/signup', () => {
  it('should return error when user entered short password', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"password" length must be at least 10 characters long');
        done();
      });
  });
});
describe('POST sign up with incomplete data api/v2/auth/signup', () => {
  it('should return error when user signup details is incomplete', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"first_name" is required');
        done();
      });
  });
});
describe('POST sign up with invalid email api/v2/auth/signup', () => {
  it('should return error when user email is invalid', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"email" must be a valid email');
        done();
      });
  });
});
describe('POST signin successfully, api/v2/auth/signin', () => {
  it('should return signin successfullty status', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});
describe('POST signin failed, api/v2/auth/signin', () => {
  it('should return signin error status', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.error).to.equal('Invalid Email or Password');
        done();
      });
  });
});
describe('POST signin with incomplete data, api/v2/auth/signin', () => {
  it('should return email is required', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"email" is required');
        done();
      });
  });
});
describe('POST signin with incomplete data, api/v2/auth/signin', () => {
  it('should return password is required', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[8])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"password" is required');
        done();
      });
  });
});
describe('POST signin with invalid email, api/v2/auth/signin', () => {
  it('should return email must be valid', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('"email" must be a valid email');
        done();
      });
  });
});
describe('18 GET all Mentor when there is  no mentor user,/api/v1/mentors ', () => {
  it('should return mentors are not available', (done) => {
    chai.request(app)
      .get('/api/v2/mentors')
      .set('x-auth-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('No mentors available');
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
});
// 19 when id is not integer
describe('19. change to mentor with an id not integer', () => {
  it('should return Id should be an integer ', (done) => {
    chai.request(app)
      .patch('/api/v2/user/q')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('Id should be an integer');
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
