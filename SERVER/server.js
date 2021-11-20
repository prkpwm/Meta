var express = require('express');
var app = express();
var axios = require("axios");
// var cheerio = require("cheerio");
var cors = require('cors');
// var fs = require('fs');
// const config = require('./config.example.json');
// const Redis = require('ioredis');
// const csv = require('csvtojson')



app.use(cors());

// // create redis instance :O
// const redis = new Redis(config.redis.host, {
//   password: config.redis.password
// })

// const keys = config.keys


// var getHistory = async () => {
//   let history = await axios.get(`https://pomber.github.io/covid19/timeseries.json`).then(async response => {
//     const res = response.data;
//     console.log(res)
//     const hKeys = Object.keys(res);
//     let newHistory = [];
//     for (key of hKeys) {
//       const newArr = res[key].map(({
//         confirmed: cases,
//         ...rest
//       }) => ({
//         cases,
//         ...rest
//       }));

//       newHistory.push({
//         country: key,
//         timeline: newArr
//       });
//     }
//     redis.set(keys.timeline, JSON.stringify(newHistory));
//     // let globalTimeline = JSON.stringify(await calculateAllTimeline(newHistory));
//     console.log(`Updated JHU CSSE Timeline`);
//   });
// }

// setInterval(getHistory, config.interval);


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


var listener = app.listen(process.env.PORT || 5001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// app.get("/all/", async function (req, res) {
//   // let all = JSON.parse(await redis.get(keys.all))
//   // res.send(all);
// });

