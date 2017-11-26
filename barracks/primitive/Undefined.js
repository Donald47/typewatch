module.exports = {
  name: "_undefined_",
  watch: function(value) {
    //undefined is either undefined or it is not.
    if (value === undefined) {
      return value;
    }
    throw new TypeError(this.name + " caught " + value);
  },
  report: function () {
    return this.watch(undefined);
  },
  reportWith: null
}
