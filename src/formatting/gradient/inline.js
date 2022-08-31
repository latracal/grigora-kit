/**
 * External dependencies
 */
import uniqueId from 'lodash/uniqueId';

/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';

import { useState, useEffect, useMemo } from '@wordpress/element';
import { Popover, GradientPicker, Button } from '@wordpress/components';

import { removeFormat, applyFormat } from '@wordpress/rich-text';

const name = 'grigora-kit/gradient';

function InlineGradientUI( {
	isActive,
	addingGradient,
	removeGradientPicker,
	value,
	onChange,
	activeAttributes,
} ) {
	const [ gradient, setGradient ] = useState( activeAttributes.data );
	const [ isEditing, enableEdit ] = useState(
		typeof activeAttributes.data === 'undefined' ? true : false
	);

	useEffect( () => {
		setGradient( activeAttributes.data );
	}, [ activeAttributes ] );

	const mountingKey = useMemo( uniqueId, [ addingGradient ] );

	const anchorRef = useMemo( () => {
		const selection = window.getSelection();

		if ( ! selection.rangeCount ) {
			return;
		}

		const range = selection.getRangeAt( 0 );
		if ( addingGradient && ! isActive ) {
			return range;
		}

		let element = range.startContainer;
		element = element.nextElementSibling || element;
		while ( element.nodeType !== window.Node.ELEMENT_NODE ) {
			element = element.parentNode;
		}

		return element.closest( 'span' );
	}, [ addingGradient, value.start, value.end ] );

	return (
		<Popover
			key={ mountingKey }
			anchorRef={ anchorRef }
			position="bottom center"
			onClose={ removeGradientPicker }
			className="grigora-kit-gradient-popover"
			focusOnMount={ addingGradient ? 'firstElement' : false }
		>
			<div className="grigora-kit-gradient-popover-contents">
				<div className="grigora-kit-gradient-message">
					<GradientPicker
						value={ gradient }
						clearable={ false }
						disabled={ isEditing ? false : true }
						onChange={ ( newValue ) => {
							onChange(
								applyFormat( value, {
									type: name,
									attributes: {
										data: newValue,
										style: `background: ${ newValue };-webkit-background-clip: text;-webkit-text-fill-color: transparent;`,
									},
									startIndex: undefined,
									endIndex: undefined,
								} )
							);
						} }
					/>
					<Button
						variant="primary"
						onClick={ () => {
							onChange( removeFormat( value, name ) );
							enableEdit( false );
							removeGradientPicker();
						} }
					>
						{ __( 'Remove', 'grigora-kit' ) }
					</Button>
				</div>
			</div>
		</Popover>
	);
}

export default InlineGradientUI;
