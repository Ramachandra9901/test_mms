const express = require("express");
const mongoose = require("mongoose");
//const Router = require("./routes")
var request = require('request');
// let fetch = require('node-fetch');


const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.get("/job_types",(req, res1)=>{


  request('https://api.sekura.fleximc.com/cmms-prod/api/job-types', { headers:{ cookie:"token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhjMTFhYTZmNTk3YzViZDhjNjE5ZGQiLCJuYW1lIjoiU3lzdGVtIEFkbWluIiwiZmFjaWxpdGllcyI6WyJBMV9QU0VQTCIsIkRNVENMX0RhcmJoYW5nYSIsIkRNVENMX01vdGloYXJpIiwiQTEwX1NTVVBMIiwiQTExX0VTUEwiLCJBOF9VU1VQTCIsIkExMl9TUFVQTCIsIkEyX05TUFBMIiwiQTdfU1NFUEwiLCJBM19TU1BQTCIsIkE1X1NQUEwiLCJBOV9OU1VQTCIsIkE0X1NEUElQTCIsIkE2X1NVUEwiXSwicm9sZSI6IjYwOGMxMWFhNmY1OTdjNWJkOGM2MTlkYyIsImlhdCI6MTY1MzM5OTYwOCwiZXhwIjoxNjUzNDQyODA4fQ.m9VVLQbSXHQSNDsP2jtcDwuRcFd5ixGxWWrC6EZMKQQ"} }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body);
  res1.send(200, body);

  //console.log(body.explanation);
});

})

app.get("/assets",(req, res1)=>{


  request('https://api.sekura.fleximc.com/cmms-prod/api/A11_ESPL/assets?fields=alias', { headers:{ cookie:"token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhjMTFhYTZmNTk3YzViZDhjNjE5ZGQiLCJuYW1lIjoiU3lzdGVtIEFkbWluIiwiZmFjaWxpdGllcyI6WyJBMV9QU0VQTCIsIkRNVENMX0RhcmJoYW5nYSIsIkRNVENMX01vdGloYXJpIiwiQTEwX1NTVVBMIiwiQTExX0VTUEwiLCJBOF9VU1VQTCIsIkExMl9TUFVQTCIsIkEyX05TUFBMIiwiQTdfU1NFUEwiLCJBM19TU1BQTCIsIkE1X1NQUEwiLCJBOV9OU1VQTCIsIkE0X1NEUElQTCIsIkE2X1NVUEwiXSwicm9sZSI6IjYwOGMxMWFhNmY1OTdjNWJkOGM2MTlkYyIsImlhdCI6MTY1MzM5OTYwOCwiZXhwIjoxNjUzNDQyODA4fQ.m9VVLQbSXHQSNDsP2jtcDwuRcFd5ixGxWWrC6EZMKQQ"} }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body);
  res1.send(200, body);

  //console.log(body.explanation);
});

})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");


  var collections = mongoose.connections[0].collections;

    console.log(collections, db.config)
    let job_types = [];
    request('http://localhost:3000/job_types', { }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log("jobtypes",body);
      job_types = body;

      request('http://localhost:3000/assets', { }, (err, res, body) => {
        if (err) { return console.log(err); }
    let assets = body;
        
        console.log("assets",body);
      //  res1.send(200, body);
      
        //console.log(body.explanation);
      });

    });

//     const jobType = [{id:"60d02c51e904de0008770172","name":"ACDB"}];
//     const assets = [{id:"60d02c51e904de0008770172","name":"ITS01"}];

//     db.job_card.find({}).forEach(item =>{
//     var payload ={ addInAdvance: 7,
// addedBy: "608c11aa6f597c5bd8c619dd",// userid
// assets: assets.filter(obj => obj.name == "ITS01")[0].id,//assets.filter(key => key.name.indexOf(item.inverter + " "+ item.components) > -1)[0].id
// assignee: null,
// autoAssign: false,
// description: "",
// durationHrs: 1,
// facility: "A11_ESPL",
// jobType: jobType.filter(obj => obj.name == "ACDB")[0].id,// jobType.filter(key => key.name.indexOf(item.components + " "+ item.Activity) > -1)[0].id
// rrule: {freq: 2, interval: 1, dtstart: "2022-05-23T11:00:10.245Z", tzid: "Asia/Kolkata"},
// target: "Asset",
// timeZone: "Asia/Kolkata",
// title: jobType.filter(obj => obj.name == "ACDB")[0].name +"-"+ assets.filter(obj => obj.name == "ITS01")[0].name ,
// zones: null}


// request.post('https://api.sekura.fleximc.com/cmms-dev/api/A11_ESPL/schedules',{body:payload, headers:{cookie:"token="+""}}).then(res=>{
//     console.log("updated successfully")
// })

      
//     })

}); 


// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });
