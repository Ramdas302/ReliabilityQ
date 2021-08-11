const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var skillSchema = require('../../../app/models/skill');
var SkillModel = mongoose.model('skill');



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


 
    router.post('/addskill',upload.single('image'),function(req,res){
        var courseData = new SkillModel({
            skillName:req.body.skillName,
            content:req.body.content,
            heading:req.body.heading,
            imageName: req.file.originalname,
            type:req.file.mimetype
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

  

  router.get('/getskill',function(req,res){
    SkillModel.find({}).exec(function(err,skill){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: skill
        });
      }
    
    });
  
});


router.put('/updateskill/:id',upload.single('image'),function(req,res){
        update = {
          $set: {
            skillName:req.body.skillName,
            content:req.body.content,
            heading:req.body.heading,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        SkillModel.findByIdAndUpdate(req.params.id,update, function (err,skill) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: skill
              })
            }
      
          });
      });

      router.post('/deleteskill/:id',function(req,res){
        SkillModel.findByIdAndRemove(req.params.id,function(err,deleteskill){
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

    router.put('/removeskillimage/:id',function(req,res){
        var query = {_id:req.params.id}
        SkillModel.findOneAndUpdate(query,{
            $set:{
            doc_id:null,
            imageName:null,
            type:null
            }
        },(err,someFiles)=>{
        if(err){
            console.err(err);
        }
        else{
            res.json({
                status:200,
                message:'Picture Removed Succesfully!!!'
            })
        }
        });
        });

  

module.exports=router;
