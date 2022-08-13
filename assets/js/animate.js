document.addEventListener( 'scroll', animate );
window.addEventListener('load', animate);

function inView( element ) {
	var windowHeight = window.innerHeight;
	var scrollY = window.scrollY || window.pageYOffset;
	var scrollPosition = scrollY + windowHeight;
	var elementPosition =
	element.getBoundingClientRect().top + scrollY + element.clientHeight;
	if ( scrollPosition > elementPosition ) {
		return true;
	}
	return false;
}

function animate() {
	const elements = document.getElementsByClassName( 'has-entrance-animation' );
	Array.from(elements).forEach((element) => {
		if ( inView( element ) ) {
			element.classList.remove( 'has-entrance-animation' );
		}
	});
}
