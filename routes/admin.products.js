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
  router.get(`/${collection}`, (req, res) => {
    Product.find({})
      .populate('category')
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
          list: true,
          products: true,
          table: true,
          paging: true,
        });

      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  /* GET create new product page */
  router.get(`/${collection}/create`, (req, res) => {
    res.render('admin', {
      ...navLeft,
      productCreate: true,
    });
  });

  /* GET product detail page. */
  router.get(`/${collection}/:id`, (req, res) => {
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
            });
          })
        })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  /* POST a new product */
  router.post(`/${collection}/create`, (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);

    Product.create(newProduct)
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
          });
        })
      })
      .catch((err) => {
        res.sendRest(err);
      })
  });

  /* POST: update product infomation. */
  router.post(`/${collection}/:id`, (req, res) => {

    const { id } = req.params;
    const updateProduct = req.body;

    console.log(updateProduct);

    Category.find({})
      .exec()
      .then((categoriesArr) => {

        Product.findByIdAndUpdate(id, updateProduct)
          .exec()
          .then((oldProduct) => {
            res.render('admin', {
              categoriesArr,
              ...navLeft,
              product: { ...oldProduct.toObject(), ...updateProduct },
              title: product.name,
              productDetail: true,
            });
          })
      })
      .catch(err => {
        res.send(err);
      });
  });

};
