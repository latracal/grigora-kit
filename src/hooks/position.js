import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	TextControl,
	ExternalLink,
	ToggleControl,
	SelectControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { hasBlockSupport } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Platform } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	InspectorControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

import clearEmpties from '@helpers/clearEmpties';
import Notice from '@components/notice';
import StickyControl from '@components/sticky-input';
import isEmpty from '@helpers/objEmpty';

import GrigoraSelectInput from '@components/select-input';
import GrigoraLTRBInput from '@components/ltrb-input';
import GrigoraNumberInput from '@components/number-input';

export function addAttribute( settings ) {
	if ( hasBlockSupport( settings, 'grigoraPosition' ) ) {
		// Gracefully handle if settings.attributes is undefined.
		settings.attributes = {
			...settings.attributes,
			position: {
				type: 'string',
				default: '',
			},
			positionCoord: {
				type: 'object',
				default: {
					top: '',
					bottom: '',
					left: '',
					right: '',
				},
			},
			zindex: {
				type: 'string',
				default: '',
			},
		};
	}

	return settings;
}

export const withInspectorControl = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			const hasSupport = hasBlockSupport( props.name, 'grigoraPosition' );
			const { attributes, setAttributes } = props;
			const { position, positionCoord, zindex } = attributes;

			if ( hasSupport && props.isSelected ) {
				return (
					<>
						<BlockEdit { ...props } />
						<InspectorControls>
							<PanelBody
								title={ __( 'Position', 'grigora-kit' ) }
								className={ 'position_panel' }
								initialOpen={ false }
							>
								<GrigoraSelectInput
									label={ __( 'Position: ', 'grigora-kit' ) }
									labelPosition="side"
									onChange={ ( position ) =>
										setAttributes( { position } )
									}
									value={ position }
									options={ [
										{
											label: 'Default',
											value: '',
										},
										{
											label: 'Static',
											value: 'static',
										},
										{
											label: 'Relative',
											value: 'relative',
										},
										{
											label: 'Absolute',
											value: 'absolute',
										},
										{
											label: 'Fixed',
											value: 'fixed',
										},
										{
											label: 'Sticky',
											value: 'sticky',
										},
									] }
									resetValue={ '' }
								/>
								{ position && (
									<GrigoraLTRBInput
										onChange={ ( positionCoord ) =>
											setAttributes( { positionCoord } )
										}
										value={ positionCoord }
										resetValue={ {
											top: '',
											bottom: '',
											left: '',
											right: '',
										} }
									/>
								) }
								<GrigoraNumberInput
									label="Z Index"
									onChange={ ( zindex ) =>
										setAttributes( {
											zindex: zindex.toString(),
										} )
									}
									value={ zindex }
									resetValue={ '' }
								/>
							</PanelBody>
						</InspectorControls>
					</>
				);
			}

			return <BlockEdit { ...props } />;
		};
	},
	'withInspectorControl'
);

export function addSaveProps( extraProps, blockType, attributes ) {
	if (
		hasBlockSupport( blockType, 'grigoraPosition', false ) &&
		( attributes.position || attributes.zindex )
	) {
		extraProps.style = {
			...extraProps.style,
			position: attributes.position ? attributes.position : undefined,
			top: attributes.position
				? attributes.positionCoord
					? attributes.positionCoord.top
						? attributes.positionCoord.top
						: undefined
					: undefined
				: undefined,
			bottom: attributes.position
				? attributes.positionCoord
					? attributes.positionCoord.bottom
						? attributes.positionCoord.bottom
						: undefined
					: undefined
				: undefined,
			left: attributes.position
				? attributes.positionCoord
					? attributes.positionCoord.left
						? attributes.positionCoord.left
						: undefined
					: undefined
				: undefined,
			right: attributes.position
				? attributes.positionCoord
					? attributes.positionCoord.right
						? attributes.positionCoord.right
						: undefined
					: undefined
				: undefined,
			'z-index': attributes.zindex ? attributes.zindex : undefined,
		};
		return extraProps;
	}
	return extraProps;
}

export function addEditProps( settings ) {
	if ( hasBlockSupport( settings, 'grigoraPosition', false ) ) {
		const existingGetEditWrapperProps = settings.getEditWrapperProps;
		settings.getEditWrapperProps = ( attributes ) => {
			let props = {};
			if ( existingGetEditWrapperProps ) {
				props = existingGetEditWrapperProps( attributes );
			}
			return addSaveProps( props, settings, attributes );
		};

		return settings;
	}
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'grigora-kit/grigoraPosition/attribute',
	addAttribute
);
addFilter(
	'editor.BlockEdit',
	'grigora-kit/editor/grigoraPosition/with-inspector-control',
	withInspectorControl
);
addFilter(
	'blocks.registerBlockType',
	'grigora-kit/grigoraMotion/edit-props',
	addEditProps
);
addFilter(
	'blocks.getSaveContent.extraProps',
	'grigora-kit/grigoraPosition/save-props',
	addSaveProps
);
