var _ = {};

// With context param
_.each = function (list, fn, context) {
  context = context || this;
  if (Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      fn.call(context, list[i], i, list);
    }
  } else {
    for (var key in list) {
      fn.call(context, list[key], key, list);
    }
  }
  return list;
};

_.identity = function (value) {
  return value;
};

_.first = function (list, item) {
  if (Array.isArray(list)) {
    var result = [];
    item = item || 1;
    for (var i = 0; i < item; i++) {
      result.push(list[i]);
    }
    return result;
  }
};

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

_.indexOf = function (array, value, isSorted) {
  isSorted = isSorted || false;
  if (array === undefined || value === undefined) {
    return -1;
  } else {
    var valueIndex = -1;
    if (isSorted) {
      // do binary search
      // create offset
      var offset = 0;
      // while array length > 0
      while (array.length > 0) {
        // grab second half
        var secondHalf = array.slice(Math.floor(array.length / 2));
        // see if lasthalf[0] < searchterm
        if (secondHalf[0] <= value) {
          // if so, discard the first half
          offset += Math.floor(array.length / 2);
          if (secondHalf[0] === value) {
            break;
          }
          array = secondHalf;
        } else {
          // if not, keep the first half
          array = array.slice(0, Math.floor(array.length / 2));
        }
      }
      return offset;
    } else {
      // search through elements in order
      for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
          valueIndex = i;
          break;
        }
      }
    }
    return valueIndex;
  }
};

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

_.reject = function (list, fn) {
  var newArray = [];
  if (list !== undefined) {
    for (var i = 0; i < list.length; i++) {
      if (!fn(list[i])) {
        newArray.push(list[i]);
      }
    }
    return newArray;
  } else {
    return [];
  }
};

_.uniq = function (list) {
  var newArray = [];
  if (list === undefined) return [];
  for (var i = 0; i < list.length; i++) {
    if (newArray.indexOf(list[i]) === -1) {
      newArray.push(list[i]);
    }
  }
  return newArray;
};

_.map = function (list, iteratee) {
  if (list === undefined) return [];
  var newArray = [];
  if (Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      newArray.push(iteratee(list[i]));
    }
  } else // if object
  {
    for (var key in list) {
      newArray.push(iteratee(list[key]));
    }
  }
  return newArray;
};

_.pluck = function (list, propertyName) {
  var propArray = _.map(list, function (item) {
    return item[propertyName];
  });
  return propArray;
};

_.where = function (list, properties) {
  var newArray = [];
  // iterate over every item in the array and push it to the new array if
  // every key/value pair in that properties match
  _.each(list, function (obj, ind) {
    var match = true;
    for (var key in properties) {
      if (obj[key] !== properties[key]) {
        match = false;
      }
    }   // end for key in ...
    if (match) newArray.push(obj);
  });
  return newArray;
};

_.contains = function (list, value) {
  if (list.indexOf(value) === -1) return false;
  return true;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
