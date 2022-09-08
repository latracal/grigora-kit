import classnames from 'classnames';

/**
 * WordPress dependencies
 */
 import { addFilter } from '@wordpress/hooks';
 import { PanelBody, TextControl, ExternalLink, ToggleControl, SelectControl, __experimentalUnitControl as UnitControl, } from '@wordpress/components';
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


 export function addAttribute( settings ) {
     if ( hasBlockSupport( settings, 'grigoraSticky' ) ) {
         // Gracefully handle if settings.attributes is undefined.
         settings.attributes = {
             ...settings.attributes,
             sticky: {
                type: 'string',
                default: 'none'
            },
            sticky_data: {
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
             const hasSupport = hasBlockSupport( props.name, 'grigoraSticky' );
             const { attributes, setAttributes } = props;
             const { 
                sticky,
                sticky_data,
            } = attributes;
 
             if ( hasSupport && props.isSelected ) {
 
                 return (
                     <>
                         <BlockEdit { ...props } />
                            <InspectorControls>
                                <PanelBody title={ __( 'Sticky', 'grigora-kit' ) } className={'sticky_panel'} initialOpen={false}>
                                <SelectControl
                                    label={ __( 'Sticky', 'grigora-kit' ) }
                                    value={ sticky }
                                    options={[
                                        {
                                            label: __("None", "grigora-kit"),
                                            value: "none",
                                        },
                                        {
                                            label: __("Top", "grigora-kit"),
                                            value: "top",
                                        },
                                        {
                                            label: __("Bottom", "grigora-kit"),
                                            value: "bottom",
                                        },
                                    ]}
                                    onChange={ (val) => {
                                        setAttributes( {sticky: val} );
                                    } }
                                />
                                { sticky !== "none" && (
                                    <>
                                        <StickyControl value={ sticky_data } onChange={(sticky_data)=>setAttributes({sticky_data})} />
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
        hasBlockSupport( blockType, 'grigoraSticky', false ) &&
        (attributes.sticky !== "none")
    ) {
        if(!isEmpty(attributes.sticky_data)){
            extraProps['data-sticky_data'] = JSON.stringify({...attributes.sticky_data, sticky: attributes.sticky});
            extraProps.className = classnames(
                extraProps.className,
                'grigora-sticky'
            );
        }
        return extraProps;
    }
    return extraProps;
}

 addFilter( 'blocks.registerBlockType', 'grigora-kit/grigoraSticky/attribute', addAttribute );
 addFilter(
     'editor.BlockEdit',
     'grigora-kit/editor/grigoraSticky/with-inspector-control',
     withInspectorControl
 );
 addFilter(
     'blocks.getSaveContent.extraProps',
     'grigora-kit/grigoraSticky/save-props',
     addSaveProps
 );