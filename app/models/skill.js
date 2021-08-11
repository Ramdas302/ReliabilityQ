var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillSchema = new Schema({
    skillName:{type:String, required:true},
    content:{type:String, required:true},
    heading:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
    
})

mongoose.model('skill',skillSchema);