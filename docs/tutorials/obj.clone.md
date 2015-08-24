Require javascript-object-paraphernalia
   
``` javascript 
var obj = require('javascript-object-paraphernalia')
```
    
Define an objects for use with the following examples
 
``` javascript 
var exampleFirst = {
    fruit: "Apple",
    animals: {
      firstAnimal: "Beaver"
    }
  };
```
    
Use obj.clone to clone the first example object   
    
``` javascript 
var exampleClone = obj.clone(exampleFirst)
```

exampleClone's contents:-

``` javascript
{
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
