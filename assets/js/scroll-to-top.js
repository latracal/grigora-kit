function retnum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return parseInt(num,10); 
}

window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'grigora-kit-scroll-to-top'
	);

    var lastscroll = 0;

    function btnVisibility( index, offset, displayscrollup ){
        if (window.scrollY > retnum(offset)) {
            if(displayscrollup){
                if(window.scrollY < lastscroll){
                    elements[index].style.visibility = "visible";
                }
                else{
                    elements[index].style.visibility = "hidden";
                }
            }
            else{
                elements[index].style.visibility = "visible";
            }
        } else {
            elements[index].style.visibility = "hidden";
        }
        lastscroll = window.scrollY;
    };

    function handleScroll(index, offset, displayscrollup, smooth){
        document.addEventListener("scroll", () => {
            btnVisibility(index, offset, displayscrollup);
        });
		elements[index].addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: smooth ? "smooth" : "instant"
            });
        });
    }


	for ( var i = 0; i < elements.length; i++ ) {
        let offset = elements[ i ].dataset.offset;
		let displayscrollup = elements[ i ].dataset.displayscrollup === 'true';
		let smooth = elements[ i ].dataset.smooth === 'true';
        handleScroll( i, offset, displayscrollup, smooth );
	}
} );