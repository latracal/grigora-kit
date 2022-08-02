import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from "./icon";

const attributes = {
	id: {
		type: "string",
		default: ""
	},
	content: {
		type: "string",
		default: ""
	},
	typoSize:{
		type: "number",
		default: "16px"
	},
	typoLineHeight:{
		type: "string",
		default: "normal"
	},
	typoLetterSpacing:{
		type: "string",
		default: "normal"
	},
	typoWordSpacing:{
		type: "string",
		default: "normal"
	},
	typoWordSpacing:{
		type: "string",
		default: "none"
	},
	typoTransform:{
		type: "string",
		default: "none",
	},
	typoStyle:{
		type: "string",
		default: "normal"
	},
	typoDecoration:{
		type: "string",
		default: "initial"
	},
	typoWeight:{
		type: "string",
		default: "500"
	},
	typoFontFamily:{
		type: "string",
		default: ""
	},
	transitionColorTime: {
		type: "number",
		default: 0.2
	},
	transitionTime: {
		type: "number",
		default: 1
	},
	textColor:{
		type: "string",
		default: ""
	},
	textGradient:{
		type: "string",
		default: ""
	},
	backgroundColor:{
		type: "string",
		default: ""
	},
	backgroundGradient:{
		type: "string",
		default: ""
	},
	textHColor:{
		type: "string",
		default: ""
	},
	textHGradient:{
		type: "string",
		default: ""
	},
	backgroundHColor:{
		type: "string",
		default: ""
	},
	backgroundHGradient:{
		type: "string",
		default: ""
	},
	entranceAnimation:{
		type: "string",
		default: "none"
	},
	layoutPadding:{
		type: "object",
		default:{
			top: "0px",
			bottom: "0px",
			left: "0px",
			right: "0px",
		}
	},
	layoutMargin:{
		type: "object",
		default:{
			top: "0px",
			bottom: "0px",
			left: "0px",
			right: "0px",
		}
	},
	layoutColumns:{
		type: "string",
		default: "default"
	},
	layoutColumnsGap:{
		type: "string",
		default: "normal"
	},
	textShadowColor: {
		type: "string",
		default: "#000"
	},
	textShadowBlur: {
		type: "string",
		default: "0px"
	},
	textShadowHorizontal: {
		type: "string",
		default: "0px"
	},
	textShadowVertical: {
		type: "string",
		default: "0px"
	},
	textShadowHColor: {
		type: "string",
		default: "#000"
	},
	textShadowHBlur: {
		type: "string",
		default: "0px"
	},
	textShadowHHorizontal: {
		type: "string",
		default: "0px"
	},
	textShadowHVertical: {
		type: "string",
		default: "0px"
	},
	align: {
		type: "string"
	},
	structureTag: {
		type: 'string',
		default: 'p',
	},
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	attributes,
	icon
});
