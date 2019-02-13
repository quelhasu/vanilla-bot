var Weather = function () {};
const request = require("request");
const config = require('./config.js');



Weather.prototype.getDayWeather = (location, day, cb) => {
  if(day){
    request(
      "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&appid=" + config.weather_api,
      { json: true },
      (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        return cb({temp: body.list[0].main.temp,location: location, day: day, weather: body.list[0].weather[0].description });
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
        return cb({temp: body.main.temp, location: location, day: "today", weather: body.weather[0].description});
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
      return cb({temps: body.list.slice(0, 5).map(el => {return {temp:el.main.temp, weather: el.weather[0].description}}), location: location, day: "today"});
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
