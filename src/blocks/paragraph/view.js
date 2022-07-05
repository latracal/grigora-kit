// add hover effects
window.addEventListener( 'load', () => {
	const paragraphs = document.querySelectorAll(
		'.wp-block-grigora-kit-paragraph'
	);

    for (let i = 0; i < paragraphs.length; i++) {
        if(paragraphs[i].classList.contains("hover-effects")){
            if(paragraphs[i].dataset.settings){
                var hover_css = JSON.parse(paragraphs[i].dataset.settings);
                var css = 
                `p.block-id-${hover_css.id}:hover{
                    transform: rotateX(${ hover_css.effectHRotateX }deg) rotateY(${ hover_css.effectHRotateY }deg) rotateZ(${ hover_css.effectHRotateZ }deg) translateX(${ hover_css.effectHOffsetX }px) translateY(${ hover_css.effectHOffsetY }px) scale(${ hover_css.effectHScale }) !important;
                    border-width: ${ hover_css.effectHBorderWidth }px !important;
                    border-style: ${ hover_css.effectHBorderType } !important;
                    border-color:${ hover_css.effectHBorderColor } !important;
                    border-top-left-radius: ${ hover_css.effectHBorderRadiusTL }% !important;
                    border-top-right-radius: ${ hover_css.effectHBorderRadiusTR }% !important;
                    border-bottom-left-radius: ${ hover_css.effectHBorderRadiusBL }% !important;
                    border-bottom-left-radius: ${ hover_css.effectHBorderRadiusBR }% !important;
                }`;
                var style = document.createElement('style');
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                paragraphs[i].appendChild(style);
            }
        }
    }

});