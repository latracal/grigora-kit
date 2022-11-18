import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import GrigoraImportButton from './button';

domReady( function () {
	setTimeout( function () {
		const toolbar = document.querySelector( '.edit-post-header__toolbar' );
		const toolbarChild = document.querySelector(
			'.edit-post-header-toolbar'
		);

		if ( ! toolbar ) {
			return;
		}
		const grigoraPatternBtn = document.createElement( 'div' );
		grigoraPatternBtn.classList.add( 'grigora-pattern-button' );

		if ( ! toolbar.querySelector( '.grigora-pattern-button' ) ) {
			render( <GrigoraImportButton />, grigoraPatternBtn );
			toolbar.appendChild( grigoraPatternBtn );
		}
	}, 250 );
} );
