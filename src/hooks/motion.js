/**
 * WordPress dependencies
 */
 import { addFilter } from '@wordpress/hooks';
 import { PanelBody, TextControl, ExternalLink, ToggleControl } from '@wordpress/components';
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

 
 /**
  * Filters registered block settings, extending attributes with anchor using ID
  * of the first node.
  *
  * @param {Object} settings Original block settings.
  *
  * @return {Object} Filtered block settings.
  */
 export function addAttribute( settings ) {
     // Allow blocks to specify their own attribute definition with default values if needed.
     if ( 'type' in ( settings.attributes?.anchor ?? {} ) ) {
         return settings;
     }
     if ( hasBlockSupport( settings, 'grigoraMotion' ) ) {
         // Gracefully handle if settings.attributes is undefined.
         settings.attributes = {
             ...settings.attributes,
             motionanimation_mouse: {
                type: 'boolean',
                default: false
            },
            motionanimation_scroll: {
                type: 'boolean',
                default: false
            },
            motionanimation_mouse_data: {
                type: 'object',
                default: {}
            },
            motionanimation_scroll_data: {
                type: 'object',
                default: {}
            },
         };
     }
 
     return settings;
 }
 
 /**
  * Override the default edit UI to include a new block inspector control for
  * assigning the anchor ID, if block supports anchor.
  *
  * @param {WPComponent} BlockEdit Original component.
  *
  * @return {WPComponent} Wrapped component.
  */
 export const withInspectorControl = createHigherOrderComponent(
     ( BlockEdit ) => {
         return ( props ) => {
             const hasSupport = hasBlockSupport( props.name, 'grigoraMotion' );
             const { attributes, setAttributes } = props;
             const { 
                motionanimation_mouse, 
                motionanimation_scroll,
                motionanimation_mouse_data,
                motionanimation_scroll_data,
            } = attributes;
 
             if ( hasSupport && props.isSelected ) {
 
                 return (
                     <>
                         <BlockEdit { ...props } />
                            <InspectorControls>
                                <PanelBody title={ __( 'Motion Animations', 'grigora-kit' ) } className={'motion_effects_panel'} initialOpen={false}>
                                <ToggleControl
                                    label={ __( 'On Mouse Movement', 'grigora-kit' ) }
                                    checked={ !!motionanimation_mouse }
                                    onChange={ () => {
                                        setAttributes( {motionanimation_mouse: !motionanimation_mouse} );
                                    } }
                                />
                                { motionanimation_mouse && (
                                    <>
                                        <MouseMovementAnimationControl
                                            value={motionanimation_mouse_data}
                                            onChange={(newValue)=>{
                                                setAttributes({motionanimation_mouse_data: newValue})
                                            }}
                                        />
                                    </>
                                ) }
                                <ToggleControl
                                    label={ __( 'On Scroll Movement', 'grigora-kit' ) }
                                    checked={ !!motionanimation_scroll }
                                    onChange={ () => {
                                        setAttributes( {motionanimation_scroll: !motionanimation_scroll} );
                                    } }
                                />
                                { motionanimation_scroll && (
                                    <>
                                        <ScrollMovementAnimationControl
                                            value={motionanimation_scroll_data}
                                            onChange={(newValue)=>{
                                                setAttributes({motionanimation_scroll_data: newValue})
                                            }}
                                        />
                                    </>
                                ) }
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
 
 /**
  * Override props assigned to save component to inject anchor ID, if block
  * supports anchor. This is only applied if the block's save result is an
  * element and not a markup string.
  *
  * @param {Object} extraProps Additional props applied to save element.
  * @param {Object} blockType  Block type.
  * @param {Object} attributes Current block attributes.
  *
  * @return {Object} Filtered props applied to save element.
  */
 export function addSaveProps( extraProps, blockType, attributes ) {
     if ( hasBlockSupport( blockType, 'grigoraMotion' ) ) {
         extraProps.id = attributes.anchor === '' ? null : attributes.anchor;
     }
 
     return extraProps;
 }
 
 addFilter( 'blocks.registerBlockType', 'core/anchor/attribute', addAttribute );
 addFilter(
     'editor.BlockEdit',
     'core/editor/anchor/with-inspector-control',
     withInspectorControl
 );
 addFilter(
     'blocks.getSaveContent.extraProps',
     'core/anchor/save-props',
     addSaveProps
 );