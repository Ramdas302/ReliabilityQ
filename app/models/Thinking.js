var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ThinkingSchema = new Schema({
    date:{type:String, required:true},
    content:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,

})

mongoose.model('Thinking',ThinkingSchema);