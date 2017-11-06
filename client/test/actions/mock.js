let localStorage = {
  userId: 9
};

export default {
  setItem(key, value) {
    return Object.assign(localStorage, { [key]: value });
  },
  getItem(key) {
    return localStorage[key];
  },
  removeItem(key) {
    return delete localStorage[key];
  },
  clear() {
    localStorage = {};
  }
};
