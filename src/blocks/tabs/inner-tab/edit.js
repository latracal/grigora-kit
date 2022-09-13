import classnames from 'classnames';

import Countdown, { zeroPad } from 'react-countdown';
import { useSelect } from '@wordpress/data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';




import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	BlockControls,
	AlignmentControl,
	store as blockEditorStore,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	DateTimePicker,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { alignLeft, alignRight, alignCenter } from '@wordpress/icons';

import {
	HOVER_ANIMATIONS,
	ENTRANCE_ANIMATIONS,
	ICON_POSITIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
} from '@constants';
import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraNumberInput from '@components/number-input';
import GrigoraTextInput from '@components/text-input';
import GrigoraToggleInput from '@components/toggle-input';
import GrigoraDateTimeInput from '@components/date-input';

import InspectorTabs from '@components/inspector-tabs';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const { id } = attributes;


	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'tab' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'tab' );
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
				<InspectorControls >
				</InspectorControls>
				<style>
					{ `
					.block-id-${ id } {
					}
					` }
				</style>
				<InnerBlocks
					templateLock={false}
					renderAppender={(
						hasInnerBlocks ?
							undefined :
							() => <InnerBlocks.ButtonBlockAppender/>
					)}
				/>
			</div>
	);
}
