
_.memoize
This caches the result of a function after you have called it. Save it in an object (the cache);
Ignore hash function initially.
NB: memoize returns a new function, that is faster than the original  function. It stores the result of the function, along with the args passed to the function to achieve that result, in a cache.

Imageine a function  - e.g.  a function that squares a number n. Imagine we wish to memoize this function.

e.g.
var speedySquare() = _.memoize(function (n) {return n* n});

speedySquare should be quikercoz it has access to all the previous invocations an their results If we call it again with exactly the same args then we can grab the old result from the cache and we dont need to run it again.

e.g. if call speedySquare(66) once it will do the calulation. If call it a second time with 66 then we do not need to calculate again - we can get the answer from cache.

To test it, time how long it takes to run the first time, then time how long it takes to run the second time. (take a tie stamp before and after each invocation)

e.g.
var speedySquare = _.memoize (function (n) { return n * n;});
var firstStartTime = new Date().getTime();
speedySquare(66)
var firstEndTime = new Date().getTime();
then
var secondStartTime = new Date().getTime();
speedySquare(66)
var secondEndTime = new Date().getTime();

Work out the diff in time taken between each of the two func. WOuld need to be a reasonably meaty function for this to have an effect.

_,memoize takes a function, and returns a function

_.memoize = function (func) {
  // initialise the empty cache
  var cache = {};

  return function () {
    var stringyArgs = JSON.stringify(arguments[0]);
    // does the cache already have the same key as stringyArgs?
    // if it does, return that value
    ...
    ...
    // if not, we should set it
    // and we should remember to return the result if the function.
    // we have stringified the args to the function to use as a
    // key in cache, value is the functions return value
    // e.g. for speedySquare(66), cache contains {66: 4200-ish}
    cache[stringyArgs] = func.apply(null, arguments);
    console.log(cache)
    // should we return the cache[stringyArgs VALUE here rather than call th function again???
    return func.apply(null, arguments);
  }
}

//  think of it as speedySqaure() is the function that memoize returns
// * IMPORTANT

// a cache is basically just an object. This remains in scope of the function because it has closure over it

// the function could possibly just take any num of arguments

// do it by using the 'arguments' object. This is an array-like object that describes all of the args passed.

WORKSHOP 2 (7/12/16)
-----------------------------------------------------------------------------------------
Harriet ran through the testing of memoize again.
triple = n* 3;
spy = sinon.spy(triple)

function square (a) {
  return a * a;
}
var squareSpy = sinon.spy(square)
var memoizedSquare = _.memoize(squareSpy)
memoizedSquare(6);
memoizedSquare(3);
memoizedSquare(6);
memoizedSquare(3);
expect(squareSpy.calledTwice).to.equal(true)
expect(memoizedSquare.cache).to.equal({'3': 9, '6': 36})

or do:
function add (a, b) {
  return a + b;
}
var addSpy = sinon.spy(add)
var memoizedAdd = _.memoize(addSpy, hash)

expect(memoizedAdd.cache).to.equal({'2foo6': 8, '4foo8': 12})
expect(memoizedAdd.cache).to.be.an('object')

test that it is fater than unmemoized
var beginUnMemoized = new Date().getTime()
// run square thing
// get next timestamp
// Then run memoized version, then get start stamps
// then run memoized thing again with same args (run from cache)
memoizedSquare(2000);
// then get end stamps
// then  compare the two .
// (make sure that you have already run the memoized version previsouly with same args
  so that it has been aded to the cache)
Use a longer function - e.g. fibinacci sequance?
---------------------------------------------------------------------------------------

Binary Tree Search

Works on ordered arrays (do they need to be unique??)

Halves the problem each time. Getting nearer to the solution each time.

Literally lahf the array each time, discarding the unrequired part and repating. Keep an index of where you are in the array so that you can get the final index o fthe item when you have found it (if you need it).

At least one of the underscore functions uses this pattren - could be indexOf or sortedIndex
 Harriet was doing it where she split the array in two, and checked to se if the firs titem in the second half was smaller than the searchTerm. She did not check to see if it was equal to the search time - she though that if you did this on each iteration it was less efficient than halving until you have one item left in the array.

 Pseudo ```
 // create offset/indexOf
 // while array length > 0
 // grab first half, grab second half
 // see if lasthalf[0] < searchterm
 // if so, discard the first half, array is now equal to the second half
 // array is now equal to the second half
 // if not, keep the first half
 ```
