

window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-faq'
	);




    for ( var i = 0; i < elements.length; i++ ) {
		let id = elements[ i ].dataset.id;
		let faqs = elements[ i ].dataset.faqs;
		let titleActiveColor = elements[ i ].dataset.titleactivecolor;
		let iconActiveColor = elements[ i ].dataset.iconactivecolor;
		

		faqs = JSON.parse(faqs);

		let openedIcon = []
		let closedIcon = []

		for(let j = 0; j < faqs.length; j++)
		{
			closedIcon.push(document.getElementById(faqs[j].id + "-hide-1").innerHTML);
			openedIcon.push(document.getElementById(faqs[j].id + "-hide-2").innerHTML);
			document.getElementById(faqs[j].id + "-hide-2").innerHTML = "";
			document.getElementById(faqs[j].id + "-hide-1").innerHTML = "";
		}
		
		
		for(let j = 0; j < faqs.length; j++){
			document.getElementById( faqs[j].id ).addEventListener("click", function(){
				if ( faqs[j].hide ) {
					faqs[j].hide = false;
					document.getElementById( faqs[j].id + "-answer" ).innerHTML = "<div class='faq-answer'> " + faqs[j].answer + " </div>";
					document.getElementById(faqs[j].id + "-hide-3").innerHTML = "";
					document.getElementById( faqs[j].id + "-hide-1" ).innerHTML = openedIcon[j];
					document.getElementById( faqs[j].id + "-hide-1" ).style = "color: " + iconActiveColor + ";";
					document.getElementById( faqs[j].id + "-question" ).style = "color: " + titleActiveColor + ";";
					
					
					
					
				}

				else {
					faqs[j].hide = true;
					document.getElementById( faqs[j].id + "-answer" ).innerHTML = "";
					document.getElementById(faqs[j].id + "-hide-3").innerHTML = "";
					document.getElementById( faqs[j].id + "-hide-1" ).innerHTML = closedIcon[j];
					document.getElementById( faqs[j].id + "-hide-1" ).style = "";
					document.getElementById( faqs[j].id + "-question" ).style = "";
					
					
				}
				
			});
		}

		
		
		

		
		
    }

    


} );