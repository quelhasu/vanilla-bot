var Pattern = function() {
   this.firstIntentDict = [
    // {
    //   pattern: /((w|W)hat)?.*\b(in|of|at)\b (\w+)/i,
    //   intent: "Location"
    // },
    {
      pattern: /rainy|rain|sunny|sun|cloudy|cloud|cold|hot|weather/i,
      intent: "Weather"
    }
  ];

  this.weatherEntitiesDict = [
    {
      pattern: /\b(in|of|at)\b (\w+|-)/i,
      entity: "Location",
      group: 2
    },
    {
      pattern: /(days|week)/i,
      entity: "Forecast",
      group: 1
    },
    {
      pattern: /(tomorrow|today)/i,
      entity: "Day",
      group: 1
    },
    {
      pattern: /(rainy|rain|sunny|sun|cloudy|cloud|cold|hot)/i,
      entity: "Kind",
      group: 1
    },
    

  ]
};

exports.Pattern = new Pattern();