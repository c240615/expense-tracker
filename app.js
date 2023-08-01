const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = process.env.PORT || "3000";
const Category = require("./models/category");
const Record = require("./models/record");
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
//app.use(bodyParser.urlencode({etended}))
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
app.get("/users/login", (req,res) => {
  res.render("login")
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
