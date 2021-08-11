const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var OfferingSchema = require('../../../app/models/offering');
var OfferingModel = mongoose.model('offering');
var ProductPlatSchema = require('../../../app/models/product');
var ProductModel = mongoose.model('product');
var OthersSchema = require('../../../app/models/others');
var OtherModel = mongoose.model('other');




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

 
 
    router.post('/addoffering',upload.single('image'),function(req,res){
        var offeringData = new OfferingModel({
            offeringName:req.body.offeringName,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype,
            imageType:req.body.imageType
        });
        offeringData.save(function (err, result) {
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

  router.get('/getoffering',function(req,res){
    OfferingModel.find({}).exec(function(err,offering){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: offering
        });
      }
    
    });
  
});



router.get('/getimagetype/:imageType',function(req,res){
  OfferingModel.find({imageType:req.params.imageType}).exec(function(err,offering){
    if(err){
      return res.status(400).json({
        message: 'Bad Request'
      });
    }else{
      res.json({
        status: 200,
        data: offering
      });
    }
  
  });

});


router.put('/updateoffering/:id',upload.single('image'),function(req,res){
    console.log(req.body);
        
        update = {
          $set: {
            offeringName:req.body.offeringName,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype,
            imageType:req.body.imageType
           
          }
        };
        OfferingModel.findByIdAndUpdate(req.params.id,update, function (err,offering) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: offering
              })
            }
      
          });
      });

      router.post('/deleteoffering/:id',function(req,res){
        OfferingModel.findByIdAndRemove(req.params.id,function(err,deleteoffering){
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

    router.post('/addproduct',upload.single('image'),function(req,res){
        var productData = new ProductModel({
            productName:req.body.productName,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
        });
        productData.save(function (err, result) {
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

  router.get('/getproduct',function(req,res){
    ProductModel.find({}).exec(function(err,product){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: product
        });
      }
    
    });
  
});


router.put('/updateproduct/:id',upload.single('image'),function(req,res){
        
        update = {
          $set: {
            productName:req.body.productName,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        ProductModel.findByIdAndUpdate(req.params.id,update, function (err,products) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: products
              })
            }
      
          });
      });

      router.post('/deleteproduct/:id',function(req,res){
        OfferingModel.findByIdAndRemove(req.params.id,function(err,deleteproduct){
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



    router.post('/addothers',upload.single('image'),function(req,res){
        var othersData = new OtherModel({
            Name:req.body.Name,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
        });
        othersData.save(function (err, result) {
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

  router.get('/getothers',function(req,res){
    OtherModel.find({}).exec(function(err,others){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: others
        });
      }
    
    });
  
});


router.put('/updateothers/:id',upload.single('image'),function(req,res){
        update = {
          $set: {
            Name:req.body.Name,
            content:req.body.content,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        OtherModel.findByIdAndUpdate(req.params.id,update, function (err,others) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: others
              })
            }
      
          });
      });

      router.post('/deleteothers/:id',function(req,res){
        OtherModel.findByIdAndRemove(req.params.id,function(err,deleteothers){
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
