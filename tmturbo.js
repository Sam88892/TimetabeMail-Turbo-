var opn = require('opn');
var Nightmare = require('nightmare');  
var nightmare = Nightmare({ show: false });
var mongoose = require('mongoose');
var DB = require('nosql'); // import dependencies

var nosql = DB.load('../tmturbo/database.nosql'); // Connect to the database database.nosql

var login=process.argv[2]; // Put enter arguments in local variables
var password=process.argv[3];

var now = new Date();
var year   = now.getFullYear();
var month    = '0'+(now.getMonth()+1);
var day    = ('0'+now.getDate()).slice(-2);
var hour   = ('0'+now.getHours()).slice(-2);
var minute  = ('0'+now.getMinutes()).slice(-2);
var second = ('0'+now.getSeconds()).slice(-2);
connexionDate= year+"/"+month+"/"+year+"  "+hour+"h "+minute+"m "+second+"s"; //Get and set the date in connexionDate

nosql.insert({ connexionDate: connexionDate,login: process.argv[2]); // insert the connexion date, login and password in database.nosql 

console.log("Generating screenshots in progress...");

nightmare

  .viewport(1500,1500) // Define the viewport
  .goto('https://www.leonard-de-vinci.net/') // go to the webpage
  .insert('#login', login)
  .insert('#pass', password)  // insert login and password
  .click('#btn_connect') // click on the connexion button
  .goto('https://www.leonard-de-vinci.net/?my=edt') // go to the webpage
  .wait()
  .screenshot('../tmturbo/timetable.png') // Take a screenshot
  .goto('https://mailetu.devinci.fr/SOGo/') // go to the webpage
  .insert('#userName', login)
  .insert('#password', password) // insert login and password
  .click('#submit') // click on the connexion button
  .wait(3000)
  .screenshot('../tmturbo/mails.png') // Take a screenshot

  
 
  .end()
  .then(function () {
   opn('../tmturbo/timetable.html'); // Open edt.html in a new window
   console.log("Generation of screenshots succeeded ! ");
  
  })

  .catch(function (error) {
    console.error('Connect failed', error);
  });
  

 




