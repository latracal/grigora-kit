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
				hide: true
			}
		],
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
		default: 'h3',
	},

	faqSchema: {
		type: 'boolean',
		default: false,
	},

	closedIcon: {
		type: 'string',
		default: 'chevron-up',
	},

	openedIcon: {
		type: 'string',
		default: 'chevron-down',
	},

	effectNBorder: {
		type: 'object',
		default: {
			top: { color: '#c4c4c4', style: 'solid', width: '1px' },
			bottom: { color: '#c4c4c4', style: 'solid', width: '1px' },
			right: { color: '#c4c4c4', style: 'solid', width: '1px' },
			left: { color: '#c4c4c4', style: 'solid', width: '1px' },
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

	spaceBwContainer: {
		type: 'string',
		default: '20px',
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
	titleHoverColor: {
		type: 'string',
		default: '#7049c6',
	},
	titleBgColor: {
		type: 'string',
		default: '#ffffff',
	},

	titleTypoSize: {
		type: 'string',
		default: 'normal',
	},
	titleTypoWeight: {
		type: 'string',
		default: 'default',
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

	contentActiveColor: {
		type: 'string',
		default: '#000',
	},
	contentColor: {
		type: 'string',
		default: '#000',
	},
	contentBgColor: {
		type: 'string',
		default: '#ffffff',
	},

	contentTypoSize: {
		type: 'number',
		default: 16,
	},
	contentTypoWeight: {
		type: 'string',
		default: 'default',
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
		default: '4',
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
