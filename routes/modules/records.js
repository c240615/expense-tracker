const express = require("express");
const router = express.Router();

const Record = require("../../models/record");
const Category = require("../../models/category");

// 新增
router.get("/new", (req, res) => {
  res.render("new");
});
// 提交新 record
router.post("/", (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const { name, date, amount, category } = req.body;  
  console.log(req.body);  
  Category.findOne({ name: category })
    .lean()
    .then((data) => {      
      return Record.create({
        name,
        date,
        amount,
        categoryId: data._id,
        userId,
      });
    }).then(()=>{
      res.redirect("/");
    })
    .catch((e) => {
      console.log(e);
    });
});
// 
router.get("/:id/edit", (req, res) => {
  res.render('edit')
});
// router.put('/:id',(req, res)=>{})
// router.delete('/:id',(req, res)=>{})

module.exports = router;
