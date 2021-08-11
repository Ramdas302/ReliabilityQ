const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var alumniSchema = require('../../../app/models/alumni');
var alumniSoluModel = mongoose.model('alumni');
var IndividualSubscriptionSchema = require('../../../app/models/IndividualSubscription');
var  IndividualSubModel = mongoose.model('individualSub');


let upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        let type = req.params.type;
        let path = `./uploads`;
        callback(null, path);
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      }
    })
  });
 
         router.post('/addalumi',upload.single('image'),function(req,res){
              var addalumi = new alumniSoluModel({
                  Name:req.body.resourceName,
                  content:req.body.content,
                  imageName: req.file.originalname,
                  type:req.file.mimetype
              });
              addalumi.save(function (err, result) {
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
      
        router.get('/getalumi',function(req,res){
            alumniSoluModel.find({}).exec(function(err,alumi){
            if(err){
              return res.status(400).json({
                message: 'Bad Request'
              });
            }else{
              res.json({
                status: 200,
                data: alumi
              });
            }
          
          });
        
      });
      
      
      router.put('/updatealumi:id',upload.single('image'),function(req,res){
          console.log(req.body);
              
              update = {
                $set: {
                  resourceName:req.body.resourceName,
                  content:req.body.content,
                  imageName: req.file.originalname,
                  type:req.file.mimetype
                 
                }
              };
              alumniSoluModel.findByIdAndUpdate(req.params.id,update, function (err,alumi) {
                  if (err) {
                    console.error("err"+err)
                    return res.status(400).json({
                      message: 'Bad Request'
                    });
                  } else {
                    res.json({
                      status: 200,
                      data: alumi
                    })
                  }
            
                });
            });
      
            router.post('/deletealumi/:id',function(req,res){
                alumniSoluModel.findByIdAndRemove(req.params.id,function(err,alumi){
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
      
        


              router.post('/addIndividualSub',upload.single('image'),function(req,res){
                var IndividualSub = new IndividualSubModel({
                    content:req.body.content,
                    heading:req.body.heading,
                    price:re.body.price
                });
                IndividualSub.save(function (err, result) {
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
        
          router.get('/getIndividualSub',function(req,res){
            IndividualSubModel.find({}).exec(function(err,IndividualSub){
              if(err){
                return res.status(400).json({
                  message: 'Bad Request'
                });
              }else{
                res.json({
                  status: 200,
                  data: IndividualSub
                });
              }
            
            });
          
        });
        
        
        router.put('/updategetIndividualSub/:id',upload.single('image'),function(req,res){
            console.log(req.body);
                
                update = {
                  $set: {
                    heading:req.body.heading,
                    content:req.body.content,
                   price:req.body.price
                   
                  }
                };
                IndividualSubModel.findByIdAndUpdate(req.params.id,update, function (err,IndividualSub) {
                    if (err) {
                      console.error("err"+err)
                      return res.status(400).json({
                        message: 'Bad Request'
                      });
                    } else {
                      res.json({
                        status: 200,
                        data: IndividualSub
                      })
                    }
              
                  });
              });
        
              router.post('/deleteIndividualSub/:id',function(req,res){
                IndividualSubModel.findByIdAndRemove(req.params.id,function(err,IndividualSub){
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
