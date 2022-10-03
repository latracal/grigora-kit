import { registerBlockType } from '@wordpress/blocks';

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
		default: 'end',
	},

	iconSize:{
		type: 'string',
		default: 'default',
	},

	iconPadding: {
		type: 'object',
		default: {
			top: '5px',
			bottom: '5px',
			left: '5px',
			right: '5px',
		},
	},
	

	borderContainer: {
		type: 'object',
		default: {
			top: { color: '#000', style: 'solid', width: '0px' },
			bottom: { color: '#000', style: 'solid', width: '0px' },
			right: { color: '#000', style: 'solid', width: '0px' },
			left: { color: '#000', style: 'solid', width: '0px' },
		},
	},

	borderRadius: {
		type: 'object',
		default: {
			topLeft: '4px',
			topRight: '4px',
			bottomLeft: '4px',
			bottomRight: '4px',
		},
	},

	displayShare:{
		type: 'boolean',
		default: true,
	},

	displayText: {
		type: 'boolean',
		default: false,
	},

	containerGap: {
		type: 'number',
		default: 20,
	},

	iconItems: {
		type: 'array',
		default: [
			{
				title: 'facebook',
				color: 'white',
				backgroundColor: '#3b5998',
				defaultBgColor: '#3b5998',
				display: true,
				shareText: 'Share on Facebook',
			},
			{
				title: 'twitter',
				color: 'white',
				backgroundColor: '#1da1f2',
				defaultBgColor: '#1da1f2',
				display: true,
				shareText: 'Share on Twitter',
			},
			{
				title: 'whatsapp',
				color: 'white',
				backgroundColor: '#25d366',
				defaultBgColor: '#25d366',
				display: true,
				shareText: 'Share on Whatsapp',
			},
			{
				title: 'instagram',
				color: 'white',
				backgroundColor: '#e1306c',
				defaultBgColor: '#e1306c',
				display: true,
				shareText: 'Share on Instagram',
			},
			{
				title: 'pinterest',
				color: 'white',
				backgroundColor: '#bd081c',
				defaultBgColor: '#bd081c',
				display: false,
				shareText: 'Share on Pinterest',
			},
			{
				title: 'linkedin',
				color: 'white',
				backgroundColor: '#0077b5',
				defaultBgColor: '#0077b5',
				display: false,
				shareText: 'Share on Linkedin',
			},
			{
				title: 'snapchat',
				color: 'white',
				backgroundColor: '#fffc00',
				defaultBgColor: '#fffc00',
				display: false,
				shareText: 'Share on Snapchat',
			},
			{
				title: 'reddit',
				color: 'white',
				backgroundColor: '#ff4500',
				defaultBgColor: '#ff4500',
				display: false,
				shareText: 'Share on Reddit',
			},
			{
				title: 'discord',
				color: 'white',
				backgroundColor: '#7289da',
				defaultBgColor: '#7289da',
				display: false,
				shareText: 'Share on Discord',
			},
			{
				title: 'telegram',
				color: 'white',
				backgroundColor: '#0088cc',
				defaultBgColor: '#0088cc',
				display: false,
				shareText: ' Share on Telegram',
			},
			
		],
	},

	typoSize: {
		type: 'string',
		default: 'default',
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
