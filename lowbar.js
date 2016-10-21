var _ = {};

_.each = function() {
  // your code here


};

_.identity = function(value){
  return value;

};

_.first = function(list, item){

  var result =[];

  if(item === undefined){
    item =1;
  }
  for (i=0; i<item; i++){
    result.push(list[i]);
  }
  
  return result;

};




if (typeof module !== 'undefined') {
  module.exports = _;
}
