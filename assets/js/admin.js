const preLoader = document.querySelector( '.preloader' );
const grigoraTempSingles = document.querySelectorAll(
	'.grigora-templates-single'
);
const modalIframe = document.querySelector( '.modal-iframe' );
const colorPalCustomm = document.querySelectorAll( '.color-pal-default' );
let currentTemplateClicked = null;

// calling various functions on loading of the iframe
document.getElementById( 'my-iframe-div' ).onload = function () {
	preLoader.style.display = 'none';
	modalIframe.style.display = 'block';

	setCurrentSiteName();
	setCurrentSiteTagline();
	setCurrentSiteLogo();
	setCurrentSiteLogowidth();

	set_main_default_palette_to_iframe();

	set_which_palette_to_be_checked();

	sending_default_form_values();

	retrieveValue();
};

// checks the color palette which user selected before
function set_which_palette_to_be_checked() {
	let value1 = sessionStorage.getItem( 'form_color_background' );
	let value2 = sessionStorage.getItem( 'form_color_canvas' );
	let value3 = sessionStorage.getItem( 'form_color_foreground' );
	let value4 = sessionStorage.getItem( 'form_color_primary' );
	let value5 = sessionStorage.getItem( 'form_color_secondary' );
	let value6 = sessionStorage.getItem( 'form_color_button' );
	let value7 = sessionStorage.getItem( 'form_color_button_text' );

	if (
		value1 == null &&
		value2 == null &&
		value3 == null &&
		value4 == null &&
		value5 == null &&
		value6 == null &&
		value7 == null
	) {
		document
			.querySelector( '.main-color-preset-default' )
			.classList.add( 'is-selected' );
		return;
	}

	let col_palettes = document.querySelectorAll(
		'.main-color-preset-default-single-color'
	);

	// to check if the main default color palette was checked

	let is_main_default_palette_checked = true;

	for ( let i = 0; i < col_palettes.length; i++ ) {
		let temp_colorr = col_palettes[ i ].style.backgroundColor;
		let myobj = rgbToObj( temp_colorr );
		let hexValue1 = RGBToHex( myobj.red, myobj.green, myobj.blue );
		if ( i == 0 && hexValue1 !== value1 ) {
			is_main_default_palette_checked = false;
			break;
		} else if ( i == 1 && hexValue1 !== value2 ) {
			is_main_default_palette_checked = false;
			break;
		} else if ( i == 2 && hexValue1 !== value3 ) {
			is_main_default_palette_checked = false;
			break;
		} else if ( i == 3 && hexValue1 !== value4 ) {
			is_main_default_palette_checked = false;
			break;
		} else if ( i == 4 && hexValue1 !== value5 ) {
			is_main_default_palette_checked = false;
			break;
		} else if ( i == 5 && hexValue1 !== value6 ) {
			is_main_default_palette_checked = false;
			break;
		} else if ( i == 6 && hexValue1 !== value7 ) {
			is_main_default_palette_checked = false;
			break;
		}
	}

	if (
		is_main_default_palette_checked &&
		document
			.querySelector( '.main-color-preset-default' )
			.classList.contains( 'is-selected' ) == false
	) {
		document.querySelector( '.main-color-preset-default' ).click();
		return;
	}

	if ( is_main_default_palette_checked ) {
		return;
	}

	// to check if any of the default color palletes was checked

	colorPalCustomm.forEach( ( colorPalCustomSingle ) => {
		const colorPalCustomChilds = colorPalCustomSingle.childNodes;
		let counter = -1;

		let is_selected_among_palettes = true;

		for ( i = 0; i < colorPalCustomChilds.length; i++ ) {
			if ( colorPalCustomChilds[ i ].nodeName.toLowerCase() == 'div' ) {
				let bgColor = window.getComputedStyle(
					colorPalCustomChilds[ i ]
				).backgroundColor;

				let myobj = rgbToObj( bgColor );
				let hexValue = RGBToHex( myobj.red, myobj.green, myobj.blue );
				counter = counter + 1;
				if ( counter == 0 && hexValue !== value1 ) {
					is_selected_among_palettes = false;
					break;
				} else if ( counter == 1 && hexValue !== value2 ) {
					is_selected_among_palettes = false;
					break;
				} else if ( counter == 2 && hexValue !== value3 ) {
					is_selected_among_palettes = false;
					break;
				} else if ( counter == 3 && hexValue !== value4 ) {
					is_selected_among_palettes = false;
					break;
				} else if ( counter == 4 && hexValue !== value5 ) {
					is_selected_among_palettes = false;
					break;
				} else if ( counter == 5 && hexValue !== value6 ) {
					is_selected_among_palettes = false;
					break;
				} else if ( counter == 6 && hexValue !== value7 ) {
					is_selected_among_palettes = false;
					break;
				}
			}
		}

		if (
			is_selected_among_palettes &&
			colorPalCustomSingle.classList.contains( 'is-selected' )
		) {
			return;
		}

		if ( is_selected_among_palettes ) {
			colorPalCustomSingle.click();
			return;
		}
	} );
}

// sets wordpress spinner gif before loading the iframe
grigoraTempSingles.forEach( ( grigTempSin ) => {
	grigTempSin.addEventListener( 'click', function () {
		modalIframe.style.display = 'none';

		preLoader.style.display = 'block';
	} );
} );

const modalBtns = document.getElementsByClassName( 'demo-overlay' );
const modalClose = document.getElementsByClassName( 'close' );
const modal = document.querySelector( '.demo_modal' );

var toggleModal = function ( event ) {
	if ( modal.classList.contains( 'open-modal' ) ) {
		return;
	}
	var target = event.target;
	var name = target.getAttribute( 'data-name' );
	var slug = target.getAttribute( 'data-slug' );
	var demo_url = target.getAttribute( 'data-demo_url' );
	var iframe = modal.querySelector( '.modal-iframe' );
	iframe.setAttribute( 'src', demo_url );
	iframe.setAttribute( 'title', name );
	var formtemplate = document.querySelector( '.form-template' );
	formtemplate.value = slug;

	var panel1 = document.querySelector( '.panel.one' );
	var panel2 = document.querySelector( '.panel.two' );
	var panel3 = document.querySelector( '.panel.three' );
	var panel4 = document.querySelector( '.panel.four' );
	var panel5 = document.querySelector( '.panel.five' );

	panel1.style.display = 'block';
	panel2.style.display = 'none';
	panel3.style.display = 'none';
	panel4.style.display = 'none';
	panel5.style.display = 'none';
	
	modal.classList.add( 'open-modal' );
	push_assets_in_input( slug );
	let tempName = slug.toLowerCase();
	let nameToSet = tempName.replace( / /g, '' );
	currentTemplateClicked = nameToSet;
};

Array.from( modalBtns ).forEach( function ( element ) {
	element.addEventListener( 'click', toggleModal );
} );

var toggleModalClose = function ( event ) {
	if ( modal.classList.contains( 'open-modal' ) ) {
		modal.classList.remove( 'open-modal' );
	}
	modal.classList.remove( 'open-modal' );
};

Array.from( modalClose ).forEach( function ( element ) {
	element.addEventListener( 'click', toggleModalClose );
} );

var svg = document.querySelector( '.modal_screen_size' );
if ( svg ) {
	var icon = svg.getElementsByClassName( 'bi' );
	if ( icon ) {
		for ( var i = 0; i < icon.length; i++ ) {
			icon[ i ].addEventListener( 'click', function () {
				var current = document.getElementsByClassName( 'active' );
				current[ 0 ].classList = current[ 0 ].classList.add( 'active' );
				this.classList += ' active';
			} );
		}
	}
}

const desktopView = document.querySelector( '.device-selector-desktop-btn' );
const tabletView = document.querySelector( '.device-selector-tablet-btn' );
const mobileView = document.querySelector( '.device-selector-mobile-btn' );
const iframe = document.querySelector( '.modal-iframe' );

if ( desktopView ) {
	desktopView.addEventListener( 'click', function () {
		if ( iframe.classList.contains( 'tablet' ) ) {
			iframe.classList.remove( 'tablet' );
		}
		if ( iframe.classList.contains( 'mobile' ) ) {
			iframe.classList.remove( 'mobile' );
		}
		iframe.classList.add( 'desktop' );
		desktopView.classList.add( 'is-selected' );
		if ( tabletView ) {
			tabletView.classList.remove( 'is-selected' );
		}
		if ( mobileView ) {
			mobileView.classList.remove( 'is-selected' );
		}
	} );
}

if ( tabletView ) {
	tabletView.addEventListener( 'click', function () {
		if ( iframe.classList.contains( 'desktop' ) ) {
			iframe.classList.remove( 'desktop' );
		}
		if ( iframe.classList.contains( 'mobile' ) ) {
			iframe.classList.remove( 'mobile' );
		}
		iframe.classList.add( 'tablet' );
		if ( desktopView ) {
			desktopView.classList.remove( 'is-selected' );
		}
		tabletView.classList.add( 'is-selected' );
		if ( mobileView ) {
			mobileView.classList.remove( 'is-selected' );
		}
	} );
}

if ( mobileView ) {
	mobileView.addEventListener( 'click', function () {
		if ( iframe.classList.contains( 'desktop' ) ) {
			iframe.classList.remove( 'desktop' );
		}
		if ( iframe.classList.contains( 'tablet' ) ) {
			iframe.classList.remove( 'tablet' );
		}
		iframe.classList.add( 'mobile' );
		if ( desktopView ) {
			desktopView.classList.remove( 'is-selected' );
		}
		if ( tabletView ) {
			tabletView.classList.remove( 'is-selected' );
		}
		mobileView.classList.add( 'is-selected' );
	} );
}

var sel = document.getElementById( 'grigora-templates-select' );
var singles = document.getElementsByClassName( 'grigora-templates-single' );

if ( sel ) {
	sel.onchange = function ( e ) {
		var selectedvalue = this[ this.selectedIndex ].text;
		for ( let i = 0; i < singles.length; i++ ) {
			const element = singles[ i ];
			var categories = JSON.parse(
				element.getAttribute( 'data-category' )
			);
			if ( selectedvalue === 'All' ) {
				element.classList.remove( 'cat_filter' );
			} else if ( ! categories.includes( selectedvalue ) ) {
				element.classList.add( 'cat_filter' );
			} else {
				element.classList.remove( 'cat_filter' );
			}
		}
	};
}

const inputsrc = document.getElementById( 'grigora-templates-input' );

