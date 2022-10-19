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
