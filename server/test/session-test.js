import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import status from '../helpers/StatusCode';
import session from '../models/sessions';

const { expect } = chai;
chai.use(chaiHttp);
let menteeToken = jwt.sign({ id: 1, is_admin: false, is_mentor: false }, 'process.env.SECRETEKEY');
let mentorToken = jwt.sign({ id: 1, is_admin: false, is_mentor: true }, 'process.env.SECRETEKEY');
const p = 'hdfsdbvsdbvvv vdbbdbv jdsb vjvdhvbsjddbv';

describe('31 . POST sessions ,/api/v1/sessions', () => {
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
describe('32 . POST sessions with id not for mentor ,/api/v1/sessions', () => {
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
  it('should return error ', (done) => {
    chai.request(app)
      .post('/api/v1/sessions')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .send(session[4])
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
describe('34 . Get sessions for mentor when no session found', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return error ', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('Your sessions  are not found!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe('35 . Get sessions for mentee when no session found', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return error ', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('x-auth-token', menteeToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('Your sessions  are not found!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('36 . POST sessions successfully ,/api/v1/sessions', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return Such user is not mentor ', (done) => {
    console.log(session[3]);
    chai.request(app)
      .post('/api/v1/sessions')
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
});
describe('36 . POST sessions successfully ,/api/v1/sessions', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return Such user is not mentor ', (done) => {
    console.log(session[3]);
    chai.request(app)
      .post('/api/v1/sessions')
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
});
describe('37 . PATCH mentor can accept session', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session data ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/2/accept')
      .set('x-auth-token', mentorToken)
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
describe('38 . PATCH mentor can accept session ehen session is already accepted', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return already accepted ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/2/accept')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.FORBIDDEN);
        expect(res.body.status).to.equal(status.FORBIDDEN);
        expect(res.body.error).to.equal('This session is already accepted');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('39 . PATCH mentor can accept session ehen session is not found', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session id is not found ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/7/accept')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('This session  is not found!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('40 . PATCH mentor can accept session When session is not integer', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session id is not integer ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/q/accept')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('Id should be an integer');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('41 . PATCH mentor can reject session', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session data ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/3/reject')
      .set('x-auth-token', mentorToken)
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
describe('42 . PATCH mentor can reject session ehen session is already rejected', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return already rejected ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/3/reject')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.FORBIDDEN);
        expect(res.body.status).to.equal(status.FORBIDDEN);
        expect(res.body.error).to.equal('This session is already rejected');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('43 . PATCH mentor can reject session ehen session is already rejected', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return already rejected ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/3/accept')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.FORBIDDEN);
        expect(res.body.status).to.equal(status.FORBIDDEN);
        expect(res.body.error).to.equal('This session is already rejected');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('44 . PATCH mentor can reject session ehen session is already accepted', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return already accepted ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/2/reject')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.FORBIDDEN);
        expect(res.body.status).to.equal(status.FORBIDDEN);
        expect(res.body.error).to.equal('This session is already accepted');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('45 . PATCH mentor can reject session,with out prevellege ', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return already accepted ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1/reject')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.FORBIDDEN);
        expect(res.body.status).to.equal(status.FORBIDDEN);
        expect(res.body.error).to.equal('You are not authorized to perform this action.');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('46 . PATCH mentor can reject session,with invalid key ', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return already accepted ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/1/reject')
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
describe('47 . PATCH mentor can reject session ehen session is not found', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session id is not found ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/9/reject')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('this session  is not found!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('48 . PATCH mentor can reject session ehen session is not integer', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return session id is not integer ', (done) => {
    chai.request(app)
      .patch('/api/v1/sessions/q/reject')
      .set('x-auth-token', mentorToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('Id should be an integer');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('49 . Get sessions for mentor', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'chance@gmail.com', password: 'iradukunda' }).then((res) => {
      mentorToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return sessions for mentor ', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('x-auth-token', mentorToken)
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

describe('50 . Get sessions for mentee', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.token;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return sessions of mentee ', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('x-auth-token', menteeToken)
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


describe('51 . Get sessions for mentee with invalid t0ken', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/auth/signin').send({ email: 'safari@gmail.com', password: 'safari1006' }).then((res) => {
      menteeToken = res.body.data.id;
      // console.log(res.body.data.token);
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return invalid key ', (done) => {
    chai.request(app)
      .get('/api/v1/sessions')
      .set('x-auth-token', menteeToken)
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
