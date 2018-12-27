const Category = require('../models/Category');
const navLeft = require('../components/navLeft');
// const dataCategories = require('../data/categories');

const collection = 'categories';

module.exports = (router) => {
  /* GET categories page. */
  router.get(`/${collection}`, (req, res) => {
    Category.find({})
      .exec()
      .then((categoriesArr) => {
        res.render('admin', {
          categoriesArr,
          ...navLeft,
          title: 'Categories',
          list: true,
          categories: true,
          table: true,
          paging: false,
        });
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });
};
