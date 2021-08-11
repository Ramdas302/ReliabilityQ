var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewratingSchema = new Schema({
    Name:{type:String, required:true},
    Designation: {
        type: String,
        required:true
    },
    company:{type:String, required:true},
    content:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,

})

mongoose.model('reviewrating',reviewratingSchema);