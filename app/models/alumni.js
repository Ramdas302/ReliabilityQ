var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alumniSchema = new Schema({
    Name:{type:String, required:true},
    content:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
})

mongoose.model('alumni',alumniSchema);