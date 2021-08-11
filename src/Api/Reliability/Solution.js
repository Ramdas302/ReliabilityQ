const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var SolutionSchema = require('../../../app/models/solution');
var SolutionModel = mongoose.model('solution');


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



    router.post('/addSolution',upload.single('image'),function(req,res){
        var SolutionData = new SolutionModel({
            content:req.body.content,
            heading:req.body.heading,
            imageName: req.file.originalname,
            type:req.file.mimetype
        });
        SolutionData.save(function (err, result) {
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

  router.get('/getSolution',function(req,res){
    SolutionModel.find({}).exec(function(err,solutions){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: solutions
        });
      }
    
    });
  
});


router.put('/updateSolution/:id',upload.single('image'),function(req,res){
        update = {
          $set: {
            content:req.body.content,
            heading:req.body.heading,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        SolutionModel.findByIdAndUpdate(req.params.id,update, function (err,solution) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: solution
              })
            }
      
          });
      });

      router.post('/deleteSolution/:id',function(req,res){
        SolutionModel.findByIdAndRemove(req.params.id,function(err,deleteSolution){
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

    router.put('/removesolutImage/:id',function(req,res){
        var query = {_id:req.params.id}
        SolutionModel.findOneAndUpdate(query,{
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
