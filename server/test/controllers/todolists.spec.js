import supertest from 'supertest';
import 'mocha';
import 'chai';
import expect from 'expect';

import app from '../../app';

const server = supertest.agent(app);
let regUserToken = 'bearer ';
let todoId;
let taskId;
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
        done();
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
        .send({ taskName: 'create login', priority: 'urgent' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          taskId = res.body.data.tasks[0]._id;
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
        .send({ taskName: 'c', priority: 'urgent' })
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
        .send({priority: 'urgent' })
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
        .send({priority: 'urgent', taskName: 'path'})
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
        .send({taskName: 'jondo', priority: 'urge' })
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
        .send({taskName: 'jondon'})
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
        .send({taskName: 'create login', priority: 'normal'})
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
        .send({taskName: 'create login', priority: 'normal'})
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
        .send({})
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.success).toEqual(true);
          expect(res.body.data.name)
            .toEqual('postIt');
          expect(res.body.data.tasks[0].done).toEqual(true)
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
        .send({taskName: 'create signup', priority: 'normal'})
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
});
