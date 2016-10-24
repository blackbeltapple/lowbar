var _ = {};

_.each = function (list, fn) {
  if (Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      fn(list[i]);
    }
  } else {
    for (var key in list) {
      fn(list[key]);
    }
  }
  return list;
};

// _.identity function//
//
_.identity = function (value) {
  return value;
};

// _.first function//
//
_.first = function (list, item) {
  if (Array.isArray(list)) {
    var result = [];
    if (item === undefined) {
      item = 1;
    }
    for (var i = 0; i < item; i++) {
      result.push(list[i]);
    }
    return result;
  }
};

// _.last function//
//
_.last = function (list, item) {
  if (Array.isArray(list)) {
    var result = [];
    if (item === undefined) {
      item = 1;  // default value if no param given
    }
    for (var i = list.length - item; i < list.length; i++) {
      result.push(list[i]);
    }
    return result;
  }
};

// _.indexOf function//

_.indexOf = function (array, value) {
  if (array === undefined || value === undefined) {
    return -1;
  } else {
    var valueIndex = -1;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) {
        valueIndex = i;
        break;
      }
    }
    return valueIndex;
  }
};

// _.filter function//

_.filter = function (list, fn) {
  var newArray = [];
  if (list !== undefined) {
    for (var i = 0; i < list.length; i++) {
      if (fn(list[i])) {
        newArray.push(list[i]);
      }
    }
    return newArray;
  } else {
    return [];
  }
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
// _.last function//
//
