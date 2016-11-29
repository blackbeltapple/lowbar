var _ = require('underscore');
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

console.log(_.pluck(stooges, 'name'));
