import chai from 'chai';
import expect from 'expect';

import reminder from '../../models/reminder';

let todoId;

describe('Reimder Model', () => {
  it('should be able to save a reminder', (done) => {
    const newReminder = reminder({
      todoId: '59eaf52946198d2a65cd4400',
      todoName: 'worklist',
      taskName: 'reminder',
      dueDate: new Date(2017, 11, 21),
      message: 'This is to remind you',
      ownerId: '46534rwgeeywhr',
      name: 'Mark David',
      email: 'dav@me.com',
      time: new Date(2017, 11, 20)
    });
    newReminder.save((err, savedReminder) => {
      todoId = savedReminder._id;
      expect(savedReminder.name).toEqual('Mark David');
      expect(savedReminder.taskName).toEqual('reminder');
      expect(savedReminder.email).toEqual('dav@me.com');
      expect(savedReminder.todoName).toEqual('worklist');
      if (err) return done(err);
      done();
    });
  });
  it('should be able to find saved reminders', (done) => {
    reminder.findOne(todoId, (err, savedReminder) => {
      expect(savedReminder.name).toEqual('Mark David');
      expect(savedReminder.taskName).toEqual('reminder');
      expect(savedReminder.email).toEqual('dav@me.com');
      expect(savedReminder.todoName).toEqual('worklist');
      if (err) return done(err);
      done();
    });
  });
  it('should not saved a reminder without a name', (done) => {
    const newReminder = reminder({
      todoId,
      todoName: 'worklist',
      taskName: 'reminder',
      email: 'dav@me.com',
      time: new Date(2017, 11, 20)
    });
    newReminder.save((err, savedReminder) => {
      expect(err.errors.name.name).toEqual('ValidatorError');
      expect(err.errors.name.message).toEqual('Path `name` is required.');
      done();
    });
  });
});
