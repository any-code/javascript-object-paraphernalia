/*
            _                   ____          _
           / \   _ __  _   _   / ___|___   __| | ___
          / _ \ | '_ \| | | | | |   / _ \ / _` |/ _ \
         / ___ \| | | | |_| | | |__| (_) | (_| |  __/
        /_/   \_\_| |_|\__, |  \____\___/ \__,_|\___|
                       |___/

        javascript-object-paraphernalia
 */

function Obj() {}

/**
 * @description Perform a deep clone of two objects
 *
 * @param {object} objectToClone
 * @returns {object}
 */
Obj.prototype.clone = function(objectToClone) {
    return combineObjects({}, objectToClone, true, false);
};

/**
 * @description Mutates the first object by merging the properties of the second object into the first object,
 *  overwriting the properties already set on the first specifically passing properties by reference. If the desire
 *  isn't to mutate the first object, use clone(first).
 *
 * @param {object} first
 * @param {object} second
 *
 * @returns {object}
 */
Obj.prototype.merge = function(first, second) {
    return combineObjects(first, second);
};

/**
 * @description Mutates the first object by applying the properties from the second object onto the properties of the
 *  first object only if the properties already exist on the first object. This overwrites existing properties but
 *  ignores new ones. If the desire isn't to mutate the first object, use clone(first).
 *
 * @param {object} first
 * @param {object} second
 *
 * @returns {object}
 */
Obj.prototype.apply = function(first, second) {
    return combineObjects(first, second, false);
};

/**
 * @description returns true if the specified object is of type typeString or constructor name is of typeString
 *
 * @param {Object} object
 * @param {String} typeString
 * @returns {boolean}
 */
Obj.prototype.is = function(object, typeString) {
    if (object === undefined) { return false }

    if (Object.prototype.toString.call(object) === '[object Object]' &&
        object.constructor.name === typeString) {
        return true
    }

    return Object.prototype.toString.call(object) === '[object ' +
        typeString[0].toUpperCase() + typeString.substr(1).toLowerCase() + ']'
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
 * @param {object} first
 * @param {object} second
 * @param {boolean} allowNew
 * @param {boolean} allowReferences
 *
 * @returns {object}
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
