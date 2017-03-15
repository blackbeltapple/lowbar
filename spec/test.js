var _ = require('underscore');
var expect = require('chai').expect;//

var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];
describe('xxxxxx', function () {

  it('returns element of undefined if input array contains an object without the propertyName', function () {
    expect(_.pluck(stooges2, 'name')).to.eql(['moe', undefined, 'curly']);
  });
  it('reduces correcly when not passed a memo and asked to total the squares of values', function () {
    expect(_.reduce([1, 2, 3], function (memo, num) { return memo + (num * num); })).to.eql(14);
  });
  it('reduces correctly when passed a memo, and asked to perform a sum ', function () {
    expect(_.reduce([2, 3, 4], function (memo, num) { return memo + num; }, 0)).to.eql(9);
  });
  it('reduces correctly when not passed a memo', function () {
    expect(_.reduce([2, 3, 4], function (memo, num) { return memo + num; })).to.eql(9);
  });
  it('reduces correctly when asked to total the squares of values', function () {
    expect(_.reduce([2, 3, 4], function (memo, num) { return memo + (num * num); }, 2)).to.eql(31);
  });
  it('reduces correcly when not passed a memo and asked to total the squares of values', function () {
    expect(_.reduce([2, 3, 4], function (memo, num) { return memo + (num * num); })).to.eql(27);
  });

})
