/*
            _                   ____          _
           / \   _ __  _   _   / ___|___   __| | ___
          / _ \ | '_ \| | | | | |   / _ \ / _` |/ _ \
         / ___ \| | | | |_| | | |__| (_) | (_| |  __/
        /_/   \_\_| |_|\__, |  \____\___/ \__,_|\___|
                       |___/

        javascript-object-paraphernalia
 */

/**
 * @description A bare minimum set of utilities for working with objects
 * @constructor
 */
function Obj() {}

/**
 * @description Perform a deep clone of two objects
 *
 * @param {object} objectToClone the object to be cloned
 * @returns {object} A clone of the objectToClone
 *
 * @tutorial obj.clone
 */
Obj.prototype.clone = function(objectToClone) {
  return combineObjects({}, objectToClone, true, false);
};

/**
 * @description Mutates the first object by deeply merging the properties of the second object into the first object,
 *  overwriting the properties already set on the first specifically passing properties by reference. If the desire
 *  isn't to mutate the first object, use clone(first).
 *
 * @param {object} first the first and mutable object
 * @param {object} second the second object
 *
 * @returns {object} The first object with the properties from the second object merged into the properties of the first
 *
 * @tutorial obj.merge
 */
Obj.prototype.merge = function(first, second) {
  return combineObjects(first, second);
};

/**
 * @description Mutates the first object by deeply applying the properties from the second object onto the properties of
 * the first object only if the properties already exist on the first object. This overwrites existing properties but
 * ignores new ones. If the desire isn't to mutate the first object, use clone(first).
 *
 * @param {object} first The first and mutable object
 * @param {object} second The second object
 *
 * @returns {object} The first object with the second objects properties applied to it
 *
 * @tutorial obj.apply
 */
Obj.prototype.apply = function(first, second) {
  return combineObjects(first, second, false);
};

/**
 * @description Returns true if the specified object is of type typeAssertion or it's constructor name is of the type
 * specified by the typeAssertion
 *
 * @param {*} object Any value with a prototype
 * @param {String} typeAssertion A string representing the name of the expected type
 *
 * @returns {boolean} True|False based on the truthiness of the typeAssertion
 *
 * @tutorial obj.is
 */
Obj.prototype.is = function(object, typeAssertion) {
  if (object === undefined) { return false }

  if (Object.prototype.toString.call(object) === '[object Object]' &&
    object.constructor.name === typeAssertion) {
    return true
  }

  return Object.prototype.toString.call(object) === '[object ' +
    typeAssertion[0].toUpperCase() + typeAssertion.substr(1).toLowerCase() + ']'
};

/**
 * @description Combines second object with first object adhering th the flagged rules:
 *
 * Flags:
 *  allowNew (true|false) -
 *      with: any property from the second object will be merged into the first object.
 *      without: only properties that already exist on the first object will be updated to contain the values of the same
 *           properties on the second object.
 *
 *  allowReferences (true|false) -
 *      with: any property from the second object that is an object will be referenced on the first object.
 *      without: any property from the second object that is an object will be a new unique object on the first object.
 *
 * @param {object} first The first and mutable object to be combined
 * @param {object} second The second object to be combined
 * @param {boolean} [allowNew] Are new properties allowed to be created on first
 * @param {boolean} [allowReferences] Are the properties combined onto first references or clones of the second properties
 *
 * @returns {object}
 *
 * @private
 */
function combineObjects(first, second, allowNew, allowReferences) {
  if (allowNew === undefined) {
    allowNew = true;
  }

  if (allowReferences === undefined) {
    allowReferences = true;
  }

  for (var property in second) {
    if (!allowNew && first[property] === undefined) {
      continue;
    }

    if (second[property].constructor == Object) {
      if (first[property] === undefined) {
        first[property] = !allowReferences ? {} : second[property];
      }
      first[property] = combineObjects(first[property], second[property], allowNew, allowReferences);

    } else {
      first[property] = second[property];

    }
  }

  return first;
}

module.exports = new Obj();
