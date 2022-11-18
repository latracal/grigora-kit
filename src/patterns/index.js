import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import GrigoraImportButton from './button';

domReady( function () {
	setTimeout( function () {
		var toolbar = null;
		if (grigora_kit_blocks_params.current_screen == "site-editor"){

			var siteEditorInterval = setInterval( function () {
				toolbar = document.querySelector(".edit-site-header_start");
				if ( ! toolbar ) {
					return;
				}
				toolbar = document.querySelector(".edit-site-header_start");
				const grigoraPatternBtn = document.createElement( 'div' );
				grigoraPatternBtn.classList.add( 'grigora-pattern-button' );
	
				if ( ! toolbar.querySelector( '.grigora-pattern-button' ) ) {
					render( <GrigoraImportButton />, grigoraPatternBtn );
					toolbar.appendChild( grigoraPatternBtn );
				}
			}, 1000 );

		}
		else{
			toolbar = document.querySelector( '.edit-post-header__toolbar' );
			if ( ! toolbar ) {
				return;
			}
			const grigoraPatternBtn = document.createElement( 'div' );
			grigoraPatternBtn.classList.add( 'grigora-pattern-button' );
	
			if ( ! toolbar.querySelector( '.grigora-pattern-button' ) ) {
				render( <GrigoraImportButton />, grigoraPatternBtn );
				toolbar.appendChild( grigoraPatternBtn );
			}
		}
	}, 250 );
} );
