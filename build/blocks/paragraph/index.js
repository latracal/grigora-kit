/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/paragraph/edit.js":
/*!**************************************!*\
  !*** ./src/blocks/paragraph/edit.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/paragraph/editor.scss");



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

function ParagraphRTLControl(_ref) {
  let {
    direction,
    setDirection
  } = _ref;
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.isRTL)() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToolbarDropdownMenu, {
    controls: [{
      icon: formatLtr,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__._x)('Left to right', 'editor button'),
      isActive: direction === 'ltr',

      onClick() {
        setDirection(direction === 'ltr' ? undefined : 'ltr');
      }

    }]
  });
}

function Edit(props) {
  const {
    attributes,
    setAttributes,
    clientId
  } = props;
  const [hovered, setHovered] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    id,
    content,
    align,
    direction,
    textShadow,
    textShadowColor,
    textShadowBlur,
    textShadowHorizontal,
    textShadowVertical,
    layoutVerticalAlign,
    layoutPosition,
    effectNRotateX,
    effectNRotateY,
    effectNRotateZ,
    effectNOffsetX,
    effectNOffsetY,
    effectNScale,
    effectNBorderType,
    effectNBorderWidth,
    effectNBorderColor,
    effectNBorderRadiusTL,
    effectNBorderRadiusTR,
    effectNBorderRadiusBL,
    effectNBorderRadiusBR,
    hoverEffect,
    transitionTime,
    effectHRotateX,
    effectHRotateY,
    effectHRotateZ,
    effectHOffsetX,
    effectHOffsetY,
    effectHScale,
    effectHBorderType,
    effectHBorderWidth,
    effectHBorderColor,
    effectHBorderRadiusTL,
    effectHBorderRadiusTR,
    effectHBorderRadiusBL,
    effectHBorderRadiusBR
  } = attributes;

  if (clientId && !id) {
    setAttributes({
      "id": clientId
    });
  }

  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)({
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
      [`has-text-align-${align}`]: align
    }),
    style: {
      "transition": hoverEffect ? `${transitionTime}s` : `0s`,
      "direction": direction,
      "text-shadow": textShadow ? `${textShadowHorizontal}px ${textShadowVertical}px ${textShadowBlur}px ${textShadowColor}` : "none",
      "align-self": layoutVerticalAlign,
      "position": layoutPosition,
      "transform": hoverEffect && hovered ? `rotateX(${effectHRotateX}deg) rotateY(${effectHRotateY}deg) rotateZ(${effectHRotateZ}deg) translateX(${effectHOffsetX}px) translateY(${effectHOffsetY}px) scale(${effectHScale})` : `rotateX(${effectNRotateX}deg) rotateY(${effectNRotateY}deg) rotateZ(${effectNRotateZ}deg) translateX(${effectNOffsetX}px) translateY(${effectNOffsetY}px) scale(${effectNScale})`,
      "border-width": hoverEffect && hovered ? `${effectHBorderWidth}px` : `${effectNBorderWidth}px`,
      "border-style": hoverEffect && hovered ? `${effectHBorderType}` : `${effectNBorderType}`,
      "border-color": hoverEffect && hovered ? `${effectHBorderColor}` : `${effectNBorderColor}`,
      "borderTopLeftRadius": hoverEffect && hovered ? `${effectHBorderRadiusTL}%` : `${effectNBorderRadiusTL}%`,
      "borderTopRightRadius": hoverEffect && hovered ? `${effectHBorderRadiusTR}%` : `${effectNBorderRadiusTR}%`,
      "borderBottomLeftRadius": hoverEffect && hovered ? `${effectHBorderRadiusBL}%` : `${effectNBorderRadiusBL}%`,
      "borderBottomRightRadius": hoverEffect && hovered ? `${effectHBorderRadiusBR}%` : `${effectNBorderRadiusBR}%`
    }
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.BlockControls, {
    group: "block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.AlignmentControl, {
    value: align,
    onChange: newAlign => setAttributes({
      align: newAlign
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ParagraphRTLControl, {
    direction: direction,
    setDirection: newDirection => setAttributes({
      direction: newDirection
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Text Shadow', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Text Shadow', "grigora-kit"),
    checked: !!textShadow,
    onChange: () => setAttributes({
      textShadow: !textShadow
    })
  }), textShadow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ColorPalette, {
    clearable: false,
    value: textShadowColor,
    onChange: textShadowColor => setAttributes({
      textShadowColor
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 33,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Blur', "grigora-kit"),
    max: 100,
    min: 0,
    onChange: textShadowBlur => setAttributes({
      textShadowBlur
    }),
    value: textShadowBlur
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Horizontal', "grigora-kit"),
    max: 100,
    min: -100,
    onChange: textShadowHorizontal => setAttributes({
      textShadowHorizontal
    }),
    value: textShadowHorizontal
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Vertical', "grigora-kit"),
    max: 100,
    min: -100,
    onChange: textShadowVertical => setAttributes({
      textShadowVertical
    }),
    value: textShadowVertical
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Layout', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Vertical Align: ", "grigora-kit"),
    labelPosition: "side",
    onChange: layoutVerticalAlign => setAttributes({
      layoutVerticalAlign
    }),
    value: layoutVerticalAlign,
    options: [{
      label: 'Start',
      value: 'flex-start'
    }, {
      label: 'Center',
      value: 'center'
    }, {
      label: 'End',
      value: 'flex-end'
    }]
  }), layoutPosition != "initial" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Notice, {
    status: "warning",
    isDismissible: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Position other than default is not recommended. Don't change this unless, you're sure of what you're doing.", "grigora-kit"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("br", null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Position: ", "grigora-kit"),
    labelPosition: "side",
    onChange: layoutPosition => setAttributes({
      layoutPosition
    }),
    value: layoutPosition,
    options: [{
      label: 'Default',
      value: 'initial'
    }, {
      label: 'Absolute',
      value: 'absolute'
    }, {
      label: 'Fixed',
      value: 'fixed'
    }, {
      label: 'Sticky',
      value: 'sticky'
    }]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Effects & Border: Normal', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Rotate X (degrees)', "grigora-kit"),
    max: 180,
    min: -180,
    onChange: effectNRotateX => setAttributes({
      effectNRotateX
    }),
    value: effectNRotateX
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Rotate Y (degrees)', "grigora-kit"),
    max: 180,
    min: -180,
    onChange: effectNRotateY => setAttributes({
      effectNRotateY
    }),
    value: effectNRotateY
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Rotate Z (degrees)', "grigora-kit"),
    max: 180,
    min: -180,
    onChange: effectNRotateZ => setAttributes({
      effectNRotateZ
    }),
    value: effectNRotateZ
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offset X (px)', "grigora-kit"),
    max: 500,
    min: -500,
    onChange: effectNOffsetX => setAttributes({
      effectNOffsetX
    }),
    value: effectNOffsetX
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offset Y (px)', "grigora-kit"),
    max: 500,
    min: -500,
    onChange: effectNOffsetY => setAttributes({
      effectNOffsetY
    }),
    value: effectNOffsetY
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Scale', "grigora-kit"),
    max: 1.5,
    min: 0,
    step: 0.1,
    onChange: effectNScale => setAttributes({
      effectNScale
    }),
    value: effectNScale
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Border Type: ", "grigora-kit"),
    labelPosition: "side",
    onChange: effectNBorderType => setAttributes({
      effectNBorderType
    }),
    value: effectNBorderType,
    options: [{
      label: 'None',
      value: 'none'
    }, {
      label: 'Solid',
      value: 'solid'
    }, {
      label: 'Dotted',
      value: 'dotted'
    }, {
      label: 'Dashed',
      value: 'dashed'
    }]
  }), effectNBorderType != "none" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Width (px)', "grigora-kit"),
    max: 10,
    min: 0,
    onChange: effectNBorderWidth => setAttributes({
      effectNBorderWidth
    }),
    value: effectNBorderWidth
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ColorPalette, {
    clearable: false,
    value: effectNBorderColor,
    onChange: effectNBorderColor => setAttributes({
      effectNBorderColor
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius TL (%)', "grigora-kit"),
    max: 100,
    min: 0,
    onChange: effectNBorderRadiusTL => setAttributes({
      effectNBorderRadiusTL
    }),
    value: effectNBorderRadiusTL
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius TR (%)', "grigora-kit"),
    max: 100,
    min: 0,
    onChange: effectNBorderRadiusTR => setAttributes({
      effectNBorderRadiusTR
    }),
    value: effectNBorderRadiusTR
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius BL (%)', "grigora-kit"),
    max: 100,
    min: 0,
    onChange: effectNBorderRadiusBL => setAttributes({
      effectNBorderRadiusBL
    }),
    value: effectNBorderRadiusBL
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius BR (%)', "grigora-kit"),
    max: 100,
    min: 0,
    onChange: effectNBorderRadiusBR => setAttributes({
      effectNBorderRadiusBR
    }),
    value: effectNBorderRadiusBR
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Effects & Border: Hover', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover Effects', "grigora-kit"),
    checked: !!hoverEffect,
    onChange: () => setAttributes({
      hoverEffect: !hoverEffect
    })
  }), hoverEffect && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Transition Time (sec)', "grigora-kit"),
    max: 5,
    min: 0.1,
    step: 0.1,
    onChange: transitionTime => setAttributes({
      transitionTime
    }),
    value: transitionTime
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Rotate X (degrees)', "grigora-kit"),
    max: 180,
    min: -180,
    onChange: effectHRotateX => setAttributes({
      effectHRotateX
    }),
    value: effectHRotateX
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Rotate Y (degrees)', "grigora-kit"),
    max: 180,
    min: -180,
    onChange: effectHRotateY => setAttributes({
      effectHRotateY
    }),
    value: effectHRotateY
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Rotate Z (degrees)', "grigora-kit"),
    max: 180,
    min: -180,
    onChange: effectHRotateZ => setAttributes({
      effectHRotateZ
    }),
    value: effectHRotateZ
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offset X (px)', "grigora-kit"),
    max: 500,
    min: -500,
    onChange: effectHOffsetX => setAttributes({
      effectHOffsetX
    }),
    value: effectHOffsetX
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Offset Y (px)', "grigora-kit"),
    max: 500,
    min: -500,
    onChange: effectHOffsetY => setAttributes({
      effectHOffsetY
    }),
    value: effectHOffsetY
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Scale', "grigora-kit"),
    max: 1.5,
    min: 0,
    step: 0.1,
    onChange: effectHScale => setAttributes({
      effectHScale
    }),
    value: effectHScale
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Border Type: ", "grigora-kit"),
    labelPosition: "side",
    onChange: effectHBorderType => setAttributes({
      effectHBorderType
    }),
    value: effectHBorderType,
    options: [{
      label: 'None',
      value: 'none'
    }, {
      label: 'Solid',
      value: 'solid'
    }, {
      label: 'Dotted',
      value: 'dotted'
    }, {
      label: 'Dashed',
      value: 'dashed'
    }]
  }), effectHBorderType != "none" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Width (px)', "grigora-kit"),
    max: 10,
    min: 0,
    onChange: effectHBorderWidth => setAttributes({
      effectHBorderWidth
    }),
    value: effectHBorderWidth
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ColorPalette, {
    clearable: false,
    value: effectHBorderColor,
    onChange: effectHBorderColor => setAttributes({
      effectHBorderColor
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius TL (%)', "grigora-kit"),
    max: 100,
    min: 0,
    onChange: effectHBorderRadiusTL => setAttributes({
      effectHBorderRadiusTL
    }),
    value: effectHBorderRadiusTL
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius TR (%)', "grigora-kit"),
    max: 100,
    min: 0,
    onChange: effectHBorderRadiusTR => setAttributes({
      effectHBorderRadiusTR
    }),
    value: effectHBorderRadiusTR
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius BL (%)', "grigora-kit"),
    max: 100,
    min: 0,
    onChange: effectHBorderRadiusBL => setAttributes({
      effectHBorderRadiusBL
    }),
    value: effectHBorderRadiusBL
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
    initialPosition: 0,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius BR (%)', "grigora-kit"),
    max: 100,
    min: 0,
    onChange: effectHBorderRadiusBR => setAttributes({
      effectHBorderRadiusBR
    }),
    value: effectHBorderRadiusBR
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
    onMouseEnter: () => {
      setHovered(true);
    },
    onMouseLeave: () => {
      setHovered(false);
    },
    tagName: "p",
    identifier: "content",
    value: content,
    onChange: content => {
      setAttributes({
        content
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Write Something...', "grigora-kit")
  })));
}

/***/ }),

