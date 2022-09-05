window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-faq'
	);

    console.log("Faq.js works")

    

    for ( var i = 0; i < elements.length; i++ ) {
		let id = elements[ i ].dataset.id;
		let faqs = elements[ i ].dataset.faqs;
        
    }

    


} );