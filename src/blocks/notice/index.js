import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';

const attributes = {
	dismiss: {
		type: 'string',
		default: 'Dismissable',
	},
	icon: {
		type: 'string',
		default: '',
	},
	iconSize: {
		type: 'string',
		default: '20px',
	},
	iconPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	iconMargin: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
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
	align: {
		type: 'string',
	},
	title: {
		type: 'string',
		default: '',
	},
	content: {
		type: 'string',
		default: '',
	},
	titleTypoSize: {
		type: 'number',
		default: '16px',
	},
	titleTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	titleTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	titleTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	titleTypoWordSpacing: {
		type: 'string',
		default: 'none',
	},
	titleTypoTransform: {
		type: 'string',
		default: 'none',
	},
	titleTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	titleTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	titleTypoWeight: {
		type: 'string',
		default: 'default',
	},
	titleTypoFontFamily: {
		type: 'string',
		default: '',
	},
	titleTag: {
		type: 'string',
		default: 'h3',
	},
	titleLayoutPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	titleTextColor: {
		type: 'string',
		default: '',
	},
	titleTextGradient: {
		type: 'string',
		default: '',
	},
	titleTextHColor: {
		type: 'string',
		default: '',
	},
	titleTextHGradient: {
		type: 'string',
		default: '',
	},
	contentTypoSize: {
		type: 'number',
		default: '16px',
	},
	contentTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	contentTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	contentTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	contentTypoWordSpacing: {
		type: 'string',
		default: 'none',
	},
	contentTypoTransform: {
		type: 'string',
		default: 'none',
	},
	contentTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	contentTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	contentTypoWeight: {
		type: 'string',
		default: 'default',
	},
	contentTypoFontFamily: {
		type: 'string',
		default: '',
	},
	contentLayoutPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	contextTextColor: {
		type: 'string',
		default: '',
	},
	contextTextGradient: {
		type: 'string',
		default: '',
	},
	contextTextHColor: {
		type: 'string',
		default: '',
	},
	contextTextHGradient: {
		type: 'string',
		default: '',
	},
	transitionColorTime: {
		type: 'number',
		default: 0.2,
	},
	transitionTime: {
		type: 'number',
		default: 1,
	},
	entranceAnimation: {
		type: 'string',
		default: 'none',
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
	effectNBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'solid', width: '0px' },
			bottom: { color: '#72aee6', style: 'solid', width: '0px' },
			right: { color: '#72aee6', style: 'solid', width: '0px' },
			left: { color: '#72aee6', style: 'solid', width: '6px' },
		},
	},
	effectNBorderRadius: {
		type: 'object',
		default: {
			topLeft: '10px',
			topRight: '10px',
			bottomLeft: '10px',
			bottomRight: '10px',
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
};

const supports = {
	anchor: true,
	className: false,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
 registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	supports,
	icon,
} );
