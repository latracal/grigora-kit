import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';

import { __ } from '@wordpress/i18n';



const attributes = {

	// Image attributes
	
	id: {
		type: 'string',
		default: '',
	},

	imageHeight: {
		type: 'number',
		default: 200,
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
		default: false,
	},

	displayButton:{
		type: 'boolean',
		default: false,
	},

	displayImage:{
		type: 'boolean',
		default: false,
	},

	titleTag:{
		type: 'string',
		default: 'h3',
	},
	
	contentTag:{
		type: 'string',
		default: 'p',
	},

	iconPick:{
		type: 'string',
		default: 'x-circle',
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

	imagePadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
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
		default: '#000',
	},

	contentHoverColor: {
		type: 'string',
		default: '#000',
	},

	bgHoverColor: {
		type: 'string',
		default: '#fff',
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
		default: '#f2f2f2',
	},

	iconBorderColor:{
		type: 'string',
		default: '#fff',
	},

	connectorColor:{
		type: 'string',
		default: 'linear-gradient(89.9deg, rgb(102, 64, 123) 0%, rgb(252, 41, 119) 100%, rgb(251, 168, 214) 100.1%)',
	},

	roadmapItems:{
		type: 'array',
		default: [
			{
				title: "Title 1",
				date: "1st Jan 2021",
				icon: "apple",
				link: "",
				linkText: "Read More",
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nunc nisl eget nisl. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nunc nisl eget nisl.",
				author: "- Someone famous",
				url: ""
			},
			{
				title: "Title 2",
				date: "2nd Jan 2021",
				icon: "apple",
				link: "",
				linkText: "Read More",
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nunc nisl eget nisl. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nunc nisl eget nisl.",
				author: "- Someone famous",
				url: ""
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

	effectBorder: {
		type: 'object',
		default: {
			top: { color: '#000', style: 'solid', width: '1px' },
			bottom: { color: '#000', style: 'solid', width: '1px' },
			right: { color: '#000', style: 'solid', width: '1px' },
			left: { color: '#000', style: 'solid', width: '1px' },
		},
	},
	effectBorderRadius: {
		type: 'object',
		default: {
			topLeft: '4px',
			topRight: '4px',
			bottomLeft: '4px',
			bottomRight: '4px',
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
