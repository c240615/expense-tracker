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
  let totalAmount = 0;
  
  Record.find()
    .lean() // 轉換 Model 物件
    .sort({ date: "desc" })
    .then((records) => {
      res.render("index", { records });
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
