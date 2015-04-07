'use strict';

module.exports.generateRandomKey = function (len) {
  len = len || 10;
  return Math.random().toString(36).substring(2).substring(0, len);
};

module.exports.deepGet = function(collection, path){
  var current = collection,
      properties = path.split(".");

  properties.forEach(function(property) {
    if (current && property in current) {
      current = current[property];
    } else {
      current = undefined;
      return false;
    }
  });

  return current;
};

module.exports.deepSet = function(collection, path, value){
  var currentObject = collection,
      properties = path.split(".");

  properties.forEach(function(property, index) {
    if (index + 1 === properties.length) {
      currentObject[property] = value;
    } else if (!(typeof currentObject[property] == 'object')) {
      currentObject[property] = isArrayKey(properties[index + 1]) ? [] : {};
    }
    currentObject = currentObject[property];
  });

  return collection;
};

function isArrayKey(key){
  var array = [];
  array[key] = null;
  return array.length > 0;
}