/***/ "./src/blocks/paragraph/index.js":
/*!***************************************!*\
  !*** ./src/blocks/paragraph/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/paragraph/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/paragraph/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/paragraph/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/paragraph/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




const attributes = {
  "id": {
    "type": "string",
    "default": ""
  },
  "align": {
    "type": "string"
  },
  "content": {
    "type": "string",
    "default": ""
  },
  "direction": {
    "type": "string",
    "enum": ["ltr", "rtl"]
  },
  "textShadow": {
    "type": "boolean",
    "default": false
  },
  "textShadowColor": {
    "type": "string",
    "default": "#000"
  },
  "textShadowBlur": {
    "type": "integer",
    "default": 33
  },
  "textShadowHorizontal": {
    "type": "integer",
    "default": 0
  },
  "textShadowVertical": {
    "type": "integer",
    "default": 0
  },
  "layoutVerticalAlign": {
    "type": "string",
    "default": "flex-start"
  },
  "layoutPosition": {
    "type": "string",
    "default": "initial"
  },
  "effectNRotateX": {
    "type": "integer",
    "default": 0
  },
  "effectNRotateY": {
    "type": "integer",
    "default": 0
  },
  "effectNRotateZ": {
    "type": "integer",
    "default": 0
  },
  "effectNOffsetX": {
    "type": "integer",
    "default": 0
  },
  "effectNOffsetY": {
    "type": "integer",
    "default": 0
  },
  "effectNScale": {
    "type": "number",
    "default": 1
  },
  "effectNBorderType": {
    "type": "string",
    "default": "none"
  },
  "effectNBorderWidth": {
    "type": "integer",
    "default": 0
  },
  "effectNBorderColor": {
    "type": "string",
    "default": "#000"
  },
  "effectNBorderRadiusTL": {
    "type": "integer",
    "default": 0
  },
  "effectNBorderRadiusTR": {
    "type": "integer",
    "default": 0
  },
  "effectNBorderRadiusBL": {
    "type": "integer",
    "default": 0
  },
  "effectNBorderRadiusBR": {
    "type": "integer",
    "default": 0
  },
  "hoverEffect": {
    "type": "boolean",
    "default": false
  },
  "transitionTime": {
    "type": "number",
    "default": 1
  },
  "effectHRotateX": {
    "type": "integer",
    "default": 0
  },
  "effectHRotateY": {
    "type": "integer",
    "default": 0
  },
  "effectHRotateZ": {
    "type": "integer",
    "default": 0
  },
  "effectHOffsetX": {
    "type": "integer",
    "default": 0
  },
  "effectHOffsetY": {
    "type": "integer",
    "default": 0
  },
  "effectHScale": {
    "type": "number",
    "default": 1
  },
  "effectHBorderType": {
    "type": "string",
    "default": "none"
  },
  "effectHBorderWidth": {
    "type": "integer",
    "default": 0
  },
  "effectHBorderColor": {
    "type": "string",
    "default": "#000"
  },
  "effectHBorderRadiusTL": {
    "type": "integer",
    "default": 0
  },
  "effectHBorderRadiusTR": {
    "type": "integer",
    "default": 0
  },
  "effectHBorderRadiusBL": {
    "type": "integer",
    "default": 0
  },
  "effectHBorderRadiusBR": {
    "type": "integer",
    "default": 0
  }
};
const supports = {
  "anchor": true,
  "className": false,
  "color": {
    "link": true
  },
  "typography": {
    "fontSize": true,
    "lineHeight": true
  },
  "spacing": {
    "margin": true,
    "padding": true
  }
};
/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],

  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"],
  attributes,
  supports
});

/***/ }),

