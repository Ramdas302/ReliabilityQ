const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var ContactSchema = require('../../../app/models/contact');
var ContactModel = mongoose.model('contact');

    router.post('/addContactus',function(req,res){
        var ContactData = new ContactModel({
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            Phone_No:req.body.Phone_No,
            Company:req.body.Company,
            Message: req.body.Message
            
        });
        ContactData.save(function (err, result) {
          if (err) {
            console.error(err);
            return res.status(400).json({
              message: 'Bad Request'
            });
          } else {
            res.json({
              status: 200,
              data: result
            })
          }
  
        });
  
  });

  router.get('/getContact',function(req,res){
    ContactModel.find({}).exec(function(err,result){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: result
        });
      }
    
    });
  
});



      router.post('/deleteContact/:id',function(req,res){
        ContactModel.findByIdAndRemove(req.params.id,function(err,result){
            if(err){
                res.json({
                    status : 400
                })
            }else{
                res.json({
                    status : 200
                })
            }
        })
    });

    
    
module.exports=router;
