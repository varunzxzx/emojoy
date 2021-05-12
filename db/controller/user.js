const User = require("../model/User");

async function saveUser(user) {
  const find = await User.find({ username: user.username }).exec();
  if (!find.length) {
    const newUser = new User(user);
    newUser.save(function (err) {
      if (err) throw err;
      console.log("User saved in the DB");
    });
  }
}

module.exports = { saveUser };
