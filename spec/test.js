var _ = require('underscore');
var expect = require('chai').expect;//

var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];
describe('xxxxxx', function () {

  it('is a function', function () {
    expect(_.every).to.be.a('function');
  });
  it('expects three parameters', function () {
    expect(_.every.length).to.equal(3);
  });
  it('returns true if every single element passes the truth test', function () {
    var result = _.every([2, 4, 6, 8, 10, 12], function (element) {
      return element % 2 === 0;
    });
    expect(result).to.equal(true);
  });
  it('returns false if a single element fails the truth test', function () {
    var result = _.every([2, 4, 6, 8, 10, 11], function (element) {
      return element % 2 === 0;
    });
    expect(result).to.equal(false);
  });
  it('returns false if all elements fail the truth test', function () {
    var result = _.every([1, 3, 5, 7, 9], function (element) {
      return element % 2 === 0;
    });
    expect(result).to.equal(false);
  });
  it('returns true if passed no predicate', function () {
    expect(_.every([1, 2, 3])).to.equal(true);
  });
  it('returns true if passed no list', function () {
    expect(_.every()).to.equal(true);
  });

})
