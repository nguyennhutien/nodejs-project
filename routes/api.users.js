const User = require('../models/User');

const collection = 'users';

module.exports = (router) => {
  // GET (get all)
  router.get(`/${collection}`, (req, res) => {
    User.find({})
      .exec()
      .then((users) => {
        res.sendRest(users);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // POST (create)
  router.post(`/${collection}`, (req, res) => {
    // req.app.log('create', req.body);
    User.create(req.body)
      .then((newUser) => {
        res.sendRest(newUser);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // GET (get one)
  router.get(`/${collection}/:id`, (req, res) => {
    /*
    const id = req.params.id
    /*/
    const { id } = req.params;
    //*/
    User.findById(id)
      .exec()
      .then((user) => {
        res.sendRest(user);
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });

  // PATCH (update one)
  router.patch(`/${collection}/:id`, (req, res) => {
    const { id } = req.params;
    const updateBody = req.body;
    // update one document
    User.findByIdAndUpdate(id, updateBody, { runValidators: true })
      .exec()
      .then((user) => {
        res.sendRest({ ...user.toObject(), ...updateBody });
      })
      .catch((err) => {
        res.sendRest(err);
      });

  });

  // DELETE (delete one)
  router.delete(`/${collection}/:id`, (req, res) => {
    const { id } = req.params;
    // delete one document
    User.findByIdAndRemove(id)
      .exec()
      .then((user) => {
        res.sendRest(user);
      })
      .catch((err) => {
        res.sendRest(err);
      });

  });
};
