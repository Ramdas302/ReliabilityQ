const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var courseSchema = require('../../../app/models/course');
var CourseModel = mongoose.model('course');
var CategorySchema = require('../../../app/models/category');
var CategoryModel = mongoose.model('category');
var CertificationSchema = require('../../../app/models/certification');
var CertificationModel = mongoose.model('certification');
var IndustriesSchema = require('../../../app/models/industries');
var IndustrieModel = mongoose.model('industrie');
var GlobalExpertsSchema = require('../../../app/models/global_experts');
var GlobalExpertModel = mongoose.model('global_expert');
var ReliabilitySchema = require('../../../app/models/ReliabilityCourse');
var ReliabilityCourseModel = mongoose.model('ReliabilityCourse');
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
  

    router.get('/gettotalcount',async(req,res)=>{
        try{
            
        const totalcourses = await CourseModel.count({})
        var totalcategory = await CategoryModel.count({})
        const totalcertification = await CertificationModel.count({})
        var totalindustries = await IndustrieModel.count({})
        var totalglobalexpert = await GlobalExpertModel.count({})
        if(totalcourses){
            res.json({
                status: 200,
                totalcourses,
                totalcategory,
                totalcertification,
                totalindustries,
                totalglobalexpert


                
              });
            }
        }catch(ex){
            console.error(ex);
           }
      
      });



    router.post('/addReliabilitycourse',upload.single('image'),function(req,res){
        var addReabilitycourse = new ReliabilityCourseModel ({
          Reliability_Course:req.body.Reliability_Course,
            imageName: req.file.originalname,
            type:req.file.mimetype,
        });
        addReabilitycourse.save(function (err, result) {
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

  router.get('/getReliabilityCourse',function(req,res){
    ReliabilityCourseModel.find({}).exec(function(err,course){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data:course
        });
      }
    
    });
  
});





router.put('/updateCourse/:id',upload.single('image'),function(req,res){
    console.log(req.body);
        
        update = {
          $set: {
            Reliability_Course:req.body.Reliability_Course,
            imageName: req.file.originalname,
            type:req.file.mimetype,
          }
        };
        ReliabilityCourseModel.findByIdAndUpdate(req.params.id,update, function (err,course) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data:course
              })
            }
      
          });
      });

      router.post('/deleteprogram/:id',function(req,res){
        ReliabilityCourseModel.findByIdAndRemove(req.params.id,function(err,course){
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
