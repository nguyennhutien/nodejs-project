const { format } = require('date-fns');
const User = require('../models/User');
const navLeft = require('../components/navLeft');
// const dataUsers = require('../data/users');

const collection = 'users';

// function date format
function dateFormatted(date) {
  return format(new Date(date), 'MM/DD/YYYY');
}

module.exports = (router) => {
  /* GET users page. */
  router.get(`/${collection}`, (req, res, next) => {
    User.find({})
      .exec()
      .then((usersArr) => {
        for (let i = 0; i < usersArr.length; i++) {
          const e = usersArr[i];
          e.dob = dateFormatted(e.dob);
          e.dateCreated = dateFormatted(e.dateCreated);
        }

        console.log(usersArr);

        res.render('admin', {
          usersArr,
          ...navLeft,
          title: 'Users',
          users: true,
          table: true,
          paging: true,
        });
      })
      .catch((err) => {
        res.sendRest(err);
      });
  });
};
