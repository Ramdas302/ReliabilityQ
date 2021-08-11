const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
var TaiailloredSolutSchema = require('../../../app/models/TailoredSolution');
var TaiailloredSoluModel = mongoose.model('TailoredSolution');
var RebliAdvantageSolutSchema = require('../../../app/models/ReliaAdvantage');
var  ReliabilityAdavModel = mongoose.model('rebliadvantage');
var BusinessResourceSchema = require('../../../app/models/BusinessResource');
var  BusinessresourceModel = mongoose.model('Businessresource');
var TestimonialSchema = require('../../../app/models/Testimonials');
var  TestimonialModel = mongoose.model('Testimonial');
var BrandPartResourceSchema = require('../../../app/models/BrandsPartner');
var  BrandPartnerModel = mongoose.model('BrandPartner');

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
 



    router.post('/addTailoredSolution',upload.single('image'),function(req,res){
        console.log(req.body)
        var addTailoredSolution = new TaiailloredSoluModel({
            content:req.body.content,
            heading:req.body.heading,
            imageName:req.file.originalname,
            type:req.file.mimetype,
            
        });
        addTailoredSolution.save(function (err, result) {
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

  router.get('/getaddTailoredSolution',function(req,res){
    TaiailloredSoluModel.find({}).exec(function(err,event){
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


router.put('/updateaddTailoredSolution/:id',upload.single('image'),function(req,res){
        update = {
          $set: {
            content:req.body.content,
            heading:req.body.heading,
            imageName: req.file.originalname,
            type:req.file.mimetype
           
          }
        };
        TaiailloredSoluModel.findByIdAndUpdate(req.params.id,update, function (err,TailoredSolution) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: addTailoredSolution
              })
            }
      
          });
      });

      router.post('/deleteaTailoredSolution/:id',function(req,res){
        TaiailloredSoluModel.findByIdAndRemove(req.params.id,function(err,TailoredSolution){
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

    router.put('/removeTailoredSolution/:id',function(req,res){
        var query = {_id:req.params.id}
        TaiailloredSoluModel.findOneAndUpdate(query,{
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

  
        router.post('/addReablityAdvan',upload.single('image'),function(req,res){
            var addReablityAdvan = new ReliabilityAdavModel({
                content:req.body.content,
                heading:req.body.heading,
                imageName:req.file.originalname,
                type:req.file.mimetype,
                
            });
            addReablityAdvan.save(function (err, result) {
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
    
      router.get('/getReliabilityAda',function(req,res){
        ReliabilityAdavModel.find({}).exec(function(err,adavatage){
          if(err){
            return res.status(400).json({
              message: 'Bad Request'
            });
          }else{
            res.json({
              status: 200,
              data: adavatage
            });
          }
        
        });
      
    });
    
    
    router.put('/updateReliabilityAdav/:id',upload.single('image'),function(req,res){
            update = {
              $set: {
                content:req.body.content,
                heading:req.body.heading,
                imageName: req.file.originalname,
                type:req.file.mimetype
               
              }
            };
            ReliabilityAdavModel.findByIdAndUpdate(req.params.id,update, function (err,RebAdvantage) {
                if (err) {
                  console.error("err"+err)
                  return res.status(400).json({
                    message: 'Bad Request'
                  });
                } else {
                  res.json({
                    status: 200,
                    data: RebAdvantage
                  })
                }
          
              });
          });
    
          router.post('/deleteReliabilityAdav/:id',function(req,res){
            ReliabilityAdavModel.findByIdAndRemove(req.params.id,function(err,advantage){
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
    
        router.put('/removerebadvantage/:id',function(req,res){
            var query = {_id:req.params.id}
            ReliabilityAdavModel.findOneAndUpdate(query,{
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
    
            router.post('/addBusinessResource',upload.single('image'),function(req,res){
              var resourceData = new BusinessresourceModel({
                  resourceName:req.body.resourceName,
                  date:req.body.date,
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
      
        router.get('/getBusinessResources',function(req,res){
          BusinessresourceModel.find({}).exec(function(err,Resource){
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
      
      
      router.put('/updateBusinessResource/:id',upload.single('image'),function(req,res){
          console.log(req.body);
              
              update = {
                $set: {
                  resourceName:req.body.resourceName,
                  content:req.body.content,
                  date:req.body.date,
                  imageName: req.file.originalname,
                  type:req.file.mimetype
                 
                }
              };
              BusinessresourceModel.findByIdAndUpdate(req.params.id,update, function (err,Resources) {
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
      
            router.post('/deleteBusinessResource/:id',function(req,res){
              BusinessresourceModel.findByIdAndRemove(req.params.id,function(err,deleteresource){
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
      
        


              router.post('/addTestimonial',upload.single('image'),function(req,res){
                var TestimonialData = new TestimonialModel({
                    Name:req.body.Name,
                    content:req.body.content,
                    imageName: req.file.originalname,
                    type:req.file.mimetype
                });
                TestimonialData.save(function (err, result) {
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
        
          router.get('/getTestimonial',function(req,res){
            TestimonialModel.find({}).exec(function(err,Testimonial){
              if(err){
                return res.status(400).json({
                  message: 'Bad Request'
                });
              }else{
                res.json({
                  status: 200,
                  data: Testimonial
                });
              }
            
            });
          
        });
        
        
        router.put('/updateTestimonial:id',upload.single('image'),function(req,res){
            console.log(req.body);
                
                update = {
                  $set: {
                    Name:req.body.Name,
                    content:req.body.content,
                    imageName: req.file.originalname,
                    type:req.file.mimetype
                   
                  }
                };
                TestimonialModel.findByIdAndUpdate(req.params.id,update, function (err,Testimonial) {
                    if (err) {
                      console.error("err"+err)
                      return res.status(400).json({
                        message: 'Bad Request'
                      });
                    } else {
                      res.json({
                        status: 200,
                        data: Testimonial
                      })
                    }
              
                  });
              });
        
              router.post('/deleteTestimonial/:id',function(req,res){
                TestimonialModel.findByIdAndRemove(req.params.id,function(err,deleteTestimonial){
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
        
           


            router.post('/addBrandPartner',upload.single('image'),function(req,res){
              var BrandPartner = new BrandPartnerModel({
                  imageName: req.file.originalname,
                  type:req.file.mimetype
              });
              BrandPartner.save(function (err, result) {
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
      
        router.get('/getBranPartners',function(req,res){
          BrandPartnerModel.find({}).exec(function(err,BrandPartner){
            if(err){
              return res.status(400).json({
                message: 'Bad Request'
              });
            }else{
              res.json({
                status: 200,
                data: BrandPartner
              });
            }
          
          });
        
      });
      
      
      router.put('/updateBranPartner:id',upload.single('image'),function(req,res){
          console.log(req.body);
              
              update = {
                $set: {
                  imageName: req.file.originalname,
                  type:req.file.mimetype
                 
                }
              };
              BrandPartnerModel.findByIdAndUpdate(req.params.id,update, function (err,BrandPartner) {
                  if (err) {
                    console.error("err"+err)
                    return res.status(400).json({
                      message: 'Bad Request'
                    });
                  } else {
                    res.json({
                      status: 200,
                      data: BrandPartner
                    })
                  }
            
                });
            });
      
            router.post('/deletePartner/:id',function(req,res){
              BrandPartnerModel.findByIdAndRemove(req.params.id,function(err,BrandPartner){
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
