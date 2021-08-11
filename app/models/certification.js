var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CertificationSchema = new Schema({
    content:{type:String, required:true},
})
mongoose.model('certification',CertificationSchema);