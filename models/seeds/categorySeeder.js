if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Category = require("../category");
const categoryData = require("../datas/category.json"); 

const db = require('../../config/mongoose')

db.once('open',()=>{
  Promise.all(categoryData.map(eachCategory => {
    return Category.create({      
      name: eachCategory.name,
      icon: eachCategory.icon,
    });
  })).then(()=>{
    console.log("category done");
    process.exit();
  });
})
