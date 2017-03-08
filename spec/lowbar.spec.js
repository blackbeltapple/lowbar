/* global describe, it */
var path = require('path');
var expect = require('chai').expect;
var sinon = require('sinon');

var _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  describe('#identity', function () {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });
    it('returns the same value as it is passed as an argument', function () {
      expect(_.identity(23)).to.equal(23);
      expect(_.identity('Test')).to.equal('Test');
      expect(_.identity({name: 'joe'})).to.eql({name: 'joe'});
      expect(_.identity(true)).to.be.true;
      expect(_.identity(null)).to.be.null;
      expect(_.identity(undefined)).to.be.undefined;
      expect(_.identity([1, 2, 3])).to.eql([1, 2, 3]);
    });
  });

  describe('#first', function () {
    it('is a function', function () {
      expect(_.first).to.be.a('function');
    });
    it('it accepts 1 or 2 arguments', function () {
      expect(_.first.length).to.be.within(1, 2);
    });
    it('returns the first item in array if only one argument passed', function () {
      expect(_.first([4, 6, 7, 8, 9])).to.eql(4);
      expect(_.first([[1, 2, 3], 8, 9])).to.eql([1, 2, 3]);
    });
    it('returns the first char if passed a string', function () {
      expect(_.first('Test')).to.eql('T');
    });
    it('returns multiple values from the head of given array', function () {
      expect(_.first([4, 6, 7, 8, 9], 3)).to.eql([4, 6, 7]);
    });
    it('it returns undefined if first arg is not an array or a string', function () {
      expect(_.first(false)).to.be.undefined;
      expect(_.first({name: 'moe'})).to.be.undefined;
      expect(_.first(99)).to.be.undefined;
      expect(_.first()).to.be.undefined;
    });
  });

  describe('#last', function () {
    it('is a function', function () {
      expect(_.last).to.be.a('function');
    });
    it('it accepts 1 or 2 arguments', function () {
      expect(_.last.length).to.be.within(1, 2);
    });
    it('returns the last item in array if only one argument passed', function () {
      expect(_.last([4, 6, 7, 8, 9])).to.eql(9);
      expect(_.last([[1, 2, 3], 8, 9])).to.eql(9);
      expect(_.last([[1, 2, 3], 8, 9, [1, 2]])).to.eql([1, 2]);
    });
    it('returns the last char if passed a string', function () {
      expect(_.last('Test')).to.eql('t');
    });
    it('returns multiple values from the tail of given array', function () {
      expect(_.last([4, 6, 7, 8, 9], 3)).to.eql([7, 8, 9]);
    });
    it('it returns undefined if last arg is not an array or a string', function () {
      expect(_.last(false)).to.be.undefined;
      expect(_.last({name: 'moe'})).to.be.undefined;
      expect(_.last(99)).to.be.undefined;
      expect(_.last()).to.be.undefined;
    });
  });

  describe.only('#each', function () {
    it('is a function', function () {
      expect(_.each).to.be.a('function');
    });
    it('accepts 2 or 3 arguments', function () {
      expect(_.each.length).to.be.within(2, 3);
    });
    it('passes each item in a list to a function', function () {
      var testArr = [];
      var testFn = function (value) { testArr.push(value); };
      _.each([1, 2, 3], testFn);
      expect(testArr).to.eql([1, 2, 3]);
    });
    it('passes each value in an object to a function', function () {
      var testArr = [];
      var testFn = function (value) { testArr.push(value); };
      _.each({ name: 'ada', age: '34' }, testFn);
      expect(testArr).to.eql(['ada', '34']);
    });
    it('calls the iteratee the correct number of times', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.each(myArray, spy);
      expect(spy.callCount).to.equal(4);
    });
    it('it calls the iterator with each element, index and array', function () {
      var arr = [1, 2, 3];
      var spy = sinon.spy();
      _.each(arr, spy);
      expect(spy.calledWith(1, 0, arr)).to.eql(true);
      expect(spy.calledWith(2, 1, arr)).to.eql(true);
      expect(spy.calledWith(3, 2, arr)).to.eql(true);
      expect(spy.calledWith(3, 3, [])).to.eql(false);
    });
    it('returns the original list, for chaining', function () {
      var testFn = function (item) { return item * 2; };
      expect(_.each([1, 2, 3], testFn)).to.eql([1, 2, 3]);
    });
    it('returns the original object, for chaining', function () {
      var testFn = function (item) { return item + '!'; };
      expect(_.each({name: 'ada', age: '34'}, testFn)).to.eql({name: 'ada', age: '34'});
    });
    it('binds to the context, if one is passed', function () {
      var myContext = {name: 'abc'};
      _.each([1, 2, 3], function () {
        this.name = 'new text';
      }, myContext);
      expect(myContext).to.eql({name: 'new text'});
    });
  });

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
    it('calls the iteratee correct number of times', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.filter(myArray, spy);
      expect(spy.callCount).to.equal(4);
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
    it('calls the iteratee correct number of times', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.reject(myArray, spy);
      expect(spy.callCount).to.equal(4);
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
    it('calls the iteratee correct number of times', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.map(myArray, spy);
      expect(spy.callCount).to.equal(4);
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
    it('is a function', function () {
      expect(_.reduce).to.be.a('function');
    });
    it('takes two to four parameters', function () {
      expect(_.reduce.length).to.equal(3);
    });
    it('returns correct value when passed memo ', function () {
      expect(_.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0)).to.eql(6);
    });
    it('returns correct value when not passed a memo', function () {
      expect(_.reduce([1, 2, 3], function(memo, num){ return memo + num; })).to.eql(6);
    });
    it('returns correct value when passed a memo and asked to total squares of vals', function () {
      expect(_.reduce([1, 2, 3], function(memo, num){ return memo + (num * num); }, 2)).to.eql(16);
    });
    it('returns correct value when not passed a memo and asked to total squares of vals', function () {
      expect(_.reduce([1, 2, 3], function(memo, num){ return memo + (num * num); })).to.eql(14);
    });
    it('calls the iteratee the correct number of times, when context passed', function () {
      var doubleSpy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.reduce(myArray, doubleSpy, 0);
      expect(doubleSpy.callCount).to.equal(4);
    });
    it('calls the iteratee one less time if no context passed', function () {
      var doubleSpy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.reduce(myArray, doubleSpy);
      expect(doubleSpy.callCount).to.equal(3);
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
    it('returns a boolean', function () {
      expect(_.contains()).to.be.a('boolean');
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
    it('returns true for ([1, 2, apple], apple)', function () {
      expect(_.contains([1, 2, 'apple'], 'apple')).to.be.true;
    });
    it('returns false for ([1, 2, pear], apple)', function () {
      expect(_.contains([1, 2, 'pear'], 'apple')).to.be.false;
    });
  });

  describe ('#every()', function () {
    it('is a function', function () {
      expect(_.every).to.be.a('function');
    });
    it('returns a boolean', function () {
      expect(_.every()).to.be.a('boolean');
    });
    it('expects two parameters', function () {
      expect(_.every.length).to.equal(2);
    });

    it('returns true if every element is true', function () {
      var result = _.every([true, true, true], function (element) {
        return !!element;
      });
      expect(result).to.equal(true);
    });
    it('returns false if every element is false', function () {
      var result = _.every([false, false, false], function (element) {
        return !!element;
      });
      expect(result).to.equal(false);
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


  });

  describe ('#some()', function () {
    it('is a function', function () {
      expect(_.some).to.be.a('function');
    });
    it('returns a boolean', function () {
      expect(_.some()).to.be.a('boolean');
    });
    it('expects two parameters', function () {
      expect(_.some.length).to.equal(2);
    });
  });

});
