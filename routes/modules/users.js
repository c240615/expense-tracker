const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");
// 登入頁
router.get("/login", (req, res) => {
  res.render("login");
});
// 提交登入
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    //failureFlash: true,
  })
);
// 註冊頁
router.get("/register", (req, res) => {
  res.render("register");
});
// 提交註冊
router.post("/register", (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body;
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log("User already exists.");
      res.render("register", {
        name,
        email,
        password,
        confirmPassword,
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


// 修改
// 刪除
router.get("/logout", (req, res) => {
  req.logout();
  //req.flash("success_msg", "成功登出");
  res.redirect("/users/login");
});
module.exports = router;