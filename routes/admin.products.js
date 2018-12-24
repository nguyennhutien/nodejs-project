const numeral = require('numeral');
const Product = require('../models/Product');
const navLeft = require('../components/navLeft');
//const dataProducts = require('../data/products');


const collection = 'products';

// function price format
function priceFormatted(price) {
  return numeral(price).format('($ 0[.]00A)');
}

module.exports = (router) => {

  /* GET products page. */
  router.get(`/${collection}`, (req, res, next) => {
    Product.find({})
      .exec()
      .then((productsArr) => {
        // format price in product obj
        for (let i = 0; i < productsArr.length; i++) {
          const e = productsArr[i];
          e.salePrice = priceFormatted(e.salePrice);
          e.originalPrice = priceFormatted(e.originalPrice);
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
        // format price in product obj
        product.salePrice = priceFormatted(product.salePrice);
        product.originalPrice = priceFormatted(product.originalPrice);

        res.render('admin', {
          product,
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
  });
};
