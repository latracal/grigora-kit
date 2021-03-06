/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

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
import icon from "./icon";


const attributes = {
	"id": {
		"type": "string",
		"default": "",
	},
	"url":{
		"type": "string",
		"default": "#",
	},
	"opensInNewTab":{
		"type": "boolean",
		"default": false,
	},
	"urlnofollow":{
		"type": "boolean",
		"default": false,
	},
	"urlnoopener":{
		"type": "boolean",
		"default": false,
	},
	"urlnoreferrer":{
		"type": "boolean",
		"default": false,
	},
	"urlsponsored":{
		"type": "boolean",
		"default": false,
	},
	"typoSize":{
		"type": "number",
		"default": 16,
	},
	"typoWeight":{
		"type": "string",
		"default": "500",
	},
	"typoTransform":{
		"type": "string",
		"default": "none",
	},
	"typoStyle":{
		"type": "string",
		"default": "normal",
	},
	"typoDecoration":{
		"type": "string",
		"default": "initial",
	},
	"typoLineHeight":{
		"type": "string",
		"default": "normal"
	},
	"typoLetterSpacing":{
		"type": "string",
		"default": "normal"
	},
	"typoWordSpacing":{
		"type": "string",
		"default": "normal"
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
		"type": "string",
		"default": "0px"
	},
	"textShadowHorizontal": {
		"type": "string",
		"default": "0px"
	},
	"textShadowVertical": {
		"type": "string",
		"default": "0px"
	},
	"layoutPadding":{
		"type": "object",
		"default":{
			"top": "15px",
			"bottom": "15px",
			"left": "30px",
			"right": "30px",
		}
	},
	"layoutVerticalAlign":{
		"type": "string",
		"default": "flex-start"
	},
	"layoutPosition":{
		"type": "string",
		"default": "initial"
	},
	"effectNColor":{
		"type": "string",
		"default": "#fff"
	},
	"effectNBFlag":{
		"type": "boolean",
		"default": false
	},
	"effectNBGradient":{
		"type": "string",
		"default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
	},
	"effectNBColor":{
		"type": "string",
		"default": "#5093d4"
	},
	"effectNRotateX": {
		"type": "string",
		"default": '0deg'
	},
	"effectNRotateY": {
		"type": "string",
		"default": '0deg'
	},
	"effectNRotateZ": {
		"type": "string",
		"default": '0deg'
	},
	"effectNSkewX": {
		"type": "string",
		"default": '0deg'
	},
	"effectNSkewY": {
		"type": "string",
		"default": '0deg'
	},
	"effectNOffsetX": {
		"type": "string",
		"default": "0px"
	},
	"effectNOffsetY": {
		"type": "string",
		"default": "0px"
	},
	"effectNScale": {
		"type": "number",
		"default": 1
	},
	"effectNBorder":{
		"type": "object",
		"default": {"top":{color: '#72aee6',
		style: 'dashed',
		width: '0px'},
		"bottom":{color: '#72aee6',
		style: 'dashed',
		width: '0px'},
		"right":{color: '#72aee6',
		style: 'dashed',
		width: '0px'},
		"left":{color: '#72aee6',
		style: 'dashed',
		width: '0px'},
		}
	},
	"effectNBorderRadius":{
		"type": "object",
		"default": {
			"topLeft": "4px",
			"topRight": "4px",
			"bottomLeft": "4px",
			"bottomRight": "4px"
		}
	},
	"effectNShadowHO":{
		"type": "string",
		"default": "0px"
	},
	"effectNShadowVO":{
		"type": "string",
		"default": "0px"
	},
	"effectNShadowBlur":{
		"type": "string",
		"default": "0px"
	},
	"effectNShadowSpread":{
		"type": "string",
		"default": "0px"
	},
	"effectNShadowColor":{
		"type": "string",
		"default": "#000"
	},
	"hoverEffect": {
		"type": "boolean",
		"default": false
	},
	"effectHAnimation":{
		"type": "string",
		"default": "none"
	},
	"effectHColor":{
		"type": "string",
		"default": "#fff"
	},
	"effectHBFlag":{
		"type": "boolean",
		"default": false
	},
	"effectHBGradient":{
		"type": "string",
		"default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
	},
	"effectHBColor":{
		"type": "string",
		"default": "#5093d4"
	},
	"transitionTime": {
		"type": "number",
		"default": 1
	},
	"effectHRotateX": {
		"type": "string",
		"default": '0deg'
	},
	"effectHRotateY": {
		"type": "string",
		"default": '0deg'
	},
	"effectHRotateZ": {
		"type": "string",
		"default": '0deg'
	},
	"effectHSkewX": {
		"type": "string",
		"default": '0deg'
	},
	"effectHSkewY": {
		"type": "string",
		"default": '0deg'
	},
	"effectHOffsetX": {
		"type": "string",
		"default": '0px'
	},
	"effectHOffsetY": {
		"type": "string",
		"default": '0px'
	},
	"effectHScale": {
		"type": "number",
		"default": 1
	},
	"effectHBorder":{
		"type": "object",
		"default": {"top":{color: '#72aee6',
		style: 'dashed',
		width: '0px'},
		"bottom":{color: '#72aee6',
		style: 'dashed',
		width: '0px'},
		"right":{color: '#72aee6',
		style: 'dashed',
		width: '0px'},
		"left":{color: '#72aee6',
		style: 'dashed',
		width: '0px'},
		}
	},
	"effectHBorderRadius":{
		"type": "object",
		"default": {
			"topLeft": "4px",
			"topRight": "4px",
			"bottomLeft": "4px",
			"bottomRight": "4px"
		}
	},
	"effectHShadow": {
		"type": "boolean",
		"default": false
	},
	"effectHShadowHO":{
		"type": "string",
		"default": "0px"
	},
	"effectHShadowVO":{
		"type": "string",
		"default": "0px"
	},
	"effectHShadowBlur":{
		"type": "string",
		"default": "0px"
	},
	"effectHShadowSpread":{
		"type": "string",
		"default": "0px"
	},
	"effectHShadowColor":{
		"type": "string",
		"default": "#000"
	},
	"entranceAnimation":{
		"type": "string",
		"default": "none"
	},
	"icon":{
		"type": "string",
		"default": ""
	},
	"iconSize":{
		"type": "string",
		"default": "26px"
	},
	"iconPadding":{
		"type": "object",
		"default":{
			"top": "0px",
			"bottom": "0px",
			"left": "5px",
			"right": "5px"
		}
	},
	"iconPosition":{
		"type": "string",
		"default": "left"
	},
	"iconColorFlag": {
		"type": "boolean",
		"default": false
	},
	"iconNormalColor": {
		"type": "string",
		"default": "#000"
	},
	"iconHoverColor": {
		"type": "string",
		"default": "#000"
	},

}

const supports = {
	"anchor": true,
	"className": false,
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

	supports,

	icon

});
