const express = require('express');
const router = express.Router();

const contextDashboard = {
  nav: [
    {
      url: '/admin',
      icon: 'dashboard',
      title: 'Dashboard'
    },
    {
      url: '/admin/products',
      icon: 'shopping-basket',
      title: 'Products'
    },
    {
      url: '/admin/categories',
      icon: 'tags',
      title: 'Categories'
    },
    {
      url: '/admin/users',
      icon: 'user',
      title: 'Users'
    }
  ],
  analyticCard: [
    {
      name: 'Products',
      icon: 'shopping-basket',
      cardColor: 'primary',
      totalCount: 26
    },
    {
      name: 'Categories',
      icon: 'tags',
      cardColor: 'green',
      totalCount: 12
    },
    {
      name: 'Users',
      icon: 'user',
      cardColor: 'yellow',
      totalCount: 124
    }
  ]
};
/* GET admin page. */
router.get('/', (req, res, next) => {
  res.render('admin', contextDashboard);
});

/* GET products page. */
router.get('/products', (req, res, next) => {
  res.render('list', contextDashboard);
});

/* GET categories page. */
router.get('/categories', (req, res, next) => {
  res.render('list', contextDashboard);
});

/* GET users page. */
router.get('/users', (req, res, next) => {
  res.render('list', contextDashboard);
});

module.exports = router;
