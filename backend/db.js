const mongoose = require("mongoose");
require("dotenv").config();

/* ------ Connecting with cloud DB ------ */
const connection = mongoose.connect(process.env.mongoURL);

module.exports = {connection};