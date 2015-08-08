# javascript-object-paraphernalia

> Javascript object utilities such as deep clone, merge and apply because I enjoy writing code more that requiring it. 

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
    
    var exampleClone = obj.clone(exampleFirst);
    
    /* //OUTCOME   
        exampleClone = {
            fruit: "Apple",
            animals: {
                firstAnimal: "Beaver"
            }
        }
    */
    
    obj.apply(exampleFirst, exampleSecond);
    
    /* //OUTCOME   
        exampleFirst = {
            fruit: "Banana",
            animals: {
                firstAnimal: "Beaver"
            }
        }
    */
    
    obj.merge(exampleFirst, exampleSecond);
    
    /* //OUTCOME 
        exampleFirst = {
            fruit: "Banana",
            animals: {
                firstAnimal: "Beaver",
                secondAnimal: "Slow Loris",
                thirdAnimal: "Elephant"
            }
        }
    */
```

## Copyright and license
Copyright (c) 2015, Any Code <lee@anycode.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