/***/ "./src/blocks/paragraph/save.js":
/*!**************************************!*\
  !*** ./src/blocks/paragraph/save.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

function save(_ref) {
  let {
    attributes,
    className,
    clientId
  } = _ref;
  const {
    id,
    content,
    align,
    direction,
    textShadow,
    textShadowColor,
    textShadowBlur,
    textShadowHorizontal,
    textShadowVertical,
    layoutVerticalAlign,
    layoutPosition,
    effectNRotateX,
    effectNRotateY,
    effectNRotateZ,
    effectNOffsetX,
    effectNOffsetY,
    effectNScale,
    effectNBorderType,
    effectNBorderWidth,
    effectNBorderColor,
    effectNBorderRadiusTL,
    effectNBorderRadiusTR,
    effectNBorderRadiusBL,
    effectNBorderRadiusBR,
    hoverEffect,
    transitionTime,
    effectHRotateX,
    effectHRotateY,
    effectHRotateZ,
    effectHOffsetX,
    effectHOffsetY,
    effectHScale,
    effectHBorderType,
    effectHBorderWidth,
    effectHBorderColor,
    effectHBorderRadiusTL,
    effectHBorderRadiusTR,
    effectHBorderRadiusBL,
    effectHBorderRadiusBR
  } = attributes;
  const wrapperClasses = classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, {
    [`has-text-align-${align}`]: align,
    "wp-block-grigora-kit-paragraph": true,
    "hover-effects": hoverEffect,
    [`block-id-${id}`]: id
  });
  const aParaStyle = {
    "transition": hoverEffect ? `${transitionTime}s` : `0s`,
    "direction": direction,
    "text-shadow": textShadow ? `${textShadowHorizontal}px ${textShadowVertical}px ${textShadowBlur}px ${textShadowColor}` : "none",
    "align-self": layoutVerticalAlign,
    "position": layoutPosition,
    "transform": `rotateX(${effectNRotateX}deg) rotateY(${effectNRotateY}deg) rotateZ(${effectNRotateZ}deg) translateX(${effectNOffsetX}px) translateY(${effectNOffsetY}px) scale(${effectNScale})`,
    "border-width": `${effectNBorderWidth}px`,
    "border-style": `${effectNBorderType}`,
    "border-color": `${effectNBorderColor}`,
    "borderTopLeftRadius": `${effectNBorderRadiusTL}%`,
    "borderTopRightRadius": `${effectNBorderRadiusTR}%`,
    "borderBottomLeftRadius": `${effectNBorderRadiusBL}%`,
    "borderBottomRightRadius": `${effectNBorderRadiusBR}%`
  };
  const hoverDA = JSON.stringify({
    id,
    effectHRotateX,
    effectHRotateY,
    effectHRotateZ,
    effectHOffsetX,
    effectHOffsetY,
    effectHScale,
    effectHBorderType,
    effectHBorderWidth,
    effectHBorderColor,
    effectHBorderRadiusTL,
    effectHBorderRadiusTR,
    effectHBorderRadiusBL,
    effectHBorderRadiusBR
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    tagName: "p",
    className: wrapperClasses,
    value: content,
    style: aParaStyle,
    "data-settings": hoverDA
  });
}

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/blocks/paragraph/editor.scss":
/*!******************************************!*\
  !*** ./src/blocks/paragraph/editor.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/paragraph/style.scss":
/*!*****************************************!*\
  !*** ./src/blocks/paragraph/style.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./src/blocks/paragraph/block.json":
/*!*****************************************!*\
  !*** ./src/blocks/paragraph/block.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"grigora-kit/paragraph","version":"0.1.0","title":"Advanced Paragraph","category":"widgets","icon":"text","description":"Paragraph Block.","textdomain":"grigora-kit","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/paragraph/index": 0,
/******/ 			"blocks/paragraph/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkgrigora_kit"] = globalThis["webpackChunkgrigora_kit"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/paragraph/style-index"], () => (__webpack_require__("./src/blocks/paragraph/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map