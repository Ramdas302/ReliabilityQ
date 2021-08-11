var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IndustriesSchema = new Schema({
    industrieName:{type:String, required:true},
    content:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
})

mongoose.model('industrie',IndustriesSchema);