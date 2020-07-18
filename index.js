const bodyParser = require('body-parser');
const express = require("express");
const moment = require("moment");
const app = express();
const fetch = require("node-fetch");
const fs = require('fs');
const http = require('http');
const axios = require('axios');

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.listen(3000, () => console.log("Listening...."));

app.use(express.static('public'));
app.use(express.json());



// var date1 = new Date();
// date1.setHours(2);
// date1.setMinutes(0);
// date1.setSeconds(0);
// date1.setMilliseconds(0);
// var date1_ISO = date1.toISOString().split('.')[0]+"Z";

// var date0 = moment(date1).subtract(30, 'days').toISOString().split('.')[0]+"Z";

// console.log(date1_ISO);
// console.log(date0);

let refreshData = () => {
    fetch(`http://corona-stats.mobi/api/json.2.0.php?key=T7aV0XHBeMtDFEiz69dY`)
    .then(res => res.json())
    .then(info => {
        console.log(info);
        app.get('/api', (req, res) => {
        res.json(info);
        });
})
};

let rate = 10800000; // 3 Hours

refreshData();

setInterval(() => {
    refreshData();
}, rate);
