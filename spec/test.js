var _ = require('underscore');
var expect = require('chai').expect;//

var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];
describe('pluck', function () {

  it('returns element of undefined if input array contains an object without the propertyName', function () {
    expect(_.pluck(stooges2, 'name')).to.eql(['moe', undefined, 'curly']);
  });
})
