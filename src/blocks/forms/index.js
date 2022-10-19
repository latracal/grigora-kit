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
	}
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
