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
// hbs
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

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

app.get("/records/new", (req, res) => {
  res.render("new");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
