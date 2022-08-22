import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

import { useState, useRef, useEffect } from '@wordpress/element';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function InspectorTabs( props ) {
	useEffect( () => {
		let comp = document.querySelector( '.components-panel' );

		if ( comp ) {
			comp.setAttribute( 'is-grigora-sidebar', 'true' );
		}

		return () => {
			if ( comp ) {
				const inspectorTabs = comp.querySelector(
					'.grigora-tabs-container'
				);

				if ( ! inspectorTabs || null === inspectorTabs ) {
					comp.removeAttribute( 'is-grigora-sidebar' );
				}
			}
		};
	}, [] );

	return <Tabs { ...props }></Tabs>;
}

export default InspectorTabs;
