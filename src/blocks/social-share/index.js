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

	iconItems: {
		type: 'array',
		default: [
			{
				title: 'facebook',
				color: 'white',
				backgroundColor: '#3b5998',
				display: true,
			},
			{
				title: 'twitter',
				color: 'white',
				backgroundColor: '#1da1f2',
				display: true,
			},
			{
				title: 'whatsapp',
				color: 'white',
				backgroundColor: '#25d366',
				display: true,
			},
			{
				title: 'instagram',
				color: 'white',
				backgroundColor: '#e1306c',
				display: true,
			},
			{
				title: 'pinterest',
				color: 'white',
				backgroundColor: '#bd081c',
				display: false,
			},
			{
				title: 'linkedin',
				color: 'white',
				backgroundColor: '#0077b5',
				display: false,
			},
			{
				title: 'snapchat',
				color: 'white',
				backgroundColor: '#fffc00',
				display: false,
			},
			{
				title: 'reddit',
				color: 'white',
				backgroundColor: '#ff4500',
				display: false,
			},
			{
				title: 'discord',
				color: 'white',
				backgroundColor: '#7289da',
				display: false,
			},
			{
				title: 'telegram',
				color: 'white',
				backgroundColor: '#0088cc',
				display: false,
			},
			
		],
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
