module.exports = {

  validateUsername(username) {
    return /^[A-Za-z0-9_.-]+$/.test(username);
  },
  validateEmail(email) {
    return /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(email);
  },
};
