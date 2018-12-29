const Order = require('../models/Order');
require('../models/User');

const collection = 'orders';

module.exports = (router) => {
  // GET all the orders
  router.get(`/${collection}`, (req, res) => {
    Order.find({})
      .populate('user')
      .exec()
      .then((orders) => {
        res.sendRest(orders);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // POST: Create a new order
  router.post(`/${collection}`, (req, res) => {
    Order.create(req.body)
      .then((newOrder) => {
        res.sendRest(newOrder);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // GET a single order
  router.get(`/${collection}/:id`, (req, res) => {
    const { id } = req.params;
    Order.findById(id)
      .populate('user')
      .exec()
      .then((order) => {
        res.sendRest(order);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // PATCH: update a order partially with new info
  router.patch(`/${collection}/:id`, (req, res) => {
    const { id } = req.params;
    const updateBody = req.body;
    Order.findByIdAndUpdate(id, updateBody)
      .exec()
      .then((order) => {
        res.sendRest({ ...order.toObject(), ...updateBody });
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // DELETE: order
  router.delete(`/${collection}/:id`, (req, res) => {
    const { id } = req.params;
    Order.findByIdAndRemove(id)
      .exec()
      .then((order) => {
        res.sendRest(order);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });
};
