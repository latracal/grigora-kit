window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-tabs'
	);

	

	for ( let k = 0; k < elements.length; k++ ) {
	
		let id = elements[ k ].dataset.id;
		let length = parseInt(elements[ k ].dataset.length);

	
	for(let i=0; i < length; i++) {


		

		if(document.getElementById( `${id} ${i}` )){

			if(document.getElementById( `${id} ${i}` ).className.includes('tab-active')){
				document.getElementsByClassName(`tab-contents ${id}`)[0].children[i].style = "display: block";
			}

			document.getElementById(  `${id} ${i}` ).addEventListener("click", function(){
				this.className = this.className + " tab-active";
				document.getElementsByClassName(`tab-contents ${id}`)[0].children[i].style = "display: block";
			
				
				for(let j=0; j < length; j++) {
					if(document.getElementById(  `${id} ${j}` )){
						if(j != i) {
							document.getElementById(  `${id} ${j}` ).className = document.getElementById(  `${id} ${j}` ).className.replaceAll(" tab-active", "");
							document.getElementsByClassName(`tab-contents ${id}`)[0].children[j].style = "display: none";
						}
					}
				}

		
			});
		}

		
	}
	
	
	
	
	}
});