const inputHandler = function ( e ) {
	var textinput = e.target.value;
	for ( let i = 0; i < singles.length; i++ ) {
		const element = singles[ i ];
		var name = element.getAttribute( 'data-name' );
		if ( name.toLowerCase().includes( textinput.toLowerCase() ) ) {
			element.classList.remove( 'text_filter' );
		} else {
			element.classList.add( 'text_filter' );
		}
	}
};

if ( inputsrc ) {
	inputsrc.addEventListener( 'input', inputHandler );
	inputsrc.addEventListener( 'propertychange', inputHandler );
}

const closeBtn = document.querySelector( '.close-btn' );
const paneltogglebtn = document.querySelector( '.panel-toggle' );
// const modalHeader = document.querySelector(".modal_header");

var toggleConModalClose = function ( event ) {
	var panel = document.querySelector( '.panel-wrap' );
	var svg = paneltogglebtn.querySelector( 'svg' );
	if ( panel ) {
		panel.style.transform = 'translateX(0%)';
		// conBtn.style.transform = "translateX(200%)";
		svg.style.transform = 'rotate(180deg)';
	}
};

if ( closeBtn ) {
	closeBtn.addEventListener( 'click', toggleConModalClose );
}

var continuestep1onPress = function ( event ) {
	var panelprev = document.querySelector( '.panel.one' );
	var panelnext = document.querySelector( '.panel.two' );
	panelprev.style.display = 'none';
	panelnext.style.display = 'block';
};

const continuestep1 = document.querySelector( '.continue-btn-step-1' );
if ( continuestep1 ) {
	continuestep1.addEventListener( 'click', continuestep1onPress );
}

var continuestep2onPress = function ( event ) {
	var panelprev = document.querySelector( '.panel.two' );
	var panelnext = document.querySelector( '.panel.three' );
	panelprev.style.display = 'none';
	panelnext.style.display = 'block';
};

const continuestep2 = document.querySelector( '.continue-btn-step-2' );
if ( continuestep2 ) {
	continuestep2.addEventListener( 'click', continuestep2onPress );
}

var backstep2onPress = function ( event ) {
	var panelprev = document.querySelector( '.panel.two' );
	var panelnext = document.querySelector( '.panel.one' );
	panelprev.style.display = 'none';
	panelnext.style.display = 'block';
};

const backstep2 = document.querySelector( '.back-btn-step-2' );
if ( backstep2 ) {
	backstep2.addEventListener( 'click', backstep2onPress );
}

var continuestep3onPress = function ( event ) {
	var panelprev = document.querySelector( '.panel.three' );
	var panelnext = document.querySelector( '.panel.four' );
	panelprev.style.display = 'none';
	panelnext.style.display = 'block';
};

const continuestep3 = document.querySelector( '.continue-btn-step-3' );

if ( continuestep3 ) {
	continuestep3.addEventListener( 'click', continuestep3onPress );
}

var backstep3onPress = function ( event ) {
	var panelprev = document.querySelector( '.panel.three' );
	var panelnext = document.querySelector( '.panel.two' );
	panelprev.style.display = 'none';
	panelnext.style.display = 'block';
};

const backstep3 = document.querySelector( '.back-btn-step-3' );
if ( backstep3 ) {
	backstep3.addEventListener( 'click', backstep3onPress );
}

var continuestep4onPress = function ( event ) {
	var panelprev = document.querySelector( '.panel.four' );
	var panelnext = document.querySelector( '.panel.five' );
	panelprev.style.display = 'none';
	panelnext.style.display = 'block';
};

const continuestep4 = document.querySelector( '.continue-btn-step-4' );
if ( continuestep4 ) {
	continuestep4.addEventListener( 'click', continuestep4onPress );
}

var backstep4onPress = function ( event ) {
	var panelprev = document.querySelector( '.panel.four' );
	var panelnext = document.querySelector( '.panel.three' );
	panelprev.style.display = 'none';
	panelnext.style.display = 'block';
};

const backstep4 = document.querySelector( '.back-btn-step-4' );
if ( backstep4 ) {
	backstep4.addEventListener( 'click', backstep4onPress );
}

var backstep5onPress = function ( event ) {
	var panelprev = document.querySelector( '.panel.five' );
	var panelnext = document.querySelector( '.panel.four' );
	panelprev.style.display = 'none';
	panelnext.style.display = 'block';
};

const backstep5 = document.querySelector( '.back-btn-step-5' );
if ( backstep5 ) {
	backstep5.addEventListener( 'click', backstep5onPress );
}

const advance_para_toggle = document.getElementById( 'advance-para-btn' );
const colorPalCustom = document.querySelector( '.color-pal-custom' );

advance_para_toggle.addEventListener( 'click', function () {
	if ( colorPalCustom.style.display == 'none' ) {
		colorPalCustom.style.display = 'block';
	} else {
		colorPalCustom.style.display = 'none';
	}
} );

// function to set the is-selected class for the clicked color palette
const ColorPalleteDefault = document.querySelectorAll( '.color-pal-default' );
const ColorPalleteDefaultAll = [ ...ColorPalleteDefault ];
ColorPalleteDefaultAll.forEach( ( ele ) => {
	ele.addEventListener( 'click', function () {
		ele.style = 'opacity: 1';
		if ( ! ele.classList.contains( 'is-selected' ) ) {
			ele.classList.add( 'is-selected' );
		}
		document
			.querySelector( '.main-color-preset-default' )
			.classList.remove( 'is-selected' );
		ColorPalleteDefaultAll.forEach( ( ele1 ) => {
			if ( ele1 != ele ) {
				ele1.classList.remove( 'is-selected' );
				ele1.style = 'opacity: 0.7';
			}
		} );
	} );
} );

const Select_replace_img_btn = document.getElementById(
	'grigora_st_media_manager'
);
Select_replace_img_btn.addEventListener( 'click', function () {
	Select_replace_img_btn.value = 'Replace Image';
} );

// color palette advance section toggle function
const Advance_para_btn = document.getElementById( 'advance-para-btn' );
const SvgAdvanceParaIcon = document.getElementById( 'svg-up-down-icon' );
Advance_para_btn.addEventListener( 'click', function () {
	SvgAdvanceParaIcon.classList.toggle( 'svg-advance-down' );
	if ( SvgAdvanceParaIcon.classList.contains( 'svg-advance-down' ) ) {
		SvgAdvanceParaIcon.style = 'transform: rotate(270deg)';
	} else {
		SvgAdvanceParaIcon.style = 'transform: rotate(90deg);';
	}
} );

// method to add is-selected class from various available fonts which the user selects
const FontsButtonsSingles = document.querySelectorAll( '.fonts-btns-single' );
const FontsButtonsSinglesAll = [ ...FontsButtonsSingles ];
FontsButtonsSinglesAll.forEach( ( ele ) => {
	ele.addEventListener( 'click', function () {
		if ( ! ele.classList.contains( 'is-selected' ) ) {
			ele.classList.add( 'is-selected' );
		}
		FontsButtonsSinglesAll.forEach( ( ele1 ) => {
			if ( ele1 != ele ) {
				ele1.classList.remove( 'is-selected' );
			}
		} );
	} );
} );

document.querySelectorAll( 'input[type="range"]' ).forEach( ( input ) => {
	input.addEventListener( 'mousedown', () =>
		window.getSelection().removeAllRanges()
	);
} );

// removing the default sidebar scrollbar
document
	.querySelector( '.cross-sideicons-close-btn' )
	.addEventListener( 'click', () => {
		document.body.classList.remove( 'remove-default-side-scrollbar' );
	} );

const panelToggle = document.querySelector( '.panel-toggle' );
const collapseCloseBtn = document.querySelector( '.collapse-close-btn' );

const crossSideIcons = document.querySelector( '.cross-sideicons' );
const panelToggleClass = document.querySelector( '.panel-toggle-class' );

const collapse_open_sidebar_btn = document.querySelector(
	'.collapse-open-sidebar-btn'
);

// method trigerred by clicking collapse text button for collapsing the sidebar
panelToggle.addEventListener( 'click', function () {
	collapseCloseBtn.classList.toggle( 'clicked' );
	const panel = document.querySelector( '.panel-wrap' );
	panel.style.transform = 'translateX(-100%)';
	crossSideIcons.style.transform = 'translateX(-100%)';
	panelToggleClass.style.transform = 'translateX(-100%)';

	document.querySelector( '.home-archives-post-btns' ).style.transform =
		'translateX(-100%)';
	document.querySelector( '.device-selector-btns' ).style.transform =
		'translateX(-100%)';

	document.querySelector( '.modal-iframe-div' ).style.transition =
		'0.22s ease-out';
	document.querySelector( '.modal-iframe-div' ).style.marginLeft = '0px';
	collapse_open_sidebar_btn.style.transform = 'rotate(180deg)';
} );

// method trigerred by clicking collapse icon button for collapsing and bringing back the sidebar
collapseCloseBtn.addEventListener( 'click', function () {
	if ( collapseCloseBtn.classList.contains( 'clicked' ) ) {
		collapseCloseBtn.classList.toggle( 'clicked' );
		const panel = document.querySelector( '.panel-wrap' );
		panel.style.transform = 'translateX(0%)';
		crossSideIcons.style.transform = 'translateX(0%)';
		panelToggleClass.style.transform = 'translateX(0%)';

		document.querySelector( '.home-archives-post-btns' ).style.transform =
			'translateX(0%)';
		document.querySelector( '.device-selector-btns' ).style.transform =
			'translateX(0%)';

		document.querySelector( '.modal-iframe-div' ).style.transition =
			'0.3s ease-out';
		document.querySelector( '.modal-iframe-div' ).style.marginLeft =
			'304px';
		collapse_open_sidebar_btn.style.transform = 'rotate(0deg)';
	} else {
		collapseCloseBtn.classList.toggle( 'clicked' );
		const panel = document.querySelector( '.panel-wrap' );
		panel.style.transform = 'translateX(-100%)';
		crossSideIcons.style.transform = 'translateX(-100%)';
		panelToggleClass.style.transform = 'translateX(-100%)';

		document.querySelector( '.home-archives-post-btns' ).style.transform =
			'translateX(-100%)';
		document.querySelector( '.device-selector-btns' ).style.transform =
			'translateX(-100%)';

		document.querySelector( '.modal-iframe-div' ).style.transition =
			'0.22s ease-out';
		document.querySelector( '.modal-iframe-div' ).style.marginLeft = '0px';
		collapse_open_sidebar_btn.style.transform = 'rotate(180deg)';
	}
} );

document.querySelector( '.modal-iframe-div' ).style.marginLeft = '304px';

