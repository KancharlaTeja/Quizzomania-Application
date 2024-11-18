const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/tej').then(()=>{
    console.log("MongoDB connected")
})
.catch((error)=>{
    console.log("Error in Connecting MongoDB")
})
//===============================================================

const LoginSchema = new mongoose.Schema({
    email:{
        type: String,
        required : true
    },
    password:{
        type : String,
        required : true
    }
});
const userLogin = mongoose.model('Data11',LoginSchema,'userLogin')
//====================================================

const SignupSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email :{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const userSignup = mongoose.model('Data12',SignupSchema,'userSignup')
//=========================================================

const taskSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        required:true
    }
});

const userMarks = mongoose.model('Data13',taskSchema,'userMarks')
//===========================================================
module.exports={
    userLogin,
    userSignup,
    userMarks
};


