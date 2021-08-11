var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('./config/development')
var courses = require('./src/Api/Reliability/courses')
var skill = require('./src/Api/Reliability/skills')
var customer = require('./src/Api/Reliability/customer')
var reviewrating = require('./src/Api/Reliability/reviewrating')
var Thinking = require('./src/Api/Reliability/Thinking');
var career = require('./src/Api/Reliability/CareerTemplate');
var Resources = require('./src/Api/Reliability/Resource');
var EventTemplate = require('./src/Api/Reliability/EventTemplate');
var ContactUs = require('./src/Api/Reliability/ContactUs');
var About = require('./src/Api/Reliability/OurTeam');
var Solution = require('./src/Api/Reliability/Solution');
var CertificationTemplate = require('./src/Api/Reliability/CertificationTemplate');
var TailoredSolutions = require('./src/Api/Reliability/BusinessTemplate');
var Industries = require('./src/Api/Reliability/Industries');
var Category = require('./src/Api/Reliability/category');
var Global_Experts = require('./src/Api/Reliability/Global_Experts');
var Total_Count = require('./src/Api/Reliability/Total_Count');
var ProgramWebinarTemplate = require('./src/Api/Reliability/ProgramwebinarTemplate');
var app = express();
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.json('welcome to ReliabiltyQ')
})
app.use('/api',courses);
app.use('/api',skill);
app.use('/api',customer);
app.use('/api',reviewrating);
app.use('/api',Thinking);
app.use('/api',career);
app.use('/api',Resources);
app.use('/api',EventTemplate);
app.use('/api',ContactUs);
app.use('/api',About);
app.use('/api',Solution);
app.use('/api',CertificationTemplate);
app.use('/api',TailoredSolutions);
app.use('/api',Industries);
app.use('/api',Category);
app.use('/api',Global_Experts);
app.use('/api',Total_Count);
app.use('/api',ProgramWebinarTemplate);
app.listen(3000, () =>{
    console.log('server started at port 3000')
})