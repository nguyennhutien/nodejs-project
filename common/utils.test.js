const utils = require('./utils');

test('validate User model', () => {
  expect(utils.validateUsername('username')).toBe(true);
  expect(utils.validateUsername('user name')).toBe(false);
  expect(utils.validateUsername('usern@me')).toBe(false);

  expect(utils.validateEmail('name@gmail.com')).toBe(true);
  expect(utils.validateEmail('namegmail.com')).toBe(false);
  expect(utils.validateEmail('name@social.club')).toBe(true);
  expect(utils.validateEmail('name@social.site')).toBe(true);
});
