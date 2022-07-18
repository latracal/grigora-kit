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
	"layoutPadding":{
		"type": "object",
		"default":{
			"top": "0px",
			"bottom": "0px",
			"left": "0px",
			"right": "0px",
		}
	},
	"layoutMargin":{
		"type": "object",
		"default":{
			"top": "0px",
			"bottom": "0px",
			"left": "0px",
			"right": "0px",
		}
	},
	"backgroundNMode":{
		"type": "string",
		"default": ""
	},
	"backgroundNColor":{
		"type": "string",
		"default": "#ffffff"
	},
	"backgroundNGradient":{
		"type": "string",
		"default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
	},
	"backgroundHMode":{
		"type": "string",
		"default": ""
	},
	"backgroundHColor":{
		"type": "string",
		"default": "#ffffff"
	},
	"backgroundHGradient":{
		"type": "string",
		"default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
	},
	"backgroundHTransitionTime":{
		type: "number",
		default: 0.5
	},
	"backgroundFixed":{
		"type": "boolean",
		"default": false
	},
	"backgroundOMode":{
		"type": "string",
		"default": ""
	},
	"backgroundOColor":{
		"type": "string",
		"default": "#ffffff"
	},
	"backgroundOGradient":{
		"type": "string",
		"default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
	},
	"backgroundOOpacity":{
		type: "number",
		default: 0.5
	},
	"backgroundOCSS":{
		type: "object",
		default: {}
	},
	"backgroundOHMode":{
		"type": "string",
		"default": ""
	},
	"backgroundOHColor":{
		"type": "string",
		"default": "#ffffff"
	},
	"backgroundOHGradient":{
		"type": "string",
		"default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
	},
	"backgroundOHOpacity":{
		type: "number",
		default: 0.5
	},
	"backgroundOHCSS":{
		type: "object",
		default: {}
	},
	"backgroundOHTransitionTime":{
		type: "number",
		default: 0.5
	},
	"backgroundOFixed":{
		"type": "boolean",
		"default": false
	},
	"videoLink":{
		"type": "string",
		"default": ""
	},
	"videoLinkID":{
		"type": "number",
	},
	"videoLoop":{
		"type": "boolean",
		"default": true
	},
	"videoMuted":{
		"type": "boolean",
		"default": true
	},
	"videoPreload":{
		"type": "string",
		"default": "auto"
	},
	"videoPoster":{
		"type": "string",
		"default": ""
	},
	"images":{
		"type": "array",
		"default": []
	},
	"imageH":{
		"type": "object",
		"default": {}
	},
	"imageO":{
		"type": "object",
		"default": {}
	},
	"imageOH":{
		"type": "object",
		"default": {}
	},
	"imageFocus":{
		"type": "object",
		"default": {
			x: 0.5,
			y: 0.5,
		}
	},
	"imageHFocus":{
		"type": "object",
		"default": {
			x: 0.5,
			y: 0.5,
		}
	},
	"imageLoop":{
		type: "boolean",
		default: true
	},
	"imageDuration":{
		type: "number",
		default: 5
	},
	"imageTransition":{
		type: "string",
		default: "fade"
	},
	"imageTransitionDuration":{
		type: "number",
		default: 0.5
	},
	"structureTag":{
		type: "string",
		default: "div"
	},
	"structureMaxWidth":{
		type: "string",
		default: ""
	},
	"structureMinHeight":{
		type: "string",
		default: ""
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
			"topLeft": "0px",
			"topRight": "0px",
			"bottomLeft": "0px",
			"bottomRight": "0px"
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
			"topLeft": "0px",
			"topRight": "0px",
			"bottomLeft": "0px",
			"bottomRight": "0px"
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
	"hideDesktop":{
		"type": "boolean",
		"default": false
	},
	"hideTablet":{
		"type": "boolean",
		"default": false
	},
	"hideMobile":{
		"type": "boolean",
		"default": false
	},
	"textNColor":{
		"type": "string",
		"default": ""
	},
	"linkNColor":{
		"type": "string",
		"default": ""
	},
	"textHColor":{
		"type": "string",
		"default": ""
	},
	"linkHColor":{
		"type": "string",
		"default": ""
	},
	"entranceAnimation":{
		"type": "string",
		"default": "none"
	},
	"entranceAnimationTime": {
		"type": "number",
		"default": 1
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
