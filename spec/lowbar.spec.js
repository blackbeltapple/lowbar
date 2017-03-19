/* global describe, it, xit, xdescribe */
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

    it('accepts 1 or 2 arguments', function () {
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

    it('returns undefined if last arg is not an array or a string', function () {
      expect(_.last(false)).to.be.undefined;
      expect(_.last({name: 'moe'})).to.be.undefined;
      expect(_.last(99)).to.be.undefined;
      expect(_.last()).to.be.undefined;
    });
  });

  describe('#each', function () {
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

    it('calls the iterator with each element, index and array', function () {
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

    it('accepts 2 or 3 arguments', function () {
      expect(_.indexOf.length).to.be.within(2, 3);
    });

    it('will return correct index for found values', function () {
      expect(_.indexOf([1, 2, 3, 4, 5], 3)).to.equal(2);
      expect(_.indexOf([1, 2, 3, 4, 5], 1)).to.equal(0);
      expect(_.indexOf([1, 2, 3, 4, 5], 5)).to.equal(4);
      expect(_.indexOf(['the', 'quick', 'brown'], 'brown')).to.equal(2);
    });

    it('will return index of first instance if array contains multiple instances of value', function () {
      expect(_.indexOf([1, 2, 3, 3, 3], 3)).to.equal(2);
      expect(_.indexOf(['the', 'brown', 'brown'], 'brown')).to.equal(1);
    });

    it('returns -1 if value not found', function () {
      expect(_.indexOf([1, 2, 3, 3, 3], 8)).to.equal(-1);
      expect(_.indexOf(['the', 'quick', 'brown'], 'blue')).to.equal(-1);
    });

    it('returns -1 if passed an array but no search value', function () {
      expect(_.indexOf([1, 2, 3, 3, 3])).to.equal(-1);
    });

    it('always returns same value regardless of whether 3rd param is true/false/undefined', function () {
      expect(_.indexOf([1, 2, 3, 4, 5], 3)).to.equal(2);
      expect(_.indexOf([1, 2, 3, 4, 5], 3, false)).to.equal(2);
      expect(_.indexOf([1, 2, 3, 4, 5], 3, true)).to.equal(2);
    });

    xit('should run quicker if using binary search for sorted array', function () {
      var newArray = [];
      for (var i = 0; i < 1000000; i++) {
        newArray.push(i);
      }
      var beginSorted = new Date().getTime();
      var resSorted = _.indexOf(newArray, 780000, true);
      var endSorted = new Date().getTime();
      var timeSorted = endSorted - beginSorted;

      var beginUnsorted = new Date().getTime();
      var resUnsorted = _.indexOf(newArray, 780000, false);
      var endUnsorted = new Date().getTime();
      var timeUnsorted = endUnsorted - beginUnsorted;

      expect(timeSorted < timeUnsorted).to.be.true;
      expect(resSorted).to.equal(resUnsorted);
      expect(_.indexOf(newArray, 780000, false)).to.equal(780000);
      expect(_.indexOf(newArray, 780000, true)).to.equal(780000);
    });

    it('returns -1 if no arguments passed', function () {
      expect(_.indexOf()).to.equal(-1);
    });

    it('will return correct index for found values', function () {
      expect(_.indexOf([1, 2, 3, 4, 3], 3, 2)).to.equal(1);
      expect(_.indexOf([1, 2, 3, 4, 3], 3, 3)).to.equal(0);
      expect(_.indexOf([1, 2, 3, 4, 5], 3, 2)).to.equal(-1);
    });
  });

  describe('#filter', function () {
    it('is a function', function () {
      expect(_.filter).to.be.a('function');
    });

    it('returns an array', function () {
      expect(_.filter()).to.be.an('array');
    });

    it('returns array containing the values that pass the predicate truth test', function () {
      var testFn = _.filter([1, 2, 3, 4, 5, 6], function (num) { return num % 2 === 0; });
      expect(testFn).to.eql([2, 4, 6]);
    });

    it('returns the same array when no predicate is passed', function () {
      expect(_.filter([1, 2, 3, 4])).to.eql([1, 2, 3, 4]);
    });

    it('calls the iteratee the correct number of times', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.filter(myArray, spy);
      expect(spy.callCount).to.equal(4);
    });

    it('uses the context correctly when one is passed', function () {
      var obj = {val: 25};
      var myArray = [11, 22, 33, 44];
      var predicate = function (element) {
        return element > this.val;
      };
      expect(_.filter(myArray, predicate, obj)).to.eql([33, 44]);
    });
  });

  describe('#reject', function () {
    it('is a function', function () {
      expect(_.reject).to.be.a('function');
    });

    it('returns an array', function () {
      expect(_.reject()).to.be.an('array');
    });
    it('returns array containing the values that pass the predicate truth test', function () {
      var testFn = _.reject([1, 2, 3, 4, 5, 6], function (num) { return num % 2 === 0; });
      expect(testFn).to.eql([1, 3, 5]);
    });

    it('returns an empty array when no predicate is passed', function () {
      expect(_.reject([1, 2, 3, 4])).to.eql([]);
    });

    it('calls the iteratee the correct number of times', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.reject(myArray, spy);
      expect(spy.callCount).to.equal(4);
    });

    it('uses the context correctly when one is passed', function () {
      var obj = {val: 25};
      var myArray = [11, 22, 33, 44];
      var predicate = function (element) {
        return element > this.val;
      };
      expect(_.reject(myArray, predicate, obj)).to.eql([11, 22]);
    });
  });

  describe('#uniq', function () {
    it('is a function', function () {
      expect(_.uniq).to.be.a('function');
    });

    it('returns an array', function () {
      expect(_.uniq()).to.be.an('array');
    });

    it('returns unique values only, when isSorted is false', function () {
      expect(_.uniq([1, 2, 3, 1, 2, 1, 1, 2], false)).to.eql([1, 2, 3]);
      expect(_.uniq([1, 3, 2, 3, 1, 2, 1, 1, 2], false)).to.eql([1, 3, 2]);
      expect(_.uniq(['one', 'two', 'two', 'three', 'one', 'two', 'three'], false)).to.eql(['one', 'two', 'three']);
    });

    it('returns unique values only, for sorted arrays', function () {
      expect(_.uniq([1, 1, 2, 2, 2, 3], true)).to.eql([1, 2, 3]);
    });

    it('it returns an empty array when passed an empty array', function () {
      expect(_.uniq([])).to.eql([]);
    });

    it('completes quicker when isSorted is set to true', function () {
      // get time for a big unsorted array
      var bigUnsortedArray = Array(2000000).fill(2);
      bigUnsortedArray.fill(1, 1000000, 2000000);
      var unsortedTime1 = new Date().getTime();
      var unsortedRes = _.uniq(bigUnsortedArray, false);
      var unsortedTime2 = new Date().getTime();
      var unsortedTime = unsortedTime2 - unsortedTime1;

      // get time for a big sorted array
      var bigSortedArray = Array(2000000).fill(1);
      bigSortedArray.fill(2, 1000000, 2000000);
      var sortedTime1 = new Date().getTime();
      var sortedRes = _.uniq(bigSortedArray, true);
      var sortedTime2 = new Date().getTime();
      var sortedTime = sortedTime2 - sortedTime1;

      // compare the two times
      expect(sortedRes).to.eql([1, 2]);
      expect(unsortedRes).to.eql([2, 1]);
      expect(sortedTime).to.be.below(unsortedTime);
    });
  });

  describe('#map', function () {
    it('is a function', function () {
      expect(_.map).to.be.a('function');
    });

    it('takes two or three parameters', function () {
      expect(_.map.length).to.be.within(2, 3);
    });

    it('returns array containing correct values when passed an array', function () {
      expect(_.map([1, 2, 3], function (num) { return num * 3; })).to.eql([3, 6, 9]);
      expect(_.map(['one', 'two', 'three'], function (val) { return val + '!'; })).to.eql(['one!', 'two!', 'three!']);
    });

    it('returns array containing correct values when passed an object', function () {
      var output1 = _.map({one: 1, two: 2, three: 3}, function (num, key) { return num * 3; });
      expect(output1).to.eql([3, 6, 9]);
    });

    it('returns a completely new array, different from the original array', function () {
      var input = [1, 2, 3];
      var output = _.map(input, function (num) { return num; });
      expect(input).to.not.equal(output);
      expect(input).to.eql(output);
    });

    it('calls the iteratee the correct number of times', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.map(myArray, spy);
      expect(spy.callCount).to.equal(4);
    });

    it('passes the correct three args to the iteratee', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.map(myArray, spy);
      var args = spy.getCalls()[0].args;
      expect(args).to.eql([1, 0, [1, 2, 3, 4]]);
      args = spy.getCalls()[1].args;
      expect(args).to.eql([2, 1, [1, 2, 3, 4]]);
    });

    it('returns an identical array when passed no iteratee', function () {
      var myArray = [1, 2, 3, 4];
      var output = _.map(myArray);
      expect(output).to.eql([1, 2, 3, 4]);
    });

    it('uses the correct context when one is passed', function () {
      var contextObject = {age: 21};
      var myArray = [1, 2, 3, 4];
      function addAge (element) { return element + this.age; }
      var output = _.map(myArray, addAge, contextObject);
      expect(output).to.eql([22, 23, 24, 25]);
    });

    it('does not modify the original list', function () {
      var myArray = [1, 2, 3, 4];
      _.map(myArray, function (num) { return num * 2; });
      expect(myArray).to.eql([1, 2, 3, 4]);
    });
  });

  describe('#pluck', function () {
    it('is a function', function () {
      expect(_.pluck).to.be.a('function');
    });

    it('takes two parameters', function () {
      expect(_.pluck.length).to.equal(2);
    });

    it('returns an empty array when passed empty array', function () {
      expect(_.pluck([], 'name')).to.eql([]);
    });

    it('plucks the correct properties', function () {
      var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      expect(_.pluck(stooges, 'name')).to.eql(['moe', 'larry', 'curly']);
    });

    it('returns element of undefined if input array contains an object without the propertyName', function () {
      var stooges2 = [{name: 'moe', age: 40}, {age: 50}, {name: 'curly', age: 60}];
      expect(_.pluck(stooges2, 'name')).to.eql(['moe', undefined, 'curly']);
    });
  });

  describe('#reduce', function () {
    it('is a function', function () {
      expect(_.reduce).to.be.a('function');
    });

    it('takes four parameters', function () {
      expect(_.reduce.length).to.equal(4);
    });

    it('reduces correctly when passed a memo, and asked to perform a sum ', function () {
      expect(_.reduce([2, 3, 4], function (memo, num) { return memo + num; }, 10)).to.eql(19);
    });

    it('reduces correctly when not passed a memo, uses first element as memo', function () {
      expect(_.reduce([2, 3, 4], function (memo, num) { return memo + num; })).to.eql(9);
    });

    it('reduces correctly when asked to total the squares of values', function () {
      expect(_.reduce([2, 3, 4], function (memo, num) { return memo + (num * num); }, 2)).to.eql(31);
    });

    it('reduces correctly when not passed a memo and asked to total the squares of values', function () {
      expect(_.reduce([2, 3, 4], function (memo, num) { return memo + (num * num); })).to.eql(27);
    });

    it('returns undefined if an empty array is passed', function () {
      expect(_.reduce([], function (memo, num) { return memo + (num * num); })).to.eql(undefined);
    });

    it('does not modify the original list', function () {
      var myArray = [2, 3, 4];
      _.reduce(myArray, function (memo, num) { return memo + (num * num); });
      expect(myArray).to.eql([2, 3, 4]);
    });

    it('calls the iteratee the correct number of times, when context passed', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.reduce(myArray, spy, 10);
      expect(spy.callCount).to.equal(4);
    });

    it('calls the iteratee one less time if no memo passed', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.reduce(myArray, spy);
      expect(spy.callCount).to.equal(3);
    });

    it('passes the correct arguments to the first call to the iteratee', function () {
      var spy = sinon.spy();
      var myArray = [1, 2, 3, 4];
      _.reduce(myArray, spy, 10);
      var args = spy.getCalls()[0].args;
      expect(args).to.eql([10, 1, 0, [1, 2, 3, 4]]);
    });

    it('uses the context correctly if passed one', function () {
      var contextObj = {size: 6};
      var myArray = [1, 2, 3, 4];
      var myFunc = function (memo, num) { return memo + num + this.size; };
      expect(_.reduce(myArray, myFunc, 0, contextObj)).to.eql(34);
    });
  });

  describe('#contains', function () {
    it('is a function', function () {
      expect(_.contains).to.be.a('function');
    });

    it('takes three parameters', function () {
      expect(_.contains.length).to.equal(3);
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

    it('functions correctly when given a fromIndex', function () {
      expect(_.contains([1, 2, 3], 1, 0)).to.be.true;
      expect(_.contains([1, 2, 3], 1, 1)).to.be.false;
      expect(_.contains([1, 2, 3, 4, 5, 6], 3, 2)).to.be.true;
      expect(_.contains([1, 2, 3, 4, 5, 6], 3, 3)).to.be.false;
    });
  });

  describe('#every', function () {
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

    it('executes the predicate function the correct number of times', function () {
      var predicate = function (element) {
        return element % 2 === 0;
      };
      var predicateSpy = sinon.spy(predicate);
      _.every([2, 4, 6, 8, 10, 12], predicateSpy);
      expect(predicateSpy.callCount).to.equal(6);
    });

    it('executes the predicate function the minimum number of times (until it finds a false)', function () {
      var predicate = function (element) {
        return element % 2 === 0;
      };
      var predicateSpy = sinon.spy(predicate);
      _.every([2, 4, 6, 8, 11, 12], predicateSpy);
      expect(predicateSpy.callCount).to.equal(5);
    });

    it('uses the context correctly when given one', function () {
      var contextObj = {size: 5};
      var lessThan10 = function (element) {
        return element + this.size < 10;
      };
      expect(_.every([1, 2, 3, 4], lessThan10, contextObj)).to.be.true;
      expect(_.every([1, 2, 3, 4, 5], lessThan10, contextObj)).to.be.false;
    });
  });

  describe('#some', function () {
    it('is a function', function () {
      expect(_.some).to.be.a('function');
    });

    it('expects three parameters', function () {
      expect(_.some.length).to.equal(3);
    });

    it('returns true when the list contains at least one element that passes the predicate test', function () {
      var myFunc = function (element) { return element === 2; };
      expect(_.some([1, 2, 3], myFunc)).to.be.true;
    });

    it('returns false when the list contains no elements that pass the predicate test', function () {
      var myFunc = function (element) { return element === 2; };
      expect(_.some([1, 3, 4], myFunc)).to.be.false;
    });

    it('calls the predicate the minimum number of times', function () {
      var myFunc = function (element) {
        return element === 2;
      };
      var myFuncSpy = sinon.spy(myFunc);
      _.some([2, 1, 3], myFuncSpy);
      expect(myFuncSpy.callCount).to.equal(1);
    });

    it('uses the context correctly when one is passed', function () {
      var contextObj = {size: 10};
      var myFunc = function (element) { return element === this.size; };
      expect(_.some([10, 20, 30, 40], myFunc, contextObj)).to.be.true;
      expect(_.some([20, 30, 40], myFunc, contextObj)).to.be.false;
    });

    it('returns true if passed no predicate', function () {
      expect(_.some([1, 2, 3])).to.be.true;
    });

    it('returns false if passed no list', function () {
      expect(_.some()).to.be.false;
    });
  });

  describe('#where', function () {
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 50}];
    var testArray = [{a: 1, b: 2, c: 3}, {a: 1, c: 3}, {a: 1, b: 7}, {a: 9, f: 11, j: 99}];

    it('is a function', function () {
      expect(_.where).to.be.a('function');
    });

    it('takes two parameters', function () {
      expect(_.where.length).to.equal(2);
    });

    it('returns array of correct objects when passed testArray and properties {a: 1}', function () {
      expect(_.where(testArray, {a: 1})).to.eql([{a: 1, b: 2, c: 3}, {a: 1, c: 3}, {a: 1, b: 7}]);
    });

    it('returns array of correct objects when passed testArray and properties {a: 1, c: 3}', function () {
      expect(_.where(testArray, {a: 1, c: 3})).to.eql([{a: 1, b: 2, c: 3}, {a: 1, c: 3}]);
    });

    it('returns empty array when no matches found', function () {
      expect(_.where(testArray, {a: 4, c: 4})).to.eql([]);
    });

    it('returns larry and curly objects when passed stooges array, where age is 50', function () {
      expect(_.where(stooges, {age: 50})).to.eql([{name: 'larry', age: 50}, {name: 'curly', age: 50}]);
    });

    it('returns an empty array when no list or properties passed', function () {
      expect(_.where()).to.eql([]);
    });

    it('returns original array when no properties are passed', function () {
      expect(_.where(stooges)).to.eql(stooges);
    });
  });

  describe('#extend', function () {
    it('is a function', function () {
      expect(_.extend).to.be.a('function');
    });

    it('takes 1 argument', function () {
      expect(_.extend.length).to.equal(1);
    });

    it('returns correct object when given one destination and one source', function () {
      expect(_.extend({name: 'moe'}, {age: 50}))
        .to.eql({name: 'moe', age: 50});
    });

    it('returns correct object when given one destination and two sources', function () {
      expect(_.extend({name: 'moe'}, {age: 50}, {shoe: 10}))
        .to.eql({name: 'moe', age: 50, shoe: 10});
    });

    it('returns correct object when given one destination and multiple sources', function () {
      expect(_.extend({name: 'moe'}, {age: 50}, {shoe: 10}, {chest: 34}, {waist: 32}))
        .to.eql({name: 'moe', age: 50, shoe: 10, chest: 34, waist: 32});
    });

    it('is the same object that is returned when no source is passed', function () {
      var startObj = {name: 'moe'};
      expect(_.extend(startObj)).to.equal(startObj);
    });

    it('returns correct object when source has nested object', function () {
      var destObj = {name: 'moe'};
      var sourceObj = {sizes: {chest: 36, shoe: 10}};
      expect(_.extend(destObj, sourceObj)).to.eql({name: 'moe', sizes: {chest: 36, shoe: 10}});
    });

    it('copies the properties in order given', function () {
      expect(_.extend({name: 'moe'}, {age: 50}, {age: 10}, {age: 34}, {age: 32}))
        .to.eql({name: 'moe', age: 32});
    });
  });

  describe('#defaults', function () {
    it('is a function', function () {
      expect(_.defaults).to.be.a('function');
    });

    it('takes 1 argument', function () {
      expect(_.defaults.length).to.equal(1);
    });

    it('correctly defaults when given one property object', function () {
      var iceCream = {flavour: 'chocolate'};
      expect(_.defaults(iceCream, {flavour: 'vanilla', sprinkles: 'lots'}))
        .to.eql({flavour: 'chocolate', sprinkles: 'lots'});
    });

    it('correctly defaults when given multiple default objects', function () {
      var iceCream = {flavour: 'chocolate', sauce: 'toffee', size: 0};
      var p1 = {flavour: 'vanilla', sprinkles: 'lots'};
      var p2 = {wafer: 'square', cone: 'waffle'};
      var p3 = {size: 1, sauce: 'raspberry'};
      expect(_.defaults(iceCream, p1, p2, p3))
        .to.eql({flavour: 'chocolate', sauce: 'toffee', sprinkles: 'lots', wafer: 'square', cone: 'waffle', size: 0});
    });

    it('returns original object if no undefined properties to default', function () {
      var iceCream = {flavour: 'chocolate', sprinkles: 'none'};
      expect(_.defaults(iceCream, {flavour: 'vanilla', sprinkles: 'lots'}))
        .to.equal(iceCream);
    });

    it('returns original object if defaults passed', function () {
      var iceCream = {flavour: 'chocolate', sprinkles: 'none'};
      expect(_.defaults(iceCream)).to.equal(iceCream);
    });

    it('returns undefined if no arguments passed', function () {
      expect(_.defaults()).to.be.undefined;
    });
  });

  describe('#once', function () {
    it('is a function', function () {
      expect(_.once).to.be.a('function');
    });

    it('takes one argument', function () {
      expect(_.once.length).to.equal(1);
    });

    it('returns a function', function () {
      expect(_.once(function () {})).to.be.a('function');
    });

    it('returns a function that does the same thing as the input function', function () {
      var square = function (num) { return num * num; };
      var newSquare = _.once(square);
      expect(newSquare(3)).to.equal(square(3));
    });

    it('only executes once if called multiple times', function () {
      var square = function (num) { return num * num; };
      var spy = sinon.spy(square);
      var newSquare = _.once(spy);
      newSquare(7);
      expect(spy.callCount).to.equal(1);
    });

    it('returns the first return value for each subsequent call', function () {
      var square = function (num) { return num * num; };
      var spy = sinon.spy(square);
      var newSquare = _.once(spy);
      expect(newSquare(3)).to.equal(9);
      expect(newSquare(4)).to.equal(9);
      expect(newSquare(5)).to.equal(9);
    });
  });

  describe('#memoize', function () {
    it('is a function', function () {
      expect(_.memoize).to.be.a('function');
    });

    it('takes two arguments', function () {
      expect(_.memoize.length).to.equal(2);
    });

    it('returns a function', function () {
      expect(_.memoize(function () {})).to.be.a('function');
    });

    it('returns a function that has a cache property', function () {
      expect(_.memoize(function () {}).cache).to.be.an('object');
    });

    it('returns a function that does the same thing as the input function', function () {
      var square = function (num) { return num * num; };
      var quickSquare = _.memoize(square);
      expect(quickSquare(3)).to.equal(square(3));
    });

    it('runs faster when called for second time with identical args', function () {
      function fibonacci (number) {
        if (number === undefined) return -1;
        if (number <= 2) return 1;
        return fibonacci(number - 1) + fibonacci(number - 2);
      }
      var newFibonacci = _.memoize(fibonacci);

      var firstStart = new Date().getTime();
      newFibonacci(39);
      var firstEnd = new Date().getTime();
      var firstTimeDuration = firstEnd - firstStart;

      var secondStart = new Date().getTime();
      newFibonacci(39);
      var secondEnd = new Date().getTime();
      var secondTimeDuration = secondEnd - secondStart;

      expect(secondTimeDuration).to.be.below(firstTimeDuration);
    });

    it('returns the memoized variables as a \'cache\' property on the function', function () {
      var add = function (num1, num2) { return num1 + num2; };
      var quickAdd = _.memoize(add);
      quickAdd(3, 4);
      quickAdd(4, 5);
      quickAdd(5, 6);
      expect(quickAdd.cache).to.eql({'3': 7, '4': 9, '5': 11});
    });

    it('hashes the cache key name correctly when passed a hashFunction', function () {
      var hashFunc = function () {
        var args = [].slice.call(arguments);
        return args.join('!');
      };
      var add = function (num1, num2) { return num1 + num2; };
      var quickAdd = _.memoize(add, hashFunc);
      quickAdd(3, 4);
      quickAdd(4, 5);
      expect(quickAdd.cache).to.eql({'3!4': 7, '4!5': 9});
    });

    it('calls the function the minimal number of times', function () {
      var add = function (num1, num2) {
        return num1 + num2;
      };
      var addSpy = sinon.spy(add);
      var quickAdd = _.memoize(addSpy);
      quickAdd(1, 2);
      quickAdd(3, 4);
      quickAdd(3, 4);
      expect(addSpy.callCount).to.equal(2);
    });
  });

  describe('#delay', function () {
    it('is a function', function () {
      expect(_.delay).to.be.a('function');
    });

    it('takes two arguments', function () {
      expect(_.delay.length).to.equal(2);
    });

    xit('calls the function after required delay', function () {
      var spy = sinon.spy();
      var startFunc = new Date().getTime();
      _.delay(spy, 2000);
      var endFunc = new Date().getTime();
      var duration = endFunc - startFunc;
      expect(duration).to.be.within(1800, 2200);
      expect(spy.callCount).to.equal(1);
    });

    xdescribe('does something', function () {
      function add (a, b) {
        return a + b;
      }
      var addSpy = sinon.spy(add);
      var objTimer = {start: 0, end: 0};
      objTimer.start = new Date().getTime();

      _.delay(function () {
        // addSpy(50, 390);
        // done();
      }, 2000);

      function done () {
        objTimer.end = new Date().getTime();
      }

      it('invokes the callback after the specified time', function () {
        expect(addSpy.called).to.eql(true);
        // console.log(objTimer.end - objTimer.start)
      });

      it('invokes the callback with the arguments passed', function () {
        expect(addSpy.calledWith(50, 30)).to.eql(true);
      });
    });
  });

  describe('#shuffle', function () {
    it('is a function', function () {
      expect(_.shuffle).to.be.a('function');
    });

    it('takes one argument', function () {
      expect(_.shuffle.length).to.equal(1);
    });

    it('returns a list of same length as the start list', function () {
      var start = [1, 2, 3, 4, 5];
      var end = _.shuffle(start);
      expect(start.length).to.equal(end.length);
    });

    it('returns a list in a different order to start list', function () {
      var start = [1, 2, 3, 4, 5];
      var end = _.shuffle(start);
      expect(end).to.not.eql(start);
    });

    it('returns a list containing the same elements as start list', function () {
      var start = [1, 2, 3, 4, 5];
      var end = _.shuffle(start);
      var endSorted = end.sort(function (a, b) { return a - b; });
      var startSorted = start.sort(function (a, b) { return a - b; });
      expect(endSorted).to.eql(startSorted);
    });
  });

  describe('#invoke', function () {
    it('is a function', function () {
      expect(_.invoke).to.be.a('function');
    });

    it('takes two arguments', function () {
      expect(_.invoke.length).to.equal(2);
    });

    it('invokes the \'pop\' method on the list', function () {
      var list = [[2, 3, 4], [5, 6], [7, 8, 9]];
      expect(_.invoke(list, 'pop')).to.eql([4, 6, 9]);
    });

    it('invokes the \'sort\' method on the list', function () {
      var list = [[5, 1, 7], [3, 2, 1]];
      expect(_.invoke(list, 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
    });

    it('passes any additional arguments to the method \'slice\'', function () {
      var list = [[5, 1, 7, 6, 3], [3, 2, 1, 7, 4], [7, 2, 3, 7, 9]];
      expect(_.invoke(list, 'slice', 3)).to.eql([[6, 3], [7, 4], [7, 9]]);
      expect(_.invoke(list, 'slice', 3, 4)).to.eql([[6], [7], [7]]);
    });
  });

  describe.only('#sortBy', function () {
    it('is a function', function () {
      expect(_.sortBy).to.be.a('function');
    });

    it('takes three arguments', function () {
      expect(_.sortBy.length).to.equal(3);
    });

    it('sorts by Math.sin function iteratee', function () {
      var input = [1, 2, 3, 4, 5, 6];
      var myFunc = function (num) { return Math.sin(num); };
      var result = [5, 4, 6, 3, 1, 2];
      expect(_.sortBy(input, myFunc)).to.eql(result);
    });

    it('sorts by modulo3 function iteratee', function () {
      var input = [1, 2, 3, 4, 5, 6];
      var myFunc = function (num) { return num % 3; };
      var result = [3, 6, 1, 4, 2, 5];
      expect(_.sortBy(input, myFunc)).to.eql(result);
    });

    it('sorts by specified key if the iteratee is a string', function () {
      var stooges = [
        {name: 'moe', age: 40},
        {name: 'larry', age: 50},
        {name: 'curly', age: 60}];
      expect(_.sortBy(stooges, 'name')).to.eql([
        {name: 'curly', age: 60},
        {name: 'larry', age: 50},
        {name: 'moe', age: 40}]);
    });

    it('uses context correctly if passed one', function () {
      var context = {mod: 3};
      var input = [1, 2, 3, 4, 5, 6];
      var myFunc = function (num) { return num % this.mod; };
      var result = [3, 6, 1, 4, 2, 5];
      expect(_.sortBy(input, myFunc, context)).to.eql(result);
    });
  });
});
