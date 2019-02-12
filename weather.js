var Weather = function () {};
const request = require("request");
const config = require('./config.js');



Weather.prototype.getDayWeather = (location, day, cb) => {
  "api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml"
  "api.openweathermap.org/data/2.5/forecast?q={city name},{country code}"

  if(day){
    request(
      "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&appid=" + config.weather_api,
      { json: true },
      (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        return cb({temp: body.list[1].main.temp,location: location, day: day });
      }
    )
  }

  else {
    request(
      "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&appid=" + config.weather_api,
      { json: true },
      (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        return cb({temp: body.main.temp, location: location, day: "today"});
      }
    )
  }
};

Weather.prototype.getForecastWeather = (location, cb) => {
  request(
    "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&appid=" + config.weather_api,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      return cb({temps: body.list.slice(0, 5).map(el => {return el.main.temp}), location: location, day: "today"});
    }
  )
}

Weather.prototype.NLWeather = temp => {
  if(temp<5)
    {return "very cold";}
    else if(temp>=5 && temp<15)
      {return "pretty cold";}
    else if(temp>=15 && temp<25)
      {return "cold";}
    else if(temp>=25 && temp<32)
      {return "quite warm";}
    else if(temp>=32 && temp<40)
      {return "Hot";}
    else {return "Super Hot";}
}

exports.Weather = new Weather();
