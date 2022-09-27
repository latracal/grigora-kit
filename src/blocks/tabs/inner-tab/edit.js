import classnames from 'classnames';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { getBlockTypes } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	store as blockEditorStore,
	InnerBlocks,
} from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const { id } = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'inner-tab' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'inner-tab' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-inner-tab': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	const ALLOWED_BLOCKS = getBlockTypes()
		.map( ( block ) => block.name )
		.filter(
			( blockName ) =>
				! [ 'grigora-kit/tabs', 'grigora-kit/inner-tab' ].includes(
					blockName
				)
		);

	const { hasInnerBlocks } = useSelect(
		( select ) => {
			const { getBlockOrder } = select( blockEditorStore );
			return {
				hasInnerBlocks: !! ( getBlockOrder( clientId ).length > 0 ),
			};
		},
		[ clientId ]
	);

	return (
		<div { ...blockProps }>
			<InspectorControls></InspectorControls>
			<style>
				{ `
					.block-id-${ id } {
					}
					` }
			</style>
			<InnerBlocks
				templateLock={ false }
				renderAppender={
					hasInnerBlocks
						? undefined
						: () => <InnerBlocks.ButtonBlockAppender />
				}
				allowedBlocks={ ALLOWED_BLOCKS }
			/>
		</div>
	);
}
