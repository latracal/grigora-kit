

window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-faq'
	);

	


    for ( var i = 0; i < elements.length; i++ ) {
		let id = elements[ i ].dataset.id;
		let length = elements[ i ].dataset.length;
		
		

		for(let index=0 ; index<length ; index++){

			//Startup

			if(document.getElementById(`faq-block-${id}-${index}`)){
				
					let activeState = document.getElementById(`faq-question-${id}-${index}`).className.includes('active');
					if(activeState){
						document.getElementById(`faq-answer-${id}-${index}`).style = 'display:block';
						document.getElementById(`unhide-${id}-${index}`).style = 'display:none';
						document.getElementById(`hide-${id}-${index}`).style = 'display:block';
					}
					else{
						
						document.getElementById(`faq-answer-${id}-${index}`).style = 'display:none';
						document.getElementById(`unhide-${id}-${index}`).style = 'display:block';
						document.getElementById(`hide-${id}-${index}`).style = 'display:none';
					}

				
			}

		}

		//Event Listeners

		for(let index=0 ; index<length ; index++){

			if(document.getElementById(`faq-block-${id}-${index}`)){
				document.getElementById(`faq-block-${id}-${index}`).addEventListener('click', function(){
					let activeState = document.getElementById(`faq-question-${id}-${index}`).className.includes('active');
					if(activeState){
						document.getElementById(`faq-question-${id}-${index}`).className = 'faq-question-container';
						document.getElementById(`faq-answer-${id}-${index}`).style = 'display:none';
						document.getElementById(`unhide-${id}-${index}`).style = 'display:block';
						document.getElementById(`hide-${id}-${index}`).style = 'display:none';

					}
					else{
						document.getElementById(`faq-question-${id}-${index}`).className = 'faq-question-container active';
						document.getElementById(`faq-answer-${id}-${index}`).style = 'display:block';
						document.getElementById(`unhide-${id}-${index}`).style = 'display:none';
						document.getElementById(`hide-${id}-${index}`).style = 'display:block';
					}

				});
			}

		}
		

		

		

		

		
		
    }

    


} );