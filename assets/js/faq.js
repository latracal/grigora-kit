

window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-faq'
	);




    for ( var i = 0; i < elements.length; i++ ) {
		let id = elements[ i ].dataset.id;
		let faqs = elements[ i ].dataset.faqs;
		let closedIcon = elements[ i ].dataset.closedicon;
		let openedIcon = elements[ i ].dataset.openedicon;

		faqs = JSON.parse(faqs);
		
		
		for(let j = 0; j < faqs.length; j++){
			document.getElementById( faqs[j].id ).addEventListener("click", function(){
				if ( faqs[j].hide ) {
					faqs[j].hide = false;
					document.getElementById( faqs[j].id + "-answer" ).innerHTML = "<div class='faq-answer'> " + faqs[j].answer + " </div>";
				}

				else {
					faqs[j].hide = true;
					document.getElementById( faqs[j].id + "-answer" ).innerHTML = "";
				}
				
			});
		}

		
		
		

		
		
    }

    


} );