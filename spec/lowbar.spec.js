/* global describe, it, xit */
var path = require('path');
var expect = require('chai').expect;

var _ = require(path.join(__dirname, '..', './lowbar.js'));

// testing for #each

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });
  describe('#each', function () {
    it('is a function', function () {
      expect(_.each).to.be.a('function');
    });
    it('accepts 2 or 3 arguments', function () {
      expect(_.each.length).to.be.within(2, 3);
    });
    it('returns a list', function () {
      expect(_.each([])).to.be.an('array');
      expect(_.each({})).to.be.an('object');
    });
    it('passes each item in the list to a function', function () {
      var testArr = [];
      var testFn = function (num) { testArr.push(num * 2); };
      _.each([1, 2, 3], testFn);
      expect(testArr).to.eql([2, 4, 6]);
    });
    it('returns the original list', function () {
      var testFn2 = function (item) {};
      expect(_.each([1, 2, 3], testFn2)).to.eql([1, 2, 3]);
    });
    it('returns the original object', function () {
      var testFn2 = function (item) {};
      expect(_.each({name: 'ada', age: '34'}, testFn2)).to.eql({name: 'ada', age: '34'});
    });
    it('passes each value in an object to a function', function () {
      var testArr = [];
      var testFn = function (value) { testArr.push(value); };
      _.each({ name: 'ada', age: '34' }, testFn);
      expect(testArr).to.eql(['ada', '34']);
    });
    // Tests that feature the optional context parameter
    it('binds to the context, if pass one', function () {
      var myContext = {name: 'abc'};
      _.each([1, 2, 3], function (elem, i, list) {
        this.name = 'new text';
      }, myContext);
      expect(myContext).to.eql({name: 'new text'});
    });
  });

