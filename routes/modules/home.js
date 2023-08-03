const express = require("express");
const router = express.Router();

const Record = require("../../models/record");
const Category = require("../../models/category");

// 首頁
router.get("/", (req, res) => {
  let totalAmount = 0;
  const userId = req.user._id;
  // 從 Category 中
  Category.find()
    .lean()
    .then((checkCategory) => {
      Record.find({ userId })
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
//搜尋
router.get("/search", (req, res) => {
  const keyword = req.query.search;
  const userId = req.user._id;
  let totalAmount = 0;
  console.log(keyword); // 家居物業
  Category.find({ userId, category: keyword })
    .lean()
    .then((datas) => {
      console.log(datas); // []
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
