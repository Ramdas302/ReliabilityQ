var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReliProWebinarSchema = new Schema({
    Name:{type:String, required:true},
    Content:{type:String, required:true},
    imageName:{type:String,required:true},
    imagetype:{type:String,required:true},
    type:{type:String,required:true}
})

mongoose.model('programwebinar',ReliProWebinarSchema);