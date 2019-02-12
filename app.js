"use strict";
const request = require("request");
const matcher = require("./match.js").Matcher;
const weather = require("./weather.js").Weather;

const Readline = require("readline"); //for reading inputs
const rl = Readline.createInterface({
  //for reading inputs
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.setPrompt("> ");
rl.prompt();
rl.on("line", reply => {
  matcher.getIntent(reply, cb => {
    switch (cb.intent) {
      case "Weather":
        matcher.getEntities(reply, cb.intent, cb => {
          if (!cb.entities.has("Location")) {
            console.log("Please give a real location !");
            rl.prompt();
          } else {
            if (cb.entities.has("Day") || !cb.entities.has("Forecast")) {
              weather.getDayWeather(cb.entities.get("Location"), cb.entities.get("Day"), cb => {
                console.log(`It's ${getFeel(cb.temp)} ${cb.day} in ${cb.location} with temp of ${cb.temp}°C`);
                rl.prompt();
              });
            }
            else if(cb.entities.has("Forecast")){
              weather.getForecastWeather(cb.entities.get("Location"), cb => {
                console.log(`The weather in ${cb.location} in the next 5 days :`);
                cb.temps.forEach(temp => {
                  console.log(`\tIt'll be ${getFeel(temp)} with temp of ${temp}°C`);
                });
                
                rl.prompt();
              })
            }
          }
        });
        break;
      case "Hello":
        console.log(`${cb.intent} to you!`);
        rl.prompt();
        break;
      case "Exit":
        console.log(`Goodbye bro!`);
        process.exit();
        break;
      default: {
        console.log("Sorry, don't understand!");
        rl.prompt();
      }
    }
  });
});

let getFeel = temp => {
  if(temp<5)
    {return "shivering cold";}
    else if(temp>=5 && temp<15)
      {return "pretty cold";}
    else if(temp>=15 && temp<25)
      {return "moderately cold";}
    else if(temp>=25 && temp<32)
      {return "quite warm";}
    else if(temp>=32 && temp<40)
      {return "Hot";}
    else {return "Super Hot";}
}
