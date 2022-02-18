const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//create a student:
app.post("/students", (req, res) => {
  console.log(req.body);
  const user = new Student(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
  //res.send("hello from another side");
});

//You Do not need express.json() and express.urlencoded()
//for GET requests or DELETE Requests. We only need it for post and put req.

//express.json() is a method inbuilt in express to recognize the incoming Requests Object as
// a JSON object.This method is called as a middleware in your apllication  using
// the code :  app.use(express.json());

//app.get("/",(req,res)=>{
//   res.send("hello World from Abhay ");
//})

app.listen(port, () => {
  console.log(`connection is running on PORT ${port}`);
});
