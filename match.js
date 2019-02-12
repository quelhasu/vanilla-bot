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

Matcher.prototype.getEntities = (str, intent, cb) => {
  var entities = new Map();
  var entitiesPatternDict = dictSelector(intent);
  entitiesPatternDict.forEach(element => {
    if(str.match(element.pattern)){
      entities.set(element.entity, str.match(element.pattern)[element.group])
    }
  });
  return cb({entities:entities});
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
