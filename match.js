const pattern = require("./pattern.js").Pattern;

var Matcher = function () {};

Matcher.prototype.getIntent = (str, cb) => {
  let getResult = pattern.firstIntentDict.find(item => {
    if (str.match(item.pattern)){
      return true;
    }
  });
  if (getResult) return cb({ intent: getResult.intent });
  else return cb({});
};

Matcher.prototype.getEntities = (str, cb) => {
  var entities = {};
  var entitiesPatternDict = dictSelector(cb.intent);
  entitiesPatternDict.forEach(element => {
    if(str.match(element.pattern)){
      console.log(element.entity+":"+ str.match(element.pattern)[element.group]);
    }
  });
};

exports.Matcher = new Matcher();

dictSelector = (intent) => {
  switch (intent) {
    case "Weather":
      return pattern.weatherEntitiesDict;
      break;
  
    default:
      return [];
      break;
  }
}
