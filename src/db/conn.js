const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/students-api")
.then (()=>{
    console.log("conection is succesful");
}).catch((e)=>{
    console.log("No Connection");
})
