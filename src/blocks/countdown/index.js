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
		default: '',
	},
	countdownDate: {
        type: 'string',
		default: '',
    },

	divider:{
		type: 'boolean',
		default: true,
	},

	dividerCharacter:{
		type: 'string',
		default: ':',
	},

	format:{
		type: 'number',
		default: 2,
	},

	orientation:{
		type: 'string',
		default: 'block',
	},

	showDays:{
		type: 'boolean',
		default: true,
	},

	showHours:{
		type: 'boolean',
		default: true,
	},

	showMinutes:{
		type: 'boolean',
		default: true,
	},

	dayLabel:{
		type: 'string',
		default: '',
	},

	hourLabel:{
		type: 'string',
		default: '',
	},

	minuteLabel:{
		type: 'string',
		default: 'm',
	},

	secondLabel:{
		type: 'string',
		default: 's',
	},

	countStart: {
		type: 'number',
		default: 0,
	},
	countEnd: {
		type: 'number',
		default: 100,
	},
	countTime: {
		type: 'number',
		default: 3,
	},
	numFormat: {
		type: 'boolean',
		default: false,
	},
	numSuffix: {
		type: 'string',
		default: '',
	},
	numPrefix: {
		type: 'string',
		default: '',
	},
	numTSeparator: {
		type: 'string',
		default: '',
	},
	typoSize: {
		type: 'number',
		default: 50,
	},
	typoWeight: {
		type: 'string',
		default: '500',
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
	effectNColor: {
		type: 'string',
		default: '#444444',
	},
	effectNRotateX: {
		type: 'string',
		default: '0deg',
	},
	effectNRotateY: {
		type: 'string',
		default: '0deg',
	},
	effectNRotateZ: {
		type: 'string',
		default: '0deg',
	},
	effectNSkewX: {
		type: 'string',
		default: '0deg',
	},
	effectNSkewY: {
		type: 'string',
		default: '0deg',
	},
	effectNOffsetX: {
		type: 'string',
		default: '0px',
	},
	effectNOffsetY: {
		type: 'string',
		default: '0px',
	},
	effectNScale: {
		type: 'number',
		default: 1,
	},
	textShadowColor: {
		type: 'string',
		default: '#000',
	},
	textShadowBlur: {
		type: 'string',
		default: '0px',
	},
	textShadowHorizontal: {
		type: 'string',
		default: '0px',
	},
	textShadowVertical: {
		type: 'string',
		default: '0px',
	},
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	attributes,
	icon,
} );
