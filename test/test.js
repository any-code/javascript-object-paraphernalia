var obj = require('../index');

exports.testApply = function(test){
  var first = {a: 1},
    expectedFirst = {a: 1},
    second = {a: 2, b: 2},
    expected = {a: 2};

  test.deepEqual(obj.apply(first, second), expected, "\nFailed to assert apply(" + JSON.stringify(expectedFirst) +
    ", " + JSON.stringify(second)+") would result in the correct object");

  test.done();
};

exports.testClone = function(test){
  var original = {a: 1},
    cloned = obj.clone(original),
    expected = {a: 1};

  original.a = "trick or treat";

  test.deepEqual(cloned,  expected, "\nFailed to assert clone(" + JSON.stringify(expected) + ") would result in the" +
    " correct object");

  test.done();
};

exports.testDeepClone = function(test){
  var original = { shallow: "shallow", deep: { key1: "value1", key2: "value2", key3: { deep: { key1: "value1" }}}},
    expectedOriginal = { shallow: "shallow", deep: { key1: "value1", key2: "value2", key3: { deep: {
      key1: "value1" }}}},
    expectedClone = { shallow: "shallow", deep: { key1: "value1", key2: "value2", key3: { deep: {
      key1: "value1", mod: "modded"}}, mod: "modded"}, mod: "modded"},
    cloned = obj.clone(original);

  cloned.mod = "modded";
  cloned.deep.mod = "modded";
  cloned.deep.key3.deep.mod = "modded";

  test.deepEqual(original,  expectedOriginal, "\nFailed to assert clone(" + JSON.stringify(expectedOriginal) + ")" +
    " did not modify the original object");

  test.deepEqual(cloned,  expectedClone, "\nFailed to assert clone(" + JSON.stringify(expectedOriginal) + ")" +
    " resulted in the correct object");

  test.done();
};

exports.testDefaults = function(test){
  var first = {a: 1},
    expectedFirst = {a: 1},
    second = {a: 2, b: 2},
    expected = {a: 2};

  test.deepEqual(obj.defaults(first, second), expected, "\nFailed to assert apply(" + JSON.stringify(expectedFirst) +
    ", " + JSON.stringify(second)+") would result in the correct object");

  test.done();
};

exports.testDefaultsWithUndefined = function(test){
  var first = {a: 1},
    expectedFirst = {a: 1},
    second = undefined,
    expected = {a: 1};

  test.deepEqual(obj.defaults(first, second), expected, "\nFailed to assert apply(" + JSON.stringify(expectedFirst) +
    ", " + JSON.stringify(second)+") would result in the correct object");

  test.done();
};


exports.testFlatten = function(test) {
    var object = {
        a: {
            b: {
                c: {
                    d: "banana soup"
                }
            }
        },
        b: {
            b: {
                c: {
                    d: "banana sauce"
                }
            }
        },
        c: {
            b: {
                c: {
                    d: "banana broth"
                }
            }
        },
        d: {
            b: {
                c: {
                    d: "banana gravy"
                }
            }
        }
    },
    expected = {
        'a.b.c.d': 'banana soup',
        'b.b.c.d': 'banana sauce',
        'c.b.c.d': 'banana broth',
        'd.b.c.d': 'banana gravy'
    }

    test.deepEqual(obj.flatten(object), expected, "\nFailed to assert flattening(" + JSON.stringify(object) +
      ") would result in the correct object");

    test.equals(obj.toKeyArray(object).indexOf('a.b.c.d'), 0, "\nFailed to assert flattening(" + JSON.stringify(object) +
      ") would result in the correct array");
    test.equals(obj.toKeyArray(object).indexOf('d.b.c.d'), 3, "\nFailed to assert flattening(" + JSON.stringify(object) +
      ") would result in the correct array");
    test.done()
}

exports.testKeyExists = function(test) {

    var object = {
        a: {
            b: {
                c1: 1,
                c2: 2,
                c3: 3
            }
        },
        ka: {
            dc: {
                o1: {
                    q1: 1,
                    q2: 2
                }
            }
        }
    }
    test.ok(!obj.keyExists(object, null), "fail 1")
    test.ok(!obj.keyExists(object, undefined), "fail 2")
    test.ok(!obj.keyExists(object, {}), "fail 3")
    test.ok(!obj.keyExists(object, 42), "fail 4")
    test.ok(obj.keyExists(object, 'a'), "fail 5")
    test.ok(!obj.keyExists(object, 'b'), "fail 5.5")
    test.ok(obj.keyExists(object, 'a.b'), "fail 6")
    test.ok(obj.keyExists(object, 'a.b.c1'), "fail 7")
    test.ok(!obj.keyExists(object, 'a.d.c1'), "fail 8")
    test.ok(obj.keyExists(object, 'ka.dc.o1.q2'), "fail 9")
    test.ok(!obj.keyExists(object, 'ka.bc.o1.q2'), "fail 10")
    test.ok(!obj.keyExists(undefined, 'a'), "fail 11")
    test.ok(!obj.keyExists(null, 'a'), "fail 12")
    test.ok(!obj.keyExists(42, 'a'), "fail 13")
    test.ok(!obj.keyExists('object', 'a'), "fail 14")
    test.done();
}

exports.testMerge = function(test){
  var first = {a: 1, c: 3},
    expectedFirst = {a: 1, c: 3},
    second = {a: 4, b: 2},
    expected = {a: 4, b: 2, c: 3};

  test.deepEqual(obj.merge(first, second),  expected, "\nFailed to assert merge(" + JSON.stringify(expectedFirst) +
    ", " + JSON.stringify(second) + ") resulted in the correct object");

  test.done();
};

exports.testIs = function(test){
  function TestClass() {}
  var object = {},
    testClass = new TestClass(),
    func = function() { return false },
    str = "I'm a string"

  test.ok(obj.is(object, 'Object'), 'is failed to identify Object')
  test.ok(obj.is(testClass, 'TestClass'), 'is failed to identify TestClass')
  test.ok(obj.is(testClass, 'Object'), 'is failed to identify Object')
  test.ok(obj.is(func, 'Function'), 'is failed to identify Function')
  test.ok(obj.is(str, 'String'), 'is failed to identify String')

  // special cases for undefined
  test.ok(obj.is(undefined, 'undefined'), 'is failed to identify undefined');
  test.ok(obj.is(undefined, undefined), 'is failed to identify undefined');

  test.done()
};

exports.testCombineWithInvalidFirst = function(test) {
  var first = 42,
    second = {a: 1, c: 3};

  test.throws(function() { obj.apply(first, second) }, Error, 'both values of apply must be objects');
  test.done();
}

exports.testCombineWithInvalidSecond = function(test) {
  var first = {a: 1, c: 3},
    second = 42;

  test.throws(function() { obj.apply(first, second) }, Error, 'both values of apply must be objects');
  test.done();
}

exports.testCombineWithUndefinedSecond = function(test) {
  var first = {a: 1, c: 3},
      second = undefined;

  test.deepEqual(obj.merge(first, second), first, 'the merged object did not match the original');
  test.done();
}

exports.testCloneArray = function(test) {
  test.deepEqual(obj.clone([{a:1},{a:2},{a:3}]), [{a:1},{a:2},{a:3}], 'the cloned array did not match the original');
  test.done();
}
