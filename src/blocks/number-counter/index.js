import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

const attributes = {
	countStart: {
		type: 'number',
		default: 0
	},
	countEnd: {
		type: 'number',
		default: 0
	},
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	attributes
});
