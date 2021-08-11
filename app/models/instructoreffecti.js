var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var InstructorSchema = new Schema({
    content:{type:String, required:true},
    heading:{type:String, required:true},
})

mongoose.model('instructoreffect',InstructorSchema);