Require javascript-object-paraphernalia
   
``` javascript 
var obj = require('javascript-object-paraphernalia')
```
    
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


