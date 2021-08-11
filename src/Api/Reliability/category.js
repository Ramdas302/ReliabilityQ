const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var CategorySchema = require('../../../app/models/category');
var CategoryModel = mongoose.model('category');

    router.post('/addCategory',function(req,res){
        var categoryData = new CategoryModel({
            categoryName:req.body.categoryName 
        });
        categoryData.save(function (err, result) {
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

  router.get('/getCategory',function(req,res){
    CategoryModel.find({}).exec(function(err,result){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: result
        });
      }
    
    });
  
});

router.put('/updatecategory/:id',function(req,res){
    update = {
      $set: {
        categoryName:req.body.categoryName 
      }
    };
    CategoryModel.findByIdAndUpdate(req.params.id,update, function (err,industries) {
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


      router.post('/deletecategory/:id',function(req,res){
        CategoryModel.findByIdAndRemove(req.params.id,function(err,result){
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
