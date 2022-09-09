function clearEmpties( o ) {
	for ( var k in o ) {
		if ( ! o[ k ] || typeof o[ k ] !== 'object' ) {
			continue; // If null or not an object, skip to the next iteration
		}

		// The property is an object
		clearEmpties( o[ k ] ); // <-- Make a recursive call on the nested object
		if ( Object.keys( o[ k ] ).length === 0 ) {
			delete o[ k ]; // The object had no properties, so delete that property
		}
	}
	return o;
}

export default clearEmpties;
