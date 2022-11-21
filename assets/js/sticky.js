window.addEventListener( 'load', function () {

	window.removeEventListener("scroll", function() {
		throttledWrite(() => {
			scrollHandle();
		})
	});

	const elements = document.getElementsByClassName(
		'grigora-sticky'
	);

	var objects = [];
    var admin = 0;
	var windowHeight = (window.innerHeight || document.documentElement.clientHeight)

    if(document.querySelector("#wpadminbar")){
		if(screen.width >= 600){
			admin += document.querySelector("#wpadminbar").offsetHeight;
		}
    }
	function insertAfter(referenceNode, newNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	for ( var i = 0; i < elements.length; i++ ) {
		let sticky_data = elements[ i ].getAttribute("data-sticky_data");
        sticky_data = JSON.parse(sticky_data);
		if(sticky_data.offset){
			sticky_data.offset = Number(sticky_data.offset)
		}
		else{
			sticky_data.offset = 0
		}
		let parentTop = 0;
		let parentHeight = Infinity;
		if(sticky_data.inside){
			if(sticky_data.parent && document.querySelector(sticky_data.parent)){
				document.querySelector(sticky_data.parent).style.position = "relative";
				parentTop = document.querySelector(sticky_data.parent).getBoundingClientRect().top + document.documentElement.scrollTop;
				parentHeight = document.querySelector(sticky_data.parent).clientHeight;
			}
			else{
				elements[i].parentNode.style.position = "relative";
				parentTop = elements[i].parentNode.getBoundingClientRect().top + document.documentElement.scrollTop;
				parentHeight = elements[i].parentNode.clientHeight;
			}
		}
		var space = document.createElement("div");
		space.style.display = "none";
		space.style.height = elements[i].offsetHeight + "px";
		insertAfter(elements[i], space);
		elements[i].style.width = elements[i].offsetWidth + "px";
		objects.push( { element: elements[i], space: space, sticky_data: sticky_data, top: elements[ i ].getBoundingClientRect().top + document.documentElement.scrollTop, height: elements[i].offsetHeight, parentTop: parentTop, parentHeight: parentHeight } );
	}

	function scrollHandle(){
		for ( var i = 0; i < objects.length; i++ ) {
			if(objects[i].sticky_data){
				if(screen.width < 768 && objects[i].sticky_data.hideMobile){
					continue;
				}
				if((screen.width >= 768 && screen.width < 1025) && objects[i].sticky_data.hideTablet){
					continue;
				}
				if(screen.width >= 1025 && objects[i].sticky_data.hideDesktop){
					continue;
				}
				var current_scroll = document.documentElement.scrollTop;
				if(objects[i].sticky_data.sticky == "top"){
					// Check to add sticky.
					if(
						current_scroll + admin + objects[i].sticky_data.offset > objects[i].parentTop &&
						current_scroll + admin + objects[i].sticky_data.offset < objects[i].parentTop + objects[i].parentHeight - objects[i].height &&
						current_scroll + admin + objects[i].sticky_data.offset > objects[i].top
					){
						objects[i].element.style.removeProperty("bottom");
						objects[i].element.style.position = "fixed";
						objects[i].element.style.top = (0+admin+objects[i].sticky_data.offset) + "px";
						objects[i].element.style.marginTop = "0px";
						objects[i].element.style.marginBottom = "0px";
						objects[i].element.style.transition = "0s";
						objects[i].space.style.display = "block";
						objects[i].element.style.zIndex = "100";
	
					}
					else if(
						current_scroll + admin + objects[i].sticky_data.offset > objects[i].parentTop &&
						current_scroll + admin + objects[i].sticky_data.offset > objects[i].parentTop + objects[i].parentHeight - objects[i].height &&
						current_scroll + admin + objects[i].sticky_data.offset > objects[i].top
					){
						objects[i].element.style.position = "absolute";
						objects[i].element.style.bottom = (0) + "px";
						objects[i].element.style.removeProperty("top");
						objects[i].element.style.marginTop = "0px";
						objects[i].element.style.marginBottom = "0px";
						objects[i].element.style.transition = "0s";
						objects[i].space.style.display = "block";
						objects[i].element.style.removeProperty("z-index");
					}
					// Check for remove sticky.
					else{
						objects[i].element.style.removeProperty("position");
						objects[i].element.style.removeProperty("top");
						objects[i].element.style.removeProperty("margin-top");
						objects[i].element.style.removeProperty("margin-bottom");
						objects[i].space.style.display = "none";
						objects[i].element.style.removeProperty("z-index");
					}
				}
				else{
					// Check to add sticky.
					if(
						current_scroll - objects[i].sticky_data.offset + windowHeight > objects[i].parentTop &&
						current_scroll - objects[i].sticky_data.offset + windowHeight < objects[i].parentTop + objects[i].parentHeight &&
						current_scroll - objects[i].height + windowHeight - objects[i].sticky_data.offset > objects[i].top
					){
						objects[i].element.style.removeProperty("top");
						objects[i].element.style.position = "fixed";
						objects[i].element.style.bottom = (0+objects[i].sticky_data.offset) + "px";
						objects[i].element.style.marginTop = "0px";
						objects[i].element.style.marginBottom = "0px";
						objects[i].element.style.transition = "0s";
						objects[i].space.style.display = "block";
						objects[i].element.style.zIndex = "100";
					}
					else if(
						current_scroll - objects[i].sticky_data.offset + windowHeight > objects[i].parentTop &&
						current_scroll - objects[i].sticky_data.offset + windowHeight > objects[i].parentTop + objects[i].parentHeight &&
						current_scroll - objects[i].height + windowHeight - objects[i].sticky_data.offset > objects[i].top
					){
						objects[i].element.style.position = "absolute";
						objects[i].element.style.bottom = (0) + "px";
						objects[i].element.style.removeProperty("top");
						objects[i].element.style.marginTop = "0px";
						objects[i].element.style.marginBottom = "0px";
						objects[i].element.style.transition = "0s";
						objects[i].space.style.display = "block";
						objects[i].element.style.removeProperty("z-index");
					}
					// Check for remove sticky.
					else{
						objects[i].element.style.removeProperty("position");
						objects[i].element.style.removeProperty("bottom");
						objects[i].element.style.removeProperty("margin-top");
						objects[i].element.style.removeProperty("margin-bottom");
						objects[i].space.style.display = "none";
						objects[i].element.style.removeProperty("z-index");
					}
				}
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

	scrollHandle();

} );
