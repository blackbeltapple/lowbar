/*
// DONE --------------------
// 1. identity
// 2. first
// 3. last
// 4. each
// 5. indexOf  (can't get binary search to work faster)
// 6. filter
// 7. reject

// 8. uniq
// 9. map
// 10. pluck
// 11. reduce
// 12. contains
// 13. every
// 14. some
// TO DO -----------------
// 15. extends
// 16. defaults
// 17. once
// 18. memoize
// 19. delay
// 20. shuffle
// 21. invoke
// 22. sortBy
// 23. zip
// 24. flatten
// 25. intersection
// 26. difference
// 27. throttle
*/

var _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (arr, num) {
  if (!arr) return undefined;
  return !num ? arr[0] : arr.slice(0, num);
};

_.last = function (arr, num) {
  if (!arr) return undefined;
  var len = arr.length;
  return !num ? arr[len - 1] : arr.slice(len - num);
};

_.each = function (list, iteratee, context) {
  iteratee = iteratee || _.identity;
  // if no context passed, default to this
  context = context || this;
  // handle arrays
  if (Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      iteratee.call(context, list[i], i, list);
    }
  } else if (typeof list === 'object') { // handle objects
    for (var key in list) {
      iteratee.call(context, list[key], key, list);
    }
  }
  return list;
};

_.indexOf = function (list, value, isSorted) {
  if (!list || !value) return -1;

  // use binary search for when isSorted is TRUE
  if (isSorted === true) {
    var offset = null;
    while (list.length > 1) { // slice in two - take second half
      var secondHalf = list.slice(Math.floor(list.length / 2));
      if (secondHalf[0] <= value) { // keep second half
        offset += Math.floor(list.length / 2);
        list = secondHalf;
      } else { // retain the first half
        list = list.slice(0, Math.floor(list.length / 2));
      }
    }
    return offset;
  }

  // perform standard search for when isSorted is not TRUE
  var startIndex;
  typeof isSorted === 'number' ? startIndex = isSorted + 1 : startIndex = 0;
  for (var i = startIndex; i < list.length; i++) {
    if (list[i] === value) return i - startIndex;
  }
  return -1;
};

_.filter = function (list, predicate, context) {
  list = list || [];
  predicate = predicate || _.identity;

  var filteredArray = [];
  for (var i = 0; i < list.length; i++) {
    if (predicate.call(context, list[i])) {
      filteredArray.push(list[i]);
    }
  }
  return filteredArray;
};

_.reject = function (list, predicate, context) {
  list = list || [];
  predicate = predicate || _.identity;

  var filteredArray = [];
  for (var i = 0; i < list.length; i++) {
    if (!predicate.call(context, list[i])) {
      filteredArray.push(list[i]);
    }
  }
  return filteredArray;
};

_.uniq = function (list) {
  /*
  var newArray = [];
  if (list === undefined) return [];
  for (var i = 0; i < list.length; i++) {
    if (newArray.indexOf(list[i]) === -1) {
      newArray.push(list[i]);
    }
  }
  return newArray;
  */

};

_.map = function (list, iteratee) {
  iteratee = iteratee || _.identity;
  if (list === undefined) return [];
  var newArray = [];
  if (Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      newArray.push(iteratee(list[i]));
    }
  } else { // if object
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

_.reduce = function (list, iteratee, memo) {
  var newList = list.slice();
  iteratee = iteratee || _.identity;
  if (memo === undefined) {
    newList = list.slice(1);
    memo = list[0];
  }
  _.each(newList, function (elem, ind, list) {
    memo = iteratee(memo, elem, ind, list);
  });
  return memo;
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
  list = list || [];
  if (list.indexOf(value) === -1) return false;
  return true;
};

_.every = function (list, predicate) {
  list = list || [];
  predicate = predicate || function (val) {};
  for (var i = 0; i < list.length; i++) {
    if (!predicate(list[i])) return false;
  }
  return true;
};

_.some = function (list, predicate) {
  list = list || [];
  predicate = predicate || function (val) {};
  var flag = false;
  for (var i = 0; i < list.length; i++) {
    if (predicate(list[i])) flag = true;
  }
  return flag;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
