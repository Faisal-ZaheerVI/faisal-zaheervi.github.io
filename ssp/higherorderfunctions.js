var testObj = {
  programManager : 'Devontae'
};

// Dot notation, but bracket notation is preferred
testObj.name = 'MissionBit';

// Adding values using bracket notation
// Can only use bracket notation with string values
// testObj.1 = 'one'; => WRONG
// testObj[1] = 'one'; => RIGHT | Output => '1' : 'one'
testObj['place'] = 'China Town';

var meeting = 'WhereWeWillBeSaturday';

testObj[meeting] = 'In the office';

// console.log(testObj);

/******************************
INTRO TO HIGHER ORDER FUNCTIONS
******************************/

// Higher order functions is like storing money at a bank, the money is meant to be stored in the bank to be used at a later date

var testArray = [1,2,3,4,5,6,7];

var each = function(collection, someFunction) {
  // It will take a function and a collection as a parameters
  // Loop through the collection
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      // Call someFunction on each value (each testArray value)
      someFunction(collection[i], i);
    }
  }
  else {
    for (var key in collection) {
      someFunction(collection[key], key);
    }
  }
};

// each(testArray, function(element, index) {
//   console.log('The index of => ' + element + ' is ', index);
// });

// Calling each with an anonymous function
// each(testObj, function(value, key) {
//   console.log('The value at => ' + key + ' is => ' + value);
// })

// var sum = function(element) {
//   console.log(element + 100);
// }

// Calling each with a function expression
// each(testArray, sum);

// USING each WITH A CALLBACK THAT RETURNS THE VALUES

// Creating a higher order function which uses each

var map = function(collection, callback) {
  // Create a variable that is an array
  var results = [];
  
  // USING HOF (Higher Order Function)
  each(collection, function(element, index) {
    // Push the mutated/modified elements to the results array
    results.push(callback(element, index));
  });
  
  // USING A SIMPLE FOR LOOP
  // for (var i = 0; i < collection.length; i++) {
  //   results.push(callback(collection[i], i));
  // }
  
  // Return the results
  return results;
};

var testObj = {name :'Yi'};

var test = map(testArray, function(element, index) {
  return element;
});

// console.log(test);

// Create a filter function that will only return elements that pass a truthy test

var isEven = function(element) {
  return element % 2 === 0;
};

var filter = function(collection, predicate) {
  // Create a results array
  var trueValues = [];
  
  // Loops through the collection and push the elements that meet the predicate criteria (push only elements that are even numbers if the predicate parameter is the isEven function) to the results array
  
  // My loop solution
  // for (i = 0; i < collection.length; i++) {
  //   if (predicate(collection[i]) === true) {
  //     trueValues.push(collection[i]);
  //   }
  // }
  
  // ALternative loop solution
  each(collection, function(element) {
    // Don't have to use === true after (element)
    if(predicate(element)) {
      trueValues.push(element);
    }
  });
  
  // Return the results array
  return trueValues;
};

var reject = function(collection, predicate) {
  //
  var falseValues = [];
  
  // Loops through the collection and push the elements that do NOT meet the predicate criteria (push only elements that are even numbers if the predicate parameter is the isEven function) to the results array
  
  each(collection, function(element) {
    if (!predicate(element)) {
      falseValues.push(element);
    }
  });
  
  // Return the results array
  return falseValues;
};

var refactoredReject = function(collection, predicate) {
  // Use filter here
  return filter(collection, function(element) {
    return !predicate(element);
  });
};

// var testFiiter1 = filter(testArray, isEven);

// var testFilter2 = refactoredReject(testArray, isEven);

// Testing the refactoredReject with an anonymous function
var testFilter3 = refactoredReject(testArray, function(element) {
  return element < 3;
});

console.log(testFilter3); // => [2, 4, 6]

/******************************
HIGHER ORDER FUNCTIONS - PART 3
******************************/

var testObj = { missionBit : 'Students'};

var each = function(collection, iterator) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i);
    }
  }
  else {
    for (var key in collection) {
      iterator(collection[key], key);
    }
  }
};

// each(testObj, function(element) {
//   // Here you may do anything to the element
//   console.log(element);
// });

var testArray = [1,2,3,4,5,6,7];
var testArray2 = [[3, 5, 90], [2, 4, 5, 6], 56, 5, 95];

// Map function changes the element
// using the callback function
var map = function(collection, callback) {
  var results = [];
  
  each(collection, function(element) {
    results.push(callback(element));
  });
  
  return results;
};

// Filter function does NOT change the element
// It checks values in the collection to see if it 
// meets the predicate then pushes those values
var filter = function(collection, predicate) {
  var filtered = [];
  
  each(collection, function(element) {
    if(predicate(element)) {
      filtered.push(element);
    }
  });
  
  return filtered;
};

var multiplyBy = function(element) {
  return element * element;
};

var test = map(testArray, multiplyBy);
// console.log(test);
// console.log('This is the original array =>', testArray);

var evens = function(element) {
  return element % 2 === 0;
};

var testFilter = filter(testArray, evens);
//console.log(testFilter);

// console.log(testFilter);

// SOLVE: Filter 5's from testArray2 using filter function

// Predicate function for filtering 5's out from array
var isFive = function(element) {
  return element === 5;
};

// Function to get all values in nested arrays in testArray2
// to be in one single array of testArray2
var unNest = function(arr) {
  var newArr = [];
  
  for (var i in arr) {
    if (Array.isArray(arr[i])) {
      for (var j in arr[i]) {
        newArr.push(arr[i][j]);
      }
    }
    else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

// Filters 5's from testArray2, which is un-nested
var fivesOnly = filter(unNest(testArray2), isFive);

// Original unchanged testArray2
console.log(testArray2);
// Un-nested testArray2
console.log(unNest(testArray2));
// Filtered 5's from un-nested testArray2
console.log(fivesOnly);

