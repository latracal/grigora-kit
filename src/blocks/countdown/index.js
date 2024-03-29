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
	alignTablet: {
		type: 'string',
		default: '',
	},
	alignMobile: {
		type: 'string',
		default: '',
	},
	countdownDate: {
		type: 'string',
		default: '',
	},
	countdownOnComplete: {
		type: 'string',
		default: 'nothing',
	},
	onCompleteURL: {
		type: 'string',
		default: '',
	},
	divider: {
		type: 'boolean',
		default: false,
	},
	dividerCharacter: {
		type: 'string',
		default: '',
	},
	format: {
		type: 'number',
		default: 1,
	},
	orientation: {
		type: 'string',
		default: 'block',
	},
	hideDays: {
		type: 'boolean',
		default: false,
	},
	hideHours: {
		type: 'boolean',
		default: false,
	},
	hideMinutes: {
		type: 'boolean',
		default: false,
	},
	dayLabel: {
		type: 'string',
		default: 'DAYS',
	},
	hourLabel: {
		type: 'string',
		default: 'HRS',
	},
	minuteLabel: {
		type: 'string',
		default: 'MINS',
	},
	secondLabel: {
		type: 'string',
		default: 'SECS',
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
		type: 'string',
		default: 'default',
	},
	typoSizeTablet: {
		type: 'string',
		default: '',
	},
	typoSizeMobile: {
		type: 'string',
		default: '',
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
	typoLSize: {
		type: 'string',
		default: 'default',
	},
	typoLWeight: {
		type: 'string',
		default: 'default',
	},
	typoLTransform: {
		type: 'string',
		default: 'none',
	},
	typoLStyle: {
		type: 'string',
		default: 'normal',
	},
	typoLDecoration: {
		type: 'string',
		default: 'initial',
	},
	typoLLineHeight: {
		type: 'string',
		default: 'normal',
	},
	typoLLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoLWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	effectNColorNumber: {
		type: 'string',
		default: '#444444',
	},
	effectNColorLabel: {
		type: 'string',
		default: '#444444',
	},
	effectNPerspective: {
		type: 'string',
		default: '',
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
	textShadowColorNumber: {
		type: 'string',
		default: '#000',
	},
	textShadowColorLabel: {
		type: 'string',
		default: '#000',
	},
	textShadowBlurNumber: {
		type: 'string',
		default: '0px',
	},
	textShadowBlurLabel: {
		type: 'string',
		default: '0px',
	},
	textShadowHorizontalNumber: {
		type: 'string',
		default: '0px',
	},
	textShadowHorizontalLabel: {
		type: 'string',
		default: '0px',
	},
	textShadowVerticalNumber: {
		type: 'string',
		default: '0px',
	},
	textShadowVerticalLabel: {
		type: 'string',
		default: '0px',
	},
	layoutPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	layoutPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	layoutPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	layoutMargin: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	layoutMarginTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	layoutMarginMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
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
