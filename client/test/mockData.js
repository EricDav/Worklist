const mockData = {
  user: {
    props: {
      handleOnclick: jest.fn(),
      fullName: 'Alienyi David',
      userName: 'Pythagoras',
      collaborators: ['Pythagoras']
    }
  },
  uploadImageModal: {
    props: {
      imageUrl: 'david.jpg',
      updateProfilePicture: jest.fn(),
      isApiCallInProgress: false
    }
  },
  updateUserProfile: {
    props: {
      updateUserProfile: jest.fn(),
      imageUrl: 'david.jpg',
      isApiCallInProgress: false,
      fullName: 'Alienyi David',
      username: 'Pythagoras',
      email: 'dad@we.com',
      errorMessage: 'Invalid email',
      rightSideNav: jest.fn()
    }
  },
  todolist: {
    props: {
      rightSideNav: jest.fn(),
      name: 'postIt',
      todolists: [],
      setCurrentTodolist: jest.fn(),
    }
  },
  taskboard: {
    props: {
      todolist: {
        name: 'worklist',
        collaborators: ['python']
      },
      tasks: jest.fn(),
      handleOnclick: jest.fn(),
      rightSideNav: jest.fn(),
      styles: 'col s12 l6',
      width: '46px',
      currentUser: {},
      currentUserId: 'tyuer567'
    }
  },
  task: {
    props: {
      status: 'delayed',
      taskId: 'dgfhgsh64',
      showComplete: true,
      handleOnclick: jest.fn(),
      colorCode: 'green',
      name: 'login',
      buttonClass: 'col s12 l6',
      users: jest.fn(),
      assignTo: 'tayo'
    }
  },
  search: {
    props: {
      handleOnchange: jest.fn()
    }
  },
  rightSideNav: {
    props: {
      users: jest.fn(),
      collaborators: jest.fn(),
      handleOnclick: jest.fn(),
      handleOnchange: jest.fn(),
      rightSideNav: 3
    }
  },
  priority: {
    props: {
      handleOnchange: jest.fn(),
    }
  },
  intro: {
    props: {
      styles: 'col s12 l6',
      width: '4px',
      currentUser: 'David'
    }
  },
  dashboardSidebar: {
    props: {
      fullName: 'Alienyi David',
      imageUrl: 'david.png',
      todolists: jest.fn(),
      handleOnclick: jest.fn()
    }
  },
  collaborator: {
    props: {
      userName: 'Pythagoras'
    }
  },
  signup: {
    props: {
      userSignupRequest: jest.fn(),
      errorMessage: 'Invalid userName',
      isApiCallInProgress: false,
      homePageFormNumber: jest.fn()
    }
  },
  login: {
    props: {
      userSigninRequest: jest.fn(),
      errorMessage: 'Invalid userName',
      isApiCallInProgress: false,
      homePageFormNumber: jest.fn(),
      googleSignin: jest.fn()
    }
  },
  googleSignupForm: {
    props: {
      googleUser: {
        fullName: 'Alienyi David',
        email: 'david@we.com'
      },
      userSignupRequest: jest.fn(),
      setError: jest.fn(),
      isApiCallInProgress: false,
      errorMessage: 'invalid username'
    }
  },
  verification: {
    props: {
      setError: jest.fn(),
      errorMessage: 'Invalid error',
      isApiCallInProgress: false,
      sendSecretCode: jest.fn()
    }
  },
  homeNavbar: {
    props: {
      handleOnclick: jest.fn()
    }
  },
  confirmation: {
    props: {
      setError: jest.fn(),
      errorMessage: 'Invalid error',
      isApiCallInProgress: false,
      sendSecretCode: jest.fn(),
      resetPasswordUser: {
        SwZ5: '866uuth',
        email: 'sad@happy.com'
      },
      resetPassword: jest.fn()
    }
  },
  homepage: {
    props: {
      actions: {
        setError: jest.fn(),
        showHomePageForm: jest.fn(),
        userSignupRequest: jest.fn(),
        setIsApiCall: jest.fn(),
      },
      UserActions: {
        sendSecretCode: jest.fn(),
        googleSignin: jest.fn(),
        resetPassword: jest.fn(),

      },
      errorMessage: {
        message: 'that girl'
      },
      isApiCallInProgress: false,
      homePageFormNumber: 2,
      resetPasswordUser: {},
      googleUser: {}
    }
  },
  createTodolistModal: {
    props: {
      setIsApiCall: jest.fn(),
      setError: jest.fn(),
      isApiCallInProgress: false,
      createTodolist: jest.fn(() => Promise.resolve({})),
      errorMessage: 'Invalid todolist'
    }
  },
  createTaskForm: {
    props: {
      currentUser: {
        userName: 'Python',
        email: 'ade@we.com'
      },
      errorMessage: 'Invalid task name',
      createTask: jest.fn(),
      isApiCallInProgress: false,
      rightSideNav: jest.fn(),
      currentTodolist: {
        name: 'worklist',
        tasks: [],
        collaborators: ['Pythagoras']
      }
    }
  }
};

export default mockData;
