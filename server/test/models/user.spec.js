import expect from 'expect';

import userLists from '../../models/userLists';

let userId;

describe('User Model', () => {
  it('should be able to save a user', (done) => {
    const newUser = userLists({
      userName: 'Python',
      password: 'david1996',
      fullName: 'Mark David',
      email: 'dav@me.com',
    });
    newUser.save((err, savedUser) => {
      userId = savedUser._id;
      expect(savedUser.fullName).toEqual('Mark David');
      expect(savedUser.userName).toEqual('Python');
      expect(savedUser.email).toEqual('dav@me.com');
      if (err) return done(err);
      done();
    });
  });
  it('should be able to find saved users', (done) => {
    userLists.findById(userId, (err, savedUser) => {
      expect(savedUser.fullName).toEqual('Mark David');
      expect(savedUser.userName).toEqual('Python');
      expect(savedUser.email).toEqual('dav@me.com');
      if (err) return done(err);
      done();
    });
  });
  it('should not save user without a userName', (done) => {
    const newUser = userLists({
      password: 'david1996',
      fullName: 'Mark David',
      email: 'dav123@me.com',
    });
    newUser.save((err, savedUser) => {
      expect(err.errors.userName.name).toEqual('ValidatorError');
      expect(err.errors.userName.message)
        .toEqual('Path `userName` is required.');
      done();
    });
  });
  it('should not save user with an email that has been taken', (done) => {
    const newUser = userLists({
      userName: 'Fola',
      password: 'david1996',
      fullName: 'Mark David',
      email: 'dav@me.com',
    });
    newUser.save(() => {
      userLists.findOne({ userName: 'Fola' }, (err, user) => {
        expect(user).toEqual(null);
      });
      done();
    });
  });
  it('should set default imageUrl', (done) => {
    const newUser = userLists({
      userName: 'Fola',
      password: 'david1996',
      fullName: 'Mark David',
      email: 'dav@me.com',
    });
    newUser.save((err, savedUser) => {
      userLists.findById(userId, (err, savedUser) => {
        expect(savedUser.imageUrl)
          .toEqual('http://res.cloudinary.com/dbczzmftw/image/upload/v1509127904/pojdk9ajmdgase3esgg2.png');
        if (err) return done(err);
        done();
      });
    });
  });
});
