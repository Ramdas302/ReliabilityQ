var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ContactSchema = new Schema({
    FirstName:{type:String, required:true},
    LastName:{type:String, required:true},
    Phone_No:{type:Number, required:true,unique: true},
    Company:{type:String, required:true},
    Message:{type:String, required:true},

})

mongoose.model('contact',ContactSchema);