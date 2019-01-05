const Order = require('../models/Order');
//const User = require('../models/User');
const navLeft = require('../components/navLeft');

const collection = 'orders';

module.exports = (router) => {

  /* GET orders page. */
  router.get(`/${collection}`, (req, res) => {
    Order.find({})
      .populate('user')
      .exec()
      .then((ordersArr) => {

        res.render('admin', {
          ordersArr,
          ...navLeft,
          title: 'Orders',
          list: true,
          orders: true,
          table: true,
          paging: true,
        });

      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  /* GET create new order page */
  router.get(`/${collection}/create`, (req, res) => {
    res.render('admin', {
      ...navLeft,
      orderCreate: true,
    });
  });

  /* GET order detail page. */
  router.get(`/${collection}/:id`, (req, res) => {
    const { id } = req.params;
    Order.findById(id)
      .exec()
      .then((order) => {
        res.render('admin', {
          order,
          ...navLeft,
          title: order.name,
          orderDetail: true,
        });
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  /* POST a new order */
  router.post(`/${collection}/create`, (req, res) => {

    const newOrder = req.body;

    Order.create(newOrder)
      .then((order) => {
        res.render('admin', {
          order,
          ...navLeft,
          title: order.name,
          orderDetail: true,
        });
      })
      .catch((err) => {
        res.sendRest(err);
      })
  });

  /* POST: update order infomation. */
  router.post(`/${collection}/:id`, (req, res) => {

    const { id } = req.params;
    const updateOrder = req.body;

    console.log(req.body); // ???

    Order.findByIdAndUpdate(id, updateOrder)
      .exec()
      .then((oldOrder) => {
        res.render('admin', {
          ...navLeft,
          order: { ...oldOrder.toObject(), ...updateOrder },
          title: order.name,
          orderDetail: true,
        });
      })
      .catch(err => {
        res.send(err);
      });
  });

};
