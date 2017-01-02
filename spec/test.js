var _ = require('underscore');
var array = [1,2,3,4,5, 6, 7]
var first = array.slice(0, Math.floor(array.length/2))
var second = array.slice(Math.floor(array.length/2))
console.log(first, second)
