var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessResourceSchema = new Schema({
    resourceName:{type:String, required:true},
    content:{type:String, required:true},
    date:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
})

mongoose.model('Businessresource',BusinessResourceSchema);