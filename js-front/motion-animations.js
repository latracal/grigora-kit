window.addEventListener( 'load', function () {
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

	function getVerticalCSS(element, element_position, viewport_height){
		if(
			!element.motionanimation_scroll.vertical || 
			!("from" in element.motionanimation_scroll.vertical) ||
			!("fromY" in element.motionanimation_scroll.vertical) ||
			!("to" in element.motionanimation_scroll.vertical) ||
			!("toY" in element.motionanimation_scroll.vertical)
		){
			return "";
		}
		var from = element.motionanimation_scroll.vertical.from;
		var fromY = element.motionanimation_scroll.vertical.fromY;
		var to = element.motionanimation_scroll.vertical.to;
		var toY = element.motionanimation_scroll.vertical.toY;

		if(to < from){
			tmp = from;
			from = to;
			to = tmp;
			tmp = fromY;
			fromY = toY;
			toY = tmp;
		}

		if( element_position.top > (100-from)*viewport_height*0.01 ){
			return `translateY(${fromY}px)`;
		}
		else if( 
			element_position.top <= (100-from)*viewport_height*0.01 &&  
			element_position.top >= (100-to)*viewport_height*0.01
		){
			return `translateY(${fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY)}px)`;
		}
		else{
			return `translateY(${toY}px)`;
		}
	}

	function getHorizontalCSS(element, element_position, viewport_height){
		if(
			!element.motionanimation_scroll.horizontal || 
			!("from" in element.motionanimation_scroll.horizontal) ||
			!("fromY" in element.motionanimation_scroll.horizontal) ||
			!("to" in element.motionanimation_scroll.horizontal) ||
			!("toY" in element.motionanimation_scroll.horizontal)
		){
			return "";
		}
		var from = element.motionanimation_scroll.horizontal.from;
		var fromY = element.motionanimation_scroll.horizontal.fromY;
		var to = element.motionanimation_scroll.horizontal.to;
		var toY = element.motionanimation_scroll.horizontal.toY;

		if(to < from){
			tmp = from;
			from = to;
			to = tmp;
			tmp = fromY;
			fromY = toY;
			toY = tmp;
		}

		if( element_position.top > (100-from)*viewport_height*0.01 ){
			return `translateX(${fromY}px)`;
		}
		else if( 
			element_position.top <= (100-from)*viewport_height*0.01 &&  
			element_position.top >= (100-to)*viewport_height*0.01
		){

			return `translateX(${fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY)}px)`;
		}
		else{
			return `translateX(${toY}px)`;
		}
	}

	function getOpacityCSS(element, element_position, viewport_height){
		if(
			!element.motionanimation_scroll.opacity || 
			!("from" in element.motionanimation_scroll.opacity) ||
			!("fromY" in element.motionanimation_scroll.opacity) ||
			!("to" in element.motionanimation_scroll.opacity) ||
			!("toY" in element.motionanimation_scroll.opacity)
		){
			return "";
		}
		var from = element.motionanimation_scroll.opacity.from;
		var fromY = element.motionanimation_scroll.opacity.fromY;
		var to = element.motionanimation_scroll.opacity.to;
		var toY = element.motionanimation_scroll.opacity.toY;

		if(to < from){
			tmp = from;
			from = to;
			to = tmp;
			tmp = fromY;
			fromY = toY;
			toY = tmp;
		}

		if( element_position.top > (100-from)*viewport_height*0.01 ){
			return fromY;
		}
		else if( 
			element_position.top <= (100-from)*viewport_height*0.01 &&  
			element_position.top >= (100-to)*viewport_height*0.01
		){

			return fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY);
		}
		else{
			return toY;
		}
	}

	function getBlurCSS(element, element_position, viewport_height){
		if(
			!element.motionanimation_scroll.blur || 
			!("from" in element.motionanimation_scroll.blur) ||
			!("fromY" in element.motionanimation_scroll.blur) ||
			!("to" in element.motionanimation_scroll.blur) ||
			!("toY" in element.motionanimation_scroll.blur)
		){
			return "";
		}
		var from = element.motionanimation_scroll.blur.from;
		var fromY = element.motionanimation_scroll.blur.fromY;
		var to = element.motionanimation_scroll.blur.to;
		var toY = element.motionanimation_scroll.blur.toY;

		if(to < from){
			tmp = from;
			from = to;
			to = tmp;
			tmp = fromY;
			fromY = toY;
			toY = tmp;
		}

		if( element_position.top > (100-from)*viewport_height*0.01 ){
			return `blur(${fromY}px)`;
		}
		else if( 
			element_position.top <= (100-from)*viewport_height*0.01 &&  
			element_position.top >= (100-to)*viewport_height*0.01
		){
			return `blur(${fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY)}px)`;
		}
		else{
			return `blur(${toY}px)`;
		}
	}

	function getScaleCSS(element, element_position, viewport_height){
		if(
			!element.motionanimation_scroll.scale || 
			!("from" in element.motionanimation_scroll.scale) ||
			!("fromY" in element.motionanimation_scroll.scale) ||
			!("to" in element.motionanimation_scroll.scale) ||
			!("toY" in element.motionanimation_scroll.scale)
		){
			return "";
		}
		var from = element.motionanimation_scroll.scale.from;
		var fromY = element.motionanimation_scroll.scale.fromY;
		var to = element.motionanimation_scroll.scale.to;
		var toY = element.motionanimation_scroll.scale.toY;

		if(to < from){
			tmp = from;
			from = to;
			to = tmp;
			tmp = fromY;
			fromY = toY;
			toY = tmp;
		}

		if( element_position.top > (100-from)*viewport_height*0.01 ){
			return `scale(${fromY})`;
		}
		else if( 
			element_position.top <= (100-from)*viewport_height*0.01 &&  
			element_position.top >= (100-to)*viewport_height*0.01
		){
			
			return `scale(${fromY-((100-from)*viewport_height*0.01 - element_position.top)/((100-from)*viewport_height*0.01 - (100-to)*viewport_height*0.01)*(fromY-toY)})`;
		}
		else{
			return `scale(${toY})`;
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

				elementTransform += " " + getVerticalCSS( objects[i], element_position, viewport_height );
				elementTransform += " " + getHorizontalCSS( objects[i], element_position, viewport_height );
				elementOpacity = getOpacityCSS( objects[i], element_position, viewport_height );
				elementFilter = getBlurCSS( objects[i], element_position, viewport_height );
				elementTransform += " " + getScaleCSS( objects[i], element_position, viewport_height );
	
				objects[i].element.style.transform = elementTransform;
				objects[i].element.style.opacity = elementOpacity;
				objects[i].element.style.filter = elementFilter;
			}
		}
	}

	function mouseHandle(event){
		for ( var i = 0; i < objects.length; i++ ) {
			// 2D 
			if(objects[i].motionanimation_mouse){
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
			if(objects[i].motionanimation_mouse){
				let cordinates = objects[i].element.getBoundingClientRect();
				let imageX = (cordinates.left + window.scrollX + cordinates.right) / 2;
				let imageY = (cordinates.top + window.scrollY + cordinates.bottom) / 2;
				const ANGLE_COMPENSATION = 50;

				let mouseX = event.clientX;
				let mouseY = event.clientY;

				let xOffset = imageX - mouseX;
				let yOffset = imageY - mouseY;

				let xRotationAngle = yOffset * -1 / ANGLE_COMPENSATION;
				let yRotationAngle = xOffset / ANGLE_COMPENSATION;

				objects[i].element.style.transform = "rotateX(" + xRotationAngle + "deg) rotateY(" + yRotationAngle + "deg) "
			}
		}
	}


	window.addEventListener("scroll", scrollHandle);
	window.addEventListener('mousemove', mouseHandle);

} );
