const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
var reviewratingSchema = require('../../../app/models/reviewrating');
var reviewratingModel = mongoose.model('reviewrating');

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



    router.post('/addrevirate',upload.single('image'),function(req,res){
        var reviewratingData = new reviewratingModel({
            Name:req.body.Name,
            Designation:req.body.Designation,
            company:req.body.company,
            content: req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
            
        });
        reviewratingData.save(function (err, result) {
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

  router.get('/getreviewrating',function(req,res){
    reviewratingModel.find({}).exec(function(err,result){
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


router.put('/updatereviewrating/:id',upload.single('image'),function(req,res){
    update = {
      $set: {
        Name:req.body.Name,
        Designation:req.body.Designation,
        comapany:req.body.comapany,
        content:req.body.content,
        imageName: req.file.filename,
        type:req.file.mimetype
      
       
      }
    };
    reviewratingModel.findByIdAndUpdate(req.params.id,update, function (err,review) {
        if (err) {
          console.error("err"+err)
          return res.status(400).json({
            message: 'Bad Request'
          });
        } else {
          res.json({
            status: 200,
            data: review
          })
        }
  
      });
  });



      router.post('/deletereviewrating/:id',function(req,res){
        reviewratingModel.findByIdAndRemove(req.params.id,function(err,result){
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
