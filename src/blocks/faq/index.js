import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';
import generateId from '@helpers/generateId';

const attributes = {
	id: {
		type: 'string',
		default: '',
	},
	faqs: {
		type: 'array',
		default: [
			{
				id: generateId(),
				question: '', 
				answer: '', 
				hide: false
			}
		],
	},

	hide: {
		type: 'boolean',
		default: false,
	},

	structureTagQn: {
		type: 'string',
		default: 'h3',
	},

	structureTagAn: {
		type: 'string',
		default: 'p',
	},

	titleTag: {
		type: 'string',
		default: 'h2',
	},

	faqSchema: {
		type: 'boolean',
		default: false,
	},

	closedIcon: {
		type: 'string',
		default: '',
	},

	openedIcon: {
		type: 'string',
		default: '',
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
			topLeft: '4px',
			topRight: '4px',
			bottomLeft: '4px',
			bottomRight: '4px',
		},
	},

	spaceBwContainer: {
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
	titleColor: {
		type: 'string',
		default: '#000',
	},
	titleActiveColor: {
		type: 'string',
		default: '#000',
	},
	titleBgColor: {
		type: 'string',
		default: '#000',
	},

	titleTypoSize: {
		type: 'number',
		default: 16,
	},
	titleTypoWeight: {
		type: 'string',
		default: '500',
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
	iconSpacing: {
		type: 'string',
		default: 'normal',
	},
	titleTypoFontFamily: {
		type: 'string',
		default: '',
	},

	titlePadding: {
		type: 'object',
		default: {
			top: '15px',
			bottom: '15px',
			left: '30px',
			right: '30px',
		},
	},

	contentColor: {
		type: 'string',
		default: '#000',
	},
	contentActiveColor: {
		type: 'string',
		default: '#000',
	},
	contentBgColor: {
		type: 'string',
		default: '#000',
	},

	contentTypoSize: {
		type: 'number',
		default: 16,
	},
	contentTypoWeight: {
		type: 'string',
		default: '500',
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
	contentTypoFontFamily: {
		type: 'string',
		default: '',
	},

	contentPadding: {
		type: 'object',
		default: {
			top: '15px',
			bottom: '15px',
			left: '30px',
			right: '30px',
		},
	},


	iconAlign:{
		type: 'string',
		default: 'left',
	},

	iconColor:{
		type: 'string',
		default: '#000',
	},

	iconActiveColor:{
		type: 'string',
		default: '#000',
	},

	entranceAnimation: {
		type: 'string',
		default: 'none',
	},

	transitionTime: {
		type: 'number',
		default: 1,
	},


};



registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	icon,
} );
