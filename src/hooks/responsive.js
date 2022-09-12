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
import isEmpty from '@helpers/objEmpty';

export function addAttribute( settings ) {
	if ( hasBlockSupport( settings, 'grigoraResponsive' ) ) {
		// Gracefully handle if settings.attributes is undefined.
		settings.attributes = {
			...settings.attributes,
			hideDesktop: {
				type: 'boolean',
				default: false,
			},
			hideTablet: {
				type: 'boolean',
				default: false,
			},
			hideMobile: {
				type: 'boolean',
				default: false,
			},
		};
	}

	return settings;
}

export const withInspectorControl = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			const hasSupport = hasBlockSupport(
				props.name,
				'grigoraResponsive'
			);
			const { attributes, setAttributes } = props;
			const { hideDesktop, hideTablet, hideMobile } = attributes;

			if ( hasSupport && props.isSelected ) {
				return (
					<>
						<BlockEdit { ...props } />
						<InspectorControls>
							<PanelBody
								title={ __( 'Responsive', 'grigora-kit' ) }
								className={ 'responsive_panel' }
								initialOpen={ false }
							>
								<Notice
									text={ __(
										'The visiblity will only work in the preview or the live page, and not in Block Editor (here).',
										'grigora-kit'
									) }
									status={ 'warning' }
								/>
								<ToggleControl
									label={ __(
										'Hide Desktop',
										'grigora-kit'
									) }
									checked={ !! hideDesktop }
									onChange={ () => {
										setAttributes( {
											hideDesktop: ! hideDesktop,
										} );
									} }
								/>
								<ToggleControl
									label={ __( 'Hide Tablet', 'grigora-kit' ) }
									checked={ !! hideTablet }
									onChange={ () => {
										setAttributes( {
											hideTablet: ! hideTablet,
										} );
									} }
								/>
								<ToggleControl
									label={ __( 'Hide Mobile', 'grigora-kit' ) }
									checked={ !! hideMobile }
									onChange={ () => {
										setAttributes( {
											hideMobile: ! hideMobile,
										} );
									} }
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
		hasBlockSupport( blockType, 'grigoraResponsive', false ) &&
		( attributes.hideDesktop ||
			attributes.hideTablet ||
			attributes.hideMobile )
	) {
		extraProps.className = classnames( {
			...extraProps.className,
			'grigora-hide-desktop': attributes.hideDesktop,
			'grigora-hide-tablet': attributes.hideTablet,
			'grigora-hide-mobile': attributes.hideMobile,
		} );
		return extraProps;
	}
	return extraProps;
}

addFilter(
	'blocks.registerBlockType',
	'grigora-kit/grigoraResponsive/attribute',
	addAttribute
);
addFilter(
	'editor.BlockEdit',
	'grigora-kit/editor/grigoraResponsive/with-inspector-control',
	withInspectorControl
);
addFilter(
	'blocks.getSaveContent.extraProps',
	'grigora-kit/grigoraResponsive/save-props',
	addSaveProps
);
