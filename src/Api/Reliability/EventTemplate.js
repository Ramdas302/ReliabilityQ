const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var EventSchema = require('../../../app/models/event');
var EventModel = mongoose.model('event');

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
 



    router.post('/addEvent',upload.array('image'),function(req,res){
        console.log(req.body)
        var eventData = new EventModel({
            date:req.body.date,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype,
            
        });
        eventData.save(function (err, result) {
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

  router.get('/getEvent',function(req,res){
    EventModel.find({}).exec(function(err,event){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: event
        });
      }
    
    });
  
});


router.put('/updateEvent/:id',upload.array('image',2),function(req,res){
        update = {
          $set: {
            date:req.body.date,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        EventModel.findByIdAndUpdate(req.params.id,update, function (err,events) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: events
              })
            }
      
          });
      });

      router.post('/deleteEvent/:id',function(req,res){
        EventModel.findByIdAndRemove(req.params.id,function(err,deleteevent){
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
