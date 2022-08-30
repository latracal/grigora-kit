import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

import { useState, useRef, useEffect } from '@wordpress/element';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function InspectorTabs( props ) {
	useEffect( () => {
		let comp = document.querySelector( '.components-panel' );

		if ( comp ) {
			comp.setAttribute( 'is-grigora-sidebar', 'true' );
			comp.setAttribute( 'grigora-sidebar-selected-index', 0 );
		}

		return () => {
			if ( comp ) {
				const inspectorTabs = comp.querySelector(
					'.grigora-tabs-container'
				);

				if ( ! inspectorTabs || null === inspectorTabs ) {
					comp.removeAttribute( 'is-grigora-sidebar' );
					comp.removeAttribute( 'grigora-sidebar-selected-index' );
				}
			}
		};
	}, [] );

	function onSelect( index ){
		let comp = document.querySelector( '.components-panel' );
		if ( comp ) {
			comp.setAttribute( 'grigora-sidebar-selected-index', index );
		}
		return true;
	}

	return <Tabs { ...props } onSelect={(index)=>{onSelect(index)}}></Tabs>;
}

export default InspectorTabs;
