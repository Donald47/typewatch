const barracks = require('./barracks/barracks.js');

module.exports = {
  onPatrol: false,
  barracks: barracks,
  whoGoesThere: function (claim, value) {
    if (this.barracks[claim] === undefined) {
      throw new SyntaxError(claim + " was nowhere to be found.");
    } else {
      if (this.onPatrol) {
        if (typeof this.barracks[claim].reportWith === 'function') {
          return this.barracks[claim].reportWith();
        }
        return this.barracks[claim].report();
      } else {
        return this.barracks[claim].watch(value);
      }
    }
  },
  reportWith: function (claim, funct) {
    if (this.barracks[claim] === undefined) {
      throw new SyntaxError(claim + " was nowhere to be found.");
    } else {
      try {
        // Fire it once to make sure it works.
        const result = funct();
        this.barracks[claim].reportWith = funct;
        return result;
      } catch (e) {
        console.error(claim + " can't evaluate that function")
        throw e;
      }
    }
  },
  // TODO: Refactor and make logic/errors cleaner.
  train: function (newGuard) {
    try {
      try {
        // TODO: replace with _NotEmptyString_
        this.barracks['_String_'].watch(newGuard.name);
      } catch (e) {
        throw new Error("Doesn't have a name!");
      }
      if (this.barracks[newGuard.name] !== undefined) {
        throw new SyntaxError(newGuard.name + " already exists.");
      }
      newGuard.watch(newGuard.report());
      newGuard.reportWith = function () {
        return "I take orders too!";
      }
      if ("I take orders too!" === newGuard.reportWith()) {
        this.barracks[newGuard.name] = newGuard;
        return newGuard;
      }
      throw new Error("Can't follow orders, learn to reportWith!")
    } catch (e) {
      console.warn("This recruit is incompetent.");
      throw e;
    }
  },
  patrol: function (route) {
    try {
      this.onPatrol = true;
      route();
      this.onPatrol = false;
      return "all quiet";
    } catch (e) {
      console.warn("Found something!");
      throw e;
    }
  }
}
