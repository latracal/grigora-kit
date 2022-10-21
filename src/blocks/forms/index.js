import { registerBlockType, registerBlockVariation } from "@wordpress/blocks";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import icon from "./icon";

const attributes = {
    id: {
        type: 'string',
        default: '',
    },
	titleAlign: {
        type: 'string',
        default: 'start',
    },
	descriptionAlign: {
        type: 'string',
        default: 'start',
    },
	titleText: {
        type: 'string',
        default: '',
    },
	TitleTag: {
        type: 'string',
        default: 'h3',
    },
	DescriptionTag: {
        type: 'string',
        default: 'h3',
    },
	titleTypoSize: {
		type: 'number',
		default: 16,
	},
	titleTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	titleTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	titleTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	titleTypoTransform: {
		type: 'string',
		default: 'none',
	},
	titleTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	titleTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	titleTypoWeight: {
		type: 'string',
		default: 'default',
	},
	titleTypoFontFamily: {
		type: 'string',
		default: '',
	},
    titleTextColor: {
		type: 'string',
		default: 'black',
	},
	titleTextHColor: {
		type: 'string',
		default: '',
	},
    transitionTitleColorTime: {
        type: 'number',
        default: 0.2
    },
    titleBgColor: {
		type: 'string',
		default: '',
	},
	titleBgHColor: {
		type: 'string',
		default: '',
	},
    transitionTitleBgColorTime: {
		type: 'number',
		default: 0.2
    },
    titlePadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',	
			right: '0px',
		},
	},
	descriptionToggle: {
		type: 'boolean',
		default: false
	},
	descriptionText: {
        type: 'string',
        default: '',
    },
	descriptionTypoSize: {
		type: 'number',
		default: 16,
	},
	descriptionTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	descriptionTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	descriptionTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	descriptionTypoTransform: {
		type: 'string',
		default: 'none',
	},
	descriptionTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	descriptionTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	descriptionTypoWeight: {
		type: 'string',
		default: 'default',
	},
	descriptionTypoFontFamily: {
		type: 'string',
		default: '',
	},
    descriptionTextColor: {
		type: 'string',
		default: 'black',
	},
	descriptionTextHColor: {
		type: 'string',
		default: '',
	},
    transitionDescriptionColorTime: {
        type: 'number',
        default: 0.2
    },
    descriptionBgColor: {
		type: 'string',
		default: '',
	},
	descriptionBgHColor: {
		type: 'string',
		default: '',
	},
    transitionDescriptionBgColorTime: {
		type: 'number',
		default: 0.2
    },
    descriptionPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',	
			right: '0px',
		},
	},
	gap: {
		type: 'number',
		default: 5
	},
    labelTypoSize: {
		type: 'number',
		default: 16,
	},
	labelTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	labelTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	labelTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	labelTypoTransform: {
		type: 'string',
		default: 'none',
	},
	labelTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	labelTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	labelTypoWeight: {
		type: 'string',
		default: 'default',
	},
	labelTypoFontFamily: {
		type: 'string',
		default: '',
	},
    labelTextColor: {
		type: 'string',
		default: 'black',
	},
	labelTextHColor: {
		type: 'string',
		default: '',
	},
    transitionLabelColorTime: {
        type: 'number',
        default: 0.2
    },
    labelBgColor: {
		type: 'string',
		default: '',
	},
	labelBgHColor: {
		type: 'string',
		default: '',
	},
    transitionLabelBgColorTime: {
        type: 'number',
        default: 0.2
    },
    labelPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	buttonTypoSize: {
		type: 'number',
		default: 20,
	},
	buttonTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	buttonTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	buttonTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	buttonTypoTransform: {
		type: 'string',
		default: 'none',
	},
	buttonTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	buttonTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	buttonTypoWeight: {
		type: 'string',
		default: 'default',
	},
	buttonTypoFontFamily: {
		type: 'string',
		default: '',
	},
    buttonTextColor: {
		type: 'string',
		default: 'white',
	},
	buttonTextHColor: {
		type: 'string',
		default: 'white',
	},
    transitionButtonColorTime: {
        type: 'number',
        default: 0.2
    },
    buttonBgColor: {
		type: 'string',
		default: '#1768ea',
	},
	buttonBgHColor: {
		type: 'string',
		default: '#1768ea',
	},
    transitionButtonBgColorTime: {
        type: 'number',
        default: 0.2
    },
    buttonPadding: {
		type: 'object',
		default: {
			top: '10px',
			bottom: '10px',
			left: '10px',
			right: '10px',
		},
	},
	buttonNBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'solid', width: '0px' },
			bottom: { color: '#72aee6', style: 'solid', width: '0px' },
			right: { color: '#72aee6', style: 'solid', width: '0px' },
			left: { color: '#72aee6', style: 'solid', width: '0px' },
		},
	},
	buttonNBorderRadius: {
		type: 'object',
		default: {
			topLeft: '5px',
			topRight: '5px',
			bottomLeft: '5px',
			bottomRight: '5px',
		},
	},
	buttonHBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'solid', width: 'undefined' },
			bottom: { color: '#72aee6', style: 'solid', width: 'undefined' },
			right: { color: '#72aee6', style: 'solid', width: 'undefined' },
			left: { color: '#72aee6', style: 'solid', width: 'undefined' },
		},
	},
	buttonHBorderRadius: {
		type: 'object',
		default: {
			topLeft: '',
			topRight: '',
			bottomLeft: '',
			bottomRight: '',
		},
	},
	buttonNShadowHO: {
		type: 'string',
		default: '1px',
	},
	buttonNShadowVO: {
		type: 'string',
		default: '7px',
	},
	buttonNShadowBlur: {
		type: 'string',
		default: '14px',
	},
	buttonNShadowSpread: {
		type: 'string',
		default: '-5px',
	},
	buttonNShadowColor: {
		type: 'string',
		default: '#00000033',
	},
	buttonHShadow: {
		type: 'boolean',
		default: false,
	},
	buttonHShadowHO: {
		type: 'string',
		default: '',
	},
	buttonHShadowVO: {
		type: 'string',
		default: '',
	},
	buttonHShadowBlur: {
		type: 'string',
		default: '',
	},
	buttonHShadowSpread: {
		type: 'string',
		default: '',
	},
	buttonHShadowColor: {
		type: 'string',
		default: '#000',
	},
	transitionButtonShadowTime: {
		type: 'number',
		default: 0.2
	},
	transitionButtonBorderTime: {
		type: 'number',
		default: 0.2
	},
	fieldTypoSize: {
		type: 'number',
		default: 20,
	},
	fieldTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	fieldTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	fieldTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	fieldTypoTransform: {
		type: 'string',
		default: 'none',
	},
	fieldTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	fieldTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	fieldTypoWeight: {
		type: 'string',
		default: 'default',
	},
	fieldTypoFontFamily: {
		type: 'string',
		default: '',
	},
    fieldTextColor: {
		type: 'string',
		default: 'black',
	},
	fieldTextHColor: {
		type: 'string',
		default: 'black',
	},
    transitionFieldColorTime: {
        type: 'number',
        default: 0.2
    },
    fieldBgColor: {
		type: 'string',
		default: 'white',
	},
	fieldBgHColor: {
		type: 'string',
		default: 'white',
	},
    transitionFieldBgColorTime: {
        type: 'number',
        default: 0.2
    },
    fieldPadding: {
		type: 'object',
		default: {
			top: '10px',
			bottom: '10px',
			left: '10px',
			right: '10px',
		},
	},
	fieldNBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'solid', width: '0px' },
			bottom: { color: '#72aee6', style: 'solid', width: '0px' },
			right: { color: '#72aee6', style: 'solid', width: '0px' },
			left: { color: '#72aee6', style: 'solid', width: '0px' },
		},
	},
	fieldNBorderRadius: {
		type: 'object',
		default: {
			topLeft: '5px',
			topRight: '5px',
			bottomLeft: '5px',
			bottomRight: '5px',
		},
	},
	fieldHBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'solid', width: 'undefined' },
			bottom: { color: '#72aee6', style: 'solid', width: 'undefined' },
			right: { color: '#72aee6', style: 'solid', width: 'undefined' },
			left: { color: '#72aee6', style: 'solid', width: 'undefined' },
		},
	},
	fieldHBorderRadius: {
		type: 'object',
		default: {
			topLeft: '',
			topRight: '',
			bottomLeft: '',
			bottomRight: '',
		},
	},
	fieldNShadowHO: {
		type: 'string',
		default: '1px',
	},
	fieldNShadowVO: {
		type: 'string',
		default: '7px',
	},
	fieldNShadowBlur: {
		type: 'string',
		default: '14px',
	},
	fieldNShadowSpread: {
		type: 'string',
		default: '-5px',
	},
	fieldNShadowColor: {
		type: 'string',
		default: '#00000033',
	},
	fieldHShadow: {
		type: 'boolean',
		default: false,
	},
	fieldHShadowHO: {
		type: 'string',
		default: '',
	},
	fieldHShadowVO: {
		type: 'string',
		default: '',
	},
	fieldHShadowBlur: {
		type: 'string',
		default: '',
	},
	fieldHShadowSpread: {
		type: 'string',
		default: '',
	},
	fieldHShadowColor: {
		type: 'string',
		default: '#000',
	},
	transitionFieldShadowTime: {
		type: 'number',
		default: 0.2
	},
	transitionFieldBorderTime: {
		type: 'number',
		default: 0.2
	},
	checkboxTypoSize: {
		type: 'number',
		default: 20,
	},
	checkboxTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	checkboxTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	checkboxTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	checkboxTypoTransform: {
		type: 'string',
		default: 'none',
	},
	checkboxTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	checkboxTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	checkboxTypoWeight: {
		type: 'string',
		default: 'default',
	},
	checkboxTypoFontFamily: {
		type: 'string',
		default: '',
	},
    	checkboxTextColor: {
		type: 'string',
		default: 'black',
	},
	checkboxTextHColor: {
		type: 'string',
		default: 'black',
	},
    	checkboxBgColor: {
		type: 'string',
		default: 'white',
	},
	checkboxBgHColor: {
		type: 'string',
		default: 'white',
	},
    	checkboxPadding: {
		type: 'object',
		default: {
			top: '0px',
			bottom: '0px',
			left: '0px',
			right: '0px',
		},
	},
	checkboxNBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'solid', width: '0px' },
			bottom: { color: '#72aee6', style: 'solid', width: '0px' },
			right: { color: '#72aee6', style: 'solid', width: '0px' },
			left: { color: '#72aee6', style: 'solid', width: '0px' },
		},
	},
	checkboxNBorderRadius: {
		type: 'object',
		default: {
			topLeft: '5px',
			topRight: '5px',
			bottomLeft: '5px',
			bottomRight: '5px',
		},
	},
	checkboxHBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'solid', width: 'undefined' },
			bottom: { color: '#72aee6', style: 'solid', width: 'undefined' },
			right: { color: '#72aee6', style: 'solid', width: 'undefined' },
			left: { color: '#72aee6', style: 'solid', width: 'undefined' },
		},
	},
	checkboxHBorderRadius: {
		type: 'object',
		default: {
			topLeft: '',
			topRight: '',
			bottomLeft: '',
			bottomRight: '',
		},
	},
	checkboxNShadowHO: {
		type: 'string',
		default: '1px',
	},
	checkboxNShadowVO: {
		type: 'string',
		default: '7px',
	},
	checkboxNShadowBlur: {
		type: 'string',
		default: '14px',
	},
	checkboxNShadowSpread: {
		type: 'string',
		default: '-5px',
	},
	checkboxNShadowColor: {
		type: 'string',
		default: '#00000033',
	},
	checkboxHShadow: {
		type: 'boolean',
		default: false,
	},
	checkboxHShadowHO: {
		type: 'string',
		default: '',
	},
	checkboxHShadowVO: {
		type: 'string',
		default: '',
	},
	checkboxHShadowBlur: {
		type: 'string',
		default: '',
	},
	checkboxHShadowSpread: {
		type: 'string',
		default: '',
	},
	checkboxHShadowColor: {
		type: 'string',
		default: '#000',
	},
	transitionCheckboxColorTime: {
        	type: 'number',
        	default: 0.2
    	},
	transitionCheckboxBgColorTime: {
        	type: 'number',
        	default: 0.2
    	},
	transitionCheckboxShadowTime: {
		type: 'number',
		default: 0.2
	},
	transitionCheckboxBorderTime: {
		type: 'number',
		default: 0.2
	},
	selectTypoSize: {
		type: 'number',
		default: 20,
	},
	selectTypoLineHeight: {
		type: 'string',
		default: 'normal',
	},
	selectTypoLetterSpacing: {
		type: 'string',
		default: 'normal',
	},
	selectTypoWordSpacing: {
		type: 'string',
		default: 'normal',
	},
	selectTypoTransform: {
		type: 'string',
		default: 'none',
	},
	selectTypoStyle: {
		type: 'string',
		default: 'normal',
	},
	selectTypoDecoration: {
		type: 'string',
		default: 'initial',
	},
	selectTypoWeight: {
		type: 'string',
		default: 'default',
	},
	selectTypoFontFamily: {
		type: 'string',
		default: '',
	},
    	selectTextColor: {
		type: 'string',
		default: 'black',
	},
	selectTextHColor: {
		type: 'string',
		default: 'black',
	},
    	selectBgColor: {
		type: 'string',
		default: 'white',
	},
	selectBgHColor: {
		type: 'string',
		default: 'white',
	},
    	selectPadding: {
		type: 'object',
		default: {
			top: '10px',
			bottom: '10px',
			left: '10px',
			right: '10px',
		},
	},
	selectNBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'solid', width: '0px' },
			bottom: { color: '#72aee6', style: 'solid', width: '0px' },
			right: { color: '#72aee6', style: 'solid', width: '0px' },
			left: { color: '#72aee6', style: 'solid', width: '0px' },
		},
	},
	selectNBorderRadius: {
		type: 'object',
		default: {
			topLeft: '5px',
			topRight: '5px',
			bottomLeft: '5px',
			bottomRight: '5px',
		},
	},
	selectHBorder: {
		type: 'object',
		default: {
			top: { color: '#72aee6', style: 'solid', width: 'undefined' },
			bottom: { color: '#72aee6', style: 'solid', width: 'undefined' },
			right: { color: '#72aee6', style: 'solid', width: 'undefined' },
			left: { color: '#72aee6', style: 'solid', width: 'undefined' },
		},
	},
	selectHBorderRadius: {
		type: 'object',
		default: {
			topLeft: '',
			topRight: '',
			bottomLeft: '',
			bottomRight: '',
		},
	},
	selectNShadowHO: {
		type: 'string',
		default: '1px',
	},
	selectNShadowVO: {
		type: 'string',
		default: '7px',
	},
	selectNShadowBlur: {
		type: 'string',
		default: '14px',
	},
	selectNShadowSpread: {
		type: 'string',
		default: '-5px',
	},
	selectNShadowColor: {
		type: 'string',
		default: '#00000033',
	},
	selectHShadow: {
		type: 'boolean',
		default: false,
	},
	selectHShadowHO: {
		type: 'string',
		default: '',
	},
	selectHShadowVO: {
		type: 'string',
		default: '',
	},
	selectHShadowBlur: {
		type: 'string',
		default: '',
	},
	selectHShadowSpread: {
		type: 'string',
		default: '',
	},
	selectHShadowColor: {
		type: 'string',
		default: '#000',
	},
	transitionSelectColorTime: {
        	type: 'number',
        	default: 0.2
    	},
	transitionSelectBgColorTime: {
        	type: 'number',
        	default: 0.2
    	},
	transitionSelectShadowTime: {
		type: 'number',
		default: 0.2
	},
	transitionSelectBorderTime: {
		type: 'number',
		default: 0.2
	},
};

const supports = {
    anchor: true,
    className: false,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
    /**
     * @see ./edit.js
     */
    edit: Edit,
    /**
     * @see ./save.js
     */
    save,

    attributes,

    supports,

    icon,
});
