window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-faq'
	);

    console.log("Faq.js works")

    function faqRender(
		id,
        faqs,
		
	) {
        let renderer = "<div class='faq-container'>"
        faqs.forEach(faq => {
            renderer += " <div class='faq-block'> <div class='faq-head'>"
            renderer += "<div class='faq-question-container' style=" + (!faq.hide ? {color: titleActiveColor}: {}) + ">"
            renderer += "<div class='faq-question'> " + faq.question + "</div> </div>"
            renderer += "<div class='hide-button' style=" + (!faq.hide ? {color: iconActiveColor}: {}) + ">"+ "</div></div>"
            renderer += "<div class='faq-answer'> " + faq.answer + "</div></div>"
        })
        renderer += "</div>"
        console.log("Id got is ", id)
        document.getElementById( id ).innerHTML = renderer

        return
    }

    for ( var i = 0; i < elements.length; i++ ) {
		let id = elements[ i ].dataset.id;
		let faqs = elements[ i ].dataset.faqs;
        faqRender(id, faqs);
    }

    


} );