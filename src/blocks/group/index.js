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
import transforms from './transforms';

const attributes = {
	id: {
		type: 'string',
		default: '',
	},
	align: {
		type: 'string',
		default: '',
	},
	groupAlign: {
		type: 'string',
		default: '',
	},
	verticalAlignment: {
		type: 'string',
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
	layoutPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	layoutPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
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
	layoutMarginTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	layoutMarginMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	layoutGap: {
		type: 'string',
		default: '',
	},
	layoutGapTablet: {
		type: 'string',
		default: '',
	},
	layoutGapMobile: {
		type: 'string',
		default: '',
	},
	overflow: {
		type: 'string',
		default: '',
	},
	backgroundNMode: {
		type: 'string',
		default: '',
	},
	backgroundNColor: {
		type: 'string',
		default: '',
	},
	backgroundNGradient: {
		type: 'string',
		default:
			'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
	},
	backgroundHMode: {
		type: 'string',
		default: '',
	},
	backgroundHColor: {
		type: 'string',
		default: '',
	},
	backgroundHGradient: {
		type: 'string',
		default:
			'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
	},
	backgroundHTransitionTime: {
		type: 'number',
		default: 0.5,
	},
	backgroundFixed: {
		type: 'boolean',
		default: false,
	},
	backgroundOMode: {
		type: 'string',
		default: '',
	},
	backgroundOColor: {
		type: 'string',
		default: '#ffffff',
	},
	backgroundOGradient: {
		type: 'string',
		default:
			'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
	},
	backgroundOOpacity: {
		type: 'number',
		default: 0.5,
	},
	backgroundOCSS: {
		type: 'object',
		default: {},
	},
	backgroundOHMode: {
		type: 'string',
		default: '',
	},
	backgroundOHColor: {
		type: 'string',
		default: '#ffffff',
	},
	backgroundOHGradient: {
		type: 'string',
		default:
			'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
	},
	backgroundOHOpacity: {
		type: 'number',
		default: 0.5,
	},
	backgroundOHCSS: {
		type: 'object',
		default: {},
	},
	backgroundOHTransitionTime: {
		type: 'number',
		default: 0.5,
	},
	backgroundOFixed: {
		type: 'boolean',
		default: false,
	},
	videoLink: {
		type: 'string',
		default: '',
	},
	videoLinkID: {
		type: 'number',
	},
	videoLoop: {
		type: 'boolean',
		default: true,
	},
	videoMuted: {
		type: 'boolean',
		default: true,
	},
	videoPreload: {
		type: 'string',
		default: 'auto',
	},
	videoPoster: {
		type: 'string',
		default: '',
	},
	images: {
		type: 'array',
		default: [],
	},
	imageH: {
		type: 'object',
		default: {},
	},
	imageO: {
		type: 'object',
		default: {},
	},
	imageOH: {
		type: 'object',
		default: {},
	},
	imageFocus: {
		type: 'object',
		default: {
			x: 0.5,
			y: 0.5,
		},
	},
	imageHFocus: {
		type: 'object',
		default: {
			x: 0.5,
			y: 0.5,
		},
	},
	imageLoop: {
		type: 'boolean',
		default: true,
	},
	imageDuration: {
		type: 'number',
		default: 5,
	},
	imageTransition: {
		type: 'string',
		default: 'fade',
	},
	imageTransitionDuration: {
		type: 'number',
		default: 0.5,
	},
	structureTag: {
		type: 'string',
		default: 'div',
	},
	structureMaxWidth: {
		type: 'string',
		default: '',
	},
	structureMaxWidthTablet: {
		type: 'string',
		default: '',
	},
	structureMaxWidthMobile: {
		type: 'string',
		default: '',
	},
	structureMinHeight: {
		type: 'string',
		default: '',
	},
	structureMinHeightTablet: {
		type: 'string',
		default: '',
	},
	structureMinHeightMobile: {
		type: 'string',
		default: '',
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
	effectHAnimation: {
		type: 'string',
		default: 'none',
	},
	effectHAnimationTime: {
		type: 'number',
		default: 1,
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
	textNColor: {
		type: 'string',
		default: '',
	},
	linkNColor: {
		type: 'string',
		default: '',
	},
	textHColor: {
		type: 'string',
		default: '',
	},
	linkHColor: {
		type: 'string',
		default: '',
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
};

const supports = {
	className: false,
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

	transforms,
} );
