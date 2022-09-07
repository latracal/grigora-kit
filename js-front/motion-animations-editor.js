var motion_animation_objects = [];
var motion_animation_initial_run = false;

var document_handle;

if(motion_animation_constants.current_screen == "site-editor"){
	setInterval(function(){
		document_handle = frames[ 'editor-canvas' ].document;
	}, 5000);
}
else{
	document_handle = document;
}


function motion_animate() {
	if(!document_handle){
		return;
	}
	const elements = document_handle.getElementsByClassName(
		'has-motion-animations'
	);

	motion_animation_objects = [];

	for ( var i = 0; i < elements.length; i++ ) {
		let motionanimation_mouse = elements[ i ].getAttribute("data-motionanimation_mouse");
		let motionanimation_scroll = elements[ i ].getAttribute("data-motionanimation_scroll");
        motionanimation_mouse = JSON.parse(motionanimation_mouse);
        motionanimation_scroll = JSON.parse(motionanimation_scroll);
		motion_animation_objects.push( { element: elements[i], motionanimation_mouse, motionanimation_scroll } );
	}

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
	for ( var i = 0; i < motion_animation_objects.length; i++ ) {
		if(motion_animation_objects[i].motionanimation_scroll){
			if(screen.width < 768 && motion_animation_objects[i].motionanimation_scroll.hideMobile){
				continue;
			}
			if((screen.width >= 768 && screen.width < 1025) && motion_animation_objects[i].motionanimation_scroll.hideTablet){
				continue;
			}
			if(screen.width >= 1025 && motion_animation_objects[i].motionanimation_scroll.hideDesktop){
				continue;
			}
			var element_position = motion_animation_objects[i].element.getBoundingClientRect();
			var viewport_height = (window.innerHeight || document_handle.documentElement.clientHeight);

			var elementTransform = "";
			var elementOpacity = "";
			var elementFilter = "";

			elementTransform += " " + getCSS( motion_animation_objects[i], element_position, viewport_height, "vertical" );
			elementTransform += " " + getCSS( motion_animation_objects[i], element_position, viewport_height, "horizontal" );
			elementOpacity = getCSS( motion_animation_objects[i], element_position, viewport_height, "opacity" );
			elementFilter = getCSS( motion_animation_objects[i], element_position, viewport_height, "blur" );
			elementTransform += " " + getCSS( motion_animation_objects[i], element_position, viewport_height, "scale" );

			motion_animation_objects[i].element.style.transform = elementTransform;
			motion_animation_objects[i].element.style.opacity = elementOpacity;
			motion_animation_objects[i].element.style.filter = elementFilter;
		}
	}
}

function mouseHandle(event){
	for ( var i = 0; i < motion_animation_objects.length; i++ ) {
		if(!motion_animation_objects[i].motionanimation_mouse){
			continue;
		}
		// 2D 
		if(motion_animation_objects[i].motionanimation_mouse.D2Movement){
			var viewport_originX = (window.innerWidth || document_handle.documentElement.clientWidth)/2;
			var viewport_originY = (window.innerHeight || document_handle.documentElement.clientHeight)/2;
			var multiplier = 1;

			var mouseX = event.clientX;
			var mouseY = event.clientY;

			if(motion_animation_objects[i].motionanimation_mouse.D2Movement.direction === "opposite"){
				multiplier = -1;
			}
			else{
				multiplier = 1;
			}

			var displacement = motion_animation_objects[i].motionanimation_mouse.D2Movement.displacement;

			var displacementX = (mouseX-viewport_originX)*displacement*multiplier/viewport_originX;
			var displacementY = (mouseY-viewport_originY)*displacement*multiplier/viewport_originY;

			motion_animation_objects[i].element.style.transform = `translateX(${displacementX}px) translateY(${displacementY}px)`;
		}

		// 3D 
		if(motion_animation_objects[i].motionanimation_mouse.D3Movement){
			var viewport_originX = (window.innerWidth || document_handle.documentElement.clientWidth)/2;
			var viewport_originY = (window.innerHeight || document_handle.documentElement.clientHeight)/2;
			var multiplier = 1;

			var mouseX = event.clientX;
			var mouseY = event.clientY;

			if(motion_animation_objects[i].motionanimation_mouse.D3Movement.direction === "opposite"){
				multiplier = -1;
			}
			else{
				multiplier = 1;
			}

			var displacement = motion_animation_objects[i].motionanimation_mouse.D3Movement.displacement;
			var displacementX = (mouseX-viewport_originX)*displacement*multiplier/viewport_originX;
			var displacementY = (mouseY-viewport_originY)*displacement*multiplier/viewport_originY;

			motion_animation_objects[i].element.style.transform = "perspective(1200px) rotateX(" + displacementY * -1 + "deg) rotateY(" + displacementX + "deg)"
		}
	}
}

function motion_animation_remove_styles(){
	for ( var i = 0; i < motion_animation_objects.length; i++ ) {
		motion_animation_objects[i].element.style.removeProperty("transform");
		motion_animation_objects[i].element.style.removeProperty("opacity");
		motion_animation_objects[i].element.style.removeProperty("filter");
	}
}

function rafThrottle (timer) {
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

const throttledWrite = rafThrottle(requestAnimationFrame);

function scrollHandleFunction() {
	throttledWrite(() => {
		scrollHandle();
	})
}

function mouseHandleFunction(event) {
	throttledWrite(() => {
		mouseHandle(event)
	  })
}

function motion_animation_get_interface_skeleton(){
	if(motion_animation_constants.current_screen == "site-editor"){
		return document_handle;
	}
	return document_handle.querySelector(".interface-interface-skeleton__content");
}

function motion_animation_get_interface_skeleton(){
	if(motion_animation_constants.current_screen == "site-editor"){
		return document_handle;
	}
	return document_handle.querySelector(".interface-interface-skeleton__content");
}

function motion_animation_restart_listeners(){
	setTimeout(() => {
		motion_animation_remove_styles();
		motion_animate();

		// Remove the Already running Listeners
		motion_animation_get_interface_skeleton().removeEventListener("scroll", scrollHandleFunction);
		motion_animation_get_interface_skeleton().removeEventListener('mousemove', mouseHandleFunction);
	
		// Add new Listeners
		motion_animation_get_interface_skeleton().addEventListener("scroll", scrollHandleFunction);
		motion_animation_get_interface_skeleton().addEventListener('mousemove', mouseHandleFunction);
	  }, "500")

}

function motion_animation_start_listeners(){
	if(!motion_animation_initial_run){
		if(motion_animation_constants.current_screen == "site-editor"){
			var delay = "5000";
		}
		else{
			var delay = "500";
		}
		setTimeout(() => {
			motion_animate();
		
			if( motion_animation_get_interface_skeleton() && motion_animation_get_interface_skeleton() ){
				
				// Remove the Already running Listeners
				motion_animation_get_interface_skeleton().removeEventListener("scroll", scrollHandleFunction);
				motion_animation_get_interface_skeleton().removeEventListener('mousemove', mouseHandleFunction);
				
				// Add new Listeners
				motion_animation_get_interface_skeleton().addEventListener("scroll", scrollHandleFunction);
				motion_animation_get_interface_skeleton().addEventListener('mousemove', mouseHandleFunction);
			}
		}, delay)
		motion_animation_initial_run = true;
	}
}

function motion_animation_stop_listeners(){
	motion_animation_remove_styles();
	motion_animation_get_interface_skeleton().removeEventListener("scroll", scrollHandleFunction);
    motion_animation_get_interface_skeleton().removeEventListener('mousemove', mouseHandleFunction);
}
