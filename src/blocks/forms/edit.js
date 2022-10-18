import classnames from 'classnames';

import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
	BlockVerticalAlignmentToolbar,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentControl,
	MediaUpload,
	useSetting,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	TabPanel as WPTabPanel,
	PanelBody,
	Button,
	ToggleControl,
	FocalPointPicker,
	Tooltip,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	Toolbar,
	ToolbarButton,
    TextControl
} from '@wordpress/components';
import { useRef, useEffect } from '@wordpress/element';
import {
	alignLeft,
	alignRight,
	alignCenter,
	formatIndent,
	formatIndentRTL,
	alignJustify,
	link,
	linkOff,
	group,
	code,
} from '@wordpress/icons';

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
import isEmpty from '@helpers/objEmpty';
import uniqueIDs from '@helpers/uniqueID';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const { id } = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'forms' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'forms' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

    const { hasInnerBlocks, themeSupportsLayout } = useSelect(
		( select ) => {
			const { getBlock, getSettings } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
				themeSupportsLayout: getSettings()?.supportsLayout,
			};
		},
		[ clientId ]
	);

    const ALLOWED_BLOCKS = [ 
		'grigora-kit/form-email',
		'grigora-kit/form-text',
		'grigora-kit/form-textarea',
		'grigora-kit/form-checkbox',
		'grigora-kit/form-select',
		'grigora-kit/form-radio',
		'grigora-kit/form-hidden',
		'grigora-kit/form-submit'
	];

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-forms': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

    const innerBlocksProps = useInnerBlocksProps(
		{
			className: classnames( {
				'form-options': true,
			} ),
		},
        {
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
		}
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
			<div { ...innerBlocksProps } />
		</div>
	);
}