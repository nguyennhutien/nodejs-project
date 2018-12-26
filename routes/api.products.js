const Product = require('../models/Product');
require('../models/Category');

const collection = 'products';

module.exports = (router) => {
  // GET all the products & GET /api/products?filter={json}
  router.get(`/${collection}`, (req, res) => {
    if (req.query.filter) {
      const searchObj = JSON.parse(req.query.filter);
      // where: define a MongDB query object to filter out documents from the collection
      // offset: number of documents to be skipped from the results returned
      // limit: number of documents to be returned from the results
      const { where: queryObj, offset: offsetValue, limit: limitValue } = searchObj;
      const searchKey = Object.keys(queryObj).toString();
      const searchValue = Object.values(queryObj).toString();

      Product
        .where(searchKey)
        .equals(searchValue)
        .skip(offsetValue)
        .limit(limitValue)
        .then((products) => {
          res.sendRest(products);
        })
        .catch((err) => {
          res.sendRest(err);
        });
    }
    Product.find({})
      .populate('category')
      .exec()
      .then((products) => {
        res.sendRest(products);
      })
      .catch((err) => {
        res.sendRest(err);
      });

  });

  // POST: Create a new product
  router.post(`/${collection}`, (req, res) => {
    Product.create(req.body)
      .then((newProduct) => {
        res.sendRest(newProduct);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // GET a single product
  router.get(`/${collection}/:id`, (req, res) => {

    const { id } = req.params;

    Product.findById(id)
      .populate('category')
      .exec()
      .then((product) => {
        res.sendRest(product);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // PATCH: update a product partially with new info
  router.patch(`/${collection}/:id`, (req, res) => {

    const { id } = req.params;
    const updateBody = req.body;

    Product.findByIdAndUpdate(id, updateBody)
      .exec()
      .then((product) => {
        res.sendRest({ ...product.toObject(), ...updateBody });
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // DELETE: product
  router.delete(`/${collection}/:id`, (req, res) => {

    const { id } = req.params;

    Product.findByIdAndRemove(id)
      .exec()
      .then((product) => {
        res.sendRest(product);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

};
