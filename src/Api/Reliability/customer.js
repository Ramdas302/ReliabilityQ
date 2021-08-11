const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var customerSchema = require('../../../app/models/customer');
var CustomerModel = mongoose.model('customer');

    router.post('/addCustomer',function(req,res){
        var courseData = new CustomerModel({
            Name:req.body.Name,
            Email:req.body.Email,
            Mobile:req.body.Mobile,
            Message: req.body.Message
            
        });
        courseData.save(function (err, result) {
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

  router.get('/getCustomer',function(req,res){
    CustomerModel.find({}).exec(function(err,result){
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



      router.post('/deletecustomer/:id',function(req,res){
        CustomerModel.findByIdAndRemove(req.params.id,function(err,result){
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
