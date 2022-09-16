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

	tabs: {
		type: 'array',
		default: [{
			id: 0,
			title: 'Tab 1',
			subtitle: 'Hello T1'
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
		default: 0,
	},

	minHeight: {
		type: 'string',
		default: 'default',
	},

	maxWidth: {
		type: 'string',
		default: 'default',
	},

	showTabSubtitles: {
		type: 'boolean',
		default: false,
	},

	borderStyle:{
		type: 'string',
		default: 'solid',
	},

	borderContentStyle:{
		type: 'string',
		default: 'solid',
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

	titleBorderColor:{
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

	bgTitleHoverColor: {
		type: 'string',
		default: '#787878',
	},

	bgTitleActiveColor:{
		type: 'string',
		default: '#2E8B57',
	},

	activeColor: {
		type: 'string',
		default: '#ffffff',
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
			top: '10px',
			bottom: '10px',
			left: '20px',
			right: '20px',
		},
	},


	borderTitle: {
		type: 'object',
		default: {
			top: '1px',
			bottom: '1px',
			right: '1px',
			left: '1px',
		}
	},

	effectNBorderRadius: {
		type: 'object',
		default: {
			topLeft: '5px',
			topRight: '5px',
			bottomLeft: '0px',
			bottomRight: '0px',
		},
	},

	// Content

	
	contentColor: {
		type: 'string',
		default: '#000000',
	},
	contentBgColor: {
		type: 'string',
		default: '#ffffff',
	},

	contentBorderColor:{
		type: 'string',
		default: '#000000',
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
			top: '15px',
			bottom: '15px',
			left: '15px',
			right: '15px',
		},
	},

	borderContent: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			right: '0px',
			left: '0px',
		}
	},

	effectCBorderRadius: {
		type: 'object',
		default: {
			topLeft: '0px',
			topRight: '0px',
			bottomLeft: '0px',
			bottomRight: '0px',
		},
	},

	rowGap:{
		type: 'string',
		default: '0px',
	},

	columnGap:{
		type: 'string',
		default: '0px',
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
