/* global describe, it */
 
(function () {
    'use strict';
 
    describe('A Collection constructor', function () {
        describe(', when run', function () {
            it('should return a new object', function () {
              var students = new Collection();
 
              expect(students.constructor.name).to.equal("Collection");
            });
 
            it('stores its first param in a property called models', function(){
              var toBeAdded = [{name: 'Bower', id: '1'},{name: 'Jack', id:'2'}]
              var students = new Collection(toBeAdded)
              
              expect(students.models).to.be.a('Array');
              expect(students.models[1].name).to.equal('Jack');
            });
 
        });
    });
 
    describe("A Collection instance", function(){
      describe("has a .find() method",function(){
        it("should return an object when given an id that is present in the models", function(){
          var students = new Collection([{name: 'Jim', id: '99'}]);
          expect(students.find('99')).to.deep.equal({name: 'Jim', id: '99'})
        });
 
        it("should not return an object when that id is not present in the models", function(){
          var students = new Collection([{name: 'Jim', id: '99'}]);
          expect(students.find('1')).to.not.equal({name: 'Jim', id: '99'});
        });
 
        it("should return undefined when that id is not present in the models", function(){
          var students = new Collection([{name: 'Jim', id: '99'}]);
          expect(students.find('1')).to.equal(undefined);
        });
 
        it("should throw an error when given an arguemnt other than a string", function(){
          var students = new Collection([{name: 'Jim', id: '99'}]);
          expect(function(){students.find(1)}).to.throw(Error);
          expect(function(){students.find({})}).to.throw(Error);
          expect(function(){students.find([])}).to.throw(Error);
        });
      });
 
      describe("has an .add() method",function(){
        it("should add the object it's given to the models property", function(){
          var students = new Collection ([{name:'jim', id: '99'}]);
          var newStudent = {name:'bob', id:'24'};
          students.add(newStudent);
          expect( _.contains(students.models, newStudent)).to.be.true;
        });

        it("should increase the models property's length by 1", function() {
          var students = new Collection ([{name:'jim', id: '99'}]);
          var newStudent = {name:'bob', id:'24'};
          var startLength = students.models.length;
          students.add(newStudent);
          var endLength = students.models.length;
          expect(startLength + 1).to.equal (endLength);
        });

        it("should only accept a single object as an argument", function() {
          var students = new Collection ([{name:'jim', id: '99'}]);
          var newStudent = {name:'bob', id:'24'};
          expect(function(){students.add(newStudent, newStudent)}).to.throw(Error);
        });

        it("should not  accept an empty object as an argument", function () {
          var students = new Collection ([{name:'jim', id: '99'}]);
          expect( function(){ students.add({}) } ).to.throw(Error);
        });

        it("should throw an error when given an object without an id property", function(){
          var students = new Collection ([{name:'jim', id: '99'}]);
          var newStudent = {name:'bob'};
          expect( function(){students.add(newStudent)}).to.throw(Error);
        });
      });
 
      describe("has a .remove() method",function(){
        it("should, when given an id, remove the corresponding object from the models property", function(){
          var students = new Collection ([{name:'jim', id: '99'}]);
          students.remove('99');
          expect( _.findWhere(students.models, {id: '99'})).to.equal(undefined);
        });

        it("should decrease the models property's length by 1", function(){
          var students = new Collection ([{name:'jim', id: '99'}]);
          var startLength = students.models.length;
          students.remove('99');          
          var endLength = students.models.length;
          expect(startLength - 1).to.equal (endLength);
        });

        it("should only accept a single string as an id argument", function() {
          var students = new Collection ([{name:'jim', id: '99'}]);
          expect(function() { students.remove('99', '24') }).to.throw(Error);         
        });

        it("should return true on successful removal", function() {
          var students = new Collection ([{name:'jim', id: '99'}]);
          expect( students.remove('99') ).to.be.true;            
        });

      })
      
      describe("has an .empty() method", function(){
        it("should result in an models array with length 0", function() {
          var students = new Collection ([{name:'jim', id: '99'}]);
          students.empty();
          expect(students.models.length).to.equal(0);
        });

        it("should not accept any arguments else throw an error", function() {
          var students = new Collection ([{name:'jim', id: '99'}]);
          expect( function(){ students.empty('arg') } ).to.throw(Error);
        });

        it("should return true upon successful completion", function() {
          var students = new Collection ([{name:'jim', id: '99'}]);
          expect(students.empty()).to.be.true;
        });

        it("should [need another one here]", function () {
          var students = new Collection ([{name:'jim', id: '99'}]);

          expect(false).to.be.true;
        });

      });

      describe("has a .random() method", function(){
        it("should return only objects from models property upon invocation", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          var randStudents = students.random(students.models.length);
          var pure = true;
          _.each(randStudents, function(elem) {
            if (! _.contains(students.models, elem)) 
              {
                pure = false;
              };
          })
          expect( pure ).to.be.true;
          //chai has a .contain function
        });

        it("should accept only a number as its argument", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          expect( function() {students.random('1')}).to.throw(Error);
          expect( function() {students.random({})}).to.throw(Error);
          expect( function() {students.random([])}).to.throw(Error);

        });

        it("should accept only one argument", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          expect( function() {students.random(2,4)}).to.throw(Error);

        });

        it("should return the quantity requested in the argument or the entire array, which ever is smaller", function(){
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          var arrayLength = students.models.length;
          expect( students.random(arrayLength - 1).length).to.equal(arrayLength -1);
          expect( students.random(arrayLength + 2).length).to.equal(arrayLength);

        });

        it("should not return the array in the same original order as it exists", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          var randStudents = students.random(students.models.length); //get a random array of all the students
          expect(randStudents === students).to.be.false;
        })

        it("should return a one item array from the array if no argument is given", function () {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          expect(students.random().length).to.equal(1);
        });

      });

      describe("has a .getLength() method", function(){
        it("should return the length of the array in the models property", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          expect(students.getLength()).to.equal(students.models.length);
        });

        it("should not accept any arguments", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          expect(function() { students.getLength('a')}).to.throw(Error);
          expect(function() { students.getLength(2)}).to.throw(Error);
          expect(function() { students.getLength({})}).to.throw(Error);
        });

        it("should not alter the original models array", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          var beforeArray = students.models;
          students.getLength();
          var afterArray = students.models;
          expect(beforeArray).to.equal(afterArray);
        });


      });

      describe("has a .length property", function (){
        it("should return the length of the models array", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          expect(students.length).to.equal(students.models.length);
        })

        it("should return the accurate length if new models are added", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          var previousLength = students.length;
          students.add({name:"joshua", id: '33'});
          var newLength = students.length;
          expect(newLength).to.equal(previousLength + 1);
        });

        it("should return the accurate length if new models are removed", function() {
          var students = new Collection ([{name:'jim', id: '99'}, {name:'bob', id: '24'}, {name:'sue', id: '12'}, {name:'dan', id: '44'}]);
          var previousLength = students.length;
          students.remove('99');
          var newLength = students.length;
          expect(newLength).to.equal(previousLength - 1);
        });


      });            

    })
})();