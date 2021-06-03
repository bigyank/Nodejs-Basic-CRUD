const { comparePassword } = require("../utils/crypto");
const { findUser } = require("../utils/dbHelper");

async function loginController(req, res, next) {
  try {
    const { username, password } = req.body;

    // get user from db
    const foundUser = await findUser(username);

    // check password
    if (!foundUser || !(await comparePassword(password, foundUser.password))) {
      return res
        .status(400)
        .send({ message: "username or password missmatch" });
    }

    res.send({ message: "login successful" });
  } catch (error) {
    next(error);
  }
}

module.exports = loginController;
