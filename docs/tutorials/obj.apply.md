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
        firstAnimal: "Slow Loris",
        secondAnimal: "Elephant"
      },
      gems: {
        firstGem: "Diamond"
      }
    };
```
    
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

See that only the first example's properties have been deeply updated and none of the additional properties present on the
second object have been applied.
