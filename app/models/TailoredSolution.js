var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaiailloredSolutSchema = new Schema({
    content:{type:String, required:true},
    heading:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
})

mongoose.model('TailoredSolution',TaiailloredSolutSchema);