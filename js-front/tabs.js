window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'grigora-kit-tabs'
	);

	function switchTab(
        index,
        titles,
        contents
	){
        for ( var i = 0; i < contents.length; i++ ) {
            contents[i].style.display = "none";
        }
        for ( var i = 0; i < titles.length; i++ ) {
            titles[i].classList.remove("tab-active");
        }
        if(titles[index]){
            titles[index].classList.add("tab-active");
        }
        if(contents[index]){
            contents[index].style.display = "block";
        }
    }

    function attachListeners(element, index, titles, contents){
        element.addEventListener('click', () => switchTab(index, titles, contents));

    }

	for ( var i = 0; i < elements.length; i++ ) {
		var titles = elements[ i ].querySelectorAll(".tab-btn");
		var contents = elements[ i ].querySelectorAll(".grigora-kit-inner-tab");
        for ( var j = 0; j < titles.length; j++ ) {
            attachListeners(titles[j], j, titles, contents);
        }
	}
} );
