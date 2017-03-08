var ___ = require('underscore');

startArr = [1,2,3]
function triple (num) {
  console.log (num * 3);
  var answer = num * 3;
  return answer;
}
var arr = ___.each( startArr, triple);
console.log(startArr);
