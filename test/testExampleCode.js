var obj = require('../index');

exports.testClone = function(test) {
  var exampleFirst = {
      fruit: "Apple",
      animals: {
        firstAnimal: "Beaver"
      }
    },
    exampleSecond = {
      fruit: "Banana",
      animals: {
        secondAnimal: "Slow Loris",
        thirdAnimal: "Elephant"
      }
    };

  var exampleClone = obj.clone(exampleFirst);

  test.deepEqual(exampleClone, { fruit: "Apple", animals: { firstAnimal: "Beaver" }}, "Unexpected object")

  exampleClone.fruit = "Orange"
  exampleClone.animals.cloneOnlyAnimal = "Rabbit"

  test.deepEqual(exampleClone, { fruit: "Orange", animals: { firstAnimal: "Beaver", cloneOnlyAnimal: "Rabbit" }}, "Unexpected object")
  test.deepEqual(exampleFirst, { fruit: "Apple", animals: { firstAnimal: "Beaver" }}, "Unexpected object")

  test.done();

}

exports.testMerge = function(test) {
  var exampleFirst = {
      fruit: "Apple",
      animals: {
        firstAnimal: "Beaver"
      }
    },
    exampleSecond = {
      fruit: "Banana",
      animals: {
        secondAnimal: "Slow Loris",
        thirdAnimal: "Elephant"
      },
      gems: {
        firstGem: "Diamond"
      }
    };

  obj.merge(exampleFirst, exampleSecond);

  test.deepEqual(exampleFirst, {
    fruit: "Banana",
    animals: {
      firstAnimal: "Beaver",
      secondAnimal: "Slow Loris",
      thirdAnimal: "Elephant"
    },
    gems: {
      firstGem: "Diamond"
    }
  }, "Object was unexpected");

  exampleSecond.animals.thirdAnimal = "Slender Loris";

  test.deepEqual(exampleFirst, {
    fruit: "Banana",
    animals: {
      firstAnimal: "Beaver",
      secondAnimal: "Slow Loris",
      thirdAnimal: "Elephant"
    },
    gems: {
      firstGem: "Diamond"
    }
  }, "Object was unexpected");

  exampleFirst.gems.firstGem = "Ruby";

  test.deepEqual(exampleSecond, {
    fruit: "Banana",
    animals: {
      secondAnimal: "Slow Loris",
      thirdAnimal: "Slender Loris"
    },
    gems: {
      firstGem: "Ruby"
    }
  }, "The object was unexpected");

  test.done();
}

exports.testApply = function(test) {
  var exampleFirst = {
      fruit: "Apple",
      animals: {
        firstAnimal: "Beaver"
      }
    },
    exampleSecond = {
      fruit: "Banana",
      animals: {
        firstAnimal: "Slow Loris",
        secondAnimal: "Slow Loris",
        thirdAnimal: "Elephant"
      },
      gems: {
        firstGem: "Diamond"
      }
    };

  obj.apply(exampleFirst, exampleSecond);

  test.deepEqual(exampleFirst, {
    fruit: "Banana",
    animals: {
      firstAnimal: "Slow Loris"
    }
  }, "Object was unexpected");

  test.done();
}

exports.testIs = function(test) {
  function TestClass() {}
  var object = {},
    testClass = new TestClass(),
    func = function() { return false },
    str = "I'm a string"

  test.ok(obj.is(object, 'Object'), "Unexpected Type Assertion");        // === true
  test.ok(obj.is(func, 'Function'), "Unexpected Type Assertion");        // === true
  test.ok(obj.is(str, 'String'), "Unexpected Type Assertion");           // === true

  //Case Insensitive
  test.ok(obj.is(object, 'object'), "Unexpected Type Assertion");        // === true
  test.ok(obj.is(func, 'function'), "Unexpected Type Assertion");        // === true
  test.ok(obj.is(str, 'string'), "Unexpected Type Assertion");           // === true


  // testClass returns true to either its Class or Object
  test.ok(obj.is(testClass, 'TestClass'), "Unexpected Type Assertion");  // === true
  test.ok(obj.is(testClass, 'Object'), "Unexpected Type Assertion");     // === true

  test.done();
}
