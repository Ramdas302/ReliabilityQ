var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var customerSchema = new Schema({
    Name:{type:String, required:true},
    Email: {
        type: String,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    Mobile:{type:Number, required:true,unique: true},
    Message:{type:String, required:true},

})

mongoose.model('customer',customerSchema);