// by clicking on any demo the default sidebar scrollbar is removed
document
	.querySelectorAll( '.grigora-templates-single' )
	.forEach( ( grigora_temp_single ) => {
		grigora_temp_single.addEventListener( 'click', () => {
			document.body.classList.add( 'remove-default-side-scrollbar' );
		} );
	} );

// home archive post btns

const hapHomeBtn = document.querySelector( '.home-archives-post-btn-home-btn' );
const hapArchivesBtn = document.querySelector(
	'.home-archives-post-btn-archives-btn'
);
const hapPostBtn = document.querySelector( '.home-archives-post-btn-post-btn' );

hapHomeBtn.addEventListener( 'click', () => {
	if ( hapHomeBtn.classList.contains( 'is-selected' ) ) {
		return;
	}
	if ( ! hapHomeBtn.classList.contains( 'is-selected' ) ) {
		hapHomeBtn.classList.add( 'is-selected' );
	}
	hapArchivesBtn.classList.remove( 'is-selected' );
	hapPostBtn.classList.remove( 'is-selected' );

	let objj = {
		name: 'set-home-page',
		value: null,
	};
	sentPostMessage( objj );
} );

hapArchivesBtn.addEventListener( 'click', () => {
	if ( hapArchivesBtn.classList.contains( 'is-selected' ) ) {
		return;
	}
	if ( ! hapArchivesBtn.classList.contains( 'is-selected' ) ) {
		hapArchivesBtn.classList.add( 'is-selected' );
	}
	hapHomeBtn.classList.remove( 'is-selected' );
	hapPostBtn.classList.remove( 'is-selected' );

	let objj = {
		name: 'set-archive-page',
		value: null,
	};
	sentPostMessage( objj );
} );

hapPostBtn.addEventListener( 'click', () => {
	if ( hapPostBtn.classList.contains( 'is-selected' ) ) {
		return;
	}
	if ( ! hapPostBtn.classList.contains( 'is-selected' ) ) {
		hapPostBtn.classList.add( 'is-selected' );
	}
	hapHomeBtn.classList.remove( 'is-selected' );
	hapArchivesBtn.classList.remove( 'is-selected' );

	let objj = {
		name: 'set-post-page',
		value: null,
	};
	sentPostMessage( objj );
} );

// btn collapse button combine hover effects

document
	.getElementById( 'panel-toggle-class-collapse-btn' )
	.addEventListener( 'mouseover', () => {
		document.querySelector( '.collapse-open-sidebar-btn' ).style.color =
			'#2271b1';
		document.getElementById(
			'panel-toggle-class-collapse-btn'
		).style.color = '#2271b1';
	} );

document
	.getElementById( 'panel-toggle-class-collapse-btn' )
	.addEventListener( 'mouseleave', () => {
		document.querySelector( '.collapse-open-sidebar-btn' ).style.color =
			'initial';
		document.getElementById(
			'panel-toggle-class-collapse-btn'
		).style.color = 'initial';
	} );

document
	.querySelector( '.collapse-open-sidebar-btn' )
	.addEventListener( 'mouseover', () => {
		document.getElementById(
			'panel-toggle-class-collapse-btn'
		).style.color = '#2271b1';
		document.querySelector( '.collapse-open-sidebar-btn' ).style.color =
			'#2271b1';
	} );

document
	.querySelector( '.collapse-open-sidebar-btn' )
	.addEventListener( 'mouseleave', () => {
		document.getElementById(
			'panel-toggle-class-collapse-btn'
		).style.color = 'initial';
		document.querySelector( '.collapse-open-sidebar-btn' ).style.color =
			'initial';
	} );

// all the advance color buttons and their hidden inputs
const colorInput1 = document.querySelector( '#color1' );
const colorInput2 = document.querySelector( '#color2' );
const colorInput3 = document.querySelector( '#color3' );
const colorInput4 = document.querySelector( '#color4' );
const colorInput5 = document.querySelector( '#color5' );
const colorInput6 = document.querySelector( '#color6' );
const colorInput7 = document.querySelector( '#color7' );
const hexInput1 = document.querySelector( '#hex1' );
const hexInput2 = document.querySelector( '#hex2' );
const hexInput3 = document.querySelector( '#hex3' );
const hexInput4 = document.querySelector( '#hex4' );
const hexInput5 = document.querySelector( '#hex5' );
const hexInput6 = document.querySelector( '#hex6' );
const hexInput7 = document.querySelector( '#hex7' );

// on change of any advance color corresponding hidden input value is changed with the post message to the iframe and the form value is also updated
colorInput1.addEventListener( 'input', () => {
	let color = colorInput1.value;
	hexInput1.value = color;
	document.getElementById( 'form_color_background' ).value = hexInput1.value;

	let obj = {
		name: 'site-color-background',
		value: document.getElementById( 'form_color_background' ).value,
	};
	sentPostMessage( obj );
	storeValue( 'form_color_background', hexInput1.value );
} );

colorInput2.addEventListener( 'input', () => {
	let color = colorInput2.value;
	hexInput2.value = color;
	document.getElementById( 'form_color_canvas' ).value = hexInput2.value;

	let obj = {
		name: 'site-color-canvas',
		value: document.getElementById( 'form_color_canvas' ).value,
	};
	sentPostMessage( obj );
	storeValue( 'form_color_canvas', hexInput2.value );
} );

colorInput3.addEventListener( 'input', () => {
	let color = colorInput3.value;
	hexInput3.value = color;
	document.getElementById( 'form_color_foreground' ).value = hexInput3.value;

	let obj = {
		name: 'site-color-foreground',
		value: document.getElementById( 'form_color_foreground' ).value,
	};
	sentPostMessage( obj );
	storeValue( 'form_color_foreground', hexInput3.value );
} );

colorInput4.addEventListener( 'input', () => {
	let color = colorInput4.value;
	hexInput4.value = color;
	document.getElementById( 'form_color_primary' ).value = hexInput4.value;

	let obj = {
		name: 'site-color-primary',
		value: document.getElementById( 'form_color_primary' ).value,
	};
	sentPostMessage( obj );
	storeValue( 'form_color_primary', hexInput4.value );
} );

colorInput5.addEventListener( 'input', () => {
	let color = colorInput5.value;
	hexInput5.value = color;
	document.getElementById( 'form_color_secondary' ).value = hexInput5.value;

	let obj = {
		name: 'site-color-secondary',
		value: document.getElementById( 'form_color_secondary' ).value,
	};
	sentPostMessage( obj );
	storeValue( 'form_color_secondary', hexInput5.value );
} );

colorInput6.addEventListener( 'input', () => {
	let color = colorInput6.value;
	hexInput6.value = color;
	document.getElementById( 'form_color_button' ).value = hexInput6.value;

	let obj = {
		name: 'site-color-button',
		value: document.getElementById( 'form_color_button' ).value,
	};
	sentPostMessage( obj );
	storeValue( 'form_color_button', hexInput6.value );
} );

colorInput7.addEventListener( 'input', () => {
	let color = colorInput7.value;
	hexInput7.value = color;
	document.getElementById( 'form_color_button_text' ).value = hexInput7.value;

	let obj = {
		name: 'site-color-button-text',
		value: document.getElementById( 'form_color_button_text' ).value,
	};
	sentPostMessage( obj );
	storeValue( 'form_color_button_text', hexInput7.value );
} );

// defaultly selects the color pallete which contains the is-selected class and update it in the advance color buttons and hidden inputs
// basically was helpful when main default palette was not present
colorPalCustomm.forEach( ( colorPalCustomSingle ) => {
	if ( colorPalCustomSingle.classList.contains( 'is-selected' ) ) {
		const colorPalCustomChilds = colorPalCustomSingle.childNodes;
		let counter = -1;
		for ( i = 0; i < colorPalCustomChilds.length; i++ ) {
			if ( colorPalCustomChilds[ i ].nodeName.toLowerCase() == 'div' ) {
				let bgColor = window.getComputedStyle(
					colorPalCustomChilds[ i ]
				).backgroundColor;
				// converting the rgb values to hex values with the help of the functions below
				let myobj = rgbToObj( bgColor );
				let hexValue = RGBToHex( myobj.red, myobj.green, myobj.blue );
				counter = counter + 1;
				if ( counter == 0 ) {
					colorInput1.value = hexValue;
					hexInput1.value = hexValue;
				} else if ( counter == 1 ) {
					colorInput2.value = hexValue;
					hexInput2.value = hexValue;
				} else if ( counter == 2 ) {
					colorInput3.value = hexValue;
					hexInput3.value = hexValue;
				} else if ( counter == 3 ) {
					colorInput4.value = hexValue;
					hexInput4.value = hexValue;
				} else if ( counter == 4 ) {
					colorInput5.value = hexValue;
					hexInput5.value = hexValue;
				} else if ( counter == 5 ) {
					colorInput6.value = hexValue;
					hexInput6.value = hexValue;
				} else {
					colorInput7.value = hexValue;
					hexInput7.value = hexValue;
				}
			}
		}
	}
} );

