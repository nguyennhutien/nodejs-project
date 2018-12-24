const express = require('express');
const router = express.Router();

const routerProducts = require('./admin.products');
const routerUsers = require('./admin.users');
const routerCategories = require('./admin.categories');

const navLeft = require('../components/navLeft');
const dashboardCard = require('../components/dashboardCard');

const Product = require('../models/Product');
const User = require('../models/User');
const Category = require('../models/Category');

// const dataProducts = require('../data/products');
// const dataUsers = require('../data/users');
// const dataCategories = require('../data/categories');

const contextDashboard = { ...navLeft, ...dashboardCard };

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

// function itemCount(body) {
//   return Array.isArray(body) ? body.length : body ? 1 : 0;
// }

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

// router.use((req, res, next) => {
//   res.productsCount = (body) => {
//     if (body instanceof Error) {
//       res.statusCode = 400;
//     }
//     return res.itemCount(body);
//   }
//   Product.find({})
//     .exec()
//     .then((products) => {
//       itemCount(products);
//     });
//   next();
// });

router.get('/', (req, res, next) => {

  // total counting of products, users, categories
  contextDashboard.analyticCard.forEach(e => {
    if (e.name === 'Products') {
      e.totalCount = () => dataProducts.body.length;
    }
    else if (e.name === 'Users') {
      e.totalCount = () => dataUsers.body.length;
    }
    else {
      e.totalCount = () => dataCategories.body.length;
    }
  });

  /* GET admin page. */
  res.render('admin', {
    title: 'Dashboard',
    dashboard: true,
    ...contextDashboard,
  });
});

routerProducts(router);
routerUsers(router);
routerCategories(router);

module.exports = router;
