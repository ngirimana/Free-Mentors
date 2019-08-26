import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import status from '../helpers/StatusCode';
import users from '../models/users';

const { expect } = chai;
chai.use(chaiHttp);
// let us take faked data

const { email } = users[0];
const adminToken = jwt.sign({ id: 1, is_admin: true, is_mentor: false }, 'secretKey');
const mentorToken = jwt.sign({ id: 1, is_admin: false, is_mentor: true }, 'secretKey');
const menteeToken = jwt.sign({ id: 1, is_admin: false, is_mentor: false }, 'secretKey');
const invalidToken = jwt.sign({ id: 0, is_admin: false, is_mentor: false }, 'secretKey');
// signup tests
// 0 incorrect route
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
// 8 successfully signup
describe('8. POST sign up successfully, api/v1/auth/signup', () => {
  it('should return signup successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.RESOURCE_CREATED);
        expect(res.body.status).to.equal(status.RESOURCE_CREATED);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.message).to.equal('User created successfully');
        done();
      });
  });
});
// 9 test for taken email
describe('9. POST email already taken,api/v1/auth/signup', () => {
  it('should return {email} is alredy taken', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.REQUEST_CONFLICT);
        expect(res.body.error).to.equal(`${email} is already taken`);
        done();
      });
  });
});
// 10 test for short password
describe('10. POST sign up with short password api/v1/auth/signup', () => {
  it('should return error when user entered short password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
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
// 11 test for incomplete data
describe('11. POST sign up with incomplete data api/v1/auth/signup', () => {
  it('should return error when user signup details is incomplete', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
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
// 12  Test for invalid email
describe('12. POST sign up with wrong email api/v1/auth/signup', () => {
  it('should return error when user email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
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
// 13 test of successfully login
describe('13. POST signin successfully,api/v1/auth/signin', () => {
  it('should return User is successfully logged in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.id).to.be.a('number');
        done();
      });
  });
});
// 14 test of wrong password
describe('14. POST signin with wrong password,api/v1/auth/signin', () => {
  it('should return email or password is incorrect ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.error).to.equal('email or password is incorrect');
        done();
      });
  });
});
// 15 test for empty email
describe('15. POST signin with empty email, api/v1/auth/signin', () => {
  it('should return email is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
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
// 16 test for empty password
describe('16. POST signin with empty passwordd, api/v1/auth/signin', () => {
  it('should return password is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
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
// 17 test for wrong email
describe('17. POST signin with wrong email, api/v1/auth/signin', () => {
  it('should return email must be valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
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
// 18 test    get all mentor when no mentor user
describe('18 GET all Mentor when there is  no mentor user,/api/v1/mentors ', () => {
  it('should return all mentors', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .set('x-auth-token', adminToken)
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('Mentors re not available');
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
});

// 19 when id is not integer
describe('19. change to mentor with an id not integer', () => {
  it('should return Mentor id should be an integer ', (done) => {
    chai.request(app)
      .patch('/api/v1/user/q')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('Mentor id should be an integer');
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

// 20 when id is not not found

describe('20. change to mentor with an id not not found', () => {
  it('should return  User not found ', (done) => {
    chai.request(app)
      .patch('/api/v1/user/90000')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('User is not found!');
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
});

// 21 change user to mentor
describe('21 PATCH admin can change user to mentor,api/v1/auth/user/:id', () => {
  it('should return User account changed to mentor', (done) => {
    chai.request(app)
      .patch('/api/v1/user/2')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.REQUEST_SUCCEEDED);
        expect(res.body.status).to.equal(status.REQUEST_SUCCEEDED);
        done();
      });
  });
});
// 25. check if user is  already a mentor
describe('25. change to user to mentor to already a mentor', () => {
  it('should return  User is already a mentor!', (done) => {
    chai.request(app)
      .patch('/api/v1/user/2')
      .set('x-auth-token', adminToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_CONFLICT);
        expect(res.body.error).to.equal('User is already a mentor!');
        expect(res.status).to.equal(status.REQUEST_CONFLICT);
        done();
      });
  });
});

// 22 test for admin can   get all mentor
describe('22. admin: GET all Mentor,/api/v1/mentors ', () => {
  it('should return all mentors', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
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

// 23 test for mentor can   get all mentor

describe('23. mentor:GET all Mentor,/api/v1/mentors ', () => {
  it('should return all mentors', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
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

// 24 test for mentee can   get all mentor

describe('24. mentee: GET all Mentor,/api/v1/mentors ', () => {
  it('should return all mentors', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEEDED);
        expect(res.status).to.equal(status.REQUEST_SUCCEEDED);
        done();
      });
  });
});

// 26 test    get all mentor with invalid token
describe('26 GET all Mentor with invlaid token,/api/v1/mentors ', () => {
  it('should return The User associated with this token doesn\'t exist.', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'aplication/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('The User associated with this token doesn\'t exist.');
        expect(res.status).to.equal(status.NOT_FOUND);
        done();
      });
  });
});
