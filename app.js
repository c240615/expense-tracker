const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
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
// methodoverride
app.use(methodOverride("_method"));
// passport
usePassport(app);
// flash
app.use(flash());
// authennticate
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});
// route
app.use(routes);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
