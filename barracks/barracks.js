// primitive values
const _null_ = require('./primitive/Null.js');
const _Boolean_ = require('./primitive/Boolean.js');
const _Number_ = require('./primitive/Number.js');
const _undefined_ = require('./primitive/Undefined.js');
const _String_ = require('./primitive/String.js');

// the object object
const _Object_ = require('./Object.js');

// the Array
const _Array_ = require('./Array.js');

const barracks = {
  _null_: _null_,
  _Boolean_: _Boolean_,
  _Number_: _Number_,
  _undefined_: _undefined_,
  _String_: _String_,
  _Object_:  _Object_,
  _Array_: _Array_
}

module.exports = barracks
