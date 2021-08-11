var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    courseName:{type:String, required:true},
    content:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
})

mongoose.model('course',CourseSchema);