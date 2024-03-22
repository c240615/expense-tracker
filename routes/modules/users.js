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
    failureFlash: true,
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
  // flash
  const errors = [];
  // 其一錯誤
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填。" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email })
    .then((user) => {
      // 如果已經註冊過，返回註冊頁面
      if (user) {
        errors.push({ message: "這個 Email 已經註冊過了。" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      }

      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
// 登出
router.get("/logout", (req, res) => {
  req.logout((e) => {
    req.flash("success_msg", "成功登出");
    res.redirect("/users/login");
  });
});
module.exports = router;
