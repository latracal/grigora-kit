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
			},
			{
				title: 'twitter',
				color: 'white',
				backgroundColor: '#1da1f2',
			},
			{
				title: 'whatsapp',
				color: 'white',
				backgroundColor: '#25d366',
			},
			{
				title: 'pinterest',
				color: 'white',
				backgroundColor: '#bd081c',
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