// stores the clicked color palette to the session storage along with sending the post message to the iframe and also updating the form values
colorPalCustomm.forEach( ( cpdd ) => {
	cpdd.addEventListener( 'click', () => {
		colorPalCustomm.forEach( ( colorPalCustomSingle ) => {
			if ( colorPalCustomSingle.classList.contains( 'is-selected' ) ) {
				const colorPalCustomChilds = colorPalCustomSingle.childNodes;
				let counter = -1;
				for ( i = 0; i < colorPalCustomChilds.length; i++ ) {
					if (
						colorPalCustomChilds[ i ].nodeName.toLowerCase() ==
						'div'
					) {
						let bgColor = window.getComputedStyle(
							colorPalCustomChilds[ i ]
						).backgroundColor;

						let myobj = rgbToObj( bgColor );
						let hexValue = RGBToHex(
							myobj.red,
							myobj.green,
							myobj.blue
						);
						counter = counter + 1;
						if ( counter == 0 ) {
							colorInput1.value = hexValue;
							hexInput1.value = hexValue;

							document.getElementById(
								'form_color_background'
							).value = hexInput1.value;

							let obj = {
								name: 'site-color-background',
								value: document.getElementById(
									'form_color_background'
								).value,
							};
							sentPostMessage( obj );
							storeValue(
								'form_color_background',
								hexInput1.value
							);
						} else if ( counter == 1 ) {
							colorInput2.value = hexValue;
							hexInput2.value = hexValue;

							document.getElementById(
								'form_color_canvas'
							).value = hexInput2.value;

							let obj = {
								name: 'site-color-canvas',
								value: document.getElementById(
									'form_color_canvas'
								).value,
							};
							sentPostMessage( obj );
							storeValue( 'form_color_canvas', hexInput2.value );
						} else if ( counter == 2 ) {
							colorInput3.value = hexValue;
							hexInput3.value = hexValue;

							document.getElementById(
								'form_color_foreground'
							).value = hexInput3.value;

							let obj = {
								name: 'site-color-foreground',
								value: document.getElementById(
									'form_color_foreground'
								).value,
							};
							sentPostMessage( obj );
							storeValue(
								'form_color_foreground',
								hexInput3.value
							);
						} else if ( counter == 3 ) {
							colorInput4.value = hexValue;
							hexInput4.value = hexValue;

							document.getElementById(
								'form_color_primary'
							).value = hexInput4.value;

							let obj = {
								name: 'site-color-primary',
								value: document.getElementById(
									'form_color_primary'
								).value,
							};
							sentPostMessage( obj );
							storeValue( 'form_color_primary', hexInput4.value );
						} else if ( counter == 4 ) {
							colorInput5.value = hexValue;
							hexInput5.value = hexValue;

							document.getElementById(
								'form_color_secondary'
							).value = hexInput5.value;

							let obj = {
								name: 'site-color-secondary',
								value: document.getElementById(
									'form_color_secondary'
								).value,
							};
							sentPostMessage( obj );
							storeValue(
								'form_color_secondary',
								hexInput5.value
							);
						} else if ( counter == 5 ) {
							colorInput6.value = hexValue;
							hexInput6.value = hexValue;

							document.getElementById(
								'form_color_button'
							).value = hexInput6.value;

							let obj = {
								name: 'site-color-button',
								value: document.getElementById(
									'form_color_button'
								).value,
							};
							sentPostMessage( obj );
							storeValue( 'form_color_button', hexInput6.value );
						} else {
							colorInput7.value = hexValue;
							hexInput7.value = hexValue;

							document.getElementById(
								'form_color_button_text'
							).value = hexInput7.value;

							let obj = {
								name: 'site-color-button-text',
								value: document.getElementById(
									'form_color_button_text'
								).value,
							};
							sentPostMessage( obj );
							storeValue(
								'form_color_button_text',
								hexInput7.value
							);
						}
					}
				}
			}
		} );
	} );
} );

// function to convert rgb values to hex values
function RGBToHex( red, green, blue ) {
	var r = red;
	var g = green;
	var b = blue;
	r = parseInt( r ).toString( 16 );
	g = parseInt( g ).toString( 16 );
	b = parseInt( b ).toString( 16 );

	if ( r.length == 1 ) r = '0' + r;
	if ( g.length == 1 ) g = '0' + g;
	if ( b.length == 1 ) b = '0' + b;

	return '#' + r + g + b;
}

// function to convert rgb value to an object
function rgbToObj( rgb ) {
	let colors = [ 'red', 'green', 'blue', 'alpha' ];

	let colorArr = rgb
		.slice( rgb.indexOf( '(' ) + 1, rgb.indexOf( ')' ) )
		.split( ', ' );

	let obj = {};

	colorArr.forEach( ( k, i ) => {
		obj[ colors[ i ] ] = k;
	} );

	return obj;
}

// below four functions called by install demo js to set the deafult defined variables for the four fields in the sidebar
function set_default_site_title_func( incoming_title, name ) {
	let sessionStorageTitle = sessionStorage.getItem( name + 'site-name' );
	if ( sessionStorageTitle != null ) {
		document.getElementById( 'grigora_site_name' ).value =
			sessionStorageTitle;
		document.querySelector( "input[name='site-name']" ).value =
			sessionStorageTitle;
		return;
	}
	if ( incoming_title == undefined ) {
		document.getElementById( 'grigora_site_name' ).value = 'Site name';
		document.querySelector( "input[name='site-name']" ).value = 'Site name';
		return;
	}
	document.getElementById( 'grigora_site_name' ).value = incoming_title;
	document.querySelector( "input[name='site-name']" ).value = incoming_title;
	return;
}

function set_default_site_tagline_func( incoming_tagline, name ) {
	let sessionStorageTagline = sessionStorage.getItem( name + 'site-tagline' );
	if ( sessionStorageTagline != null ) {
		document.getElementById( 'grigora_site_tagline' ).value =
			sessionStorageTagline;
		document.querySelector( "input[name='site-tagline']" ).value =
			sessionStorageTagline;
		return;
	}
	if ( incoming_tagline == undefined ) {
		document.getElementById( 'grigora_site_tagline' ).value =
			'Site tagline';
		document.querySelector( "input[name='site-tagline']" ).value =
			'Site tagline';
		return;
	}
	document.getElementById( 'grigora_site_tagline' ).value = incoming_tagline;
	document.querySelector( "input[name='site-tagline']" ).value =
		incoming_tagline;
	return;
}

function set_default_site_logo_func( incoming_site_logo, name ) {
	let sessionStorageLogo = sessionStorage.getItem( name + 'site-logo' );
	if ( sessionStorageLogo != null ) {
		document.getElementById( 'grigora_site_logo' ).value =
			sessionStorageLogo;
		document.getElementById( 'grigora_st-preview-image' ).src =
			sessionStorageLogo;
		document.getElementById( 'grigora_st-preview-image' ).style.display =
			'initial';
		return;
	}
	if ( incoming_site_logo == undefined ) {
		document.getElementById( 'grigora_site_logo' ).value = '';
		document.getElementById( 'grigora_st-preview-image' ).src = '';
		document.getElementById( 'grigora_st-preview-image' ).style.display =
			'initial';
		return;
	}
	document.getElementById( 'grigora_site_logo' ).value = incoming_site_logo;
	document.getElementById( 'grigora_st-preview-image' ).srcset =
		"";
	document.getElementById( 'grigora_st-preview-image' ).src =
		incoming_site_logo;
	document.getElementById( 'grigora_st-preview-image' ).style.display =
		'initial';
	return;
}

function set_default_site_logo_width_func( incoming_site_logo_width, name ) {
	let sessionStorageLogoWidth = sessionStorage.getItem(
		name + 'site-logosize'
	);
	if ( sessionStorageLogoWidth != null ) {
		document.getElementById( 'grigora_site_logosize' ).value =
			sessionStorageLogoWidth;
		document.querySelector( "input[name='site-logosize']" ).value =
			sessionStorageLogoWidth;
		document.querySelector( "input[name='site-logosize-output']" ).value =
			sessionStorageLogoWidth;
		return;
	}
	if (
		incoming_site_logo_width == undefined ||
		incoming_site_logo_width == false
	) {
		document.getElementById( 'grigora_site_logosize' ).value = '72';
		document.querySelector( "input[name='site-logosize']" ).value = '72';
		document.querySelector( "input[name='site-logosize-output']" ).value =
			'72';
		return;
	}
	document.getElementById( 'grigora_site_logosize' ).value =
		incoming_site_logo_width;
	document.querySelector( "input[name='site-logosize']" ).value =
		incoming_site_logo_width;
	document.querySelector( "input[name='site-logosize-output']" ).value =
		incoming_site_logo_width;
}

function setCurrentSiteName() {
	let site_name_obj = {
		name: 'site-name',
		value: document.getElementById( 'grigora_site_name' ).value,
	};
	sentPostMessage( site_name_obj );
}

function setCurrentSiteTagline() {
	let site_tagline_obj = {
		name: 'site-tagline',
		value: document.getElementById( 'grigora_site_tagline' ).value,
	};
	sentPostMessage( site_tagline_obj );
}

function setCurrentSiteLogo() {
	let site_logo_obj = {
		name: 'site-logo',
		value: document.getElementById( 'grigora_site_logo' ).value,
	};
	sentPostMessage( site_logo_obj );
}

function setCurrentSiteLogowidth() {
	let site_logo_width_obj = {
		name: 'site-logosize',
		value: document.getElementById( 'grigora_site_logosize' ).value,
	};
	sentPostMessage( site_logo_width_obj );
}

// function to set the colors of the main default color pallete received from the individual styles json files
function set_main_default_palette( name, array ) {
	let temp_array = [
		'background',
		'canvas',
		'foreground',
		'primary',
		'secondary',
		'button',
		'buttontext',
	];
	let single_colors = document.querySelectorAll(
		'.main-color-preset-default-single-color'
	);
	let i = 0;
	if ( array == undefined ) {
		let defaultColorPresets =
			document.querySelectorAll( '.color-pal-default' );
		let firstColorPreset = defaultColorPresets[ 0 ];
		let childs = firstColorPreset.childNodes;
		console.log( childs );
		let j = -1;
		for ( let i = 0; i < childs.length; i++ ) {
			if ( childs[ i ].nodeName.toLowerCase() == 'div' ) {
				j++;
				let temp_color = childs[ i ].style.backgroundColor;
				let myobj = rgbToObj( temp_color );
				let hexValuee = RGBToHex( myobj.red, myobj.green, myobj.blue );
				single_colors[ j ].style.backgroundColor = hexValuee;
			}
		}
		return;
	}
	single_colors.forEach( ( single_color ) => {
		single_color.style.backgroundColor = `${
			array[ name + temp_array[ i ] ]
		}`;
		i++;
	} );
}

// sending the other default form values other than the above sent form values after the loading of the iframe
function sending_default_form_values() {
	let fontButtons = document.querySelectorAll( '.fonts-btns-single' );

	fontButtons[ 0 ].classList.add( 'is-selected' );
	let obj = {
		name: 'site-font-family',
		value: document.getElementById( 'form_typo_single' ).value,
	};
	sentPostMessage( obj );

	document.getElementById( 'form_typo_size' ).value = 1.125;

	let obj11 = {
		name: 'site-base-font-size',
		value: document.getElementById( 'form_typo_size' ).value,
	};
	sentPostMessage( obj11 );

	document.getElementById( 'form_container_width' ).value = 1200;
	let obj12 = {
		name: 'site-container-width',
		value: document.getElementById( 'form_container_width' ).value,
	};
	sentPostMessage( obj12 );

	document.getElementById( 'form_blockgap' ).value = 2;
	let obj13 = {
		name: 'site-block-gap',
		value: document.getElementById( 'form_blockgap' ).value,
	};
	sentPostMessage( obj13 );

	document.getElementById( 'form_sidebar' ).value = 'left';
	let obj14 = {
		name: 'site-sidebar',
		value: document.getElementById( 'form_sidebar' ).value,
	};
	sentPostMessage( obj14 );
}

