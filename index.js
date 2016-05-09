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
  return this._combineObjects({}, objectToClone, true, false);
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
  return this._combineObjects(first, second);
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
  return this._combineObjects(first, second, false);
};

/**
 * @description behaves identically to apply() apart from when the second value is undefined defaults will return the
 * first value. No error will be thrown
 *
 * @param {object} first The first and mutable object
 * @param {object} second The second object
 *
 * @returns {object} The first object with the second objects properties applied to it
 *
 * @tutorial obj.apply
 */
Obj.prototype.defaults = function(first, second) {
  if (second === undefined) {
    return first;
  }

  return this._combineObjects(first, second, false);
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
  if (object === undefined) {
    return typeAssertion === 'undefined' || typeAssertion === undefined
  }

  if (Object.prototype.toString.call(object) === '[object Object]' &&
    object.constructor.name === typeAssertion) {
    return true
  }

  return Object.prototype.toString.call(object) === '[object ' +
    typeAssertion[0].toUpperCase() + typeAssertion.substr(1).toLowerCase() + ']'
};

/**
 * @description Flattes the nestedness of an object
 *
 * @param {*} n An Object nested keys
 */
Obj.prototype.flatten = function(n, f, d, k) {
    k = k || "", f = f || {}, d = d || 0
    var nObj = n && !n.length,
        nKeys = nObj ? Object.keys(n).length : 0;

    if (nObj && nKeys > 0) {
        var i;
        for (i in n) {
            if (k.split('.').length > d) { k = k.split('.').splice(0, d).join('.') }
            k = (d == 0) ? i : k + "." + i, f = this.flatten(n[i], f, d + 1, k)
        }
    } else f[k] = n;
    return f;
}

Obj.prototype.toKeyArray = function(object) {
    var flat = this.flatten(object),
        arr = Object.keys(flat).map(function (key) {return key});

    return arr;
}

Obj.prototype.keyExists = function(obj, key) {
    if (obj == undefined || !obj || !this.is(key, 'String'))
        return false

    var fragments = key.split('.'),
        pass = false,
        o, n = 0

    if (fragments.length > 0) o = obj[fragments.shift()]
    if (o === undefined) return pass
    if (fragments.length === 0) return true

    fragments.map(function (key) {
        if (o === undefined) return
        n++
        o = o[fragments[n-1]]
        if (o === undefined) pass = false
        else if (n === fragments.length) pass = true
    })

    return pass
}

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
Obj.prototype._combineObjects = function(first, second, allowNew, allowReferences) {
  if (!this.is(first, 'Object')) {
    throw new Error("First value must be an Object but was: " + first);
  }

  if (second === undefined) {
    second = {}
  }

  if (!this.is(second, 'Object') && second.constructor !== Array) {
    throw new Error("Second value must be an Object but was: " + second);
  }


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

    if (second[property] && second[property].constructor == Object) {
      if (first[property] === undefined) {
        first[property] = !allowReferences ? {} : second[property];
      }
      first[property] = this._combineObjects(first[property], second[property], allowNew, allowReferences);

    } else {
      first[property] = second[property];

    }
  }

  return first;
}

module.exports = new Obj();
