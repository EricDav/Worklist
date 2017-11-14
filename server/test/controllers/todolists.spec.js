import supertest from 'supertest';
import 'mocha';
import 'chai';
import expect from 'expect';

import app from '../../app';

import todoList from '../../models/todoList';

const server = supertest.agent(app);
let regUserToken = 'bearer ';
let todoId;
let taskId;
let taskName;
const invalidId = 'IamInvalidTaskId';
const notFoundId = '59eaf52946198d2a65cd4400';

describe('Todolist API', () => {
  before((done) => {
    server
      .post('/api/v1/users')
      .send({
        userName: 'bayo',
        fullName: 'Ade Bayo',
        password: 'folami1234',
        email: 'house@gmail.com'
      })
      .end((err, res) => {
        regUserToken += res.body.token;
        server
          .post('/api/v1/users')
          .send({
            userName: 'bode',
            fullName: 'Ade Bayo',
            password: 'folami1234',
            email: 'house123@gmail.com'
          })
          .end((err, res) => {
            todoList.remove({}, (err) => {
              if (err) return done(err);
            });
            done();
          });
      });
  });
  describe('Create Todolist', () => {
    it('should create a new todolist', (done) => {
      server
        .post('/api/v1/todos')
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'postIt'
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          todoId = res.body.data._id;
          expect(res.status).toEqual(201);
          expect(res.body.success).toEqual(true);
          expect(res.body.data.name).toEqual('postIt');
          expect(res.body.data.collaborators[0]).toEqual('bayo');
          if (err) return done(err);
          done();
        });
    });
    it(`should not create todolist if todolist
    field does not contain letters`, (done) => {
        server
          .post('/api/v1/todos')
          .set('Connection', 'keep alive')
          .set('authorization', regUserToken)
          .set('Content-Type', 'application/json')
          .type('form')
          .send({
            name: '466736736'
          })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message)
              .toEqual('todo names must be in letters');
            if (err) return done(err);
            done();
          });
      });
    it('should not create todolist without a name', (done) => {
      server
        .post('/api/v1/todos')
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({})
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('name field is required');
          if (err) return done(err);
          done();
        });
    });

    it('should not create todolist with a name that already exist', (done) => {
      server
        .post('/api/v1/todos')
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ name: 'postIt' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('name already taken');
          if (err) return done(err);
          done();
        });
    });
    it('should be able to add a task to a todolist', (done) => {
      server
        .post(`/api/v1/todos/${todoId}/tasks`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'create login',
          priority: 'urgent',
          assignTo: 'bayo',
          reminder: new Date(2017, 11, 20),
          date: new Date(2017, 11, 25)
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          taskId = res.body.data.tasks[0]._id;
          taskName = res.body.data.tasks[0].taskName;
          expect(res.status).toEqual(200);
          expect(res.body.success).toEqual(true);
          expect(res.body.data.tasks[0].taskName)
            .toEqual('create login');
          if (err) return done(err);
          done();
        });
    });
    it('should reject request if task name is a character', (done) => {
      server
        .post(`/api/v1/todos/${todoId}/tasks`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'c',
          priority: 'urgent',
          assignTo: 'bayo',
          reminder: new Date(2017, 11, 20),
          date: new Date(2017, 11, 25)
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('a character can not be a name of a task');
          if (err) return done(err);
          done();
        });
    });
    it('should reject request if task name is not provided', (done) => {
      server
        .post(`/api/v1/todos/${todoId}/tasks`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ priority: 'urgent' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('Task name field is required');
          if (err) return done(err);
          done();
        });
    });
    it('should reject request if todoId is invalid', (done) => {
      server
        .post(`/api/v1/todos/${invalidId}/tasks`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'path',
          priority: 'normal',
          assignTo: 'bayo',
          reminder: new Date(2017, 11, 20),
          date: new Date(2017, 11, 25)
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('Invalid todoId');
          if (err) return done(err);
          done();
        });
    });
    it('should reject request for invalid priority level', (done) => {
      server
        .post(`/api/v1/todos/${todoId}/tasks`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'johndoe',
          priority: 'urg',
          assignTo: 'bayo',
          reminder: new Date(2017, 11, 20),
          date: new Date(2017, 11, 25)
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('invalid priority field');
          if (err) return done(err);
          done();
        });
    });
    it('should reject request if priority is not provided', (done) => {
      server
        .post(`/api/v1/todos/${todoId}/tasks`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'counter',
          assignTo: 'bayo',
          reminder: new Date(2017, 11, 20),
          date: new Date(2017, 11, 25)
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('priority field is required');
          if (err) return done(err);
          done();
        });
    });
    it('should reject request if task name has been taken', (done) => {
      server
        .post(`/api/v1/todos/${todoId}/tasks`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'create login',
          priority: 'urgent',
          assignTo: 'bayo',
          reminder: new Date(2017, 11, 20),
          date: new Date(2017, 11, 25)
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('task name already taken');
          if (err) return done(err);
          done();
        });
    });
    it('should reject request if todolist does not exist', (done) => {
      server
        .post(`/api/v1/todos/${notFoundId}/tasks`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'create signup page',
          priority: 'critical',
          assignTo: 'bayo',
          reminder: new Date(2017, 11, 20),
          date: new Date(2017, 11, 25)
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('todolist not found');
          if (err) return done(err);
          done();
        });
    });
    it('should be able to update a task in todolist', (done) => {
      server
        .patch(`/api/v1/todos/${todoId}/tasks/${taskId}`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ taskName })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.success).toEqual(true);
          expect(res.body.data.name)
            .toEqual('postIt');
          expect(res.body.data.tasks[0].done).toEqual(true);
          expect(res.body.data.tasks[0].taskName)
            .toEqual('create login');
          if (err) return done(err);
          done();
        });
    });
    it('should not update a task with an invalid taskId', (done) => {
      server
        .patch(`/api/v1/todos/${todoId}/tasks/${invalidId}`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({})
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('Invalid taskId');
          if (err) return done(err);
          done();
        });
    });
    it('should not update task if todolist does not exist', (done) => {
      server
        .patch(`/api/v1/todos/${notFoundId}/tasks/${taskId}`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ taskName: 'create signup', priority: 'normal' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('todolist not found');
          if (err) return done(err);
          done();
        });
    });
    it('should not update a task with an invalid todoId', (done) => {
      server
        .patch(`/api/v1/todos/${invalidId}/tasks/${taskId}`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({})
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.success).toEqual(false);
          expect(res.body.error.message)
            .toEqual('Invalid todoId');
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Collaborator in Todolist', () => {
    it('should add a collaborator ta a todolist successfully', (done) => {
      server
        .post(`/api/v1/todos/${todoId}/contributors`)
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          username: 'bode'
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.success).toEqual(true);
          expect(res.body.data.collaborators[1]).toEqual('bode');
          if (err) return done(err);
          done();
        });
    });
    it(
      'should throw error if username of contributor is not provided',
      (done) => {
        server
          .post(`/api/v1/todos/${todoId}/contributors`)
          .set('Connection', 'keep alive')
          .set('authorization', regUserToken)
          .set('Content-Type', 'application/json')
          .type('form')
          .send({})
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message)
              .toEqual('username of contributor is required');
            if (err) return done(err);
            done();
          });
      }
    );
    it(
      'should throw error if username provided is already a contributor',
      (done) => {
        server
          .post(`/api/v1/todos/${todoId}/contributors`)
          .set('Connection', 'keep alive')
          .set('authorization', regUserToken)
          .set('Content-Type', 'application/json')
          .type('form')
          .send({ username: 'bode' })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(409);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message)
              .toEqual('user already a contributor');
            if (err) return done(err);
            done();
          });
      }
    );
    it(
      'should throw error if username provided is not a registered user',
      (done) => {
        server
          .post(`/api/v1/todos/${todoId}/contributors`)
          .set('Connection', 'keep alive')
          .set('authorization', regUserToken)
          .set('Content-Type', 'application/json')
          .type('form')
          .send({ username: 'notaregistereduser' })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message)
              .toEqual('User not found');
            if (err) return done(err);
            done();
          });
      }
    );
    it(
      'should throw error if todoId is invalid',
      (done) => {
        server
          .post(`/api/v1/todos/${invalidId}/contributors`)
          .set('Connection', 'keep alive')
          .set('authorization', regUserToken)
          .set('Content-Type', 'application/json')
          .type('form')
          .send({ username: 'notaregistereduser' })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message)
              .toEqual('Invalid todoId');
            if (err) return done(err);
            done();
          });
      }
    );
    it(
      'should throw error if todolist does not exist',
      (done) => {
        server
          .post(`/api/v1/todos/${notFoundId}/contributors`)
          .set('Connection', 'keep alive')
          .set('authorization', regUserToken)
          .set('Content-Type', 'application/json')
          .type('form')
          .send({ username: 'notaregistereduser' })
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            expect(res.body.success).toEqual(false);
            expect(res.body.error.message)
              .toEqual('todolist not found');
            if (err) return done(err);
            done();
          });
      }
    );
  });
  describe('GET Todolist', () => {
    it('should retrieve all the todolist of a user successfully', (done) => {
      server
        .get('/api/v1/todos')
        .set('Connection', 'keep alive')
        .set('authorization', regUserToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          username: 'bode'
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.success).toEqual(true);
          expect(res.body.data.length).toEqual(1);
          expect(res.body.data[0].name).toEqual('postIt');
          expect(res.body.data[0].collaborators.length).toEqual(2);
          if (err) return done(err);
          done();
        });
    });
  });
});
