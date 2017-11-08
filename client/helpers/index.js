/**
 *@description checks if a field is null, undefined or empty
 *
 * @param  {type} fieldData the value to be checked if it is invalid
 *
 * @return {boolean} true or false
 */

export const isInValidField = (fieldData) => {
  if (typeof (fieldData) !== 'string' || fieldData.length === 0) {
    return true;
  }
  let hasValue = false;
  fieldData.split().forEach((value) => {
    if (value !== ' ') {
      hasValue = true;
    }
  });
  if (!hasValue) {
    return true;
  }
  return false;
};

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

export const isValidNames = (name) => {
  if (!isText(name) || name.length < 5) {
    return false;
  }
  return true;
};

export const isValidPassword = (password) => {
  if (password.length < 9 ||
    !(/[0-9]/.test(password) &&
    /[a-z A-Z]/.test(password))) {
    return false;
  }
  return true;
};

export const isValidUsername = (username) => {
  if (isDigit(username) ||
    isDigit(username[0]) || username.length < 2) {
    return false;
  }
  return true;
};

export const isValidName = (name) => {
  if (name.length === 0) {
    return false;
  }
  for (let i = 0; i < name.length; i += 1) {
    if (!(/[0-9]/.test(name[i]) || /[a-z A-Z]/.test(name[i]))) {
      return false;
    }
  }
  return true;
};

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

export const validateRemindersInput =
  (
    day, hour, minute, dueYear, dueMonth, dueDay,
    dueHour, dueMinute, dueDate
  ) => {
    if (isInValidField(day) && isInValidField(hour) && isInValidField(minute)) {
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
