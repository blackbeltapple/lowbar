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
    it('is a function', function() {
      expect(_.each).to.be.a('function');
    });
  });

//testing #identity

describe('#identity', function(){
  it('is a function', function(){
    expect(_.identity).to.be.a('function');
  });
  it('returns 23 when given 23', function(){
    expect(_.identity(23)).to.equal(23);
  });
  it('returns an object when passed an object', function(){
    expect(_.identity({name:'joe'})).to.be.an('object');
    expect(_.identity({name:'joe'})).to.have.property('name');
  });
  it('run test code', function(){
    var stooge = {name: 'moe'};
    var result = stooge === _.identity(stooge);
    expect(result).to.equal(true);
  });
});

// testing _.first function

describe('#first', function(){
 it('is a function', function(){
   expect(_.first).to.be.a('function');
 });

});


});
