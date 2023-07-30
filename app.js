const express = require("express");
const app = express();
const PORT = 3000;

const mongoose = require("mongoose");
if(process.env.MONGODB_URI !== "production"){
  require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI);
const db =mongoose.connection
db.once('open',()=>{
  console.log("db open")
})
db.on('error',()=>{
  console.log("db error")
})


app.get("/", (req, res) => {
  res.send("homepage");
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}/`);
});
