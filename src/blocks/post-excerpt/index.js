/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';

const attributes = {
	id: {
		type: 'string',
		default: '',
	},
	excerptLength: {
		type: 'number',
	},
	suffix: {
		type: 'string',
	},
	typoSize: {
		type: 'string',
		default: 'inherit',
	},
	typoWeight: {
		type: 'string',
		default: 'default',
	},
	typoTransform: {
		type: 'string',
		default: 'none',
	},
	typoStyle: {
		type: 'string',
		default: 'normal',
	},
	typoDecoration: {
		type: 'string',
		default: 'initial',
	},
	typoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	typoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoFontFamily: {
		type: 'string',
		default: '',
	},
	align: {
		type: 'string',
	},
	content: {
		type: 'string',
		default: '',
	},
	direction: {
		type: 'string',
		enum: [ 'ltr', 'rtl' ],
	},
	textColor: {
		type: 'string',
		default: '',
	},
	textGradient: {
		type: 'string',
		default: '',
	},
	textHColor: {
		type: 'string',
		default: '',
	},
	textHGradient: {
		type: 'string',
		default: '',
	},
	backColor: {
		type: 'string',
		default: '',
	},
	backGradient: {
		type: 'string',
		default: '',
	},
	transitionColorTime: {
		type: 'number',
		default: 0.2,
	},
	textShadow: {
		type: 'boolean',
		default: false,
	},
	textShadowColor: {
		type: 'string',
		default: '#000',
	},
	textShadowBlur: {
		type: 'string',
		default: '0px',
	},
	textShadowHorizontal: {
		type: 'string',
		default: '0px',
	},
	textShadowVertical: {
		type: 'string',
		default: '0px',
	},
	textShadowHColor: {
		type: 'string',
		default: '#000',
	},
	textShadowHBlur: {
		type: 'string',
		default: '',
	},
	textShadowHHorizontal: {
		type: 'string',
		default: '',
	},
	textShadowHVertical: {
		type: 'string',
		default: '',
	},
	layoutVerticalAlign: {
		type: 'string',
		default: 'flex-start',
	},
	layoutPosition: {
		type: 'string',
		default: 'initial',
	},
	effectNColor: {
		type: 'string',
		default: '#fff',
	},
	effectNBFlag: {
		type: 'boolean',
		default: false,
	},
	effectNBGradient: {
		type: 'string',
		default:
			'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
	},
	effectNBColor: {
		type: 'string',
		default: '#5093d4',
	},
	effectNRotateX: {
		type: 'string',
		default: '0deg',
	},
	effectNRotateY: {
		type: 'string',
		default: '0deg',
	},
	effectNRotateZ: {
		type: 'string',
		default: '0deg',
	},
	effectNSkewX: {
		type: 'string',
		default: '0deg',
	},
	effectNSkewY: {
		type: 'string',
		default: '0deg',
	},
	effectNOffsetX: {
		type: 'string',
		default: '0px',
	},
	effectNOffsetY: {
		type: 'string',
		default: '0px',
	},
	effectNScale: {
		type: 'number',
		default: 1,
	},
	effectNBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'dashed', width: '0px' },
			bottom: { color: '#72aee6', style: 'dashed', width: '0px' },
			right: { color: '#72aee6', style: 'dashed', width: '0px' },
			left: { color: '#72aee6', style: 'dashed', width: '0px' },
		},
	},
	effectNBorderRadius: {
		type: 'object',
		default: {
			topLeft: '0px',
			topRight: '0px',
			bottomLeft: '0px',
			bottomRight: '0px',
		},
	},
	effectNShadowHO: {
		type: 'string',
		default: '0px',
	},
	effectNShadowVO: {
		type: 'string',
		default: '0px',
	},
	effectNShadowBlur: {
		type: 'string',
		default: '0px',
	},
	effectNShadowSpread: {
		type: 'string',
		default: '0px',
	},
	effectNShadowColor: {
		type: 'string',
		default: '#000',
	},
	hoverEffect: {
		type: 'boolean',
		default: false,
	},
	effectHAnimation: {
		type: 'string',
		default: 'none',
	},
	effectHColor: {
		type: 'string',
		default: '#fff',
	},
	effectHBFlag: {
		type: 'boolean',
		default: false,
	},
	effectHBGradient: {
		type: 'string',
		default:
			'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
	},
	effectHBColor: {
		type: 'string',
		default: '#5093d4',
	},
	transitionTime: {
		type: 'number',
		default: 1,
	},
	transitionAnimationTime: {
		type: 'number',
		default: 1,
	},
	effectHRotateX: {
		type: 'string',
		default: '',
	},
	effectHRotateY: {
		type: 'string',
		default: '',
	},
	effectHRotateZ: {
		type: 'string',
		default: '',
	},
	effectHSkewX: {
		type: 'string',
		default: '',
	},
	effectHSkewY: {
		type: 'string',
		default: '',
	},
	effectHOffsetX: {
		type: 'string',
		default: '',
	},
	effectHOffsetY: {
		type: 'string',
		default: '',
	},
	effectHScale: {
		type: 'string',
		default: '',
	},
	effectHBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'dashed', width: 'undefined' },
			bottom: { color: '#72aee6', style: 'dashed', width: 'undefined' },
			right: { color: '#72aee6', style: 'dashed', width: 'undefined' },
			left: { color: '#72aee6', style: 'dashed', width: 'undefined' },
		},
	},
	effectHBorderRadius: {
		type: 'object',
		default: {
			topLeft: '',
			topRight: '',
			bottomLeft: '',
			bottomRight: '',
		},
	},
	effectHShadow: {
		type: 'boolean',
		default: false,
	},
	effectHShadowHO: {
		type: 'string',
		default: '',
	},
	effectHShadowVO: {
		type: 'string',
		default: '',
	},
	effectHShadowBlur: {
		type: 'string',
		default: '',
	},
	effectHShadowSpread: {
		type: 'string',
		default: '',
	},
	effectHShadowColor: {
		type: 'string',
		default: '#000',
	},
	entranceAnimation: {
		type: 'string',
		default: 'none',
	},
	icon: {
		type: 'string',
		default: '',
	},
	iconSize: {
		type: 'string',
		default: '26px',
	},
	layoutPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	layoutMargin: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	iconPosition: {
		type: 'string',
		default: 'left',
	},
	iconColorFlag: {
		type: 'boolean',
		default: false,
	},
	iconNormalColor: {
		type: 'string',
		default: '#000',
	},
	iconHoverColor: {
		type: 'string',
		default: '#000',
	},
	StructureTag: {
		type: 'string',
		default: 'p',
	},
	linkPost: {
		type: 'boolean',
		default: false,
	},
	rel: {
		type: 'string',
		attribute: 'rel',
		default: '',
	},
	linkTarget: {
		type: 'string',
		default: '_self',
	},
};

const supports = {
	customClassName: false,
	grigoraMotion: true,
	grigoraSticky: true,
	grigoraResponsive: true,
	grigoraPosition: true,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
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

	icon,
} );
