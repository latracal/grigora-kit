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

	layout:{
		type: 'string',
		default: 'leftright',
	},

	textAlign:{
		type: 'string',
		default: 'ltr',
	},

	displayDate:{
		type: 'boolean',
		default: true,
	},

	displayAuthor:{
		type: 'boolean',
		default: true,
	},

	displayButton:{
		type: 'boolean',
		default: true,
	},

	titleTag:{
		type: 'string',
		default: 'h3',
	},
	
	contentTag:{
		type: 'string',
		default: 'p',
	},

	icon:{
		type: 'string',
		default: '',
	},

	iconSize:{
		type: 'number',
		default: 16,
	},

	iconBgSize:{
		type: 'number',
		default: 40,
	},

	iconBorderWidth:{
		type: 'number',
		default: 4,
	},

	connectorThickness:{
		type: 'number',
		default: 4,
	},

	layoutPadding: {
		type: 'object',
		default: {
			top: '20px',
			bottom: '20px',
			left: '20px',
			right: '20px',
		},
	},

	headingColor: {
		type: 'string',
		default: '#000',
	},

	contentColor: {
		type: 'string',
		default: '#000',
	},

	bgColor: {
		type: 'string',
		default: '#fff',
	},

	headingHoverColor: {
		type: 'string',
		default: '#fff',
	},

	contentHoverColor: {
		type: 'string',
		default: '#fff',
	},

	bgHoverColor: {
		type: 'string',
		default: '#3ea0e2',
	},

	gapItems:{
		type: 'number',
		default: 40,
	},

	gapItemMarker:{
		type: 'number',
		default: 10,
	},

	iconColor:{
		type: 'string',
		default: '#3ea0e2',
	},

	iconBgColor:{
		type: 'string',
		default: '#fff',
	},

	iconBorderColor:{
		type: 'string',
		default: '#fff',
	},

	connectorColor:{
		type: 'string',
		default: '#fff',
	},

	roadmapItems:{
		type: 'array',
		default: [
			{
				title: "Title of Section 1",
				date: "1st Jan 2021",
				icon: "x-circle",
				link: "#",
				linkText: "Read More",
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nunc nisl eget nisl. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nunc nisl eget nisl.",
				author: "- Someone famous"

			},
			{
				title: "Title of Section 2",
				date: "2nd Jan 2021",
				icon: "x-circle",
				link: "#",
				linkText: "Read More",
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nunc nisl eget nisl. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nunc nisl eget nisl.",
				author: "- Someone famous"
			}
		],
	},

	typoHSize: {
		type: 'string',
		default: 'default',
	},
	typoHWeight: {
		type: 'string',
		default: 'default',
	},
	typoHTransform: {
		type: 'string',
		default: 'none',
	},
	typoHStyle: {
		type: 'string',
		default: 'normal',
	},
	typoHDecoration: {
		type: 'string',
		default: 'initial',
	},
	typoHLineHeight: {
		type: 'string',
		default: 'normal',
	},
	typoHLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoHWordSpacing: {
		type: 'string',
		default: 'normal',
	},


	typoCSize: {
		type: 'string',
		default: 'default',
	},
	typoCWeight: {
		type: 'string',
		default: 'default',
	},
	typoCTransform: {
		type: 'string',
		default: 'none',
	},
	typoCStyle: {
		type: 'string',
		default: 'normal',
	},
	typoCDecoration: {
		type: 'string',
		default: 'initial',
	},
	typoCLineHeight: {
		type: 'string',
		default: 'normal',
	},
	typoCLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	typoCWordSpacing: {
		type: 'string',
		default: 'normal',
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
