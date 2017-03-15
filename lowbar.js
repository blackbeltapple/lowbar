/*

DONE --------------------
1. identity
2. first
3. last
4. each
5. indexOf  (can't get binary search to work faster)
6. filter
7. reject
8. uniq
9. map
10. pluck
11. reduce
12. contains
13. every
14. some
Additional: where

TO DO -----------------
15. extends
16. defaults
17. once
18. memoize
19. delay
20. shuffle
21. invoke
22. sortBy
23. zip
24. flatten
25. intersection
26. difference
27. throttle

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

_.uniq = function (list, isSorted, iteratee) {
  list = list || [];
  isSorted = isSorted || false;
  iteratee = iteratee || _.identity;

  var uniqueArray = [];
  for (var i = 0; i < list.length; i++) {
    if (isSorted && (list[i] === list[i - 1])) {
      continue; // skip this iteration if this element is same as previous element
    }
    if (uniqueArray.indexOf(list[i]) === -1) {
      uniqueArray.push(list[i]);
    }
  }
  return uniqueArray;
};

_.map = function (list, iteratee, context) {
  list = list || [];
  iteratee = iteratee || _.identity;
  context = context || this;

  var result = [];
  if (Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      result.push(iteratee.call(context, list[i], i, list));
    }
  } else if (typeof (list) === 'object') {
    for (var key in list) {
      result.push(iteratee.call(context, list[key], key, list));
    }
  }
  return result;
};

_.pluck = function (list, propertyName) {
  return _.map(list, function (obj) {
    return obj[propertyName];
  });
};

_.reduce = function (list, iteratee, memo, context) {
  var copyList = list;

  if (memo === undefined) {
    // make a copy of the list which we can modify
    copyList = list.slice();
    memo = copyList.shift();
  }
  for (var i = 0; i < copyList.length; i++) {
    memo = iteratee.call(context, memo, copyList[i], i, copyList);
  }
  return memo;
};

_.contains = function (list, value, fromIndex) {
  fromIndex = fromIndex || 0;
  return _.indexOf(list.slice(fromIndex), value) !== -1;
};

_.every = function (list, predicate, context) {
  list = list || [];
  predicate = predicate || _.identity;
  for (var i = 0; i < list.length; i++) {
    if (!predicate.call(context, list[i])) return false;
  }
  return true;
};

_.some = function (list, predicate, context) {
  list = list || [];
  predicate = predicate || _.identity;
  for (var i = 0; i < list.length; i++) {
    if (predicate.call(context, list[i])) return true;
  }
  return false;
};

_.where = function (list, properties) {
  properties = properties || {};
  var result = [];
  _.each(list, function (obj) {
    var match = true;
    for (var key in properties) {
      if (properties[key] !== obj[key]) {
        match = false;
        break;
      }
    }
    if (match) result.push(obj);
  });
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
