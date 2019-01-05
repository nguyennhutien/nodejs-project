const Category = require('../models/Category');

const collection = 'categories';

module.exports = (router) => {
  // GET all the categories
  router.get(`/${collection}`, (req, res) => {
    Category.find({})
      .exec()
      .then((categories) => {
        res.sendRest(categories);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // POST: Create a new category
  router.post(`/${collection}`, (req, res) => {
    Category.create(req.body)
      .then((newCategory) => {
        res.sendRest(newCategory);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // GET a single category
  router.get(`/${collection}/:id`, (req, res) => {
    const { id } = req.params;
    Category.findById(id)
      .exec()
      .then((category) => {
        res.sendRest(category);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // PATCH: update a category partially with new info
  router.patch(`/${collection}/:id`, (req, res) => {
    const { id } = req.params;
    const updateBody = req.body;
    Category.findByIdAndUpdate(id, updateBody)
      .exec()
      .then((category) => {
        res.sendRest({ ...category.toObject(), ...updateBody });
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // DELETE: category
  router.delete(`/${collection}/:id`, (req, res) => {
    const { id } = req.params;
    Category.findByIdAndRemove(id)
      .exec()
      .then((category) => {
        res.sendRest(category);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });
};
