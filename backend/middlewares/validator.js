const validator = (req, res, next) => {
  //getting role from headers sent from frontend
  if (req.headers.role === "admin") {
    next();
    // res.send("Delete Successfull")
  } else {
    res.status(400).send({ err: "Only Admin can perform this operation." });
  }
};
module.exports = {
  validator,
};
