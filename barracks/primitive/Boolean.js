module.exports = {
  name: "_Boolean_",
  watch: function(value) {
    // A Boolean is true or false
    if ( value === true || value === false ) {
      // Unless it's new. Then it's an object.
      if (toString.call(value) === '[object Boolean]') {
        return value;
      }
    }
    throw new TypeError(this.name + " caught " + value);
  },
  report: function () {
    return this.watch(Math.random() >= 0.5);
  },
  reportWith: null
}
