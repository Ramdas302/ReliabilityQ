const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var TeamSchema = require('../../../app/models/team');
var TeamModel = mongoose.model('ourteam');


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

 



    router.post('/addTeam',upload.single('image'),function(req,res){
        var TeamData = new TeamModel({
            Name:req.body.Name,
            content:req.body.content,
            linkedin:req.body.linkedin,
            // twitter:req.body.twitter,
            // gmail:req.body.gmail,
            imageName: req.file.originalname,
            type:req.file.mimetype
        });
        TeamData.save(function (err, result) {
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

  router.get('/getTeam',function(req,res){
    TeamModel.find({}).exec(function(err,Teams){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: Teams
        });
      }
    
    });
  
});


router.put('/updateTeam/:id',upload.single('image'),function(req,res){

        update = {
          $set: {
            Name:req.body.Name,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        TeamModel.findByIdAndUpdate(req.params.id,update, function (err,Teams) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: Teams
              })
            }
      
          });
      });

      router.post('/deleteteams/:id',function(req,res){
        TeamModel.findByIdAndRemove(req.params.id,function(err,deleteteams){
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

    router.put('/removeTeams/:id',function(req,res){
        var query = {_id:req.params.id}
        TeamModel.findOneAndUpdate(query,{
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
