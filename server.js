const express = require("express");
const app = express();
const cors = require("cors");
const { reportRequest } = require("./src/middlewares/logger");

app.use(reportRequest);
app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;