if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const categoryData = require('../datas/category.json') 
const Category = require("../category");

const db = require('../../config/mongoose')

db.once('open',()=>{
  Promise.all(categoryData.map(eachCategory => {
    return Category.create({
      name: eachCategory.name,
      icon: eachCategory.icon,
    });
  })).then(()=>{
    console.log("categorySeeder done");
    process.exit();
  });
})