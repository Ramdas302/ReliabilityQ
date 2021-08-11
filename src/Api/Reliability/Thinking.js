const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
var ThinkingSchema = require('../../../app/models/Thinking');
var ThinkingModel = mongoose.model('Thinking');


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


    router.post('/addthinking',upload.single('image'),function(req,res){
        var ThinkingData = new ThinkingModel({
            date:req.body.date,
            content: req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
            
        });
        ThinkingData.save(function (err, result) {
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

  router.get('/getthinking',function(req,res){
    ThinkingModel.find({}).exec(function(err,result){
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


router.put('/updateThinking/:id',upload.single('image'),function(req,res){
    update = {
      $set: {
        date:req.body.date,
        content:req.body.content,
        imageName: req.file.originalname,
        type:req.file.mimetype
      
       
      }
    };
    ThinkingModel.findByIdAndUpdate(req.params.id,update, function (err,thinking) {
        if (err) {
          console.error("err"+err)
          return res.status(400).json({
            message: 'Bad Request'
          });
        } else {
          res.json({
            status: 200,
            data: thinking
          })
        }
  
      });
  });



      router.post('/deleteThinking/:id',function(req,res){
        ThinkingModel.findByIdAndRemove(req.params.id,function(err,result){
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
