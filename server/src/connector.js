const UserModel = require('./model/User.js');
class User {
  constructor() {
    this.findUser = title => {
      const person = UserModel.find({}, (error, data) => {
        return data;
      })
        .clone()
        .catch(function (err) {
          console.log(err);
        });
      return person;
    };
  }
}
module.exports = {User};
