var _ = require('underscore');
var expect = require('chai').expect;//

var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];
describe('xxxxxx', function () {

  it('returns true if passed no predicate', function () {
    expect(_.some([1, 2, 3])).to.be.true;
  });
  it('returns false if passed no list', function () {
    expect(_.some()).to.be.false;
  });
})
