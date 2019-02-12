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

exports.Weather = new Weather();
