const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var resourceSchema = require('../../../app/models/resource');
var ResourceModel = mongoose.model('resource');



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
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//       cb(null, true);
//   } else {
//       cb(null, false);
//   }
// }
//fileFilter: fileFilter 



    router.post('/addResource',upload.single('image'),function(req,res){
        var resourceData = new ResourceModel({
            resourceName:req.body.resourceName,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
        });
        resourceData.save(function (err, result) {
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

  router.get('/getResources',function(req,res){
    ResourceModel.find({}).exec(function(err,Resource){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: Resource
        });
      }
    
    });
  
});


router.put('/updateResource/:id',upload.single('image'),function(req,res){
    console.log(req.body);
        
        update = {
          $set: {
            resourceName:req.body.resourceName,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        ResourceModel.findByIdAndUpdate(req.params.id,update, function (err,Resources) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: Resources
              })
            }
      
          });
      });

      router.post('/deleteResource/:id',function(req,res){
        ResourceModel.findByIdAndRemove(req.params.id,function(err,deleteresource){
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

    router.put('/removeResource/:id',function(req,res){
        var query = {_id:req.params.id}
        ResourceModel.findOneAndUpdate(query,{
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
