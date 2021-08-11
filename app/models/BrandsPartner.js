var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandPartResourceSchema = new Schema({
    imageName:{type:String,default:""},
    type:{type:String,default:""} ,
})

mongoose.model('BrandPartner',BrandPartResourceSchema);