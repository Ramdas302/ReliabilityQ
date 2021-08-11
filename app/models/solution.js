var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolutionSchema = new Schema({
    content:{type:String, required:true},
    heading:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
})

mongoose.model('solution',SolutionSchema);