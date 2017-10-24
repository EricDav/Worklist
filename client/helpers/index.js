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

export const isValidName = (name) => {
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
