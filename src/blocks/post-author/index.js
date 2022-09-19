import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';

const attributes = {
	id: {
		type: 'string',
		default: '',
	},
	align: {
		type: 'string',
	},
	layout: {
		type: 'string',
		default: 'row',
	},
	author: {
		type: 'number',
		default: -1,
	},
	avatarSize: {
		type: 'number',
		default: 48,
	},
	showAvatar: {
		type: 'boolean',
		default: true,
	},
	showName: {
		type: 'boolean',
		default: true,
	},
	NameTag: {
		type: 'string',
		default: 'h3',
	},
	nameLink: {
		type: 'string',
		default: 'none',
	},
	showBio: {
		type: 'boolean',
		default: true,
	},
	nameColor: {
		type: 'string',
		default: '',
	},
	bioColor: {
		type: 'string',
		default: '',
	},
	backColor: {
		type: 'string',
		default: '',
	},
	namehColor: {
		type: 'string',
		default: '',
	},
	bioHColor: {
		type: 'string',
		default: '',
	},
	backHColor: {
		type: 'string',
		default: '',
	},
	stylesTransitionTime: {
		type: 'number',
		default: 0.2,
	},
	transitionTime: {
		type: 'number',
		default: 0.2,
	},
	imageVerticalAlign: {
		type: 'string',
		default: 'center',
	},
	imageSize: {
		type: 'number',
		default: 96,
	},
	imageGap: {
		type: 'number',
		default: 10,
	},
	imageBorderRadius: {
		type: 'number',
		default: 48,
	},
	imageBorderFlag: {
		type: 'boolean',
		default: false,
	},
	imageBorder: {
		type: 'object',
		default: {
			top: {
				color: '#72aee6',
				style: 'solid',
				width: 'undefined',
			},
			bottom: {
				color: '#72aee6',
				style: 'solid',
				width: 'undefined',
			},
			right: {
				color: '#72aee6',
				style: 'solid',
				width: 'undefined',
			},
			left: {
				color: '#72aee6',
				style: 'solid',
				width: 'undefined',
			},
		},
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
		default: 'inherit',
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
	typoBSize: {
		type: 'string',
		default: 'inherit',
	},
	typoBWeight: {
		type: 'string',
		default: 'default',
	},
	typoBTransform: {
		type: 'string',
		default: 'none',
	},
	typoBStyle: {
		type: 'string',
		default: 'normal',
	},
	typoBDecoration: {
		type: 'string',
		default: 'initial',
	},
	typoBLineHeight: {
		type: 'string',
		default: 'inherit',
	},
	typoBLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoBWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoBFontFamily: {
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
