"use strict";
const request = require("request");
const api_secret = "3256f19960bc8409e6825ee8382d1389";

const Readline = require("readline"); //for reading inputs
const rl = Readline.createInterface({
  //for reading inputs
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.setPrompt(">");
rl.prompt();
rl.on("line", reply => {
  // console.log(`you said ${reply}`);
  var location = getLocation(reply);
  request(
    "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&appid=" + api_secret,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log("Weather in " + location + " : " + body.main.temp + "°C");
    }
  );

  request(
    "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&appid=" + api_secret,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(`Weather for next 5 days in ${location} :`);
      for(var i=0; i< 5; i++){
        console.log(unixConverter(body.list[i].dt) + " " + body.list[i].main.temp + "°C")
      }
    }
  );

  rl.prompt();
});

function getLocation(reply) {
  var loc = "";
  if ((loc = reply.match(/(w|W)hat.*\b(in|of|at)\b (\w+)/, "i"))) return loc[3];
  else if ((loc = reply.match(/^.*\b(in|of|at)\b (\w+)/, "i"))) return loc[2];
}

function unixConverter(t) {
  return new Date(t*1000);
}
