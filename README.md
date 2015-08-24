# javascript-object-paraphernalia

[![Build Status](https://travis-ci.org/any-code/javascript-object-paraphernalia.svg?branch=master)](https://travis-ci.org/any-code/javascript-object-paraphernalia)

> Javascript object utilities such as deep clone, merge and apply. Also includes 'is' a type checking method to type check Objects, Functions and Classes

## Getting Started

### 1. Installation

``` bash
npm install javascript-object-paraphernalia
```

### 2. Examples

Require javascript-object-paraphernalia
   
``` javascript 
var obj = require('javascript-object-paraphernalia')
```
    
Define some objects for use with the following examples  
 
``` javascript 
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
```

#### Object clone example

Use obj.clone to clone the first example object   
    
``` javascript 
var exampleClone = obj.clone(exampleFirst)
```

Results:-

``` javascript
exampleClone = {
  fruit: "Apple",
  animals: {
    firstAnimal: "Beaver"
  }
}
```

Update the clone's inner properties

``` javascript 
exampleClone.fruit = "Orange"
exampleClone.animals.cloneOnlyAnimal = "Rabbit"
```

Compare the clone with the first example object

``` javascript
exampleFirst = {
  fruit: "Apple",
  animals: {
    firstAnimal: "Beaver"
  }
}
exampleClone = {
  fruit: "Orange",
  animals: {
    cloneOnlyAnimal: "Rabbit",
    firstAnimal: "Beaver"
  }
}
```

#### Object merge example

Use obj.merge to merge the second example object with the first example object   
    
``` javascript 
obj.merge(exampleFirst, exampleSecond)
```

Results:-

``` javascript
{
  fruit: "Banana",
  animals: {
    firstAnimal: "Beaver",
    secondAnimal: "Slow Loris",
    thirdAnimal: "Elephant"
  },
  gems: {
    firstGem: "Diamond"
  }
}
```

Change the second example's thirdAnimal

``` javascript 
exampleSecond.animals.thirdAnimal = "Slender Loris"
```

See that the first example's animal property has not mutated

``` javascript
// exampleFirst contents:- 
{
  fruit: "Banana",
  animals: {
    firstAnimal: "Beaver",
    secondAnimal: "Slow Loris",
    thirdAnimal: "Elephant"
  },
  gems: {
    firstGem: "Diamond"
  }
}
```

Now change the first Example's gems property

``` javascript 
exampleFirst.gems.firstGem = "Ruby"
```

Because the gems property of the second Example was referenced by the first Example, the gems property is the same object
on both first and second examples.

``` javascript 
// exampleFirst contents:- 
{
  fruit: "Banana",
  animals: {
    firstAnimal: "Beaver",
    secondAnimal: "Slow Loris",
    thirdAnimal: "Slender Loris"
  },
  gems: {
    firstGem: "Ruby"
  }
```

#### Object apply example

Use obj.apply to apply the properties of the second example object on the first example object   
    
``` javascript 
exampleSecond.animals.firstAnimal = "Slow Loris"
obj.apply(exampleFirst, exampleSecond)
```

The contents of the first object are:-

``` javascript
{
  fruit: "Banana",
  animals: {
    firstAnimal: "Slow Loris"
  }
}
```

See that only the first example's properties have been updated and none of the additional properties present on the
second object have been applied

#### Object is example

Declare some variables to work with in the following examples    
 
``` javascript 
function TestClass() {}
var object = {},
    testClass = new TestClass(),
    func = function() { return false },
    str = "I'm a string"
```
    
Use obj.is to test an assertion about an object's type
    
``` javascript 
  obj.is(object, 'Object')        // === true
  obj.is(object, 'object')        // === true
  obj.is(func, 'Function')        // === true
  obj.is(func, 'function')        // === true
  obj.is(str, 'String')           // === true
  obj.is(str, 'string')           // === true

  // testClass returns true to either its Class or Object
  obj.is(testClass, 'TestClass')  // === true
  obj.is(testClass, 'Object')     // === true
    
  // testing for a class name is not case insensitive  
  obj.is(testClass, 'testclass')  // === false  
```

## Copyright and license
Copyright (c) 2015, Any Code <lee@anycode.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