// method to be triggered after the user clicks the main default color palette
document
	.querySelector( '.main-color-preset-default' )
	.addEventListener( 'click', () => {
		document
			.querySelector( '.main-color-preset-default' )
			.classList.add( 'is-selected' );

		const ColorPalleteDefault =
			document.querySelectorAll( '.color-pal-default' );
		const ColorPalleteDefaultAll = [ ...ColorPalleteDefault ];
		ColorPalleteDefaultAll.forEach( ( ele ) => {
			ele.classList.remove( 'is-selected' );
			ele.style.opacity = '0.7';
		} );

		let multiple_color_of_main_preset = document.querySelectorAll(
			'.main-color-preset-default-single-color'
		);
		for ( let i = 0; i < multiple_color_of_main_preset.length; i++ ) {
			if ( i == 0 ) {
				let temp_color =
					multiple_color_of_main_preset[ i ].style.backgroundColor;
				let myobj = rgbToObj( temp_color );
				let hexValue1 = RGBToHex( myobj.red, myobj.green, myobj.blue );
				colorInput1.value = hexValue1;
				hexInput1.value = hexValue1;

				document.getElementById( 'form_color_background' ).value =
					hexInput1.value;
				let obj = {
					name: 'site-color-background',
					value: document.getElementById( 'form_color_background' )
						.value,
				};
				sentPostMessage( obj );
				storeValue( 'form_color_background', hexInput1.value );
			} else if ( i == 1 ) {
				let temp_color =
					multiple_color_of_main_preset[ i ].style.backgroundColor;
				let myobj = rgbToObj( temp_color );
				let hexValue2 = RGBToHex( myobj.red, myobj.green, myobj.blue );
				colorInput2.value = hexValue2;
				hexInput2.value = hexValue2;

				document.getElementById( 'form_color_canvas' ).value =
					hexInput2.value;
				let obj = {
					name: 'site-color-canvas',
					value: document.getElementById( 'form_color_canvas' ).value,
				};
				sentPostMessage( obj );
				storeValue( 'form_color_canvas', hexInput2.value );
			} else if ( i == 2 ) {
				let temp_color =
					multiple_color_of_main_preset[ i ].style.backgroundColor;
				let myobj = rgbToObj( temp_color );
				let hexValue3 = RGBToHex( myobj.red, myobj.green, myobj.blue );
				colorInput3.value = hexValue3;
				hexInput3.value = hexValue3;

				document.getElementById( 'form_color_foreground' ).value =
					hexInput3.value;
				let obj = {
					name: 'site-color-foreground',
					value: document.getElementById( 'form_color_foreground' )
						.value,
				};
				sentPostMessage( obj );
				storeValue( 'form_color_foreground', hexInput3.value );
			} else if ( i == 3 ) {
				let temp_color =
					multiple_color_of_main_preset[ i ].style.backgroundColor;
				let myobj = rgbToObj( temp_color );
				let hexValue4 = RGBToHex( myobj.red, myobj.green, myobj.blue );
				colorInput4.value = hexValue4;
				hexInput4.value = hexValue4;

				document.getElementById( 'form_color_primary' ).value =
					hexInput4.value;
				let obj = {
					name: 'site-color-primary',
					value: document.getElementById( 'form_color_primary' )
						.value,
				};
				sentPostMessage( obj );
				storeValue( 'form_color_primary', hexInput4.value );
			} else if ( i == 4 ) {
				let temp_color =
					multiple_color_of_main_preset[ i ].style.backgroundColor;
				let myobj = rgbToObj( temp_color );
				let hexValue5 = RGBToHex( myobj.red, myobj.green, myobj.blue );
				colorInput5.value = hexValue5;
				hexInput5.value = hexValue5;

				document.getElementById( 'form_color_secondary' ).value =
					hexInput5.value;
				let obj = {
					name: 'site-color-secondary',
					value: document.getElementById( 'form_color_secondary' )
						.value,
				};
				sentPostMessage( obj );
				storeValue( 'form_color_secondary', hexInput5.value );
			} else if ( i == 5 ) {
				let temp_color =
					multiple_color_of_main_preset[ i ].style.backgroundColor;
				let myobj = rgbToObj( temp_color );
				let hexValue6 = RGBToHex( myobj.red, myobj.green, myobj.blue );
				colorInput6.value = hexValue6;
				hexInput6.value = hexValue6;

				document.getElementById( 'form_color_button' ).value =
					hexInput6.value;
				let obj = {
					name: 'site-color-button',
					value: document.getElementById( 'form_color_button' ).value,
				};
				sentPostMessage( obj );
				storeValue( 'form_color_button', hexInput6.value );
			} else if ( i == 6 ) {
				let temp_color =
					multiple_color_of_main_preset[ i ].style.backgroundColor;
				let myobj = rgbToObj( temp_color );
				let hexValue7 = RGBToHex( myobj.red, myobj.green, myobj.blue );
				colorInput7.value = hexValue7;
				hexInput7.value = hexValue7;

				document.getElementById( 'form_color_button_text' ).value =
					hexInput7.value;
				let obj = {
					name: 'site-color-button-text',
					value: document.getElementById( 'form_color_button_text' )
						.value,
				};
				sentPostMessage( obj );
				storeValue( 'form_color_button_text', hexInput7.value );
			}
		}
	} );

// sending the colors of the main color palette when the user first visits the page or before the user make any changes in the color or clicks any color palette
function set_main_default_palette_to_iframe() {
	const multiple_color_of_main_preset = document.querySelectorAll(
		'.main-color-preset-default-single-color'
	);
	for ( let i = 0; i < multiple_color_of_main_preset.length; i++ ) {
		if ( i == 0 ) {
			let temp_color =
				multiple_color_of_main_preset[ i ].style.backgroundColor;
			let myobj = rgbToObj( temp_color );
			let hexValue1 = RGBToHex( myobj.red, myobj.green, myobj.blue );
			colorInput1.value = hexValue1;
			hexInput1.value = hexValue1;

			document.getElementById( 'form_color_background' ).value =
				hexInput1.value;
			let obj = {
				name: 'site-color-background',
				value: document.getElementById( 'form_color_background' ).value,
			};
			sentPostMessage( obj );
		} else if ( i == 1 ) {
			let temp_color =
				multiple_color_of_main_preset[ i ].style.backgroundColor;
			let myobj = rgbToObj( temp_color );
			let hexValue2 = RGBToHex( myobj.red, myobj.green, myobj.blue );
			colorInput2.value = hexValue2;
			hexInput2.value = hexValue2;

			document.getElementById( 'form_color_canvas' ).value =
				hexInput2.value;
			let obj = {
				name: 'site-color-canvas',
				value: document.getElementById( 'form_color_canvas' ).value,
			};
			sentPostMessage( obj );
		} else if ( i == 2 ) {
			let temp_color =
				multiple_color_of_main_preset[ i ].style.backgroundColor;
			let myobj = rgbToObj( temp_color );
			let hexValue3 = RGBToHex( myobj.red, myobj.green, myobj.blue );
			colorInput3.value = hexValue3;
			hexInput3.value = hexValue3;

			document.getElementById( 'form_color_foreground' ).value =
				hexInput3.value;
			let obj = {
				name: 'site-color-foreground',
				value: document.getElementById( 'form_color_foreground' ).value,
			};
			sentPostMessage( obj );
		} else if ( i == 3 ) {
			let temp_color =
				multiple_color_of_main_preset[ i ].style.backgroundColor;
			let myobj = rgbToObj( temp_color );
			let hexValue4 = RGBToHex( myobj.red, myobj.green, myobj.blue );
			colorInput4.value = hexValue4;
			hexInput4.value = hexValue4;

			document.getElementById( 'form_color_primary' ).value =
				hexInput4.value;
			let obj = {
				name: 'site-color-primary',
				value: document.getElementById( 'form_color_primary' ).value,
			};
			sentPostMessage( obj );
		} else if ( i == 4 ) {
			let temp_color =
				multiple_color_of_main_preset[ i ].style.backgroundColor;
			let myobj = rgbToObj( temp_color );
			let hexValue5 = RGBToHex( myobj.red, myobj.green, myobj.blue );
			colorInput5.value = hexValue5;
			hexInput5.value = hexValue5;

			document.getElementById( 'form_color_secondary' ).value =
				hexInput5.value;
			let obj = {
				name: 'site-color-secondary',
				value: document.getElementById( 'form_color_secondary' ).value,
			};
			sentPostMessage( obj );
		} else if ( i == 5 ) {
			let temp_color =
				multiple_color_of_main_preset[ i ].style.backgroundColor;
			let myobj = rgbToObj( temp_color );
			let hexValue6 = RGBToHex( myobj.red, myobj.green, myobj.blue );
			colorInput6.value = hexValue6;
			hexInput6.value = hexValue6;

			document.getElementById( 'form_color_button' ).value =
				hexInput6.value;
			let obj = {
				name: 'site-color-button',
				value: document.getElementById( 'form_color_button' ).value,
			};
			sentPostMessage( obj );
		} else if ( i == 6 ) {
			let temp_color =
				multiple_color_of_main_preset[ i ].style.backgroundColor;
			let myobj = rgbToObj( temp_color );
			let hexValue7 = RGBToHex( myobj.red, myobj.green, myobj.blue );
			colorInput7.value = hexValue7;
			hexInput7.value = hexValue7;

			document.getElementById( 'form_color_button_text' ).value =
				hexInput7.value;
			let obj = {
				name: 'site-color-button-text',
				value: document.getElementById( 'form_color_button_text' )
					.value,
			};
			sentPostMessage( obj );
		}
	}
}

// setting form values, sending post messages and storing session storage values when the user changes any sidebar fields

// panel 1

