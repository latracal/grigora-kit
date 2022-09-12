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
};

const supports = {
	customClassName: false,
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	supports: {
		// inserter: false,
		reusable: false,
		html: false,
		lock: false,
	},
	icon,
} );