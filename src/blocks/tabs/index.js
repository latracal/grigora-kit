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
	tabs: {
		type: 'array',
		default: [
			{
				title: 'Tab 1',
				subtitle: 'Hello T1',
			},
			{
				title: 'Tab 2',
				subtitle: '',
			},
			{
				title: 'Tab 3',
				subtitle: '',
			},
		],
	},
	counter: {
		type: 'number',
		default: 3,
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
	borderStyle: {
		type: 'string',
		default: 'solid',
	},
	borderContentStyle: {
		type: 'string',
		default: 'solid',
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
	typoSTSize: {
		type: 'string',
		default: 'default',
	},
	typoSTWeight: {
		type: 'string',
		default: 'default',
	},
	typoSTTransform: {
		type: 'string',
		default: 'none',
	},
	typoSTStyle: {
		type: 'string',
		default: 'normal',
	},
	typoSTDecoration: {
		type: 'string',
		default: 'initial',
	},
	typoSTLineHeight: {
		type: 'string',
		default: 'normal',
	},
	typoSTLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoSTWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	titleColor: {
		type: 'string',
		default: '#000000',
	},
	titleBorderColor: {
		type: 'string',
		default: '#ffffff',
	},
	titleBorderActiveColor: {
		type: 'string',
		default: '#46479e',
	},
	titleBorderHoverColor: {
		type: 'string',
		default: 'rgb(204, 203, 203)',
	},
	bgColor: {
		type: 'string',
		default: '#ffffff',
	},
	titleHoverColor: {
		type: 'string',
		default: '',
	},
	bgTitleHoverColor: {
		type: 'string',
		default: '',
	},
	activeColor: {
		type: 'string',
		default: '#46479e',
	},
	bgTitleActiveColor: {
		type: 'string',
		default: '',
	},
	margin: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	padding: {
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
			top: '0px',
			bottom: '5px',
			right: '0px',
			left: '0px',
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
	contentBgColor: {
		type: 'string',
		default: '#ffffff',
	},
	contentBorderColor: {
		type: 'string',
		default: '#46479e',
	},
	contentMargin: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	contentPadding: {
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
			top: '1px',
			bottom: '0px',
			right: '0px',
			left: '0px',
		},
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
	rowGap: {
		type: 'string',
		default: '0px',
	},
	columnGap: {
		type: 'string',
		default: '0px',
	},
};

const supports = {
	customClassName: false,
	grigoraMotion: true,
	grigoraSticky: true,
	grigoraResponsive: true,
	grigoraPosition: true,
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	supports,
	icon,
} );
