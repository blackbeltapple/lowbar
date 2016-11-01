var _ = require('underscore');

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];

var newArray = _.pluck(stooges, 'name');
console.log(newArray);
//["moe", "larry", "curly"]
var newArray2 = _.pluck(stooges2, 'name');
console.log(newArray2);
