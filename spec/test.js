/* global describe, it */

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
          expect(function() { students.remove('99') }).to.return.true;            
        });

      })
    })
})();