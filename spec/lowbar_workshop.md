// This is just a cratchpad
underscore
_.EACH
Passing a context as an optional param.

var _ = {};
var mycontext = {a: 'foo'}

_.each([1, 2,3 ], function (elem, i list){
this.a = 'i was changed'
}, myContext);

// this will console. log out I was changed
console.log();myContext)
//
basically need to call the func bound to the context that was passed in

_.each(list, func, context)
// default this if not passed eplicitly
context = context || this
// if list is an array
 for loop
  func.call(context, list[i], i , list)

// else for in loop
var key in list
  func.apply()context, [list[i], i , list]


// to test, have an object and check to see that it has changed
------------------------------------------------------------------
