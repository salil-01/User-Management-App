const fs = require("fs");
const logger = (req, res, next) => {
  const {id} = req.params;
  let message = `${id} has been  ${
    req.method == "PATCH" ? "updated" : "deleted"
  } at ${new Date()}\n`;
  try {
    fs.appendFileSync("./logs.txt", message);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = { logger };
