/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';


const attributes = {
	"id": {
		"type": "string",
		"default": "",
	},
	"align": {
		"type": "string"
	},
	"content": {
		"type": "string",
		"default": "",
	},
	"direction": {
		"type": "string",
		"enum": [ "ltr", "rtl" ]
	},
	"textShadow": {
		"type": "boolean",
		"default": false
	},
	"textShadowColor": {
		"type": "string",
		"default": "#000"
	},
	"textShadowBlur": {
		"type": "integer",
		"default": 33
	},
	"textShadowHorizontal": {
		"type": "integer",
		"default": 0
	},
	"textShadowVertical": {
		"type": "integer",
		"default": 0
	},
	"layoutVerticalAlign":{
		"type": "string",
		"default": "flex-start"
	},
	"layoutPosition":{
		"type": "string",
		"default": "initial"
	},
	"effectNRotateX": {
		"type": "integer",
		"default": 0
	},
	"effectNRotateY": {
		"type": "integer",
		"default": 0
	},
	"effectNRotateZ": {
		"type": "integer",
		"default": 0
	},
	"effectNOffsetX": {
		"type": "integer",
		"default": 0
	},
	"effectNOffsetY": {
		"type": "integer",
		"default": 0
	},
	"effectNScale": {
		"type": "number",
		"default": 1
	},
	"effectNBorderType":{
		"type": "string",
		"default": "none"
	},
	"effectNBorderWidth": {
		"type": "integer",
		"default": 0
	},
	"effectNBorderColor": {
		"type": "string",
		"default": "#000"
	},
	"effectNBorderRadiusTL": {
		"type": "integer",
		"default": 0
	},
	"effectNBorderRadiusTR": {
		"type": "integer",
		"default": 0
	},
	"effectNBorderRadiusBL": {
		"type": "integer",
		"default": 0
	},
	"effectNBorderRadiusBR": {
		"type": "integer",
		"default": 0
	},
	"hoverEffect": {
		"type": "boolean",
		"default": false
	},
	"transitionTime": {
		"type": "number",
		"default": 1
	},
	"effectHRotateX": {
		"type": "integer",
		"default": 0
	},
	"effectHRotateY": {
		"type": "integer",
		"default": 0
	},
	"effectHRotateZ": {
		"type": "integer",
		"default": 0
	},
	"effectHOffsetX": {
		"type": "integer",
		"default": 0
	},
	"effectHOffsetY": {
		"type": "integer",
		"default": 0
	},
	"effectHScale": {
		"type": "number",
		"default": 1
	},
	"effectHBorderType":{
		"type": "string",
		"default": "none"
	},
	"effectHBorderWidth": {
		"type": "integer",
		"default": 0
	},
	"effectHBorderColor": {
		"type": "string",
		"default": "#000"
	},
	"effectHBorderRadiusTL": {
		"type": "integer",
		"default": 0
	},
	"effectHBorderRadiusTR": {
		"type": "integer",
		"default": 0
	},
	"effectHBorderRadiusBL": {
		"type": "integer",
		"default": 0
	},
	"effectHBorderRadiusBR": {
		"type": "integer",
		"default": 0
	},
}

const supports = {
	"anchor": true,
	"className": false,
	"color": {
		"link": true,
	},
	"typography": {
		"fontSize": true,
		"lineHeight": true,
	},
	"spacing": {
        "margin": true,
        "padding": true
    }
}

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,

	attributes,

	supports

});
