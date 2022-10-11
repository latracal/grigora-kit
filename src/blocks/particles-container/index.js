import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';
import {
	HOVER_ANIMATIONS,
	ENTRANCE_ANIMATIONS,
	ICON_POSITIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
	particlesDefaultConfig1,
} from '@constants';

const attributes = {
	id: {
		type: 'string',
		default: '',
	},
	particlesid: {
		type: 'string',
		default: 'tsparticles',
	},
	structureMinHeight: {
		type: 'string',
		default: '80vh',
	},
	structureWidth: {
		type: 'string',
		default: '100%',
	},
	align: {
		type: "string",
		default: "full"
	},
	particlesConfigSet:{
		type: "string",
		default: "1"
	},
	particlesConfig:{
		type: "string",
		default: JSON.stringify(particlesDefaultConfig1, null, 2)
	}
};

const supports = {
	align: [ "wide", "full" ],
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
