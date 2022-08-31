/**
 * WordPress dependencies
 */
 import { createBlock, getBlockAttributes } from '@wordpress/blocks';

 /**
  * Internal dependencies
  */
 import settings from './block.json';
 
 const transforms = {
     from: [
         {
             type: 'block',
             isMultiBlock: true,
             blocks: [ 'core/paragraph' ],
             transform: ( attributes ) =>
                 attributes.map( ( { content } ) =>
                     createBlock( settings.name, {
                         content,
                     } )
                 ),
         },
         {
            type: 'block',
            isMultiBlock: true,
            blocks: [ 'core/heading' ],
            transform: ( attributes ) =>
                attributes.map( ( { content, level } ) =>
                {
                    if(level){
                        return createBlock( settings.name, {
                            content, structureTag: "h".concat(level)
                        } )
                    }
                    else{
                        return createBlock( settings.name, {
                            content,
                        } )
                    }
                }
                ),
        }
        ],
     to: [
         {
             type: 'block',
             isMultiBlock: true,
             blocks: [ 'core/paragraph' ],
             transform: ( attributes ) =>
                 attributes.map( ( { content } ) =>
                     createBlock( 'core/paragraph', { content } )
                 ),
         },
         {
            type: 'block',
            isMultiBlock: true,
            blocks: [ 'core/heading' ],
            transform: ( attributes ) =>
                attributes.map( ( { content, structureTag } ) =>
                {
                    if( structureTag === "h1" ){
                        return createBlock( 'core/heading', { content, level: 1 } )
                    }
                    else if( structureTag === "h2" ){
                        return createBlock( 'core/heading', { content, level: 2 } )
                    }
                    else if( structureTag === "h3" ){
                        return createBlock( 'core/heading', { content, level: 3 } )
                    }
                    else if( structureTag === "h4" ){
                        return createBlock( 'core/heading', { content, level: 4 } )
                    }
                    else if( structureTag === "h5" ){
                        return createBlock( 'core/heading', { content, level: 5 } )
                    }
                    else if( structureTag === "h6" ){
                        return createBlock( 'core/heading', { content, level: 6 } )
                    }
                    else {
                        return createBlock( 'core/heading', { content, level: 2 } )
                    }                    
                }
                ),
        },
     ],
 };
 
 export default transforms;