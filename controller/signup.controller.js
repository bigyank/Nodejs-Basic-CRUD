const { hashPassword } = require("../utils/crypto");
const { findUser, saveUser } = require("../utils/dbHelper");

async function signupController(req, res, next) {
  try {
    const { username, password } = req.body;

    // get user from db
    const foundUser = await findUser(username);

    // reject if user already exists
    if (foundUser) {
      return res
        .status(400)
        .send({ message: "this username is already taken" });
    }

    // hash plain password
    const hashedPassword = await hashPassword(password);
    await saveUser({ username, password: hashedPassword });

    res.send({ message: "signup successful" });
  } catch (error) {
    next(error);
  }
}

module.exports = signupController;
