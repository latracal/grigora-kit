import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';
import transforms from './transforms';

const attributes = {
	id: {
		type: 'string',
		default: '',
	},
	content: {
		type: 'string',
		default: '',
	},
	typoSize: {
		type: 'string',
		default: 'inherit',
	},
	typoSizeTablet: {
		type: 'string',
		default: '',
	},
	typoSizeMobile: {
		type: 'string',
		default: '',
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
	typoWordSpacing: {
		type: 'string',
		default: 'none',
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
	typoWeight: {
		type: 'string',
		default: 'default',
	},
	typoFontFamily: {
		type: 'string',
		default: '',
	},
	transitionColorTime: {
		type: 'number',
		default: 0.2,
	},
	textColor: {
		type: 'string',
		default: '',
	},
	textGradient: {
		type: 'string',
		default: '',
	},
	textHColor: {
		type: 'string',
		default: '',
	},
	textHGradient: {
		type: 'string',
		default: '',
	},
	entranceAnimation: {
		type: 'string',
		default: 'none',
	},
	entranceAnimationDelay: {
		type: 'number',
		default: 0,
	},
	entranceAnimationTime: {
		type: 'number',
		default: 1,
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
	layoutColumns: {
		type: 'string',
		default: 'default',
	},
	layoutColumnsGap: {
		type: 'string',
		default: 'normal',
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
	textShadowHColor: {
		type: 'string',
		default: '#000',
	},
	textShadowHBlur: {
		type: 'string',
		default: '',
	},
	textShadowHHorizontal: {
		type: 'string',
		default: '',
	},
	textShadowHVertical: {
		type: 'string',
		default: '',
	},
	align: {
		type: 'string',
		default: '',
	},
	alignTablet: {
		type: 'string',
		default: '',
	},
	alignMobile: {
		type: 'string',
		default: '',
	},
	structureTag: {
		type: 'string',
		default: 'p',
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
	transforms,
} );
