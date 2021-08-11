const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var CertificationSchema = require('../../../app/models/certification');
var CertificationModel = mongoose.model('certification');

var InstructorSchema = require('../../../app/models/instructoreffecti');
var InstructorModel = mongoose.model('instructoreffect');


    router.post('/addCertification',function(req,res){

        var data = req.body;

       var exampleObject=data;
        objectLength = Object.keys(exampleObject).length

   
   if(objectLength==1){
        var certiinstuData = new CertificationModel({
            content:req.body.content,     
        });
    }
    if(objectLength==2){
        var certiinstuData = new InstructorModel({
            content:req.body.content,
            heading:req.body.heading     
        });
    }
    certiinstuData.save(function (err, result) {
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

  router.get('/getcerfication',function(req,res){
    CertificationModel.find({}).exec(function(err,result){
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



router.put('/updatecertification/:id',function(req,res){
    update = {
      $set: {
        content:req.body.content,
      }
    };
    CertificationModel.findByIdAndUpdate(req.params.id,update, function (err,certification) {
        if (err) {
          console.error("err"+err)
          return res.status(400).json({
            message: 'Bad Request'
          });
        } else {
          res.json({
            status: 200,
            data: certification
          })
        }
  
      });
  });

      router.post('/deletecertification/:id',function(req,res){
        CertificationModel.findByIdAndRemove(req.params.id,function(err,result){
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

    router.get('/getInstructor',function(req,res){
        InstructorModel.find({}).exec(function(err,result){
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
    
    
    
    router.put('/updateInstruction/:id',function(req,res){
        update = {
          $set: {
            content:req.body.content,
            heading:req.body.heading
          }
        };
        InstructorModel.findByIdAndUpdate(req.params.id,update, function (err,instru) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: instru
              })
            }
      
          });
      });
    
          router.post('/deleteInstructor/:id',function(req,res){
            InstructorModel.findByIdAndRemove(req.params.id,function(err,result){
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
