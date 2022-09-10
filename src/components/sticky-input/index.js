import {
	Icon,
	Button,
	Popover,
	RangeControl,
	__experimentalHStack as HStack,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';

import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';
import isEmpty from '@helpers/objEmpty';
import Notice from '@components/notice';

function StickyControl( { value, onChange } ) {
	const [ offset, setOffset ] = useState( value.offset ? value.offset : 0 );
	const [ inside, setInside ] = useState(
		value.inside ? value.inside : false
	);
	const [ parent, setParent ] = useState( value.parent ? value.parent : '' );

	const [ hideDesktop, setHideDesktop ] = useState(
		value.hideDesktop ? value.hideDesktop : false
	);
	const [ hideTablet, setHideTablet ] = useState(
		value.hideTablet ? value.hideTablet : false
	);
	const [ hideMobile, setHideMobile ] = useState(
		value.hideMobile ? value.hideMobile : false
	);

	useEffect( () => {
		onChange( {
			offset,
			inside,
			parent: parent ? parent : undefined,
			hideDesktop,
			hideTablet,
			hideMobile,
		} );
	}, [ offset, inside, parent, hideDesktop, hideTablet, hideMobile ] );

	return (
		<>
			<NumberControl
				value={ offset }
				onChange={ ( val ) => setOffset( val ) }
				label={ __( 'Offset', 'grigora-kit' ) }
				labelPosition={ 'side' }
			/>
			<br></br>
			<ToggleControl
				label={ __( 'Keep inside Column', 'grigora-kit' ) }
				checked={ !! inside }
				onChange={ () => setInside( ! inside ) }
			/>
			{ inside && (
				<>
					<Notice
						text={ __(
							"By default, the immediate parent container will be referenced. Use the 'CSS Selector' from below to target the custom closest parent.",
							'grigora-kit'
						) }
						status={ 'success' }
					/>
					<TextControl
						label={ __( 'Parent Container' ) }
						value={ parent }
						onChange={ ( parent ) => setParent( parent ) }
						placeholder={ '.class-name' }
					/>
				</>
			) }
			<ToggleControl
				label={ __( 'Hide on Desktop', 'grigora-kit' ) }
				checked={ !! hideDesktop }
				onChange={ () => setHideDesktop( ! hideDesktop ) }
			/>
			<ToggleControl
				label={ __( 'Hide on Tablet', 'grigora-kit' ) }
				checked={ !! hideTablet }
				onChange={ () => setHideTablet( ! hideTablet ) }
			/>
			<ToggleControl
				label={ __( 'Hide on Mobile', 'grigora-kit' ) }
				checked={ !! hideMobile }
				onChange={ () => setHideMobile( ! hideMobile ) }
			/>
		</>
	);
}

export default StickyControl;
