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
          let e = usersArr[i];
          e.dobFormatted = dateFormatted(e.dob);
        }

        // let testDate = '1994-20-10T13:06:35.216Z';
        // console.log(dateFormatted(testDate));

        console.log(usersArr[0].dobFormatted);

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
