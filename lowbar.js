var _ = {};

_.each = function() {
  // your code here


};

_.identity = function(value){
  return value;

};

// _.first function//
//
_.first = function(list, item){
  if(Array.isArray(list)){
      var result =[];
      if(item === undefined){
        item =1;
      }

      for (i=0; i<item; i++){
        result.push(list[i]);
      }
      return result;

  } else {

    return undefined;
  }
};

// _.last function//
//
_.last = function(list, item){
if(Array.isArray(list)){
    var result = [];
    if (item === undefined) {
      item = 1;  // default value if no param given
    }
    for (i=list.length - item; i < list.length; i++){
      result.push(list[i]);
      }
      return result;

      } else {
      return undefined;
    }
};




if (typeof module !== 'undefined') {
  module.exports = _;
}
