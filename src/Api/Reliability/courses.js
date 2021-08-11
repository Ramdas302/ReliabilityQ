const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var courseSchema = require('../../../app/models/course');
var CourseModel = mongoose.model('course');



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



    router.post('/addCourse',upload.single('image'),function(req,res){
        var courseData = new CourseModel({
            courseName:req.body.courseName,
            content:req.body.content,
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

  router.get('/getCourses',function(req,res){
    CourseModel.find({}).exec(function(err,courses){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: courses
        });
      }
    
    });
  
});


router.put('/updatecourse/:id',upload.single('image'),function(req,res){
    console.log(req.body);
        
        update = {
          $set: {
            courseName:req.body.courseName,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        CourseModel.findByIdAndUpdate(req.params.id,update, function (err,courses) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: courses
              })
            }
      
          });
      });

      router.post('/deletecourse/:id',function(req,res){
        CourseModel.findByIdAndRemove(req.params.id,function(err,deletecourse){
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

    router.put('/removecourseimage/:id',function(req,res){
        var query = {_id:req.params.id}
        CourseModel.findOneAndUpdate(query,{
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
