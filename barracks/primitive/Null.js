module.exports = {
  name: "_null_",
  watch: function(value) {
    //null is either null or it is not.
    if (value === null) {
      return value;
    }
    throw new TypeError(this.name + " caught " + value);
  },
  report: function () {
    return null;
  },
  reportWith: null
}
