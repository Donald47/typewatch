module.exports = {
  name: "_Object_",
  watch: function(value) {
    if (Object.prototype.toString.call(value) === "[object Object]") {
      return value;
    }
    throw new TypeError(this.name + " caught " + value);
  },
  report: function () {
    return this.watch({});
  },
  reportWith: null
}
