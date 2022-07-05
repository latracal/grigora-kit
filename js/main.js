// add hover effects
window.addEventListener( 'load', () => {
	const buttons = document.querySelectorAll(
		'.grigora-kit-button'
	);

    for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains("hover-effects")){
            if(buttons[i].dataset.settings){
                var hover_css = JSON.parse(buttons[i].dataset.settings);
                var css = 
                `.block-id-${hover_css.id}:hover{
                    color: ${ hover_css.effectHColor } !important;
                    background-color: ${( !hover_css.effectHBFlag? hover_css.effectHBColor : "")} !important;
                    background-image: ${ ( hover_css.effectHBFlag? hover_css.effectHBGradient : "") } !important;
                    border-left: ${ hover_css.effectHBorder?.left?.width } ${ hover_css.effectHBorder?.left?.style } ${ hover_css.effectHBorder?.left?.color } !important;
                    border-right: ${ hover_css.effectHBorder?.right?.width } ${ hover_css.effectHBorder?.right?.style } ${ hover_css.effectHBorder?.right?.color } !important;
                    border-top: ${ hover_css.effectHBorder?.top?.width } ${ hover_css.effectHBorder?.top?.style } ${ hover_css.effectHBorder?.top?.color } !important;
                    border-bottom: ${ hover_css.effectHBorder?.bottom?.width } ${ hover_css.effectHBorder?.bottom?.style } ${ hover_css.effectHBorder?.bottom?.color } !important;
                    transform: rotateX(${ hover_css.effectHRotateX }deg) rotateY(${ hover_css.effectHRotateY }deg) rotateZ(${ hover_css.effectHRotateZ }deg) translateX(${ hover_css.effectHOffsetX }px) translateY(${ hover_css.effectHOffsetY }px) scale(${ hover_css.effectHScale }) !important;
                    border-top-right-radius:  ${ hover_css.effectHBorderRadius?.topRight } !important;
                    border-top-left-radius: ${ hover_css.effectHBorderRadius?.topLeft } !important;
                    border-bottom-right-radius: ${ hover_css.effectHBorderRadius?.bottomRight } !important;
                    border-bottom-left-radius: ${ hover_css.effectHBorderRadius?.bottomLeft } !important;
                    box-shadow: ${ hover_css.effectHShadowHO } ${ hover_css.effectHShadowVO } ${ hover_css.effectHShadowBlur } ${ hover_css.effectHShadowSpread } ${ hover_css.effectHShadowColor } !important;
                }`;
                var style = document.createElement('style');
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                buttons[i].appendChild(style);
            }
        }
    }

});