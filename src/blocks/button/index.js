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
	url: {
		type: 'string',
		default: '#',
	},
	opensInNewTab: {
		type: 'boolean',
		default: false,
	},
	urlnofollow: {
		type: 'boolean',
		default: false,
	},
	urlnoopener: {
		type: 'boolean',
		default: false,
	},
	urlnoreferrer: {
		type: 'boolean',
		default: false,
	},
	urlsponsored: {
		type: 'boolean',
		default: false,
	},
	typoSize: {
		type: 'number',
		default: 16,
	},
	typoSizeTablet: {
		type: 'string',
		default: '',
	},
	typoSizeMobile: {
		type: 'string',
		default: '',
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
	layoutPadding: {
		type: 'object',
		default: {
			top: '15px',
			bottom: '15px',
			left: '30px',
			right: '30px',
		},
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
	effectNPerspective: {
		type: 'string',
		default: '',
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
			top: { color: '#72aee6', style: 'solid', width: '0px' },
			bottom: { color: '#72aee6', style: 'solid', width: '0px' },
			right: { color: '#72aee6', style: 'solid', width: '0px' },
			left: { color: '#72aee6', style: 'solid', width: '0px' },
		},
	},
	effectNBorderRadius: {
		type: 'object',
		default: {
			topLeft: '4px',
			topRight: '4px',
			bottomLeft: '4px',
			bottomRight: '4px',
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
	effectHAnimation: {
		type: 'string',
		default: 'none',
	},
	effectHColor: {
		type: 'string',
		default: '',
	},
	effectHBGradient: {
		type: 'string',
		default: '',
	},
	effectHBColor: {
		type: 'string',
		default: '',
	},
	transitionTime: {
		type: 'number',
		default: 1,
	},
	hoverAnimationTime: {
		type: 'number',
		default: 1,
	},
	effectHPerspective: {
		type: 'string',
		default: '',
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
			top: { color: '#72aee6', style: 'solid', width: 'undefined' },
			bottom: { color: '#72aee6', style: 'solid', width: 'undefined' },
			right: { color: '#72aee6', style: 'solid', width: 'undefined' },
			left: { color: '#72aee6', style: 'solid', width: 'undefined' },
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
	entranceAnimationDelay: {
		type: 'number',
		default: 0,
	},
	entranceAnimationTime: {
		type: 'number',
		default: 1,
	},
	icon: {
		type: 'string',
		default: '',
	},
	iconSize: {
		type: 'string',
		default: '26px',
	},
	iconPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '5px',
			right: '5px',
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
		default: '',
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
