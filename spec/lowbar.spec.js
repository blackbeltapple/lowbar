/* global describe, it */
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

  describe('Map()', function () {
    it('is a function', function () {
      expect(_.map).to.be.a('function');
    });
    it('returns an array', function () {
      expect(_.map([1,2,3], function (num) { return num * 3;})).to.be.an('array');
    });
    it('takes two parameters', function () {
      expect(_.map.length).to.equal(2);
    });
    it('returns an empty array when passed empty array', function () {
      expect(_.map([])).to.eql([]);
    });
    // _.map([1, 2, 3], function(num){ return num * 3; });
    it('returns correct values when passed values', function () {
      expect(_.map([1, 2, 3], function(num){ return num * 3; })).to.eql([3,6,9]);
    });
    it('accepts objects as param one', function () {
      var output = _.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
      expect(output).to.eql([3,6,9]);
    });
  });
});
