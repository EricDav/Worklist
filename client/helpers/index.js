/**
 *@description checks if a field is null, undefined or empty
 *
 * @param  {type} fieldData the value to be checked if it is invalid
 *
 * @return {boolean} true or false
 */

export const isInValidField = (fieldData) => {
  if (typeof (fieldData) !== 'string' || fieldData.trim().length === 0) {
    return true;
  }
  let hasValue = false;
  fieldData.trim().split().forEach((value) => {
    if (value !== ' ') {
      hasValue = true;
    }
  });
  if (!hasValue) {
    return true;
  }
  return false;
};


/**
 * @description checks if the string pass in is a text.
 * Means all the charcters are alphabets
 *
 * @param  {string} str the string to be checked
 *
 * @return {boolean} true or false
 */
export const isText = (str) => {
  if (str.length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i += 1) {
    if (/[a-z A-Z ' ']/.test(str[i]) === false) {
      return false;
    }
  }
  return true;
};

/**
 * @description checks if the string pass in is a digit.
 * Means all the charcters are digit
 *
 * @param  {string} str the string to be checked
 *
 * @return {boolean} true or false
 */
export const isDigit = (str) => {
  const num = str.toString();
  if (num.length === 0) {
    return false;
  }
  for (let i = 0; i < num.length; i += 1) {
    if (/[0-9]/.test(num[i]) === false) {
      return false;
    }
  }
  return true;
};

export const isValidEmail = (email) => {
  if ((email.slice(email.length - 4, email.length)
     !== '.com' || !(/[@]/.test(email)))) {
    return false;
  }
  return true;
};

/**
 *@description checks if a value passed in is a valid password
 *
 * @param  {Object} password the value to be checked if it is a valid password
 *
 * @return {Boolean} true or false
 */
export const isValidPassword = (password) => {
  if (password.length < 9 ||
    !(/[0-9]/.test(password) &&
    /[a-z A-Z]/.test(password))) {
    return false;
  }
  return true;
};

/**
 *@description checks if a value passed in is a valid username
 *
 * @param  {Object} username the value to be checked if it is a valid username
 *
 * @return {Boolean} true or false
 */
export const isValidUsername = (username) => {
  if (isDigit(username) ||
    isDigit(username[0]) || username.length < 2) {
    return false;
  }
  return true;
};


/**
 *@description checks if a field is a valid name
 *
 * @param  {type} name the value to be checked if it is valid
 *
 * @return {boolean} true or false
 */
export const isValidName = (name) => {
  const value = name.trim();
  if (value.length === 0) {
    return false;
  }
  for (let i = 0; i < value.length; i += 1) {
    if (!(/[0-9]/.test(value[i]) || /[a-z A-Z]/.test(value[i]))) {
      return false;
    }
  }
  if (isDigit(value)) {
    return false;
  }
  return true;
};

/**
 *@description checks if a field is a valid name
 *
 * @param  {type} todolist the todolist
 * @param  {type} name the name of the todolist
 *
 * @return {Boolean} true or false
 */
export const isUniqueTaskName = (todolist, name) => {
  if (todolist.tasks.length === 0) {
    return true;
  }
  let isUnique = true;
  todolist.tasks.forEach((task) => {
    if (task.taskName.toLowerCase() === name.toLowerCase()) {
      isUnique = false;
    }
  });
  if (isUnique) {
    return true;
  }
  return false;
};

/**
 *@description checks if a field is a valid name
 *
 * @param  {type} todolists all the todolist
 * @param  {type} newTodolist the new todolist to be updated
 *
 * @return {Array} array of todolists
 */
export const updateTodolists = (todolists, newTodolist) => {
  const updatedTodolists = [];
  todolists.forEach((todolist) => {
    if (todolist._id != newTodolist._id) {
      updatedTodolists.push(todolist);
    }
  });
  updatedTodolists.push(newTodolist);
  return updatedTodolists;
};

/**
 *@description checks if a field is a valid name
 *
 * @param  {String} day the reminder day
 * @param  {String} hour the reminder hour
 * @param {String} minute the  reminder minute
 * @param  {String} dueYear the due date year
 * @param {String} dueMonth the due date month
 * @param  {String} dueDay the due date day
 * @param  {String} dueHour the due date hour
 * @param  {String} dueMinute the due date minute
 *
 * @return {Array} array of todolists
 */

export const validateRemindersInput =
  (
    day, hour, minute, dueYear, dueMonth, dueDay,
    dueHour, dueMinute
  ) => {
    if (isInValidField(day)) {
      day = '0';
    }
    if (isInValidField(hour)) {
      hour = '0';
    }
    if (isInValidField(minute)) {
      minute = '0';
    }
    if (Number(day) + Number(hour) + Number(minute) === 0) {
      return [false, 'You have to set reminders!'];
    } else if (!isDigit(day) || !isDigit(hour) || !isDigit(minute)) {
      return [false, `Invalid date for Reminders.
       Date should be positive numbers`];
    } else if (Number(day) > 31 || Number(hour) > 59 || Number(minute) > 59) {
      return [false, 'Invalid date!'];
    }
    const reminderDate = new Date(
      dueYear, dueMonth,
      Number(dueDay) - Number(day), Number(dueHour) - Number(hour),
      Number(dueMinute) - Number(minute)
    );
    if (Date.parse(new Date()) > Date.parse(reminderDate)) {
      return [false, 'Error! Date for reminder can not be in the past'];
    }
    return [true, reminderDate];
  };

/**
 *@description checks if a field is a valid name
 *
 * @param  {String} date the due date
 * @param  {Date} currentDate the reminder date
 * @param {String} name task name
 * @param  {String} priority the priority level
 * @param {String} assignTo the name of the user the task is assign to
 * @param  {Object} currentTodolist the todolist the for the task
 *
 * @return {String} string containing the error message or null if not found
 */
export const validateCreateTask = (
  date, currentDate,
  name, priority, assignTo, currentTodolist
) => {
  if (Date.parse(date) < Date.parse(currentDate)) {
    return 'Invalid date! Due date should be at least a minute from now.';
  } else if (!isValidName(name)) {
    return 'Invalid task name. Task name must contain \
only character and number only';
  } else if (!priority) {
    return 'You did not select any task priority';
  } else if (!assignTo) {
    return 'A user must be assign to a task';
  } else if (!currentTodolist
    .collaborators.includes(assignTo)) {
    return 'The user assign to this task is not a member of the todolist';
  } else if (!isUniqueTaskName(currentTodolist, name)) {
    return 'Task name already taken by you';
  }
  return null;
};