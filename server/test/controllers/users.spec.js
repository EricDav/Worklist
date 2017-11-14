import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import jwt from 'jsonwebtoken';
import expect from 'expect';

import app from '../../app';
import user from '../../models/User';

const server = supertest.agent(app);
let regUser = 'bearer ';
let secretCode;

before((done) => {
  user.remove({}, (err) => {
    if (err) return done(err);
  });
  done();
});
describe('User API', () => {
  describe('Create User', () => {
    it('should create new user', (done) => {
      server
        .post('/api/v1/users')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          fullName: 'Alienyi David',
          userName: 'Pychat2',
          email: 'dad2@we.com',
          password: 'david1996'
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          const currentUser = jwt.decode(res.body.token);
          regUser += res.body.token;
          res.status.should.equal(201);
          res.body.success.should.equal(true);
          expect(currentUser.currentUser.email).toEqual('dad2@we.com');
          expect(currentUser.currentUser.userName).toEqual('pychat2');
          expect(currentUser.currentUser.fullName).toEqual('Alienyi David');
          if (err) return done(err);
          done();
        });
    });

    it('should not create user with the same email', (done) => {
      server
        .post('/api/v1/users')
        .expect('Content-Type', /json/)
        .send({
          fullName: 'Alienyi David',
          userName: 'Pyman',
          email: 'dad2@we.com',
          password: 'david1996'
        })
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message).toEqual('email has been taken');
          if (err) return done(err);
          done();
        });
    });
    it('should not create user with the same username', (done) => {
      server
        .post('/api/v1/users')
        .expect('Content-Type', /json/)
        .send({
          fullName: 'Alienyi David',
          userName: 'pychat2',
          email: 'dad2345@we.com',
          password: 'david1996'
        })
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message).toEqual('username has been taken');
          if (err) return done(err);
          done();
        });
    });

    it(
      'should rejects request if fullname field does not contain letters',
      (done) => {
        server.post('/api/v1/users')
          .send({
            fullName: '122334',
            password: 'password123',
            userName: 'mrincredible',
            email: 'me@you.com'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(res.body.success).toEqual(false);
            done(err);
          });
      }
    );
    it(
      'rejects request if username field does not contain letters',
      (done) => {
        server.post('/api/v1/users')
          .send({
            userName: '12234554',
            password: 'password123',
            fullName: 'Frank Edward',
            email: 'me@you.com'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.success).toEqual(false);
            done(err);
          });
      }
    );
    it(
      'rejects request if email address is not valid',
      (done) => {
        server.post('/api/v1/users')
          .send({
            email: '1272823376487',
            fullName: 'mayor',
            password: 'password123',
            userName: 'mrincredible'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message)
              .toEqual('Invalid email address');
            done(err);
          });
      }
    );
    it(
      'rejects request if password length is less than 8',
      (done) => {
        server.post('/api/v1/users')
          .send({
            password: 'pass',
            fullName: 'mayor',
            userName: 'mrincredible',
            email: 'me@you.com'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message)
              .toEqual(`Weak password. Password should contain
        at least 8 characters including at least one number and alphabet`);
            done(err);
          });
      }
    );

    it('should not create new user without an email', (done) => {
      server
        .post('/api/v1/users')
        .send({
          userName: 'jonathan',
          password: 'password123',
          fullName: 'mrincredible'
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('email field is required');
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Existing users', () => {
    describe('Login /users/signin', () => {
      it('should allow a user to login', (done) => {
        server
          .post('/api/v1/users/signin')
          .send({
            userName: 'pychat2',
            password: 'david1996'
          })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(res.body.success).toEqual(true);
            expect(jwt.decode(res.body.token).currentUser.userName)
              .toEqual('pychat2');
            done();
          });
      });

      it('should not allow unregistered users to login', (done) => {
        server.post('/api/v1/users/signin')
          .send({
            userName: 'I am not registered',
            password: 'Iamnot'
          })
          .end((err, res) => {
            expect(res.status).toEqual(401);
            expect(res.body.error.message)
              .toEqual('Invalid username or password');
            done();
          });
      });

      it('should not allow login with invalid password', (done) => {
        server.post('/api/v1/users/signin')
          .send({ userName: 'Pychat2', password: 'invalid' })
          .end((err, res) => {
            expect(res.status).toEqual(401);
            expect(res.body.error.message)
              .toEqual('Invalid username or password');
            done();
          });
      });

      it(
        'should not allow login when username or password is not provided',
        (done) => {
          server.post('/api/v1/users/signin')
            .send({ })
            .end((err, res) => {
              expect(res.status).toEqual(400);
              expect(res.body.error.message)
                .toEqual('username or email can not be null or empty');
              done();
            });
        }
      );
      it(
        'should not all user to signin with google with an invalid email',
        (done) => {
          server
            .post('/api/v1/users/google-signin')
            .send({
              email: 'ade@.c'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.status).toEqual(400);
              expect(res.body.success).toEqual(false);
              expect(res.body.error.message)
                .toEqual('Invalid email');
              if (err) return done(err);
              done();
            });
        }
      );
      it(`should return new user when a
    google user wants to signin with google for the first time`, (done) => {
          server
            .post('/api/v1/users/google-signin')
            .send({
              email: 'ade@me.com'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
              expect(res.status).toEqual(200);
              expect(res.body.success).toEqual(true);
              expect(res.body.data)
                .toEqual('New user');
              if (err) return done(err);
              done();
            });
        });
      it('should allow a user to sign in with google', (done) => {
        server
          .post('/api/v1/users/google-signin')
          .send({
            email: 'dad2@we.com'
          })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(res.body.success).toEqual(true);
            expect(jwt.decode(res.body.token).currentUser
              .email)
              .toEqual('dad2@we.com');
            if (err) return done(err);
            done();
          });
      });
    });
  });
  describe('Update users', () => {
    describe('Put /api/v1/users', () => {
      it('should update user fullName successfully', (done) => {
        server
          .put('/api/v1/users')
          .set('authorization', regUser)
          .send({
            fullName: 'Updated Name',
          })
          .end((err, res) => {
            const updatedUser = jwt.decode(res.body.token);
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            expect(updatedUser.currentUser.fullName)
              .toEqual('Updated Name');
            done();
          });
      });

      it('should update user email successfully', (done) => {
        server
          .put('/api/v1/users')
          .set('authorization', regUser)
          .send({
            email: 'updatedemail@me.com',
          })
          .end((err, res) => {
            const updatedUser = jwt.decode(res.body.token);
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            expect(updatedUser.currentUser.email)
              .toEqual('updatedemail@me.com');
            done();
          });
      });
      it('should throw error if email to be updated is invalid', (done) => {
        server
          .put('/api/v1/users')
          .set('authorization', regUser)
          .send({
            email: 'updatedemail.com',
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message).toEqual('Invalid email');
            done();
          });
      });
      it('should throw error if email to be updated has been taken', (done) => {
        server
          .put('/api/v1/users')
          .set('authorization', regUser)
          .send({
            email: 'updatedemail@me.com',
          })
          .end((err, res) => {
            expect(res.status).toEqual(409);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message).toEqual('email already exist');
            done();
          });
      });
      it('should throw error if fullName to be updated is invalid', (done) => {
        server
          .put('/api/v1/users')
          .set('authorization', regUser)
          .send({
            fullName: '56574647',
          })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message).toEqual('Invalid fullName');
            done();
          });
      });
    });
  });
  describe('Get User', () => {
    it(
      'should retrieve users that matches a query parameter successfully',
      (done) => {
        server
          .get('/api/v1/users?searchParam=a')
          .set('Connection', 'keep alive')
          .set('authorization', regUser)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.body.success.should.equal(true);
            expect(res.status).toEqual(200);
            expect(res.body.data.length).toEqual(2);
            expect(res.body.data[1].userName).toEqual('pychat2');
            expect(res.body.data[0].userName).toEqual('bayo');
            expect(res.body.data[0].fullName).toEqual('Ade Bayo');
            expect(res.body.data[0].email).toEqual('house@gmail.com');
            if (err) return done(err);
            done();
          });
      }
    );
    it(
      'should throw error for invalid parameters',
      (done) => {
        server
          .get('/api/v1/users?searchParam=%#')
          .set('Connection', 'keep alive')
          .set('authorization', regUser)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.status).toEqual(400);
            res.body.success.should.equal(false);
            expect(res.body.error.message).toEqual('Invalid query parameter');
            if (err) return done(err);
            done();
          });
      }
    );
  });
  describe('Forget Paswword', () => {
    it(
      'should not send secret code for invalid email',
      (done) => {
        server
          .post('/api/v1/users/send-secret-code')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .send({ email: 'alienyidmail.com' })
          .end((err, res) => {
            res.body.success.should.equal(false);
            expect(res.status).toEqual(400);
            expect(res.body.error.message)
              .toEqual('Invalid email');
            if (err) return done(err);
            done();
          });
      }
    );
    it(
      'should not reset user password if password is not provided',
      (done) => {
        server
          .patch('/api/v1/users/reset-password')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .send({
            hash: secretCode
          })
          .end((err, res) => {
            res.body.success.should.equal(false);
            expect(res.status).toEqual(400);
            expect(res.body.error.message)
              .toEqual('Invalid password');
            if (err) return done(err);
            done();
          });
      }
    );
    it(
      'should not reset user password if password is not up to 8 characters',
      (done) => {
        server
          .patch('/api/v1/users/reset-password')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .send({
            password: 'thyu',
            hash: secretCode
          })
          .end((err, res) => {
            res.body.success.should.equal(false);
            expect(res.status).toEqual(400);
            expect(res.body.error.message)
              .toEqual(`password should be up to
      8 characters including alphabet and number`);
            if (err) return done(err);
            done();
          });
      }
    );
    it(
      'should throw error if secret code is invalid',
      (done) => {
        server
          .patch('/api/v1/users/reset-password')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .send({
            password: 'david1963',
            email: 'dad2@we.com',
            hash: 'Iaminvalid'
          })
          .end((err, res) => {
            res.body.success.should.equal(false);
            expect(res.status).toEqual(400);
            expect(res.body.error.message)
              .toEqual('Invalid code');
            if (err) return done(err);
            done();
          });
      }
    );
  });
});
