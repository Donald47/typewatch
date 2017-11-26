module.exports = {
  name: "_Array_",
  watch: function(value) {
    if (Object.prototype.toString.call(value) === "[object Array]") {
      return value;
    }
    throw new TypeError(this.name + " caught " + value);
  },
  report: function () {
    return this.watch([]);
  },
  reportWith: null
}
