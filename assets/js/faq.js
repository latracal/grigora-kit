window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-faq'
	);

    for ( var i = 0; i < elements.length; i++ ) {

		console.log(elements[i].children[0].children.length);

		let parentElement = elements[i].children[0].children
		let length = parentElement.length;
		
		for(let index=0 ; index<length ; index++){
			parentElement[index].addEventListener('click', function(){
					let activeState = parentElement[index].children[0].children[0].className.includes('active');
					
					if(activeState){
						parentElement[index].children[0].children[0].className = 'faq-question-container';
						parentElement[index].children[1].className = 'faq-answer-container';
						parentElement[index].children[0].children[1].children[0].className = 'renderhide';
						parentElement[index].children[0].children[1].children[1].className = 'renderhide active';

					}

					else{
						parentElement[index].children[0].children[0].className = 'faq-question-container active';
						parentElement[index].children[1].className = 'faq-answer-container active';
						parentElement[index].children[0].children[1].children[0].className = 'renderhide active';
						parentElement[index].children[0].children[1].children[1].className = 'renderhide';
					}
			});
		}
    }
} );