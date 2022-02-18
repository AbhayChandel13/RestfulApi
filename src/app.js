const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//create a student:
/*
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
  
});
*/
//create a student by async,await :

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

//You Do not need express.json() and express.urlencoded()
//for GET requests or DELETE Requests. We only need it for post and put req.

//express.json() is a method inbuilt in express to recognize the incoming Requests Object as
// a JSON object.This method is called as a middleware in your apllication  using
// the code :  app.use(express.json());


//read the data of registered students:

app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (e) {
    res.send(e);
  }
});

//read the data of registered student (single student):

app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    if (!studentData) {
      return res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

//update the students by its id:

app.patch("/students/:id",async(req,res)=>{
  try{
      const _id =req.params.id;
      const updateStudents = await Student.findByIdAndUpdate(_id,req.body,{
        new:true
      });

      res.send(updateStudents);
  }catch(e){
    res.status(404).send(e);
;  }
})

//delete the student by  its id:

app.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).send();
    }
    res.send(deleteStudent);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`connection is running on PORT ${port}`);
});
