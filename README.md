# Typewatch
Typewatch is an attempt at an easy to plug and play javascript type checker/inline testing framework.

It was inspired by the author's observations of seemingly small changes rippling through codebases in weird and unexpected ways, quietly tainting the application state with madness and negative infinity.

“It wasn't by eliminating the impossible that you got at the truth, however improbable; it was by the much harder process of eliminating the possibilities. You worked away, patiently asking questions and looking hard at things. You walked and talked, and in your heart you just hoped like hell that some bugger's nerve'd crack and he'd give himself up.” - Terry Pratchett, Feet of Clay

## Installation
```
npm install
```

### Pre-built guards.
We include a number of ready-to-use guards. As of version 0.0.1 we support.

```
_null_
_Boolean_
_Number_
_undefined_
_String_
_Object_
_Array_
```

## Use
### 1: Post your guards.
Guards work best near the entrances and exits to areas. So if we have a function that does some maths like this one:
```javascript
addThenMultiply = function(x, y, z) {
  var temp = x + y;
  temp = temp * z;
  console.log(temp);
  return temp;
}
```
The best places for guards is the variables coming in and the result getting returned.
```javascript
import guard from 'typewatch';

addThenMultiply = function(x, y, z) {
  x = guard.whoGoesThere('_Number_', x);
  y = guard.whoGoesThere('_Number_', y);
  z = guard.whoGoesThere('_Number_', z);
  var temp = x + y;
  temp = temp * z;
  console.log(temp);
  return guard.whoGoesThere('_Number_', temp);
}
```
Guards on duty either throw an error or pass the value through.

### 2: Arm them for patrol.
Guards need to equipped in order to patrol their posted areas. In our case we can give them a function to generate test data. There is no checking if the generator returns the right type because somestimes you want things to break.
```javascript
import guard from 'typewatch';

addThenMultiply = function(x, y, z) {
  guard.reportWith('_Number_', function() {
    // Chosen by fair dice roll, guarenteed to be random.
    return 4;
  });
  x = guard.whoGoesThere('_Number_', x);
  y = guard.whoGoesThere('_Number_', y);
  z = guard.whoGoesThere('_Number_', z);
  var temp = x + y;
  temp = temp * z;
  console.log(temp);
  return guard.whoGoesThere('_Number_', temp);
}
```

### 3: Send them on patrol.
Guards on patrol generate test data either using a generator if they have one or a default if they don't and the function is executed with that data.
```javascript
import guard from 'typewatch';

addThenMultiply = function(x, y, z) {
  guard.reportWith('_Number_', function() {
    // Chosen by fair dice roll, guarenteed to be random.
    return 4;
  });
  x = guard.whoGoesThere('_Number_', x);
  y = guard.whoGoesThere('_Number_', y);
  z = guard.whoGoesThere('_Number_', z);
  var temp = x + y;
  temp = temp * z;
  console.log(temp);
  guard.reportWith('_Number_', function() {
    return 0;
  });
  return guard.whoGoesThere('_Number_', temp);
}

guard.patrol(addThenMultiply);
```
In this case the console logs 32 and the function returns 0.
Adding support to patrol multiple routes is a work in progress.

### 4: Train more guards.
They need a unique **name**, a **watch** function that either returns the value or throws an error and a default **report** function to use if it hasn't been told what to **reportWith**.

By convention names are double underscored version's of the Class/Constructor/Type that's being checked against.

```javascript
guard.train({
  name: '_NumberBetween0and10_',
  watch: function(input) {
    // Return the input if it's valid, throw a TypeError if it isn't.
    input = guard.whoGoesThere('_Number_', input);
    if ((0 <= input) && (input <= 10)) {
      return input;
    }
    throw new TypeError(this.name + " caught " + input);
  },
  report: function() {
    // Fallback test data generator. It's a good idea to self validate.
    return this.watch(5);
  },
  reportWith: function() {
    // Optional test data generator that may be overridden.
    return NaN;
  }
});
```

### Contributing.
Found a bug in a validator, a way to make it better? Written a guard that's so useful it should be included as a pre-built? Submit a pull request or raise an issue.
