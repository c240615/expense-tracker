const express = require("express");
const router = express.Router();

const Record = require("../../models/record");
const Category = require("../../models/category");

// 首頁
/*router.get("/", (req, res) => {
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
});*/
module.exports = router;