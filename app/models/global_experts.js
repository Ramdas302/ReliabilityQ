var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GlobalExpertsSchema = new Schema({
    Name:{type:String, required:true},
    content:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
    linkedin:{type:String},
    twitter:{type:String},
    gmail:{type:String},
    
})

mongoose.model('global_expert',GlobalExpertsSchema);