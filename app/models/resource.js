var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    resourceName:{type:String, required:true},
    content:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
})

mongoose.model('resource',ResourceSchema);