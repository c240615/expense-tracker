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
    .sort({ date: "desc" })
    .then((categories) => {
      Record.find({ userId })
        // 取 Category 關聯 Record.categoryId 的 icon
        .populate("categoryId")
        .lean()
        .sort({ date: "desc" })
        .then((records) => {
          records.forEach((record) => (totalAmount += record.amount));
          res.render("index", { records, totalAmount, categories });
        })
        .catch((err) => console.log(err));
    });
});
//搜尋
router.get("/search", (req, res) => {
  const categoryId = req.query.category;
  const userId = req.user._id;
  let totalAmount = 0;
  if (categoryId) {
    Category.find()
      .lean()
      .then((categories) => {
        categories.forEach((eachCate) => {
          if (eachCate._id.toString() === categoryId) {
            eachCate.selected = true;
          } else {
            eachCate.selected = false;
          }
        });
        Record.find({ userId, categoryId })
          .populate("categoryId")
          .lean()
          .sort({ date: "desc" })
          .then((records) => {
            records.forEach((record) => (totalAmount += record.amount));
            res.render("index", { records, categories, totalAmount });
          })
          .catch((err) => console.log(err));
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    return res.redirect("/");
  }
});

module.exports = router;
