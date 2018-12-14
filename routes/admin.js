const path = require('path');
const express = require('express');
const router = express.Router();
const { format } = require('date-fns');
const numeral = require('numeral');
const dataProducts = require(path.join(__dirname, '../data/products'));
const dataCategories = require(path.join(__dirname, '../data/categories'));
const dataUsers = require(path.join(__dirname, '../data/users'));

const navLeft = {
  nav: [
    {
      url: '/admin',
      icon: 'dashboard',
      title: 'Dashboard',
    },
    {
      url: '/admin/products',
      icon: 'shopping-basket',
      title: 'Products',
    },
    {
      url: '/admin/categories',
      icon: 'tags',
      title: 'Categories',
    },
    {
      url: '/admin/users',
      icon: 'user',
      title: 'Users',
    },
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
      },
    },
    {
      name: 'Categories',
      icon: 'tags',
      cardColor: 'green',
      totalCount() {
        return dataCategories.body.length;
      },
    },
    {
      name: 'Users',
      icon: 'user',
      cardColor: 'yellow',
      totalCount() {
        return dataUsers.body.length;
      },
    },
  ],
};

const contextDashboard = { ...navLeft, ...dashboardCard };

// clone obj
const productsFormatted = cloneObj(dataProducts);
const usersFormatted = cloneObj(dataUsers);

// function clone obj
function cloneObj(src) {
  return JSON.parse(JSON.stringify(src));
}

// function date format
function dateFormatted(date) {
  return format(new Date(date), 'MM/DD/YYYY');
}

// function price format
function priceFormatted(price) {
  return numeral(price).format('($ 0[.]00A)');
}

// format date in users dob
usersFormatted.body.forEach(e => {
  e.dob = dateFormatted(e.dob);
});
// format price in product obj
productsFormatted.body.forEach(e => {
  e.salePrice = priceFormatted(e.salePrice);
  e.originalPrice = priceFormatted(e.originalPrice);
});

/* GET admin page. */
router.get('/', (req, res, next) => {
  res.render('admin', {
    title: 'Dashboard',
    dashboard: true,
    ...contextDashboard});
});

/* GET products page. */
router.get('/products', (req, res, next) => {
  res.render('admin', {
    title: 'Products',
    products: true,
    table: true,
    paging: true,
    ...navLeft,
    ...productsFormatted,
  });
});

/* GET categories page. */
router.get('/categories', (req, res, next) => {
  res.render('admin', {
    title: 'Categories',
    categories: true,
    table: true,
    paging: true,
    ...navLeft,
    ...dataCategories,
  });
});

/* GET users page. */
router.get('/users', (req, res, next) => {
  res.render('admin', {
    title: 'Users',
    users: true,
    table: true,
    paging: true,
    ...navLeft,
    ...usersFormatted,
  });
});

/* GET users page. */
router.get('/products/:id', (req, res, next) => {

  const productArr = productsFormatted.body.filter(item => {
    if (item.id == req.params.id) {
      return true;
    }
    return false;
  });

  // assign body to product obj
  const product = {...productArr[0]};

  if (product.id == req.params.id) {
    res.render('admin', {
      title: product.name,
      productDetail: true,
      table: true,
      paging: true,
      ...navLeft,
      products: [...productArr],
    });
  } else {
    // catch 404
    res.status(404).send('404');
  }
});

module.exports = router;
