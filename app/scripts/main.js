
 
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

  this.remove = function (id) {
    if (arguments.length > 1) throw new Error("you must provide a single 'id' string as an argument");
    else { 
      this.models = _.reject(this.models, function(elem){ return( elem.id === id )});
      return true;
    }
  }

  this.empty = function() {
    if (arguments.length > 0) throw new Error("This method does not receive any arguments");
    else {
      this.models = [];
      return true;
    }
  }

  this.random = function(num) {
    num = num || 1;
    if ( _.isNumber(num) === false) throw new Error("the .random() method will only accept a single number as an argument")
    if ( arguments.length > 1) throw new Error("the .random() method will only accept a single number as an argument")
    return _.sample(this.models, num);
  }

  this.length = function() {
    if (arguments.length > 0) throw new Error(" the .length() method receives NO arguments");
    return this.models.length;
  }
}