document.addEventListener( 'scroll', animate );
window.addEventListener('load', animate);

function inView( element ) {
	var windowHeight = window.innerHeight;
	var scrollY = window.scrollY || window.pageYOffset;
	var scrollPosition = scrollY + windowHeight;
	var elementBottom =	element.getBoundingClientRect().top + scrollY + element.clientHeight;
	var elementTop =	element.getBoundingClientRect().top;
	if ( scrollPosition > elementBottom || windowHeight*2/3 > elementTop ) {
		return true;
	}
	return false;
}

function animate() {
	const elements = document.getElementsByClassName( 'has-entrance-animation' );
	Array.from(elements).forEach((element) => {
		if ( inView( element ) ) {
			let delay = element.getAttribute("data-animation-delay");
			if(parseInt(delay)){
				element.classList.add('animation-delayed');
				setTimeout(function() { element.classList.remove('animation-delayed'); }, delay);
			}
			element.classList.remove( 'has-entrance-animation' );
		}
	});
}
