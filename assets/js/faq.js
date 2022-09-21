window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-faq'
	);

    for ( var i = 0; i < elements.length; i++ ) {
		let id = elements[ i ].dataset.id;
		let length = elements[ i ].dataset.length;
		
		for(let index=0 ; index<length ; index++){

			if(document.getElementById(`faq-block-${id}-${index}`)){
				document.getElementById(`faq-block-${id}-${index}`).addEventListener('click', function(){

					let faqBlock = document.getElementById(`faq-block-${id}-${index}`);
					let activeState = faqBlock.children[0].children[0].className.includes('active');
					console.log(faqBlock.children[0].children[1].children)
					
					if(activeState){
						faqBlock.children[0].children[0].className = 'faq-question-container';
						faqBlock.children[1].className = 'faq-answer-container';
						faqBlock.children[0].children[1].children[0].className = 'renderhide';
						faqBlock.children[0].children[1].children[1].className = 'renderhide active';

					}

					else{
						faqBlock.children[0].children[0].className = 'faq-question-container active';
						faqBlock.children[1].className = 'faq-answer-container active';
						faqBlock.children[0].children[1].children[0].className = 'renderhide active';
						faqBlock.children[0].children[1].children[1].className = 'renderhide';
					}
				
				});
			}

		}	
    }
} );