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
import isEmpty from '@helpers/objEmpty';


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
                                        if(!!motionanimation_mouse){
                                            if (typeof motion_animation_stop_listeners === "function") { 
                                                motion_animation_stop_listeners();
                                            }
                                        }
                                        else{
                                            if (typeof motion_animation_start_listeners === "function") { 
                                                motion_animation_start_listeners();
                                            }
                                        }
                                        setAttributes( {motionanimation_mouse: !motionanimation_mouse} );
                                    } }
                                />
                                { motionanimation_mouse && (
                                    <>
                                        <MouseMovementAnimationControl
                                            value={motionanimation_mouse_data}
                                            onChange={(newValue)=>{
                                                setAttributes({motionanimation_mouse_data: newValue});
                                                if (typeof motion_animation_start_listeners === "function") { 
                                                    motion_animation_start_listeners();
                                                }
                                            }}
                                        />
                                    </>
                                ) }
                                <ToggleControl
                                    label={ __( 'On Scroll Movement', 'grigora-kit' ) }
                                    checked={ !!motionanimation_scroll }
                                    onChange={ () => {
                                        if(!!motionanimation_scroll){
                                            if (typeof motion_animation_stop_listeners === "function") { 
                                                motion_animation_stop_listeners();
                                            }
                                        }
                                        else{
                                            if (typeof motion_animation_start_listeners === "function") { 
                                                motion_animation_start_listeners();
                                            }
                                        }
                                        setAttributes( {motionanimation_scroll: !motionanimation_scroll} );
                                    } }
                                />
                                { motionanimation_scroll && (
                                    <>
                                        <ScrollMovementAnimationControl
                                            value={motionanimation_scroll_data}
                                            onChange={(newValue)=>{
                                                setAttributes({motionanimation_scroll_data: newValue});
                                                if (typeof motion_animation_start_listeners === "function") { 
                                                    motion_animation_start_listeners();
                                                }
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
        var data_export = {}

        if( attributes.motionanimation_mouse ){
            data_export = clearEmpties(attributes.motionanimation_mouse_data);
            if(!isEmpty(data_export)){
                extraProps['data-motionanimation_mouse'] = JSON.stringify(data_export);
                extraProps.className = classnames(
                    extraProps.className,
                    'has-motion-animations'
                );
            }
        }
        if( attributes.motionanimation_scroll ){
            if(!attributes.motionanimation_scroll_data.hideDesktop){
                delete attributes.motionanimation_scroll_data.hideDesktop;
            }
            if(!attributes.motionanimation_scroll_data.hideTablet){
                delete attributes.motionanimation_scroll_data.hideTablet;
            }
            if(!attributes.motionanimation_scroll_data.hideMobile){
                delete attributes.motionanimation_scroll_data.hideMobile;
            }
            data_export = clearEmpties(attributes.motionanimation_scroll_data);
            if(!isEmpty(data_export)){
                extraProps['data-motionanimation_scroll'] = JSON.stringify(data_export);
                extraProps.className = classnames(
                    extraProps.className,
                    'has-motion-animations'
                );
            }
        }
    }

    return extraProps;
}

export function addEditProps( settings ) {
    if (
        hasBlockSupport( settings, 'grigoraMotion', true )
    ) {
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
    return extraProps;
}
 
 addFilter( 'blocks.registerBlockType', 'grigora-kit/grigoraMotion/attribute', addAttribute );
 addFilter(
     'editor.BlockEdit',
     'grigora-kit/editor/grigoraMotion/with-inspector-control',
     withInspectorControl
 );
 addFilter(
    'blocks.registerBlockType',
    'grigora-kit/grigoraMotion/edit-props',
    addEditProps
);
 addFilter(
     'blocks.getSaveContent.extraProps',
     'grigora-kit/grigoraMotion/save-props',
     addSaveProps
 );