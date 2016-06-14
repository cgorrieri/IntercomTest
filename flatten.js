// Write a function that will flatten an array of arbitrarily nested arrays of integers
// into a flat array of integers. e.g. [[1,2,[3]],4] → [1,2,3,4].
// If the language you're using has a function to flatten arrays, you should pretend it doesn't exist.

/**
 * Flatten inplace the array given
 * @param array The array to flatten
 */
function flatten(array) {
	// if the object given is undefined, null or not an array, we don't do anyting
	if (typeof array === "undefined" || array === null || array.constructor !== Array) return false;

	// loop over the items to detect nested array
	for(var i = 0; i < array.length; i++) {

		// If the element inside is an array
		if(array[i].constructor === Array) {

			// We recursively flatten it
			flatten(array[i]);
			var tmp = array[i];

			// We insert all the elements of the internal array and delete it from the general array.
			array.splice.apply(array, [i, 1].concat(tmp));

			i+= tmp.length-1;
		}
	}
	return true;
}

/**
 * Compare two arrays
 */
function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

/**
 * Test the flatten function and return if the result match
 * @param input 	The object on which the function flatten will be used
 * @param expected 	If it's an array, we do the comparaison with the result of flatten. If flase, we expect an error.
 */
function testFlatten(input, expected) {
	var stringInput = JSON.stringify(input);

	var result = flatten(input);
	var match = false;
	// If we expect an error, the result must be false
	if(expected === false) {
		match = result === false;

		console.log(match+": "+stringInput + " -> error");
	}
	// Else we compare the arrays
	else {
		// if result is false, it already failed
		if(result === false) {
			match = false;
		}
		else {
			match = arraysEqual(input, expected);	
		}
		console.log(match+": "+stringInput + " -> "+ JSON.stringify(expected)); 
	}
}

/** TEST **/

// Positive tests
testFlatten([], []);
testFlatten([1], [1]);
testFlatten([1,2], [1,2]);
testFlatten([[[]]], []);
testFlatten([[1,2,[3]],4], [1,2,3,4]);
testFlatten([[1,2,[3]],[[4]]], [1,2,3,4]);

// Negative tests
testFlatten(undefined, false);
testFlatten(null, false);
testFlatten({an: "object"}, false);
testFlatten("A string", false);