module.exports = {
  name: "_String_",
  watch: function(value) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
    if (Object.prototype.toString.call(value) === '[object String]') {
      return value;
    }
    throw new TypeError(this.name + " caught " + value);
  },
  report: function () {
    return this.watch("Default sample string.");
  },
  reportWith: null
}
