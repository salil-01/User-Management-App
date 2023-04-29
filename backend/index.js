const express = require("express");
const { userRouter } = require("./routes/User.route");
const app = express();
const cors = require("cors");
const { connection } = require("./db");
const { adminRouter } = require("./routes/Admin.route");
const { auth } = require("./middlewares/auth");
require("dotenv").config();

/* ------ Middlewares ------ */
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/admin", adminRouter);

/* ------ Home Route ------ */
app.get("/", (req, res) => {
  res.send("Home Page");
});

//login route for all users and admins, handled by middleware
app.post("/login", auth);

/* ------ Server ------ */
app.listen(process.env.port || 8080, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    console.log(error);
  }
  console.log(`Sever running at port ${process.env.port}`);
});
