const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var GlobalExpertsSchema = require('../../../app/models/global_experts');
var GlobalExpertModel = mongoose.model('global_expert');


// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
//   }

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

 



    router.post('/addexperts',upload.single('image'),function(req,res){
        var expertData = new GlobalExpertModel({
            Name:req.body.Name,
            content:req.body.content,
            linkedin:req.body.linkedin,
            // twitter:req.body.twitter,
            // gmail:req.body.gmail,
            imageName: req.file.originalname,
            type:req.file.mimetype
        });
        expertData.save(function (err, result) {
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

  router.get('/getGlobalexperts',function(req,res){
    GlobalExpertModel.find({}).exec(function(err,experts){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: experts
        });
      }
    
    });
  
});


router.put('/updateGlobalExper/:id',upload.single('image'),function(req,res){

        update = {
          $set: {
            Name:req.body.Name,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        GlobalExpertModel.findByIdAndUpdate(req.params.id,update, function (err,experts) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: experts
              })
            }
      
          });
      });

      router.post('/deleteGlobalexperts/:id',function(req,res){
        GlobalExpertModel.findByIdAndRemove(req.params.id,function(err,deleteExperts){
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

    router.put('/removepicture/:id',function(req,res){
        var query = {_id:req.params.id}
        GlobalExpertModel.findOneAndUpdate(query,{
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
                message:' Picture Removed Succesfully!!!'
            })
        }
        });
        });

  

module.exports=router;
