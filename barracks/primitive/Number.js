module.exports = {
  name: "_Number_",
  watch: function(value) {
    // A number has typeof number
    if (typeof(value) === "number") {
      // But so does NaN
      if (!isNaN(value)) {
        // and Infinity which is outside Number's max and min values
        if ((Number.MIN_VALUE <= value) && (value <= Number.MAX_VALUE)) {
          return value;
        }
      }
    }
    throw new TypeError(this.name + " caught " + value);
  },
  report: function () {
    return this.watch(Math.random() * (Number.MAX_VALUE - Number.MIN_VALUE) + Number.MIN_VALUE);
  },
  reportWith: null
}
