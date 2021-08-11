const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var IndustriesSchema = require('../../../app/models/industries');
var IndustrieModel = mongoose.model('industrie');

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
 



    router.post('/addindustries',upload.array('image'),function(req,res){
        var industriesData = new IndustrieModel({
            industrieName:req.body.industrieName,
            content:req.body.content,
            imageName: req.files[0].originalname,
            type:req.files[0].mimetype,
            
        });
        industriesData.save(function (err, result) {
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

  router.get('/getindustries',function(req,res){
    IndustrieModel.find({}).exec(function(err,industries){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: industries
        });
      }
    
    });
  
});


router.put('/updateindustries/:id',upload.single('image'),function(req,res){
        update = {
          $set: {
            industrieName:req.body.industrieName,
            content:req.body.content,
            imageName: req.files[0].originalname,
            type:req.files[0].mimetype,  
          }
        };
        IndustrieModel.findByIdAndUpdate(req.params.id,update, function (err,industries) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: industries
              })
            }
      
          });
      });

      router.post('/deleteIndustries/:id',function(req,res){
        IndustrieModel.findByIdAndRemove(req.params.id,function(err,industrie){
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

    router.put('/removeimage/:id',function(req,res){
        var query = {_id:req.params.id}
        IndustrieModel.findOneAndUpdate(query,{
            $set:{
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