document
	.querySelector( "input[name='site-name']" )
	.addEventListener( 'change', ( e ) => {
		document.getElementById( 'grigora_site_name' ).value =
			document.querySelector( "input[name='site-name']" ).value;
		let obj = {
			name: 'site-name',
			value: document.getElementById( 'grigora_site_name' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			currentTemplateClicked + 'site-name',
			document.getElementById( 'grigora_site_name' ).value
		);
	} );

document
	.querySelector( "input[name='site-tagline']" )
	.addEventListener( 'change', ( e ) => {
		document.getElementById( 'grigora_site_tagline' ).value =
			document.querySelector( "input[name='site-tagline']" ).value;
		let obj = {
			name: 'site-tagline',
			value: document.getElementById( 'grigora_site_tagline' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			currentTemplateClicked + 'site-tagline',
			document.getElementById( 'grigora_site_tagline' ).value
		);
	} );

// function to help in image selection in the sidebar
function change_img_src() {
	document.getElementById( 'grigora_site_logo' ).value =
		document.getElementById( 'grigora_st-preview-image' ).src;

	let obj = {
		name: 'site-logo',
		value: document.getElementById( 'grigora_site_logo' ).value,
	};
	sentPostMessage( obj );
	storeValue(
		currentTemplateClicked + 'site-logo',
		document.getElementById( 'grigora_site_logo' ).value
	);
}

document
	.querySelector( "input[name='site-logosize-output']" )
	.addEventListener( 'change', ( e ) => {
		document.querySelector( "input[name='site-logosize']" ).value =
			document.querySelector(
				"input[name='site-logosize-output']"
			).value;
		document.getElementById( 'grigora_site_logosize' ).value =
			document.querySelector( "input[name='site-logosize']" ).value;
		let obj = {
			name: 'site-logosize',
			value: document.getElementById( 'grigora_site_logosize' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			currentTemplateClicked + 'site-logosize',
			document.getElementById( 'grigora_site_logosize' ).value
		);
	} );

document
	.querySelector( "input[name='site-logosize']" )
	.addEventListener( 'change', ( e ) => {
		document.getElementById( 'grigora_site_logosize' ).value =
			document.querySelector( "input[name='site-logosize']" ).value;
		let obj = {
			name: 'site-logosize',
			value: document.getElementById( 'grigora_site_logosize' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			currentTemplateClicked + 'site-logosize',
			document.getElementById( 'grigora_site_logosize' ).value
		);
	} );

// panel 3

document
	.querySelectorAll( '.fonts-btns-single' )
	.forEach( ( fontBtnSingleBtn ) => {
		fontBtnSingleBtn.addEventListener( 'click', (e) => {
			const temp = e.target.closest(".fonts-btns-single");
			document.getElementById( 'form_typo_single' ).value =
				temp.dataset.id;

			let obj = {
				name: 'site-font-family',
				value: document.getElementById( 'form_typo_single' ).value,
			};
			sentPostMessage( obj );
			storeValue(
				'site-font-family',
				document.getElementById( 'form_typo_single' ).value
			);
		} );
	} );

document
	.querySelector( "input[name='site-base-font-size-output']" )
	.addEventListener( 'change', ( e ) => {
		document.querySelector( "input[name='site-base-font-size']" ).value =
			document.querySelector(
				"input[name='site-base-font-size-output']"
			).value;
		document.getElementById( 'form_typo_size' ).value =
			document.querySelector( "input[name='site-base-font-size']" ).value;
		let obj = {
			name: 'site-base-font-size',
			value: document.getElementById( 'form_typo_size' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			'site-base-font-size',
			document.getElementById( 'form_typo_size' ).value
		);
	} );

document
	.querySelector( "input[name='site-base-font-size']" )
	.addEventListener( 'change', ( e ) => {
		document.getElementById( 'form_typo_size' ).value =
			document.querySelector( "input[name='site-base-font-size']" ).value;
		let obj = {
			name: 'site-base-font-size',
			value: document.getElementById( 'form_typo_size' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			'site-base-font-size',
			document.getElementById( 'form_typo_size' ).value
		);
	} );

// panel 4

document
	.querySelector( "input[name='site-container-width-output']" )
	.addEventListener( 'change', ( e ) => {
		document.querySelector( "input[name='site-container-width']" ).value =
			document.querySelector(
				"input[name='site-container-width-output']"
			).value;
		document.getElementById( 'form_container_width' ).value =
			document.querySelector(
				"input[name='site-container-width']"
			).value;
		let obj = {
			name: 'site-container-width',
			value: document.getElementById( 'form_container_width' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			'site-container-width',
			document.getElementById( 'form_container_width' ).value
		);
	} );

document
	.querySelector( "input[name='site-container-width']" )
	.addEventListener( 'change', ( e ) => {
		document.getElementById( 'form_container_width' ).value =
			document.querySelector(
				"input[name='site-container-width']"
			).value;
		let obj = {
			name: 'site-container-width',
			value: document.getElementById( 'form_container_width' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			'site-container-width',
			document.getElementById( 'form_container_width' ).value
		);
	} );

document
	.querySelector( "input[name='site-block-gap-output']" )
	.addEventListener( 'change', ( e ) => {
		document.querySelector( "input[name='site-block-gap']" ).value =
			document.querySelector(
				"input[name='site-block-gap-output']"
			).value;
		document.getElementById( 'form_blockgap' ).value =
			document.querySelector( "input[name='site-block-gap']" ).value;
		let obj = {
			name: 'site-block-gap',
			value: document.getElementById( 'form_blockgap' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			'site-block-gap',
			document.getElementById( 'form_blockgap' ).value
		);
	} );

document
	.querySelector( "input[name='site-block-gap']" )
	.addEventListener( 'change', ( e ) => {
		document.getElementById( 'form_blockgap' ).value =
			document.querySelector( "input[name='site-block-gap']" ).value;
		let obj = {
			name: 'site-block-gap',
			value: document.getElementById( 'form_blockgap' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			'site-block-gap',
			document.getElementById( 'form_blockgap' ).value
		);
	} );

document
	.querySelector( "select[name='site-sidebar']" )
	.addEventListener( 'change', ( e ) => {
		document.getElementById( 'form_sidebar' ).value =
			document.querySelector( "select[name='site-sidebar']" ).value;
		let obj = {
			name: 'site-sidebar',
			value: document.getElementById( 'form_sidebar' ).value,
		};
		sentPostMessage( obj );
		storeValue(
			'site-sidebar',
			document.getElementById( 'form_sidebar' ).value
		);
	} );

// panel 5

document
	.querySelector( "input[name='site-installtheme']" )
	.addEventListener( 'change', ( e ) => {
		if (
			document.querySelector( "input[name='site-installtheme']" ).checked
		) {
			document.getElementById( 'form_installtheme_grigora' ).value = 1;
		} else {
			document.getElementById( 'form_installtheme_grigora' ).value = 0;
		}
		storeValue(
			'site-installtheme',
			document.getElementById( 'form_installtheme_grigora' ).value
		);
	} );

document
	.querySelector( "input[name='site-includemedia']" )
	.addEventListener( 'change', ( e ) => {
		if (
			document.querySelector( "input[name='site-includemedia']" ).checked
		) {
			document.getElementById( 'form_download_image_grigora' ).value = 1;
		} else {
			document.getElementById( 'form_download_image_grigora' ).value = 0;
		}
		storeValue(
			'site-includemedia',
			document.getElementById( 'form_download_image_grigora' ).value
		);
	} );

document
	.querySelector( "input[name='site-includeplugins']" )
	.addEventListener( 'change', ( e ) => {
		if (
			document.querySelector( "input[name='site-includeplugins']" )
				.checked
		) {
			document.getElementById( 'form_include_plugins_grigora' ).value = 1;
		} else {
			document.getElementById( 'form_include_plugins_grigora' ).value = 0;
		}
		storeValue(
			'site-includeplugins',
			document.getElementById( 'form_include_plugins_grigora' ).value
		);
	} );

// sending dynamic data to iframe

function sentPostMessage( data ) {
	const framee = document.getElementById( 'my-iframe-div' );
	framee.contentWindow.postMessage(
		{
			call: 'starterTemplatePreviewDispatch',
			value: data,
		},
		'*'
	);
}

window.addEventListener( 'message', ( event ) => {}, false );

// Ajax request to refresh the image preview

function Refresh_Image( the_id ) {
	var data = {
		action: 'grigora_st_get_image',
		id: the_id,
	};

	jQuery.get( ajaxurl, data, function ( response ) {
		if ( response.success === true ) {
			if ( ! response.data.image ) {
				return;
			}
			jQuery( '#grigora_st-preview-image' ).replaceWith(
				response.data.image
			);
			change_img_src();
		}
	} );
}

// install demo button click event to show progress bar of demo download

document
	.getElementById( 'install-demo-btn' )
	.addEventListener( 'click', ( e ) => {
		document.querySelector( '.modal-iframe-div' ).style.display = 'none';
		document.querySelector( '.collapse-close-btn' ).style.display = 'none';
		document.querySelector( '.installing-demo-preloader' ).style.display =
			'block';
	} );

let scrollProgress = document.getElementById( 'progress' );
let installingDemoPreHeading = document.querySelector(
	'.installing-demo-preloader-heading'
);

function progress( ev ) {
	scrollProgress.style.background = `conic-gradient(#008fff ${ ev }deg, #c0c0ff ${ ev }deg)`;
}

// method to set the heading to display which action is going on while downloading files
function setHeading( string1, boolean ) {
	if ( boolean ) {
		installingDemoPreHeading.textContent = string1;
		installingDemoPreHeading.style.color = 'green';
	} else {
		installingDemoPreHeading.textContent = string1;
		installingDemoPreHeading.style.color = 'red';
	}
}

// method triggered if any ajax request fails while downloading files or some error happens
function installingFailedScreen() {
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector( '.body' ).style.display = 'none';
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector( '.longfazers' ).style.display = 'none';
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector( '.installing-demo-preloader-heading' ).style.display =
		'none';
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector(
			'.installing-demo-preloader-failed-screen'
		).style.display = 'block';
}

// method to get back to main screen after failed screen appears
document
	.querySelector( '.install-proloader-failed-screen-btn' )
	.addEventListener( 'click', () => {
		document.querySelector( '.modal-iframe-div' ).style.display = 'flex';
		document.querySelector( '.collapse-close-btn' ).style.display = 'block';
		document.querySelector( '.installing-demo-preloader' ).style.display =
			'none';
		document
			.querySelector( '.installing-demo-preloader' )
			.querySelector(
				'.installing-demo-preloader-failed-screen'
			).style.display = 'none';
		document
			.querySelector( '.installing-demo-preloader' )
			.querySelector( '.body' ).style.display = 'initial';
		document
			.querySelector( '.installing-demo-preloader' )
			.querySelector( '.longfazers' ).style.display = 'initial';
		document
			.querySelector( '.installing-demo-preloader' )
			.querySelector(
				'.installing-demo-preloader-heading'
			).style.display = 'initial';
		document
			.querySelector( '.installing-demo-preloader' )
			.querySelector( '.body' )
			.classList.add( 'hero-animate' );
		document
			.querySelector( '.installing-demo-preloader' )
			.querySelector( '.body' )
			.classList.remove( 'back-transition' );
	} );

// method triggered after successfully intalling demo
function installingDemoSuccessScreen() {
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector( '.body' ).style.display = 'none';
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector( '.longfazers' ).style.display = 'none';
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector( '.installing-demo-preloader-heading' ).style.display =
		'none';
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector(
			'.installing-demo-preloader-success-screen'
		).style.display = 'block';
}

// method for going back transition of the hero after all installing ajax requests are complete
function heroAnimation() {
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector( '.body' )
		.classList.remove( 'hero-animate' );
	document
		.querySelector( '.installing-demo-preloader' )
		.querySelector( '.body' )
		.classList.add( 'back-transition' );
}

// method to store values in the session storage
function storeValue( key, value ) {
	// Temporarily Stop Serving Session Data
	// sessionStorage.setItem( key, value );
}

// method to retrive values from session storage after the iframe is loaded
function retrieveValue() {
	let value5 = sessionStorage.getItem( 'form_color_background' );
	let value6 = sessionStorage.getItem( 'form_color_canvas' );
	let value7 = sessionStorage.getItem( 'form_color_foreground' );
	let value8 = sessionStorage.getItem( 'form_color_primary' );
	let value9 = sessionStorage.getItem( 'form_color_secondary' );
	let value10 = sessionStorage.getItem( 'form_color_button' );
	let value11 = sessionStorage.getItem( 'form_color_button_text' );
	let value12 = sessionStorage.getItem( 'site-font-family' );
	let value13 = sessionStorage.getItem( 'site-base-font-size' );
	let value14 = sessionStorage.getItem( 'site-container-width' );
	let value15 = sessionStorage.getItem( 'site-block-gap' );
	let value16 = sessionStorage.getItem( 'site-sidebar' );
	let value17 = sessionStorage.getItem( 'site-installtheme' );
	let value18 = sessionStorage.getItem( 'site-includemedia' );
	let value19 = sessionStorage.getItem( 'site-includeplugins' );

	if ( value5 != null ) {
		colorInput1.value = value5;
		hexInput1.value = value5;
		document.getElementById( 'form_color_background' ).value = value5;
		let obj = {
			name: 'site-color-background',
			value: document.getElementById( 'form_color_background' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value6 != null ) {
		colorInput2.value = value6;
		hexInput2.value = value6;
		document.getElementById( 'form_color_canvas' ).value = value6;
		let obj = {
			name: 'site-color-canvas',
			value: document.getElementById( 'form_color_canvas' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value7 != null ) {
		colorInput3.value = value7;
		hexInput3.value = value7;
		document.getElementById( 'form_color_foreground' ).value = value7;
		let obj = {
			name: 'site-color-foreground',
			value: document.getElementById( 'form_color_foreground' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value8 != null ) {
		colorInput4.value = value8;
		hexInput4.value = value8;
		document.getElementById( 'form_color_primary' ).value = value8;
		let obj = {
			name: 'site-color-primary',
			value: document.getElementById( 'form_color_primary' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value9 != null ) {
		colorInput5.value = value9;
		hexInput5.value = value9;
		document.getElementById( 'form_color_secondary' ).value = value9;
		let obj = {
			name: 'site-color-secondary',
			value: document.getElementById( 'form_color_secondary' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value10 != null ) {
		colorInput6.value = value10;
		hexInput6.value = value10;
		document.getElementById( 'form_color_button' ).value = value10;
		let obj = {
			name: 'site-color-button',
			value: document.getElementById( 'form_color_button' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value11 != null ) {
		colorInput7.value = value11;
		hexInput7.value = value11;
		document.getElementById( 'form_color_button_text' ).value = value11;
		let obj = {
			name: 'site-color-button-text',
			value: document.getElementById( 'form_color_button_text' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value12 != null ) {
		document.getElementById( 'form_typo_single' ).value = value12;

		document
			.querySelectorAll( '.fonts-btns-single' )
			.forEach( ( fontBtnSingleBtn ) => {
				if (
					getComputedStyle(
						fontBtnSingleBtn.querySelector( 'span' )
					).getPropertyValue( 'font-family' ) == value12
				) {
					fontBtnSingleBtn.click();
				}
			} );

		let obj = {
			name: 'site-font-family',
			value: document.getElementById( 'form_typo_single' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value13 != null ) {
		document.getElementById( 'form_typo_size' ).value = value13;
		document.querySelector( "input[name='site-base-font-size']" ).value =
			value13;
		document.querySelector(
			"input[name='site-base-font-size-output']"
		).value = value13;
		let obj = {
			name: 'site-base-font-size',
			value: document.getElementById( 'form_typo_size' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value14 != null ) {
		document.getElementById( 'form_container_width' ).value = value14;
		document.querySelector( "input[name='site-container-width']" ).value =
			value14;
		document.querySelector(
			"input[name='site-container-width-output']"
		).value = value14;
		let obj = {
			name: 'site-container-width',
			value: document.getElementById( 'form_container_width' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value15 != null ) {
		document.getElementById( 'form_blockgap' ).value = value15;
		document.querySelector( "input[name='site-block-gap']" ).value =
			value15;
		document.querySelector( "input[name='site-block-gap-output']" ).value =
			value15;
		let obj = {
			name: 'site-block-gap',
			value: document.getElementById( 'form_blockgap' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value16 != null ) {
		document.getElementById( 'form_sidebar' ).value = value16;
		document.querySelector( "select[name='site-sidebar']" ).value = value16;
		let obj = {
			name: 'site-sidebar',
			value: document.getElementById( 'form_sidebar' ).value,
		};
		sentPostMessage( obj );
	}

	if ( value17 != null ) {
		if ( value17 == 1 ) {
			document.getElementById( 'form_installtheme_grigora' ).value = 1;
			document.querySelector(
				"input[name='site-installtheme']"
			).checked = true;
		} else {
			document.getElementById( 'form_installtheme_grigora' ).value = 0;
			document.querySelector(
				"input[name='site-installtheme']"
			).checked = false;
		}
	}

	if ( value18 != null ) {
		if ( value18 == 1 ) {
			document.getElementById( 'form_download_image_grigora' ).value = 1;
			document.querySelector(
				"input[name='site-includemedia']"
			).checked = true;
		} else {
			document.getElementById( 'form_download_image_grigora' ).value = 0;
			document.querySelector(
				"input[name='site-includemedia']"
			).checked = false;
		}
	}

	if ( value19 != null ) {
		if ( value19 == 1 ) {
			document.getElementById( 'form_include_plugins_grigora' ).value = 1;
			document.querySelector(
				"input[name='site-includeplugins']"
			).checked = true;
		} else {
			document.getElementById( 'form_include_plugins_grigora' ).value = 0;
			document.querySelector(
				"input[name='site-includeplugins']"
			).checked = false;
		}
	}
}

// function triggered when any of the available demos is clicked
function push_assets_in_input( name ) {
	let current_name = name.toLowerCase();
	let temp_name = current_name.replace( / /g, '' );
	current_name = temp_name;

	// getting all the assests to download being sent through variables
	let my_array = import_demo_vars.assets[ current_name ];

	let content = import_demo_vars.content;
	let template_info = import_demo_vars.template_info;

	let obj = {};
	for ( let i = 1; i <= my_array.length; i++ ) {
		obj[ i ] = my_array[ i - 1 ];
	}

	// setting colors of main default color palette
	set_main_default_palette( current_name, template_info[ current_name ] );

	set_default_site_title_func(
		content[ current_name + 'sitetitle' ],
		current_name
	);
	set_default_site_tagline_func(
		content[ current_name + 'sitetagline' ],
		current_name
	);
	set_default_site_logo_func(
		content[ current_name + 'logo' ],
		current_name
	);
	set_default_site_logo_width_func(
		content[ current_name + 'sitelogowidth' ],
		current_name
	);
}

function set_error_message( message ) {
	let error_message_box = document.getElementsByClassName( 'error-code-box' );
	if ( error_message_box && error_message_box.length > 0 ) {
		error_message_box[ 0 ].textContent = message;
	}
}

jQuery( function ( $ ) {
	document
		.getElementsByClassName( 'continue-btn-step-5' )[ 0 ]
		.addEventListener( 'click', install_demo );

	function install_demo() {
		/* config array to specify which ajax request to perform
		 * and what data we have to send
		 */

		// getting data from the form
		var install_plugins = document.getElementById( 'site-includeplugins' );
		var download_asset = document.getElementById( 'site-includemedia' );
		var install_theme = document.getElementById( 'site-installtheme' );
		var template_slug = document.getElementById( 'form-template' ).value;
		var site_name = document.getElementById( 'grigora_site_name' );
		var site_tagline = document.getElementById( 'grigora_site_tagline' );
		var site_logo = document.getElementById( 'grigora_site_logo' );
		var site_logosize = document.getElementById( 'grigora_site_logosize' );
		var color_background = document.getElementById(
			'form_color_background'
		);
		var color_canavas =
			document.getElementById( 'form_color_canvas' ).checked;
		var color_foreground = document.getElementById(
			'form_color_foreground'
		);
		var color_primary = document.getElementById( 'form_color_primary' );
		var color_secondary = document.getElementById( 'form_color_secondary' );
		var color_button = document.getElementById( 'form_color_button' );
		var color_button_text = document.getElementById(
			'form_color_button_text'
		);
		var font_family = document.getElementById( 'form_typo_single' );
		var font_size = document.getElementById( 'form_typo_size' );
		var container_width = document.getElementById( 'form_container_width' );
		var block_gap = document.getElementById( 'form_blockgap' );

		let template_assets = import_demo_vars.assets[ template_slug ].map(
			function ( value, index ) {
				return {
					id: index,
					url: value,
				};
			}
		);

		let downloaded_asset_urls = [];

		var config = {
			downloadassets: download_asset.checked,
			installplugins: install_plugins.checked,
			installtheme: install_theme.checked,
			template: template_slug,
			plugins: import_demo_vars.required_plugins[ template_slug ],
			theme: 'grigora-blocks',
		};

		setHeading( 'Initializing...', true );

		setTimeout( function () {
			if ( config.downloadassets ) {
				setHeading( 'Downloading Assets', true );
			}

			progress( 60 );

			let i = 0;

			// this ajax request runs until all assets are successfully downloaded and after completion it calls next remaining ajax requests
			function multiple_files_download_ajax() {
				let current_asset = template_assets[ i ];
				if ( import_demo_vars.debug ) {
					console.log( 'downloading file', current_asset );
				}
				if ( i < template_assets.length ) {
					if ( config.downloadassets ) {
						setHeading(
							'Downloading ' +
								`${ current_asset.url.split( '/' ).pop() }`,
							true
						);
					}
					// this ajax request calls for downloading assets
					if ( config.downloadassets ) {
						$.ajax( {
							url: import_demo_vars.url,
							type: 'POST',
							data: {
								action: 'grigora_st_get_files',
								_nonce: import_demo_vars._nonce,
								data: template_assets[ i ].url,
								notskip: config.downloadassets,
							},
						} )
							.done( function ( result ) {
								if ( import_demo_vars.debug ) {
									console.log( result.data );
								}
								if ( result.success ) {
									if ( result.data.data ) {
										downloaded_asset_urls.push(
											result.data.data.url
										);
									}
									else{
										downloaded_asset_urls.push('');
									}

									if ( config.downloadassets ) {
										setHeading(
											'Downloaded ' +
												`${ current_asset.url
													.split( '/' )
													.pop() }`,
											true
										);
									}
									multiple_files_download_ajax();
								} else {
									if ( import_demo_vars.debug ) {
										set_error_message( result.data );
										console.log( result.data );
									}
									if ( config.downloadassets ) {
										setHeading(
											'Failed Downloading ' +
												`${ current_asset.url
													.split( '/' )
													.pop() }`,
											false
										);
									}
									installingFailedScreen();
								}
							} )
							.fail( function ( jqXHR, exception ) {
								if ( import_demo_vars.debug ) {
									console.log( jqXHR, exception );
								}
								set_error_message( jqXHR.responseText );
								installingFailedScreen();
							} );
					}

					i++;
					if ( ! config.downloadassets ) {
						multiple_files_download_ajax();
					}
				} else {
					setTimeout( () => {
						load_next_ajax1();
					}, 1000 );
				}
			}

			setTimeout( () => {
				multiple_files_download_ajax();
			}, 1000 );

			function load_next_ajax1() {
				progress( 120 );

				let j = 0;
				let k = 0;
				let plugins_array = config.plugins;

				/* multiple_plugins_installing_ajax and multiple_plugins_activating_ajax *runs simultaniously and after completion, calls the next remainining *ajaxs requests
				 */
				function multiple_plugins_installing_ajax() {
					if ( import_demo_vars.debug ) {
						console.log( 'install plugin' );
					}
					let current_plugin = plugins_array[ j ];
					if ( j < plugins_array.length ) {
						if ( config.installplugins ) {
							setHeading(
								'Installing ' +
									`${ current_plugin }` +
									' plugin',
								true
							);
						}
						// this ajax reaquest calls for installing plugin
						if ( config.installplugins ) {
							$.ajax( {
								url: import_demo_vars.url,
								type: 'POST',
								data: {
									action: 'grigora_st_install_plugin',
									_nonce: import_demo_vars._nonce,
									slug: plugins_array[ j ],
									notskip: config.installplugins,
								},
							} )
								.done( function ( result ) {
									if ( result.success ) {
										if ( config.installplugins ) {
											setHeading(
												'Installed ' +
													`${ current_plugin }` +
													' plugin',
												true
											);
										}
										multiple_plugins_activating_ajax();
									} else {
										if ( import_demo_vars.debug ) {
											console.log( result.data );
										}
										set_error_message( result.data );
										setHeading(
											'Failed Installing ' +
												`${ current_plugin }` +
												' plugin',
											false
										);
										installingFailedScreen();
									}
								} )
								.fail( function ( jqXHR, exception ) {
									if ( import_demo_vars.debug ) {
										console.log( jqXHR, exception );
									}
									set_error_message( jqXHR.responseText );
									installingFailedScreen();
								} );
						}

						j++;

						if ( ! config.installplugins ) {
							multiple_plugins_activating_ajax();
						}
					} else {
						if ( import_demo_vars.debug ) {
							console.log( 'moving to ajax 2' );
						}
						setTimeout( () => {
							load_next_ajax2();
						}, 1000 );
					}
				}

				multiple_plugins_installing_ajax();

				function multiple_plugins_activating_ajax() {
					if ( import_demo_vars.debug ) {
						console.log( 'activate plugin' );
					}
					let current_plugin = plugins_array[ k ];
					if ( k < plugins_array.length ) {
						if ( config.installplugins ) {
							setHeading(
								'Activating ' +
									`${ current_plugin }` +
									' plugin',
								true
							);
						}
						// this ajax request calls for activating plugin
						if ( config.installplugins ) {
							$.ajax( {
								url: import_demo_vars.url,
								type: 'POST',
								data: {
									action: 'grigora_st_activate_plugin',
									_nonce: import_demo_vars._nonce,
									slug: plugins_array[ k ],
									notskip: config.installplugins,
								},
							} )
								.done( function ( result ) {
									if ( result.success ) {
										if ( config.installplugins ) {
											setHeading(
												'Activated ' +
													`${ current_plugin }` +
													' plugin',
												true
											);
										}
										multiple_plugins_installing_ajax();
									} else {
										if ( import_demo_vars.debug ) {
											console.log( result.data );
										}
										set_error_message( result.data );
										if ( config.installplugins ) {
											setHeading(
												'Failed Activating ' +
													`${ current_plugin }` +
													' plugin',
												false
											);
										}
										installingFailedScreen();
									}
								} )
								.fail( function ( jqXHR, exception ) {
									if ( import_demo_vars.debug ) {
										console.log( jqXHR, exception );
									}
									set_error_message( jqXHR.responseText );
									installingFailedScreen();
								} );
						}

						k++;
						if ( ! config.installplugins ) {
							multiple_plugins_installing_ajax();
						}
					}
				}

				function load_next_ajax2() {
					if ( import_demo_vars.debug ) {
						console.log( 'installing theme' );
					}

					progress( 180 );

					if ( config.installtheme ) {
						setHeading( 'Installing Grigora Blocks', true );
					}

					// this ajax request calls for installing theme
					$.ajax( {
						url: import_demo_vars.url,
						type: 'POST',
						data: {
							action: 'grigora_st_install_theme',
							_nonce: import_demo_vars._nonce,
							slug: config.theme,
							notskip: config.installtheme,
						},
					} )

						.done( function ( result ) {
							if ( result.success ) {
								if ( config.installtheme ) {
									setHeading(
										'Installed Grigora Blocks',
										true
									);
								}

								setTimeout( () => {
									if ( import_demo_vars.debug ) {
										console.log( 'activating theme' );
									}

									if ( config.installtheme ) {
										setHeading(
											'Activating Grigora Blocks',
											true
										);
									}

									progress( 240 );

									// this ajax request calls for activating theme
									$.ajax( {
										url: import_demo_vars.url,
										type: 'POST',
										data: {
											action: 'grigora_st_activate_theme',
											_nonce: import_demo_vars._nonce,
											theme: config.theme,
											notskip: config.installtheme,
										},
									} )
										.done( function ( result ) {
											if ( result.success ) {
												if ( config.installtheme ) {
													setHeading(
														'Activated Grigora Blocks',
														true
													);
												}

												setTimeout( () => {
													setHeading(
														'Importing Demo',
														true
													);

													progress( 300 );
													if (
														import_demo_vars.debug
													) {
														console.log(
															downloaded_asset_urls
														);
													}
													// this ajax request calls for importing demo
													$.ajax( {
														url: import_demo_vars.url,
														type: 'POST',
														data: {
															action: 'grigora_st_import_demo',
															_nonce: import_demo_vars._nonce,
															template:
																config.template,
															downloaded_files_data:
																downloaded_asset_urls,
															site_name: site_name
																? site_name.value
																: undefined,
															site_tagline:
																site_tagline
																	? site_tagline.value
																	: undefined,
															site_logo: site_logo
																? site_logo.value
																: undefined,
															site_logosize:
																site_logosize
																	? site_logosize.value
																	: undefined,
															color_background:
																color_background
																	? color_background.value
																	: undefined,
															color_canavas:
																color_canavas
																	? color_canavas.value
																	: undefined,
															color_foreground:
																color_foreground
																	? color_foreground.value
																	: undefined,
															color_primary:
																color_primary
																	? color_primary.value
																	: undefined,
															color_secondary:
																color_secondary
																	? color_secondary.value
																	: undefined,
															color_button:
																color_button
																	? color_button.value
																	: undefined,
															color_button_text:
																color_button_text
																	? color_button_text.value
																	: undefined,
															font_family:
																font_family
																	? font_family.value
																	: undefined,
															font_size: font_size
																? font_size.value
																: undefined,
															container_width:
																container_width
																	? container_width.value
																	: undefined,
															block_gap: block_gap
																? block_gap.value
																: undefined,
														},
													} )
														.done( function (
															result
														) {
															if (
																import_demo_vars.debug
															) {
																console.log(
																	result
																);
															}
															if (
																result.success
															) {
																// this ajax request call the import demo function
																progress( 360 );

																setHeading(
																	'Imported Demo',
																	true
																);

																heroAnimation();

																setTimeout(
																	() => {
																		installingDemoSuccessScreen();
																	},
																	960
																);
															} else {
																if (
																	import_demo_vars.debug
																) {
																	console.log(
																		result.data
																	);
																}
																set_error_message(
																	result.data
																);
																setHeading(
																	'Failed Importing Demo',
																	false
																);
																installingFailedScreen();
															}
														} )
														.fail( function (
															jqXHR,
															exception
														) {
															if (
																import_demo_vars.debug
															) {
																console.log(
																	jqXHR,
																	exception
																);
															}
															set_error_message(
																jqXHR.responseText
															);
															installingFailedScreen();
														} );
												}, 6000 );
											} else {
												set_error_message(
													result.data
												);
												if ( import_demo_vars.debug ) {
													console.log( result.data );
												}
												installingFailedScreen();
											}
										} )
										.fail( function ( jqXHR, exception ) {
											if ( import_demo_vars.debug ) {
												console.log( jqXHR, exception );
											}
											set_error_message(
												jqXHR.responseText
											);
											installingFailedScreen();
										} );
								}, 1000 );
							} else {
								if ( import_demo_vars.debug ) {
									console.log( result.data );
								}
								set_error_message( result.data );
								installingFailedScreen();
							}
						} )
						.fail( function ( jqXHR, exception ) {
							if ( import_demo_vars.debug ) {
								console.log( jqXHR, exception );
							}
							set_error_message( jqXHR.responseText );
							installingFailedScreen();
						} );
				}
			}
		}, 1000 );
	}
} );
