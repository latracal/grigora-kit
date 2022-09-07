window.addEventListener( 'load', function () {

	window.removeEventListener("scroll", function() {
		throttledWrite(() => {
			scrollHandle();
		})
	});
	window.removeEventListener('mousemove', function(event) {
		throttledWrite(() => {
			mouseHandle(event)
		  })
	});

	const elements = document.getElementsByClassName(
		'has-motion-animations'
	);

	var objects = [];

	for ( var i = 0; i < elements.length; i++ ) {
		let motionanimation_mouse = elements[ i ].getAttribute("data-motionanimation_mouse");
		let motionanimation_scroll = elements[ i ].getAttribute("data-motionanimation_scroll");
        motionanimation_mouse = JSON.parse(motionanimation_mouse);
        motionanimation_scroll = JSON.parse(motionanimation_scroll);
		objects.push( { element: elements[i], motionanimation_mouse, motionanimation_scroll } );
	}

	function getCSS(element, element_position, viewport_height, effect){
		if(
			!element.motionanimation_scroll[effect] || 
			!("from" in element.motionanimation_scroll[effect]) ||
			!("fromY" in element.motionanimation_scroll[effect]) ||
			!("to" in element.motionanimation_scroll[effect]) ||
			!("toY" in element.motionanimation_scroll[effect])
		){
			return "";
		}
		var from = element.motionanimation_scroll[effect].from;
		var fromY = element.motionanimation_scroll[effect].fromY;
		var to = element.motionanimation_scroll[effect].to;
		var toY = element.motionanimation_scroll[effect].toY;

		if(to < from){
			tmp = from;
			from = to;
			to = tmp;
			tmp = fromY;
			fromY = toY;
			toY = tmp;
		}

		if( element_position.top > (100-from)*viewport_height*0.01 ){
			if( effect === "vertical" ){
				return `translateY(${fromY}px)`;
			}
			else if( effect === "horizontal" ){
				return `translateX(${fromY}px)`;
			}
			else if( effect === "opacity" ){
				return fromY;
			}
			else if( effect === "blur" ){
				return `blur(${fromY}px)`;
			}
			else if( effect === "scale" ){
				return `scale(${fromY})`;
			}
		}
		else if( 
			element_position.top <= (100-from)*viewport_height*0.01 &&  
			element_position.top >= (100-to)*viewport_height*0.01
		){
			if( effect === "vertical" ){
				return `translateY(${fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY)}px)`;
			}
			else if( effect === "horizontal" ){
				return `translateX(${fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY)}px)`;
			}
			else if( effect === "opacity" ){
				return fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY);
			}
			else if( effect === "blur" ){
				return `blur(${fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY)}px)`;
			}
			else if( effect === "scale" ){
				return `scale(${fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY)})`;
			}
		}
		else{
			if( effect === "vertical" ){
				return `translateY(${toY}px)`;
			}
			else if( effect === "horizontal" ){
				return `translateX(${toY}px)`;
			}
			else if( effect === "opacity" ){
				return toY;
			}
			else if( effect === "blur" ){
				return `blur(${toY}px)`;
			}
			else if( effect === "scale" ){
				return `scale(${toY})`;
			}
		}
	}

	function scrollHandle(){
		for ( var i = 0; i < objects.length; i++ ) {
			if(objects[i].motionanimation_scroll){
				if(screen.width < 768 && objects[i].motionanimation_scroll.hideMobile){
					continue;
				}
				if((screen.width >= 768 && screen.width < 1025) && objects[i].motionanimation_scroll.hideTablet){
					continue;
				}
				if(screen.width >= 1025 && objects[i].motionanimation_scroll.hideDesktop){
					continue;
				}
				var element_position = objects[i].element.getBoundingClientRect();
				var viewport_height = (window.innerHeight || document.documentElement.clientHeight);
	
				var elementTransform = "";
				var elementOpacity = "";
				var elementFilter = "";

				elementTransform += " " + getCSS( objects[i], element_position, viewport_height, "vertical" );
				elementTransform += " " + getCSS( objects[i], element_position, viewport_height, "horizontal" );
				elementOpacity = getCSS( objects[i], element_position, viewport_height, "opacity" );
				elementFilter = getCSS( objects[i], element_position, viewport_height, "blur" );
				elementTransform += " " + getCSS( objects[i], element_position, viewport_height, "scale" );
	
				objects[i].element.style.transform = elementTransform;
				objects[i].element.style.opacity = elementOpacity;
				objects[i].element.style.filter = elementFilter;
			}
		}
	}

	function mouseHandle(event){
		for ( var i = 0; i < objects.length; i++ ) {
			if(!objects[i].motionanimation_mouse){
				continue;
			}
			// 2D 
			if(objects[i].motionanimation_mouse.D2Movement){
				var viewport_originX = (window.innerWidth || document.documentElement.clientWidth)/2;
				var viewport_originY = (window.innerHeight || document.documentElement.clientHeight)/2;
				var multiplier = 1;

				var mouseX = event.clientX;
				var mouseY = event.clientY;

				if(objects[i].motionanimation_mouse.D2Movement.direction === "opposite"){
					multiplier = -1;
				}
				else{
					multiplier = 1;
				}

				var displacement = objects[i].motionanimation_mouse.D2Movement.displacement;

				var displacementX = (mouseX-viewport_originX)*displacement*multiplier/viewport_originX;
				var displacementY = (mouseY-viewport_originY)*displacement*multiplier/viewport_originY;

				objects[i].element.style.transform = `translateX(${displacementX}px) translateY(${displacementY}px)`;
			}

			// 3D 
			if(objects[i].motionanimation_mouse.D3Movement){
				var viewport_originX = (window.innerWidth || document.documentElement.clientWidth)/2;
				var viewport_originY = (window.innerHeight || document.documentElement.clientHeight)/2;
				var multiplier = 1;

				var mouseX = event.clientX;
				var mouseY = event.clientY;

				if(objects[i].motionanimation_mouse.D3Movement.direction === "opposite"){
					multiplier = -1;
				}
				else{
					multiplier = 1;
				}

				var displacement = objects[i].motionanimation_mouse.D3Movement.displacement;
				var displacementX = (mouseX-viewport_originX)*displacement*multiplier/viewport_originX;
				var displacementY = (mouseY-viewport_originY)*displacement*multiplier/viewport_originY;

				objects[i].element.style.transform = "perspective(1200px) rotateX(" + displacementY * -1 + "deg) rotateY(" + displacementX + "deg)"
			}
		}
	}

	function throttle (timer) {
		let queuedCallback
		return callback => {
		  if (!queuedCallback) {
			timer(() => {
			  const cb = queuedCallback
			  queuedCallback = null
			  cb()
			})
		  }
		  queuedCallback = callback
		}
	  }

	const throttledWrite = throttle(requestAnimationFrame);

	window.addEventListener("scroll", function() {
		throttledWrite(() => {
			scrollHandle();
		})
	});
	window.addEventListener('mousemove', function(event) {
		console.log("here");

		throttledWrite(() => {
			mouseHandle(event)
		  })
	});

} );
