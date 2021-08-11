const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var ProWebinarSchema = require('../../../app/models/ProgramWebinar');
var ProgramWebinarModel = mongoose.model('programwebinar');


const path = require('path');
const multer = require('multer');

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
  

    router.post('/addprogramwebinar',upload.single('image'),function(req,res){
        var addprogramwebinar = new ProgramWebinarModel ({
            Name:req.body.Name,
            Content:req.body.Content,
            imageName: req.file.originalname,
            imagetype:req.file.mimetype,
            type:req.body.type
        });
        addprogramwebinar.save(function (err, result) {
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

  router.get('/getReliabilityProgram',function(req,res){
    ReliabilityProgramModel.find({}).exec(function(err,Programs){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data:Programs
        });
      }
    
    });
  
});





router.put('/updateProgram/:id',upload.single('image'),function(req,res){
    console.log(req.body);
        
        update = {
          $set: {
            Heading:req.body.Heading,
            imageName: req.file.originalname,
            type:req.file.mimetype,
            imageType:req.body.imageType
           
          }
        };
        ReliabilityProgramModel.findByIdAndUpdate(req.params.id,update, function (err,programs) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data:programs
              })
            }
      
          });
      });

      router.post('/deleteprogram/:id',function(req,res){
        ReliabilityProgramModel.findByIdAndRemove(req.params.id,function(err,deleteprogram){ele
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
