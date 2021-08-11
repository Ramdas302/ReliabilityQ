var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IndividualSubscriptionSchema = new Schema({
    content:{type:String, required:true},
    heading:{type:String, required:true},
    price:{type:String, required:true},
})

mongoose.model('individualSub',IndividualSubscriptionSchema);