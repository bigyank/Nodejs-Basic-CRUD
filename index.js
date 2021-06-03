const express = require("express");
const signupRouter = require("./router/signup.router");
const loginRouter = require("./router/login.router");

const errorHandler = require("./utils/errorHandler");

// global middleware
const app = express();
app.use(express.json());

// routes
app.use("/api", signupRouter);
app.use("/api", loginRouter);

// 404
app.use((_req, res) => {
  res.status(404).send({ message: "invalid path" });
});

// error handler
app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
