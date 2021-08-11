var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferingSchema = new Schema({
    offeringName:{type:String, required:true},
    content:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""},
    imageType:{type:String,required:true}
    
})

mongoose.model('offering',OfferingSchema);