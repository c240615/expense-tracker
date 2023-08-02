const express = require("express");
const session = require('express-session')
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
// 資料庫
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./config/mongoose");
// routes
const routes = require("./routes");
const usePassport = require("./config/passport");
// hbs
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// passport
usePassport(app);
// 靜態檔
// app.use(express.static("public"));
// methodoverride
//app.use(methodOverride("_method"));

app.use(routes);
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
