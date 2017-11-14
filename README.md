# Worklist

[![Coverage Status](https://coveralls.io/repos/github/EricDav/Worklist/badge.svg?branch=chore%2Fimplement-feedback)](https://coveralls.io/github/EricDav/Worklist?branch=chore%2Fimplement-feedback)[![Build Status](https://travis-ci.org/EricDav/Worklist.svg?branch=chore%2Fimplement-feedback)](https://travis-ci.org/EricDav/Worklist)[![Maintainability](https://api.codeclimate.com/v1/badges/fc5d58e5f6e804ca1d62/maintainability)](https://codeclimate.com/github/EricDav/Worklist/maintainability)

## Introduction
* https://worklist1.herokuapp.com/
*  **`Worklist`** is a simple todo list application that allows users to create lists of tasks to be completed and track their progress on these tasks.

###### Worklist Application
*   Create an account from Apllication
*   Create an account with Google+ 
*   Login with your credentials
*   Login with Google+
*   Create a todolist
*   Create task for todolist
*   Add users as collaborators to a todolist
*   Search for other users in the application
*   Set reminders for each task
*   View collaborators
*   Edit user profiles
*   Upload profile picture
*   Get reminders through email for uncompleted task
*   Reset password
*   Delete Task in todolist - Upcoming
*   Delete todolist - Upcoming
*   Update task in todolist - Upcoming
*   Logout

## Technologies Used
- **[JavaScript ES6](http://es6-features.org/)** - Codes were written in javascript to enhance HTML pages.
- **[ReactJS](https://facebook.github.io/react/)** - React is an open-source JavaScript library for building user interfaces.
- **[NodeJS](https://nodejs.org/)** - Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
- **[ExpressJS](https://expressjs.com/)** - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. I used this framework for routing.
- **[Mongodb](https://www.postgresql.org/)** - MongoDB is an open source database that uses a document-oriented data model.
- **[Mongoose ](http://docs.sequelizejs.com/)** - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using SSH;

    > git clone git@github.com:EricDav/Worklist.git

  *  Using HTTP;

    >`https://github.com/EricDav/Worklist.git`

*  Navigate to the repo's folder on your computer
  *  `cd Worklist`
*  Install the app's dependencies. For best results, using a node package manager.
  *  `npm install`

    >In order to use app dependencies, you need to install it through **npm**. You also need to have **node** installed on your system.
* Run server test
  *  `npm run server:test`
* Run client test
  *  `npm run client:test`
* Run end to end test
  *  `nightwatch`
* Run the app
  *  `npm start`

#### Limitations:
The limitations to the **Worklist Application** are as follows:
* Users can not get real time messages
* Users cannot delete their messages

### How to Contribute
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feat/featureId/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request describing the feature(s) you have added
6. Include a `feature.md` readme file with a detailed description of the feature(s) you have added, along with clear instructions of how to use the features(s) you have added. This readme file will be reviewed and included in the original readme if feature is approved.

Ensure your codes follow the [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)
The API documentation can be viewed at(https://worklist.docs.apiary.io)
