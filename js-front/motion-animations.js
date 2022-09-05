window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'has-motion-animations'
	);

	for ( var i = 0; i < elements.length; i++ ) {
		let motionanimation_mouse = elements[ i ].dataset.motionanimation_mouse;
		let motionanimation_scroll = elements[ i ].dataset.motionanimation_scroll;
        
	}

} );
