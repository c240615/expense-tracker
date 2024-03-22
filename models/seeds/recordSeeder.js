const bcrypt = require("bcryptjs");
// schema model
const User = require("../user");
const Record = require("../record");
const Category = require("../category");
// data []
const userData = require("../datas/user.json");
const recordData = require("../datas/record.json");

const db = require("../../config/mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

db.once("open", () => {
  Promise.all(
    userData.map((eachUser) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(eachUser.password, salt))
        .then((hash) =>
          User.create({
            name: eachUser.name,
            email: eachUser.email,
            password: hash,
          })
        )
        .then((user) => {          
          const userRecord = [];          
          const userId = user._id;
          // 用 todo : 0,1,2,4  3 建立單筆 record
          const record = eachUser.todo.map((recordIndex) => {
            recordData[recordIndex].userId = userId;
            return recordData[recordIndex];
          });
          return Promise.all(
            record.map((record) => {
              return Category.findOne({ name: record.category })
                .lean()
                .then((category) => {
                  record.categoryId = category._id;
                  userRecord.push(record);
                });
            })
          ).then(() => {            
            return Record.create(userRecord);
          });
        });
    })
  )
    .then(() => {
      
      process.exit();
    })
    .catch((err) => console.log(err));
});

