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
    
Use obj.merge to merge the second example object with the first example object   
    
``` javascript 
obj.merge(exampleFirst, exampleSecond)
```

The contents of the first object are:-

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
