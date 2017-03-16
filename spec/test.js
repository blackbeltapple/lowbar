var _ = require('underscore');
var expect = require('chai').expect;//

var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];
describe('xxxxxx', function () {


  it('returns correct object when given one destination and one source', function () {
    expect(_.extend({name: 'moe'}, {age: 50})).to.eql({name: 'moe', age: 50});
  });
  it('returns correct object when given one destination and two sources', function () {
    expect(_.extend({name: 'moe'}, {age: 50}, {shoe: 10})).to.eql({name: 'moe', age: 50, shoe: 10});
  });
  it('returns correct object when given one destination and multiple sources', function () {
    expect(_.extend({name: 'moe'}, {age: 50}, {shoe: 10}, {chest: 34}, {waist: 32})).to.eql({name: 'moe', age: 50, shoe: 10, chest: 34, waist: 32});
  });

})
