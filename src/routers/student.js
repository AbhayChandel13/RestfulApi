const express = require("express");
const router = new express.Router();
const Student = require("../models/students")

//2:we need to define the Router

// router.get("/abhay",(req,res)=>{
//     res.send("hello Wahtsup guys");
//   })


//create a student:
/*
router.post("/students", (req, res) => {
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

//CRUD OPERATIONS STARTED BELOW :---->>

//Create a student by async,await :

router.post("/students", async (req, res) => {
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
  // the code : app.use(express.json());
  
  //Read the data of registered Students:
  
  router.get("/students", async (req, res) => {
    try {
      const studentsData = await Student.find();
      res.send(studentsData);
    } catch (e) {
      res.send(e);
    }
  });
  
  //read the data of registered student (single student):
  
  router.get("/students/:id", async (req, res) => {
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
  
  router.patch("/students/:id",async(req,res)=>{
    try{
        const _id =req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id,req.body,{
          new:true
        });
  
        res.send(updateStudents);
    }catch(e){
      res.status(404).send(e);
    }
  })
  
  //delete the student by  its id:
  
  router.delete("/students/:id", async (req, res) => {
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

  module.exports = router;