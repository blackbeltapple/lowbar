var _ = require('underscore');
var expect = require('chai').expect;//

var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];
describe('xxxxxx', function () {

  it('returns an empty array when no list or properties passed', function () {
    expect(_.where()).to.eql([]);
  });
  it('returns original array when no properties are passed', function () {
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 50}];

    expect(_.where(stooges)).to.eql(stooges);
  });

})
