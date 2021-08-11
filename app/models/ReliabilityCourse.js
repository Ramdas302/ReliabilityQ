var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReliabilityCourseSchema = new Schema({
    Reliability_Course:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
})

mongoose.model('ReliabilityCourse',ReliabilityCourseSchema);