import expect from 'expect';

import todoLists from '../../models/todoLists';

let todoId;
const task = {
  taskName: 'reminder',
  dueDate: new Date(2017, 11, 20),
  assignTo: 'fatai',
  priority: 'normal'
};

describe('Todolist Model', () => {
  it('should be able to save a todolist', (done) => {
    const newTodolist = todoLists({
      name: 'postit',
      internalName: 'POSTIT',
      creatorId: '59eaf52946198d2a65cd4400'
    });
    newTodolist.save((err, savedTodolist) => {
      todoId = savedTodolist._id;
      expect(savedTodolist.name).toEqual('postit');
      expect(savedTodolist.internalName).toEqual('POSTIT');
      expect(savedTodolist.creatorId).toEqual('59eaf52946198d2a65cd4400');
      if (err) return done(err);
      done();
    });
  });
  it('should be able to find saved todolist', (done) => {
    todoLists.findById(todoId, (err, savedTodolist) => {
      expect(savedTodolist.name).toEqual('postit');
      expect(savedTodolist.internalName).toEqual('POSTIT');
      expect(savedTodolist.creatorId).toEqual('59eaf52946198d2a65cd4400');
      if (err) return done(err);
      done();
    });
  });
  it('should not save a todolist without a name', (done) => {
    const newTodolist = todoLists({
      internalName: 'POSTIT',
      creatorId: '59eaf52946198d2a65cd4400'
    });
    newTodolist.save((err) => {
      expect(err.errors.name.name).toEqual('ValidatorError');
      expect(err.errors.name.message)
        .toEqual('Path `name` is required.');
      done();
    });
  });
  it('should set default fields', (done) => {
    todoLists.findById(todoId, (err, todolist) => {
      expect(todolist.tasks.length).toEqual(0);
      expect(todolist.collaborators.length).toEqual(0);
      if (err) return done(err);
      done();
    });
  });
  it('should be able to add a task to a todolist', (done) => {
    todoLists.findById(todoId, (err, todolist) => {
      todolist.tasks.push(task);
      todolist.save((err, updatedTodolist) => {
        expect(updatedTodolist.tasks.length).toEqual(1);
        expect(updatedTodolist.tasks[0].taskName).toEqual('reminder');
        expect(updatedTodolist.tasks[0].dueDate)
          .toEqual(new Date(2017, 11, 20));
      });
      if (err) return done(err);
      done();
    });
  });
  it('should set default fields for task added to todolist', (done) => {
    todoLists.findById(todoId, (err, todolist) => {
      expect(todolist.tasks[0].done).toEqual(false);
      if (err) return done(err);
      done();
    });
  });
});
