var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductPlatSchema = new Schema({
    productName:{type:String, required:true},
    content:{type:String, required:true},
    imageName:{type:String,default:""},
    type:{type:String,default:""} 
})

mongoose.model('product',ProductPlatSchema);