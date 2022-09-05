import classnames from 'classnames';

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

import MouseMovementAnimationControl from '@components/mousemovement-input';
import ScrollMovementAnimationControl from '@components/scrollmovement-input';

import clearEmpties from '@helpers/clearEmpties';


 export function addAttribute( settings ) {
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
 

export function addSaveProps( extraProps, blockType, attributes ) {
    if (
        hasBlockSupport( blockType, 'grigoraMotion', true ) &&
        (attributes.motionanimation_mouse || attributes.motionanimation_scroll)
    ) {
        extraProps.className = classnames(
            extraProps.className,
            'has-motion-animations'
        );

        extraProps['data-motionanimation_mouse'] = JSON.stringify(clearEmpties(attributes.motionanimation_mouse_data));
        extraProps['data-motionanimation_scroll'] = JSON.stringify(clearEmpties(attributes.motionanimation_scroll_data));
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