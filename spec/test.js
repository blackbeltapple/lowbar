var _ = require('underscore');
var fun = function (num) {return num}
var res = _.reduce([1,2,3], function(memo, value, index, list) {
  
}, 1)
console.log(res)
