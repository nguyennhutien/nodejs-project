const express = require('express');
const apiUsers = require('./api.users');
const apiProducts = require('./api.products');
const apiCategories = require('./api.categories');

const router = express.Router();

function wrapJson(body) {
  if (body instanceof Error) {
    return {
      header: {
        status: 400,
        errorMessage: `${body.name}: ${body.message}`,
        currentDate: new Date(),
      },
      body,
    };
  }

  return {
    header: {
      status: 200,
      errorMessage: '',
      currentDate: new Date(),
      count: Array.isArray(body) ? body.length : body ? 1 : 0,
    },
    body,
  };
}

// a middleware to enhance res object
router.use((req, res, next) => {
  // attach a new method to res object for convenient
  res.sendRest = (body) => {
    if (body instanceof Error) {
      res.statusCode = 400;
    }
    return res.json(wrapJson(body));
  };
  next();
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.sendRest({
    version: '1.0.0',
    title: 'Nordic Shop RESTful API',
    description: 'RESTful API for Nordic Shop web app, OpenAPI compliance',
    contact: 'Tien Nguyen <tyanzen@gmail.com>',
  });
});

apiProducts(router);
apiUsers(router);
apiCategories(router);

module.exports = router;
