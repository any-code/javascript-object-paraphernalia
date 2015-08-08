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

exports.testMerge = function(test){
	var first = {a: 1, c: 3},
		expectedFirst = {a: 1, c: 3},
		second = {a: 4, b: 2},
		expected = {a: 4, b: 2, c: 3};

	test.deepEqual(obj.merge(first, second),  expected, "\nFailed to assert merge(" + JSON.stringify(expectedFirst) +
		", " + JSON.stringify(second) + ") resulted in the correct object");

	test.done();
};




