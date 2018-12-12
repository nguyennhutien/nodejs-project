const path = require('path');
const express = require('express');
const router = express.Router();
const dataProducts = require(path.join(__dirname, '../data/products'));
const dataCategories = require(path.join(__dirname, '../data/categories'));
const dataUsers = require(path.join(__dirname, '../data/users'));

const navLeft = {
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
};
const dashboardCard = {
  analyticCard: [
    {
      name: 'Products',
      icon: 'shopping-basket',
      cardColor: 'primary',
      totalCount() {
        return dataProducts.body.length;
      }
    },
    {
      name: 'Categories',
      icon: 'tags',
      cardColor: 'green',
      totalCount() {
        return dataCategories.body.length;
      }
    },
    {
      name: 'Users',
      icon: 'user',
      cardColor: 'yellow',
      totalCount() {
        return dataUsers.body.length;
      }
    }
  ]
};
const contextDashboard = { ...navLeft, ...dashboardCard };

/* GET admin page. */
router.get('/', (req, res, next) => {
  res.render('admin', contextDashboard);
});

/* GET products page. */
router.get('/products', (req, res, next) => {
  res.render('list', {
    title: 'Products',
    products: true,
    table: true,
    paging: true,
    ...navLeft,
    ...dataProducts
  });
});

/* GET categories page. */
router.get('/categories', (req, res, next) => {
  res.render('list', {
    title: 'Categories',
    categories: true,
    table: true,
    paging: true,
    ...navLeft,
    ...dataCategories
  });
});

/* GET users page. */
router.get('/users', (req, res, next) => {
  res.render('list', {
    title: 'Users',
    users: true,
    table: true,
    paging: true,
    ...navLeft,
    ...dataUsers
  });
});

module.exports = router;
