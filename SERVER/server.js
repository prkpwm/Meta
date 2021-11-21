var express = require('express');
var app = express();
var axios = require("axios");
var cors = require('cors');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
let src = "localhost"
var url = `mongodb://${src}:27017/`;
console.log(url)
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

app.use(cors());


app.get("/", async function (request, response) {
  console.log("hello");
  response.send(
    `Hello`
  );
});

app.get("/getSimpleData", async function (request, response) {
  let history = await axios.get(`https://raw.githubusercontent.com/prkpwm/Meta/main/SERVER/Data/head.json`).then(async res => {
    return res.data
  })
  response.send(
    history
  );
});


app.get("/getTimeLineData", async function (request, response) {
  let history = await axios.get(`https://raw.githubusercontent.com/prkpwm/Meta/main/SERVER/Data/jsonFile.json`).then(async res => {
    return res.data
  })
  response.send(
    history
  );
});


app.get("/getTimeLine", async function (request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("meta");
    dbo.collection("sumOfDay").find({}).toArray(function(err, result) {
      if (err) throw err;
      response.send(
        result
      );
      db.close();
    });
  });
});

app.get("/getCountries", async function (request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("meta");
    dbo.collection("countries").find({}).toArray(function(err, result) {
      if (err) throw err;
      response.send(
        result
      );
      db.close();
    });
  });
});




app.get("/getSumByName/:name", async function (request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("meta");
    let namimg = '$'+request.params.name
    // console.log(namimg)
    const pipeline = [
      { $group: { "_id": 1, "summary": {$sum: namimg} } }
    ];
    dbo.collection("countries").aggregate(pipeline).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result)
      response.send(
        result[0]
      );
      db.close();
    });
  });
});

app.get("/getTodayData", async function (request, response) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("meta");
    var today = new Date();
    var start_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+"T00:00:00.000Z";
    var end_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+"T23:59:59.999Z";
    // console.log(start_date,end_date)
    const pipeline ={"Datetime": {"$gte": new Date(start_date) , "$lt": new Date(end_date)}} 
    dbo.collection("sumOfDay").find(pipeline).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result)
      
      response.send(
        result[0]
      );
      db.close();
    });
  });
});



app.post("/save", async function (request, response) {
  console.log(request.body)
  response.send(
    request.body
  );
});



var listener = app.listen(process.env.PORT || 5001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});


