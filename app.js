const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = process.env.PORT || "3000";
const Record = require("./models/record");
// 資料庫
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./config/mongoose");
// hbs
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
// router

app.get("/", (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
