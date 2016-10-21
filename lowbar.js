var _ = {};

_.each = function (list, item) {
  if(Array.isArray(list)){
    return [];

  }else{
    return {};
  }
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

if (typeof module !== 'undefined') {
  module.exports = _;
}
// _.last function//
//
