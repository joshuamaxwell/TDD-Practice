
 
function Collection (models) {
  this.models = models || [];
 
  this.find = function(id) {
    var result;
 
    if (typeof(id) != 'string') {
      throw new Error("Whoops!");
    }
 
    this.models.forEach(function(value, index){
      if (value.id == id) {
        result = value;
      }
    });
 
    if (result) {
      return result;
    }
  } //end of .find() function

  this.add = function (model) {
    if (_.isEmpty(model)) throw new Error("you must provide a single model with an id property as an argument");
    if ( _.has(model, 'id') === false) throw new Error("you must provide a single model with an id property as an argument");
    if (arguments.length > 1) throw new Error("you must provide a single model with an id property as an argument");
    this.models.push(model);
  }
  
}