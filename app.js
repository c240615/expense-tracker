const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || "3000";
const Category = require("./models/category");
const Record = require("./models/record");
const User = require("./models/user");
// 資料庫
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./config/mongoose");
// routes
//const routes = require("./routes");
// hbs
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
// 靜態檔
app.use(express.static("public"));
// methodoverride
//app.use(methodOverride("_method"));
// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// 首頁
app.get("/", (req, res) => {
  let totalAmount = 0;
  // 從 Category 中
  Category.find()
    .lean()
    .then((checkCategory) => {
      Record.find()
        // 取 Category 關聯 Record.categoryId 的 icon
        .populate("categoryId")
        .lean()
        .sort({ date: "desc" })
        .then((records) => {
          records.forEach((record) => (totalAmount += record.amount));
          res.render("index", { records, totalAmount, checkCategory });
        })
        .catch((err) => console.log(err));
    });
});
// login
app.get("/users/login", (req, res) => {
  res.render("login");
});
app.post("/users/login", (req, res) => {
  res.render("login");
});
app.get("/users/register", (req, res) => {
  res.render("register");
});
app.post("/users/register", (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, comfirmPassword } = req.body;
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log("User already exists.");
      res.render("register", {
        name,
        email,
        password,
        comfirmPassword,
      });
    } else {
      User.create({
        name,
        email,
        password,
      })
        .then(() => {
          res.render("index");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // 如果已經註冊：退回原本畫面
  });
});
app.get("/logout", (req, res) => {
  req.logout();
  //req.flash("success_msg", "成功登出");
  res.redirect("/users/login");
});
// 搜尋不同類別的支出
//app.post("/search", () => {});
// 新增紀錄頁面
/*app.get("/records/new", (req, res) => {
  res.render("new");
});*/
// 提交新增紀錄
/*app.post("/records", (req, res) => {
  const userId = req.user._id;
  const { name, date, category, amount } = req.body;
  Category.find();
  const categoryName = Category.findOne({ name: category });
  Record.create({
    name,
    date,
    amount,
    categoryId: categoryName._id,
    userId,
  })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});*/

// app.use(routes);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
