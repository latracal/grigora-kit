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

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	supports: {
		className: false,
		customClassName: false,
		inserter: false,
		reusable: false,
		html: false,
		lock: false,
	},
	icon,
} );
