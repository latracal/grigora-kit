import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import './inner-tab/index.js';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';

const attributes = {
	id: {
		type: 'string',
		default: '',
	},

	renderer: {
		type: 'string',
		default: "",
	},
	tabs: {
		type: 'array',
		default: [{
			id: 0,
			title: 'Tab 1',
			subtitle: ''
		},
		{
			id: 1,
			title: 'Tab 2',
			subtitle: ''
		},
		{
			id: 2,
			title: 'Tab 3',
			subtitle: ''
		}],
	},

	activeTab: {
		type: 'number',
		default: 1,
	},

	minHeight: {
		type: 'string',
		default: '100px',
	},

	maxWidth: {
		type: 'string',
		default: '100%',
	},

	showTabTitles: {
		type: 'boolean',
		default: true,
	},

	entranceAnimation: {
		type: 'string',
		default: 'none',
	},
	entranceAnimationTime: {
		type: 'number',
		default: 1,
	},

	typoTSize: {
		type: 'string',
		default: 'default',
	},
	typoTWeight: {
		type: 'string',
		default: 'default',
	},
	typoTTransform: {
		type: 'string',
		default: 'none',
	},
	typoTStyle: {
		type: 'string',
		default: 'normal',
	},
	typoTDecoration: {
		type: 'string',
		default: 'initial',
	},
	typoTLineHeight: {
		type: 'string',
		default: 'normal',
	},
	typoTLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoTWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	titleColor: {
		type: 'string',
		default: '#000000',
	},
	bgColor: {
		type: 'string',
		default: '#ffffff',
	},
	titleHoverColor: {
		type: 'string',
		default: '#000000',
	},
	activeColor: {
		type: 'string',
		default: '#333333',
	},

	margin:{
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},

	padding:{
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '5px',
			right: '5px',
		},
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

	// Content

	typoCSize: {
		type: 'string',
		default: 'default',
	},
	typoCWeight: {
		type: 'string',
		default: 'default',
	},
	typoCTransform: {
		type: 'string',
		default: 'none',
	},
	typoCStyle: {
		type: 'string',
		default: 'normal',
	},
	typoCDecoration: {
		type: 'string',
		default: 'initial',
	},
	typoCLineHeight: {
		type: 'string',
		default: 'normal',
	},
	typoCLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoCWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	contentColor: {
		type: 'string',
		default: '#000000',
	},
	contentBgColor: {
		type: 'string',
		default: '#ffffff',
	},
	contentHoverColor: {
		type: 'string',
		default: '#000000',
	},

	contentMargin:{
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},

	contentPadding:{
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '5px',
			right: '5px',
		},
	},

	effectCBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'dashed', width: '0px' },
			bottom: { color: '#72aee6', style: 'dashed', width: '0px' },
			right: { color: '#72aee6', style: 'dashed', width: '0px' },
			left: { color: '#72aee6', style: 'dashed', width: '0px' },
		},
	},

	effectCBorderRadius: {
		type: 'object',
		default: {
			topLeft: '4px',
			topRight: '4px',
			bottomLeft: '4px',
			bottomRight: '4px',
		},
	},



};

const supports = {
	customClassName: false,
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	supports,
	icon,
} );
