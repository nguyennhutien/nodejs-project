const numeral = require('numeral');
const Product = require('../models/Product');
const Category = require('../models/Category');
const navLeft = require('../components/navLeft');
//const dataProducts = require('../data/products');

const collection = 'products';

// function price format
function priceFormatted(price) {
  return numeral(price).format('($ 0[.]00a)');
}

module.exports = (router) => {

  /* GET products page. */
  router.get(`/${collection}`, (req, res, next) => {
    Product.find({})
      .exec()
      .then((productsArr) => {
        // format price in product obj
        for (let i = 0; i < productsArr.length; i++) {
          let e = productsArr[i];
          e.salePriceFormatted = priceFormatted(e.salePrice);
          e.originalPriceFormatted = priceFormatted(e.originalPrice);
        }

        res.render('admin', {
          productsArr,
          ...navLeft,
          title: 'Products',
          products: true,
          table: true,
          paging: true,
        });

      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  /* GET product detail page. */
  router.get(`/${collection}/:id`, (req, res, next) => {
    const { id } = req.params;
    Product.findById(id)
      .exec()
      .then((product) => {

        Category.find({})
          .exec()
          .then((categoriesArr) => {
            res.render('admin', {
              product,
              categoriesArr,
              ...navLeft,
              title: product.name,
              productDetail: true,
              table: true,
              paging: false,
            });
          })
          .catch((err) => {
            res.sendRest(err);
          });
      })
  });

};
