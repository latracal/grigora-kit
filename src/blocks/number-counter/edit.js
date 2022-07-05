import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { TabPanel, 
	PanelBody,
	ToolbarButton,
	ToggleControl, 
	Popover,
	__experimentalHStack as HStack,__experimentalNumberControl as NumberControl } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import './editor.scss';

import generateId from '@helpers/generateId';
import GrigoraNumberInput from '@components/number-input';

export default function Edit( props ) {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		countStart,
		countEnd
	} = attributes;

	console.log(countStart);
	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={ __( 'Counter', "grigora-kit" ) } >
					<GrigoraNumberInput
						label="Start"
						onChange={ countStart => setAttributes( { countStart } ) }
						value={countStart}
						resetValue={ 0 }
					/>
				</PanelBody>
			</InspectorControls>
			<div>Hello</div>
		</div>
	);
}
