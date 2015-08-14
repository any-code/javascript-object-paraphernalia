# javascript-object-paraphernalia

[![Build Status](https://travis-ci.org/any-code/javascript-object-paraphernalia.svg?branch=master)](https://travis-ci.org/any-code/javascript-object-paraphernalia)

> Javascript object utilities such as deep clone, merge and apply. Also includes 'is' a type checking method to type check Objects, Functions and Classes

## Getting Started

### 1. Installation

``` bash
npm install javascript-object-paraphernalia
```

### 2. Examples

``` javascript
var obj = require('javascript-object-paraphernalia'),    
    exampleFirst = {
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
    
    /*
     * CLONE
     */
    
    var exampleClone = obj.clone(exampleFirst);
    // result:- 
    //   
    //    exampleClone = {
    //        fruit: "Apple",
    //       animals: {
    //            firstAnimal: "Beaver"
    //        }
    //    }
    
    /*
     * APPLY
     */
    
    obj.apply(exampleFirst, exampleSecond);
    // result:-   
    //    exampleFirst = {
    //        fruit: "Banana",
    //        animals: {
    //            firstAnimal: "Beaver"
    //        }
    //    }
    
    /*
     * MERGE
     */
    
    obj.merge(exampleFirst, exampleSecond);
    // result:- 
    //    exampleFirst = {
    //        fruit: "Banana",
    //        animals: {
    //            firstAnimal: "Beaver",
    //            secondAnimal: "Slow Loris",
    //            thirdAnimal: "Elephant"
    //        }
    //    }
        
    /*
     * IS
     */
    
    function TestClass() {}
    var object = {},
        testClass = new TestClass(),
        func = function() { return false },
        str = "I'm a string"

    obj.is(object, 'Object')        // === true
    obj.is(func, 'Function')        // === true
    obj.is(str, 'String')           // === true

    // testClass returns true to either its Class or Object
    obj.is(testClass, 'TestClass')  // === true
    obj.is(testClass, 'Object')     // === true     
```

## Copyright and license
Copyright (c) 2015, Any Code <lee@anycode.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
