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

router.get('/', (req, res) => {

  let totalProducts;
  let totalUsers;
  let totalCategories;

  Product.count({}, (err, count) => {
    totalProducts = count;
  })
  .exec()
  .then(() => {
    User.count({}, (err, count) => {
      totalUsers = count;
    })
    .exec()
    .then(() => {
      Category.count({}, (err, count) => {
        totalCategories = count;
      })
      .exec()
      .then(() => {
        // calculate total number of products, users, categories
        contextDashboard.analyticCard.forEach(e => {
          if (e.name === 'Products') {
            e.totalCount = totalProducts;
          }
          else if (e.name === 'Users') {
            e.totalCount = totalUsers;
          }
          else {
            e.totalCount = totalCategories;
          }
        });
        /* GET admin page. */
        res.render('admin', {
          title: 'Dashboard',
          dashboard: true,
          ...contextDashboard,
        });
      })
    })
  })

});

routerProducts(router);
routerUsers(router);
routerCategories(router);

module.exports = router;
