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
        admin += document.querySelector("#wpadminbar").offsetHeight
    }
	function insertAfter(referenceNode, newNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	for ( var i = 0; i < elements.length; i++ ) {
		let sticky_data = elements[ i ].getAttribute("data-sticky_data");
        sticky_data = JSON.parse(sticky_data);
		sticky_data.offset = Number(sticky_data.offset)
		var space = document.createElement("div");
		space.style.display = "none";
		space.style.height = elements[i].offsetHeight + "px";
		insertAfter(elements[i], space);
		elements[i].style.width = elements[i].offsetWidth + "px";
		objects.push( { element: elements[i], space: space, sticky_data: sticky_data, top: elements[ i ].getBoundingClientRect().top + document.documentElement.scrollTop, height: elements[i].offsetHeight } );
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
					if(current_scroll + admin + objects[i].sticky_data.offset > objects[i].top){
						objects[i].element.style.position = "fixed";
						objects[i].element.style.top = (0+admin+objects[i].sticky_data.offset) + "px";
						objects[i].element.style.marginTop = "0px";
						objects[i].element.style.marginBottom = "0px";
						objects[i].element.style.transition = "0s";
						objects[i].space.style.display = "block";
	
					}
					else{
						objects[i].element.style.removeProperty("position");
						objects[i].element.style.removeProperty("top");
						objects[i].element.style.removeProperty("margin-top");
						objects[i].element.style.removeProperty("margin-bottom");
						objects[i].space.style.display = "none";
					}
				}
				else{
					if(current_scroll - objects[i].height + windowHeight - objects[i].sticky_data.offset < objects[i].top){
						objects[i].element.style.position = "fixed";
						objects[i].element.style.bottom = (0+objects[i].sticky_data.offset) + "px";
						objects[i].element.style.marginTop = "0px";
						objects[i].element.style.marginBottom = "0px";
						objects[i].element.style.transition = "0s";
						objects[i].space.style.display = "block";
					}
					else{
						objects[i].element.style.removeProperty("position");
						objects[i].element.style.removeProperty("bottom");
						objects[i].element.style.removeProperty("margin-top");
						objects[i].element.style.removeProperty("margin-bottom");
						objects[i].space.style.display = "none";
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

} );
