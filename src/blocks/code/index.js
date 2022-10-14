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
		default: 'flex-start',
	},

	codeText:{
		type: 'string',
		default: '',
	},

	wrapCode:{
		type: 'boolean',
		default: true,
	},
	
	language:{
		type: 'string',
		default: 'bash',
	},

	showLineNumbers:{
		type: 'boolean',
		default: true,
	},

	themePrism:{
		type: 'string',
		default: 'okaidia',
	},

	fontSize:{
		type: 'number',
		default: 14,
	},

	containerMaxHeight:{
		type: 'string',
		default: 'none',
	},

	containerWidth:{
		type: 'string',
		default: '100%',
	},

	highlightLines:{
		type: 'object',
		default: {
			
		},
	},

	highlightText:{
		type: 'string',
		default: '',
	}

	
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