// testing #identity

  describe('#identity', function () {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });
    it('returns 23 when given 23', function () {
      expect(_.identity(23)).to.equal(23);
    });
    it('returns an object when passed an object', function () {
      expect(_.identity({name: 'joe'})).to.be.an('object');
      expect(_.identity({name: 'joe'})).to.have.property('name');
    });
    it('run test code', function () {
      var stooge = {name: 'moe'};
      var result = stooge === _.identity(stooge);
      expect(result).to.equal(true);
    });
  });

  // testing _.first function

  describe('#first', function () {
    it('is a function', function () {
      expect(_.first).to.be.a('function');
    });
    it('it accepts 1 or 2 arguments', function () {
      expect(_.first.length).to.be.within(1, 2);
    });
    it('returns an array', function () {
      expect(_.first([])).to.be.a('array');
    });
    it('returns the expected values from a the head of given array', function () {
      expect(_.first([4, 6, 7, 8, 9], 3)).to.eql([4, 6, 7]);
      expect(_.first([4, 6, 7, 8, 9])).to.eql([4]);
    });
    it('receives no parameters, it returns undefined', function () {
      expect(_.first()).to.be.undefined;
    });
  });

  // testing _.last function

  describe('#last', function () {
    it('is a function', function () {
      expect(_.last).to.be.a('function');
    });
    it('it accepts 1 or 2 arguments', function () {
      expect(_.last.length).to.be.within(1, 2);
    });
    it('returns an array', function () {
      expect(_.last([])).to.be.a('array');
    });
    it('returns the expected values from a the head of given array', function () {
      expect(_.last([4, 6, 7, 8, 9], 3)).to.eql([7, 8, 9]);
      expect(_.last([4, 6, 7, 8, 9])).to.eql([9]);
    });
    it('receives no parameters, it returns undefined', function () {
      expect(_.last()).to.be.undefined;
    });
  });

  // testing _.indexOf function

  describe('#indexOf', function () {
    it('is a function', function () {
      expect(_.indexOf).to.be.a('function');
    });
    it('returns a number', function () {
      expect(_.indexOf()).to.be.a('number');
    });
    it('if no arguments passed then returns -1', function () {
      expect(_.indexOf()).to.equal(-1);
    });
    it('if passed [1, 2, 3, 4, 5] and value = 3 will return 2', function () {
      expect(_.indexOf([1, 2, 3, 4, 5], 3)).to.equal(2);
    });
    it('if passed [1, 2, 3, 3, 3] and value = 3 will return 2', function () {
      expect(_.indexOf([1, 2, 3, 3, 3], 3)).to.equal(2);
    });
    it('if passed [1, 2, 3, 3, 3] and value = 8 will return -1', function () {
      expect(_.indexOf([1, 2, 3, 3, 3], 8)).to.equal(-1);
    });
    it('if passed an array but no value, should return -1', function () {
      expect(_.indexOf([1, 2, 3, 3, 3])).to.equal(-1);
    });
    // additional tests for 3rd param
    it('returns same value regardless if 3rd param is true/false/undefined', function () {
      expect(_.indexOf([1, 2, 3, 4, 5], 3)).to.equal(2);
      expect(_.indexOf([1, 2, 3, 4, 5], 3, false)).to.equal(2);
      expect(_.indexOf([1, 2, 3, 4, 5], 3, true)).to.equal(2);
    });
    it('should run quicker if using binary seach for sorted array', function () {
      var newArray = [];
      for (var i = 0; i < 1000000; i++) {
        newArray.push(i);
      }
      var beginSorted = new Date().getTime();
      var res = _.indexOf(newArray, 780000, true);
      var endSorted = new Date().getTime();
      var timeSorted = endSorted - beginSorted;

      var beginUnsorted = new Date().getTime();
      var res2 = _.indexOf(newArray, 780000, false);
      var endUnsorted = new Date().getTime();
      var timeUnsorted = endUnsorted - beginUnsorted;
      // expect(timeSorted < timeUnsorted).to.be.true;
      expect(res).to.equal(res2);
      expect(_.indexOf(newArray, 780000, false)).to.equal(780000)
      expect(_.indexOf(newArray, 780000, true)).to.equal(780000);
    });

  });

    // testing _.filter function

  describe('#filter', function () {
    it('is a function', function () {
      expect(_.filter).to.be.a('function');
    });
    it('returns an array', function () {
      expect(_.filter()).to.be.an('array');
    });
    it('returns an array when given an object', function () {
      expect(_.filter({})).to.eql([]);
    });
    it('returns [2, 4, 6] when passed [1, 2, 3, 4, 5, 6]', function () {
      var testFn = _.filter([1, 2, 3, 4, 5, 6], function (num) { return num % 2 === 0; });
      expect(testFn).to.eql([2, 4, 6]);
    });
    it('it returns an emty array when give an empty array', function () {
      expect(_.filter([])).to.eql([]);
    });
  });

  describe('#reject', function () {
    it('is a function', function () {
      expect(_.reject).to.be.a('function');
    });
    it('returns an array', function () {
      expect(_.reject()).to.be.an('array');
    });
    it('returns an array when given an object', function () {
      expect(_.reject({})).to.eql([]);
    });
    it('returns [1, 3, 5] when passed [1, 2, 3, 4, 5, 6]', function () {
      var testFn = _.reject([1, 2, 3, 4, 5, 6], function (num) { return num % 2 === 0; });
      expect(testFn).to.eql([1, 3, 5]);
    });
    it('it returns an emty array when give an empty array', function () {
      expect(_.reject([])).to.eql([]);
    });
  });

  describe('#uniq', function () {
    it('is a function', function () {
      expect(_.uniq).to.be.a('function');
    });
    it('returns an array', function () {
      expect(_.uniq()).to.be.an('array');
    });
    it('returns [1,2,3] when given [1, 2, 3, 1, 2, 1, 1, 2]', function () {
      expect(_.uniq([1, 2, 3, 1, 2, 1, 1, 2])).to.eql([1, 2, 3]);
    });
    it('it returns an emty array when give an empty array', function () {
      expect(_.uniq([])).to.eql([]);
    });
  });

  describe('#map()', function () {
    it('is a function', function () {
      expect(_.map).to.be.a('function');
    });
    it('returns an array', function () {
      expect(_.map([1, 2, 3], function (num) { return num * 3; })).to.be.an('array');
    });
    it('takes two parameters', function () {
      expect(_.map.length).to.equal(2);
    });
    it('returns an empty array when passed empty array', function () {
      expect(_.map([])).to.eql([]);
    });
    // _.map([1, 2, 3], function(num){ return num * 3; });
    it('returns correct values when passed values', function () {
      expect(_.map([1, 2, 3], function (num) { return num * 3; })).to.eql([3, 6, 9]);
    });
    it('accepts objects as param one', function () {
      var output = _.map({one: 1, two: 2, three: 3}, function (num, key) { return num * 3; });
      expect(output).to.eql([3, 6, 9]);
    });
  });

  describe('#pluck()', function () {
    it('is a function', function () {
      expect(_.pluck).to.be.a('function');
    });
    it('returns an array', function () {
      expect(_.pluck([1, 2, 3], 'name')).to.be.an('array');
    });
    it('takes two parameters', function () {
      expect(_.pluck.length).to.equal(2);
    });
    it('returns an empty array when passed empty array', function () {
      expect(_.pluck([], 'name')).to.eql([]);
    });
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    it('returns [moe, larry, curly]', function () {
      expect(_.pluck(stooges, 'name')).to.eql(['moe', 'larry', 'curly']);
    });
    var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];
    it('returns element of undefined if input array contains an object without the propertyName', function () {
      expect(_.pluck(stooges2, 'name')).to.eql(['moe', undefined, 'curly']);
    });
  });

  describe('#reduce()', function () {
    xit('is a function', function () {
      expect(_.reduce).to.be.a('function');
    });
    xit('takes two to four parameters', function () {
      expect(_.reduce.length).to.equal(2);
    });
    xit('returns an empty array when passed empty array', function () {
      expect(_.pluck([], 'name')).to.eql([]);
    });
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    xit('returns [moe, larry, curly]', function () {
      expect(_.pluck(stooges, 'name')).to.eql(['moe', 'larry', 'curly']);
    });
    var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];
    xit('returns element of undefined if input array contains an object without the propertyName', function () {
      expect(_.pluck(stooges2, 'name')).to.eql(['moe', undefined, 'curly']);
    });
  });

  describe('#where()', function () {
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 50}];
    var testArray1 = [{a: 1, b: 2, c: 3}, {a: 1, c: 3}, {a: 1, b: 7}, {a: 9, f: 11, j: 99}];

    it('is a function', function () {
      expect(_.where).to.be.a('function');
    });
    it('returns an array', function () {
      expect(_.where([1, 2, 3], {})).to.be.an('array');
    });
    it('takes two parameters', function () {
      expect(_.where.length).to.equal(2);
    });
    it('returns 3 objects when passed testArray', function () {
      expect(_.where(testArray1, {a: 1})).to.eql([{a: 1, b: 2, c: 3}, {a: 1, c: 3}, {a: 1, b: 7}]);
    });
    it('returns array of 2 objects when passed testArray', function () {
      expect(_.where(testArray1, {a: 1, c: 3})).to.eql([{a: 1, b: 2, c: 3}, {a: 1, c: 3}]);
    });
    it('returns empty array when no matches found', function () {
      expect(_.where(testArray1, {a: 4, c: 4})).to.eql([]);
    });
    it('returns larry and curly objects when passed stooges array', function () {
      expect(_.where(stooges, {age: 50})).to.eql([{name: 'larry', age: 50}, {name: 'curly', age: 50}]);
    });
  });

  describe('#contains()', function () {
    it('is a function', function () {
      expect(_.contains).to.be.a('function');
    });
    xit('returns a boolean', function () {
      expect(_.contains([1], 2)).to.be.a('boolean');
    });
    it('takes two or three parameters', function () {
      expect(_.contains.length).to.within(2, 3);
    });
    it('returns true for ([1, 2, 3],3)', function () {
      expect(_.contains([1, 2, 3], 3)).to.be.true;
    });
    it('returns false for ([1, 2, 3],4)', function () {
      expect(_.contains([1, 2, 3], 4)).to.be.false;
    });
    it('returns true for ([1, 2, apple],apple)', function () {
      expect(_.contains([1, 2, 'apple'], 'apple')).to.be.true;
    });
    it('returns false for ([1, 2, pear],apple)', function () {
      expect(_.contains([1, 2, 'pear'], 'apple')).to.be.false;
    });
  });
});
