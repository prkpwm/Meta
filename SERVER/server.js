var express = require('express');
var app = express();
var axios = require("axios");
var cors = require('cors');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
let src = "localhost"
var url = `mongodb://${src}:27017/`;
console.log(url)
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

app.use(cors());

getLastDateInfo = async () => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("meta");
    let today = new Date();
    let start_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1) + "T00:00:00.000Z";
    let end_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1) + "T23:59:59.999Z";
    const pipeline = { "Datetime": { "$gte": new Date(start_date), "$lt": new Date(end_date) } }
    dbo.collection("sumOfDay").find(pipeline).toArray(function (err, result) {
      if (err) throw err;
      db.close();
      return result[0]
    });
  });
}

generateTodayDataOnStart = async () => {
  let today = new Date();
  let today_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() ) + "T00:00:00.000Z";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("meta");
    const pipeline = {}
    dbo.collection("sumOfDay").find(pipeline).toArray(function (err, result) {
      if (err) throw err;
      db.close();
      if(result[result.length - 1]['Datetime']!=today_date)
      {
        let v1 = result[result.length - 1]['revenue'] + Math.floor(Math.random() * (100000000 - 10000000 + 1) - (10000000))
        let v2 = result[result.length - 1]['profit'] + Math.floor(Math.random() * (10000000 - 1000000 + 1) - (1000000))
        let v3 = result[result.length - 1]['member'] + Math.floor(Math.random() * (1000000 - 100000 + 1) - (100000))
        let v4 = result[result.length - 1]['order'] + Math.floor(Math.random() * (100000 - 10000 + 1) - (10000))
        var myObj = { Datetime: new Date(today_date), revenue: v1, profit: v2, member: v3, order: v4 };
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("meta");
          dbo.collection("sumOfDay").insertOne(myObj, function (err, result) {
            if (err) throw err;
            console.log("1 document inserted")
            db.close();
          });
        });
      }
    });
  });
}

generateTodayDataOnStart()

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
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("meta");
    dbo.collection("sumOfDay").find({}).toArray(function (err, result) {
      if (err) throw err;
      response.send(
        result
      );
      db.close();
    });
  });
});

app.get("/getCountries", async function (request, response) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("meta");
    dbo.collection("countries").find({}).toArray(function (err, result) {
      if (err) throw err;
      response.send(
        result
      );
      db.close();
    });
  });
});




app.get("/getSumByName/:name", async function (request, response) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("meta");
    let namimg = '$' + request.params.name
    // console.log(namimg)
    const pipeline = [
      { $group: { "_id": 1, "summary": { $sum: namimg } } }
    ];
    dbo.collection("countries").aggregate(pipeline).toArray(function (err, result) {
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
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("meta");
    let today = new Date();
    let start_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "T00:00:00.000Z";
    let end_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "T23:59:59.999Z";
    // console.log(start_date,end_date)
    const pipeline = { "Datetime": { "$gte": new Date(start_date), "$lt": new Date(end_date) } }
    dbo.collection("sumOfDay").find(pipeline).toArray(function (err, result) {
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


