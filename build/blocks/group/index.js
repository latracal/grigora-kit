/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/group/edit.js":
/*!**********************************!*\
  !*** ./src/blocks/group/edit.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/group/editor.scss");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @constants */ "./src/constants/index.js");
/* harmony import */ var _helpers_generateId__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @helpers/generateId */ "./src/helpers/generateId.js");
/* harmony import */ var _helpers_objEmpty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @helpers/objEmpty */ "./src/helpers/objEmpty.js");
/* harmony import */ var _components_range_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @components/range-input */ "./src/components/range-input/index.js");
/* harmony import */ var _components_select_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @components/select-input */ "./src/components/select-input/index.js");
/* harmony import */ var _components_color_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @components/color-input */ "./src/components/color-input/index.js");
/* harmony import */ var _components_gradient_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @components/gradient-input */ "./src/components/gradient-input/index.js");
/* harmony import */ var _components_text_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @components/text-input */ "./src/components/text-input/index.js");
/* harmony import */ var _components_toggle_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @components/toggle-input */ "./src/components/toggle-input/index.js");
/* harmony import */ var _components_borderbox_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @components/borderbox-input */ "./src/components/borderbox-input/index.js");
/* harmony import */ var _components_borderradius_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @components/borderradius-input */ "./src/components/borderradius-input/index.js");
/* harmony import */ var _components_unit_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @components/unit-input */ "./src/components/unit-input/index.js");
/* harmony import */ var _components_box_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @components/box-input */ "./src/components/box-input/index.js");
/* harmony import */ var _components_radio_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @components/radio-input */ "./src/components/radio-input/index.js");
/* harmony import */ var _components_cssfilter_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @components/cssfilter-input */ "./src/components/cssfilter-input/index.js");























function Edit(props) {
  var _effectNBorder$left, _effectNBorder$left2, _effectNBorder$left3, _effectNBorder$left4, _effectNBorder$right, _effectNBorder$right2, _effectNBorder$right3, _effectNBorder$right4, _effectNBorder$top, _effectNBorder$top2, _effectNBorder$top3, _effectNBorder$top4, _effectNBorder$bottom, _effectNBorder$bottom2, _effectNBorder$bottom3, _effectNBorder$bottom4, _effectHBorder$left, _effectHBorder$left2, _effectHBorder$left3, _effectHBorder$left4, _effectHBorder$right, _effectHBorder$right2, _effectHBorder$right3, _effectHBorder$right4, _effectHBorder$top, _effectHBorder$top2, _effectHBorder$top3, _effectHBorder$top4, _effectHBorder$bottom, _effectHBorder$bottom2, _effectHBorder$bottom3, _effectHBorder$bottom4;

  const {
    attributes,
    setAttributes,
    clientId
  } = props;
  const {
    id,
    layoutPadding,
    layoutMargin,
    backgroundNMode,
    backgroundNColor,
    backgroundNGradient,
    backgroundHMode,
    backgroundHColor,
    backgroundHGradient,
    backgroundHTransitionTime,
    backgroundFixed,
    backgroundOMode,
    backgroundOColor,
    backgroundOGradient,
    backgroundOOpacity,
    backgroundOCSS,
    backgroundOHMode,
    backgroundOHColor,
    backgroundOHGradient,
    backgroundOHOpacity,
    backgroundOHCSS,
    backgroundOHTransitionTime,
    backgroundOFixed,
    videoLink,
    videoLinkID,
    videoLoop,
    videoMuted,
    videoPreload,
    videoPoster,
    images,
    imageH,
    imageO,
    imageOH,
    imageFocus,
    imageHFocus,
    imageLoop,
    imageDuration,
    imageTransition,
    imageTransitionDuration,
    structureTag,
    structureMaxWidth,
    structureMinHeight,
    effectNBFlag,
    effectNRotateX,
    effectNRotateY,
    effectNRotateZ,
    effectNSkewX,
    effectNSkewY,
    effectNOffsetX,
    effectNOffsetY,
    effectNScale,
    effectNBorder,
    effectNBorderRadius,
    effectNShadowHO,
    effectNShadowVO,
    effectNShadowBlur,
    effectNShadowSpread,
    effectNShadowColor,
    hoverEffect,
    effectHAnimation,
    effectHColor,
    effectHBColor,
    transitionTime,
    effectHRotateX,
    effectHRotateY,
    effectHRotateZ,
    effectHSkewX,
    effectHSkewY,
    effectHOffsetX,
    effectHOffsetY,
    effectHScale,
    effectHBorder,
    effectHBorderRadius,
    effectHShadowHO,
    effectHShadowVO,
    effectHShadowBlur,
    effectHShadowSpread,
    effectHShadowColor,
    hideDesktop,
    hideTablet,
    hideMobile,
    textNColor,
    linkNColor,
    textHColor,
    linkHColor,
    entranceAnimation,
    entranceAnimationTime
  } = attributes;

  if (!id) {
    setAttributes({
      "id": (0,_helpers_generateId__WEBPACK_IMPORTED_MODULE_8__["default"])("group")
    });
  }

  const {
    hasInnerBlocks,
    themeSupportsLayout
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    var _getSettings;

    const {
      getBlock,
      getSettings
    } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.store);
    const block = getBlock(clientId);
    return {
      hasInnerBlocks: !!(block && block.innerBlocks.length),
      themeSupportsLayout: (_getSettings = getSettings()) === null || _getSettings === void 0 ? void 0 : _getSettings.supportsLayout
    };
  }, [clientId]);
  const videoRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const HtmlTag = !structureTag ? 'div' : structureTag;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _videoRef$current;

    (_videoRef$current = videoRef.current) === null || _videoRef$current === void 0 ? void 0 : _videoRef$current.load();
  }, [videoLink, videoLoop, videoPreload]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      "grigora-kit-group-wrapper": true,
      [`block-id-${id}`]: id,
      [`animateOnce`]: entranceAnimation != "none"
    }),
    style: {}
  });

  function renderImages() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "grigora-gallery-picker-editor"
    }, images.map(function (item) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: item.url
      });
    })));
  }

  function addNew(image) {
    setAttributes({
      "images": image.map(e => {
        return {
          id: e.id,
          url: e.url
        };
      })
    });
  }

  function effectNormalRender() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border', "grigora-kit"),
      initialOpen: false,
      className: `grigora-inside-panel`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_borderbox_input__WEBPACK_IMPORTED_MODULE_16__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Width', "grigora-kit"),
      onChange: effectNBorder => {
        console.log(effectNBorder);

        if (!effectNBorder.top) {
          setAttributes({
            "effectNBorder": {
              "top": effectNBorder,
              "bottom": effectNBorder,
              "right": effectNBorder,
              "left": effectNBorder
            }
          });
        } else {
          setAttributes({
            effectNBorder
          });
        }
      },
      value: effectNBorder,
      resetValue: {
        "top": {
          color: '#72aee6',
          style: 'dashed',
          width: '0px'
        },
        "bottom": {
          color: '#72aee6',
          style: 'dashed',
          width: '0px'
        },
        "right": {
          color: '#72aee6',
          style: 'dashed',
          width: '0px'
        },
        "left": {
          color: '#72aee6',
          style: 'dashed',
          width: '0px'
        }
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_borderradius_input__WEBPACK_IMPORTED_MODULE_17__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Radius', "grigora-kit"),
      onChange: effectNBorderRadius => {
        if (typeof effectNBorderRadius === 'string' || effectNBorderRadius instanceof String) {
          setAttributes({
            "effectNBorderRadius": {
              "topLeft": effectNBorderRadius,
              "topRight": effectNBorderRadius,
              "bottomLeft": effectNBorderRadius,
              "bottomRight": effectNBorderRadius
            }
          });
        } else {
          setAttributes({
            effectNBorderRadius
          });
        }
      },
      values: effectNBorderRadius,
      resetValue: {
        "topLeft": "0px",
        "topRight": "0px",
        "bottomLeft": "0px",
        "bottomRight": "0px"
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Box Shadow', "grigora-kit"),
      initialOpen: false,
      className: `grigora-inside-panel`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', "grigora-kit"),
      value: effectNShadowColor,
      onChange: effectNShadowColor => setAttributes({
        effectNShadowColor
      }),
      resetValue: '#000'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Horizontal', "grigora-kit"),
      value: effectNShadowHO,
      onChange: effectNShadowHO => setAttributes({
        effectNShadowHO
      }),
      resetValue: "0px"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Vertical', "grigora-kit"),
      value: effectNShadowVO,
      onChange: effectNShadowVO => setAttributes({
        effectNShadowVO
      }),
      resetValue: "0px"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Blur', "grigora-kit"),
      value: effectNShadowBlur,
      onChange: effectNShadowBlur => setAttributes({
        effectNShadowBlur
      }),
      resetValue: "0px"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Spread', "grigora-kit"),
      value: effectNShadowSpread,
      onChange: effectNShadowSpread => setAttributes({
        effectNShadowSpread
      }),
      resetValue: "0px"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transforms', "grigora-kit"),
      initialOpen: false,
      className: `grigora-inside-panel`
    }, backgroundFixed || backgroundOFixed && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Notice, {
      status: "warning",
      isDismissible: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Transforms won't work with fixed backgrounds. Please turn off the fixed background in Background/Overlay.", "grigora-kit"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rotate', "grigora-kit")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "X",
      onChange: effectNRotateX => setAttributes({
        effectNRotateX
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectNRotateX,
      resetValue: "0deg"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "Y",
      onChange: effectNRotateY => setAttributes({
        effectNRotateY
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectNRotateY,
      resetValue: "0deg"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "Z",
      onChange: effectNRotateZ => setAttributes({
        effectNRotateZ
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectNRotateZ,
      resetValue: "0deg"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Skew', "grigora-kit")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "X",
      onChange: effectNSkewX => setAttributes({
        effectNSkewX
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectNSkewX,
      resetValue: "0deg"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "Y",
      onChange: effectNSkewY => setAttributes({
        effectNSkewY
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectNSkewY,
      resetValue: "0deg"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Offset', "grigora-kit")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "X",
      onChange: effectNOffsetX => setAttributes({
        effectNOffsetX
      }),
      value: effectNOffsetX,
      resetValue: "0px"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "Y",
      onChange: effectNOffsetY => setAttributes({
        effectNOffsetY
      }),
      value: effectNOffsetY,
      resetValue: "0px"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Scale', "grigora-kit"),
      max: 2,
      min: 0,
      step: 0.1,
      unit: "x",
      setValue: effectNScale => setAttributes({
        effectNScale
      }),
      value: effectNScale,
      resetValue: 1
    })));
  }

  function effectHoverRender() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `grigora-hover-effects-panel`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hover Effects', "grigora-kit"),
      checked: !!hoverEffect,
      onChange: () => setAttributes({
        hoverEffect: !hoverEffect
      })
    }), hoverEffect && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Animation', "grigora-kit"),
      initialOpen: false,
      className: `grigora-inside-panel`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_select_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Attention Seekers: ", "grigora-kit"),
      labelPosition: "side",
      onChange: effectHAnimation => setAttributes({
        effectHAnimation
      }),
      value: effectHAnimation,
      options: _constants__WEBPACK_IMPORTED_MODULE_7__.HOVER_ANIMATIONS,
      resetValue: "none"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Time', "grigora-kit"),
      max: 5,
      min: 0.1,
      step: 0.1,
      unit: "sec",
      setValue: transitionTime => setAttributes({
        transitionTime
      }),
      value: transitionTime,
      resetValue: 1
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border', "grigora-kit"),
      initialOpen: false,
      className: `grigora-inside-panel`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_borderbox_input__WEBPACK_IMPORTED_MODULE_16__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Width', "grigora-kit"),
      onChange: effectHBorder => {
        if (!effectHBorder.top) {
          setAttributes({
            "effectHBorder": {
              "top": effectHBorder,
              "bottom": effectHBorder,
              "right": effectHBorder,
              "left": effectHBorder
            }
          });
        } else {
          setAttributes({
            effectHBorder
          });
        }
      },
      value: effectHBorder,
      resetValue: {
        "top": {
          color: '#72aee6',
          style: 'dashed',
          width: '0px'
        },
        "bottom": {
          color: '#72aee6',
          style: 'dashed',
          width: '0px'
        },
        "right": {
          color: '#72aee6',
          style: 'dashed',
          width: '0px'
        },
        "left": {
          color: '#72aee6',
          style: 'dashed',
          width: '0px'
        }
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_borderradius_input__WEBPACK_IMPORTED_MODULE_17__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Radius', "grigora-kit"),
      onChange: effectHBorderRadius => {
        if (typeof effectHBorderRadius === 'string' || effectHBorderRadius instanceof String) {
          setAttributes({
            "effectHBorderRadius": {
              "topLeft": effectHBorderRadius,
              "topRight": effectHBorderRadius,
              "bottomLeft": effectHBorderRadius,
              "bottomRight": effectHBorderRadius
            }
          });
        } else {
          setAttributes({
            effectHBorderRadius
          });
        }
      },
      values: effectHBorderRadius,
      resetValue: {
        "topLeft": "0px",
        "topRight": "0px",
        "bottomLeft": "0px",
        "bottomRight": "0px"
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Box Shadow', "grigora-kit"),
      initialOpen: false,
      className: `grigora-inside-panel`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', "grigora-kit"),
      clearable: false,
      value: effectHShadowColor,
      onChange: effectHShadowColor => setAttributes({
        effectHShadowColor
      }),
      resetValue: '#000'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Horizontal', "grigora-kit"),
      value: effectHShadowHO,
      onChange: effectHShadowHO => setAttributes({
        effectHShadowHO
      }),
      resetValue: "0px"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Vertical', "grigora-kit"),
      value: effectHShadowVO,
      onChange: effectHShadowVO => setAttributes({
        effectHShadowVO
      }),
      resetValue: "0px"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Blur', "grigora-kit"),
      value: effectHShadowBlur,
      onChange: effectHShadowBlur => setAttributes({
        effectHShadowBlur
      }),
      resetValue: "0px"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Spread', "grigora-kit"),
      value: effectHShadowSpread,
      onChange: effectHShadowSpread => setAttributes({
        effectHShadowSpread
      }),
      resetValue: "0px"
    })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transforms', "grigora-kit"),
      initialOpen: false,
      className: `grigora-inside-panel`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rotate', "grigora-kit")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "X",
      onChange: effectHRotateX => setAttributes({
        effectHRotateX
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectHRotateX,
      resetValue: "0deg"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "Y",
      onChange: effectHRotateY => setAttributes({
        effectHRotateY
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectHRotateY,
      resetValue: "0deg"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "Z",
      onChange: effectHRotateZ => setAttributes({
        effectHRotateZ
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectHRotateZ,
      resetValue: "0deg"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Skew', "grigora-kit")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "X",
      onChange: effectHSkewX => setAttributes({
        effectHSkewX
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectHSkewX,
      resetValue: "0deg"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "Y",
      onChange: effectHSkewY => setAttributes({
        effectHSkewY
      }),
      units: [{
        default: 1,
        label: 'deg',
        value: 'deg'
      }],
      value: effectHSkewY,
      resetValue: "0deg"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Offset', "grigora-kit")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      spacing: 2
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "X",
      onChange: effectHOffsetX => setAttributes({
        effectHOffsetX
      }),
      value: effectHOffsetX,
      resetValue: "0px"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
      label: "Y",
      onChange: effectHOffsetY => setAttributes({
        effectHOffsetY
      }),
      value: effectHOffsetY,
      resetValue: "0px"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Scale', "grigora-kit"),
      max: 2,
      min: 0,
      step: 0.1,
      unit: "x",
      setValue: effectHScale => setAttributes({
        effectHScale
      }),
      value: effectHScale,
      resetValue: 1
    }))));
  }

  function backgroundNormal() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_radio_input__WEBPACK_IMPORTED_MODULE_20__["default"], {
      label: "",
      onChange: backgroundNMode => setAttributes({
        backgroundNMode
      }),
      value: backgroundNMode,
      radios: [{
        "value": "color",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Color", "grigora-kit")
      }, {
        "value": "gradient",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Gradient", "grigora-kit")
      }, {
        "value": "images",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Images", "grigora-kit")
      }, {
        "value": "video",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Video", "grigora-kit")
      }]
    }), backgroundNMode === "color" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', "grigora-kit"),
      value: backgroundNColor,
      onChange: backgroundNColor => setAttributes({
        backgroundNColor
      }),
      resetValue: '#ffffff'
    }), backgroundNMode === "gradient" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_gradient_input__WEBPACK_IMPORTED_MODULE_13__["default"], {
      label: "",
      value: backgroundNGradient,
      onChange: backgroundNGradient => setAttributes({
        backgroundNGradient
      }),
      resetValue: "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed', "grigora-kit"),
      onChange: backgroundFixed => setAttributes({
        backgroundFixed
      }),
      value: backgroundFixed,
      resetValue: false
    })), backgroundNMode === "images" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "grigora-media-select"
    }, images.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), renderImages()), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
      onSelect: addNew,
      allowedTypes: ['image'],
      multiple: true,
      gallery: true,
      value: images.map(e => {
        return e.id;
      }),
      render: _ref => {
        let {
          open
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
          variant: "primary",
          onClick: open
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Images', "grigora-kit"));
      }
    }), images.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.FocalPointPicker, {
      className: "grigora-focalpoint-picker-h1ma",
      url: images[0].url,
      value: imageFocus,
      onChange: imageFocus => setAttributes({
        imageFocus
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed', "grigora-kit"),
      onChange: backgroundFixed => setAttributes({
        backgroundFixed
      }),
      value: backgroundFixed,
      resetValue: false
    })), images.length > 1 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loop', "grigora-kit"),
      onChange: imageLoop => setAttributes({
        imageLoop
      }),
      value: imageLoop,
      resetValue: true
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Single Image Duration', "grigora-kit"),
      max: 20,
      min: 0.5,
      step: 0.1,
      unit: "sec",
      setValue: imageDuration => {
        if (imageDuration < imageTransitionDuration) {
          setAttributes({
            imageDuration: imageDuration,
            imageTransitionDuration: imageDuration
          });
        } else {
          setAttributes({
            imageDuration
          });
        }
      },
      value: imageDuration,
      resetValue: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_select_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Transition ", "grigora-kit"),
      labelPosition: "side",
      onChange: imageTransition => setAttributes({
        imageTransition
      }),
      value: imageTransition,
      options: [{
        label: 'Fade',
        value: 'fade'
      }, {
        label: 'Slide Right',
        value: 'slideright'
      }, {
        label: 'Slide Left',
        value: 'slideleft'
      }, {
        label: 'Slide Up',
        value: 'slideup'
      }, {
        label: 'Slide Down',
        value: 'slidedown'
      }],
      resetValue: "fade"
    }), imageTransitionDuration * 100 / (images.length * imageDuration) < 0.5 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Notice, {
      status: "warning",
      isDismissible: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Very low transition duration to total time detected. Either increase the transition duration, reduce number of images or reduce the single image time.", "grigora-kit"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Duration', "grigora-kit"),
      max: imageDuration,
      min: 0.1,
      step: 0.1,
      unit: "sec",
      setValue: imageTransitionDuration => setAttributes({
        imageTransitionDuration
      }),
      value: imageTransitionDuration,
      resetValue: 0.5
    }))), backgroundNMode === "video" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_text_input__WEBPACK_IMPORTED_MODULE_14__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Video Link (mp4)', "grigora-kit"),
      onChange: videoLink => setAttributes({
        videoLink
      }),
      value: videoLink,
      resetValue: ""
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "grigora-media-select"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
      onSelect: video => {
        setAttributes({
          videoLink: video.url
        });
        setAttributes({
          videoLinkID: video.id
        });
      },
      allowedTypes: "video",
      value: videoLink,
      render: _ref2 => {
        let {
          open
        } = _ref2;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
          variant: "primary",
          onClick: open
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select from Gallery', "grigora-kit"));
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loop', "grigora-kit"),
      onChange: videoLoop => setAttributes({
        videoLoop
      }),
      value: videoLoop,
      resetValue: true
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_select_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Preload ", "grigora-kit"),
      labelPosition: "side",
      onChange: videoPreload => setAttributes({
        videoPreload
      }),
      value: videoPreload,
      options: [{
        label: 'Auto',
        value: 'auto'
      }, {
        label: 'Metadata',
        value: 'metadata'
      }, {
        label: 'None',
        value: 'none'
      }],
      resetValue: "auto"
    })));
  }

  function backgroundHover() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_radio_input__WEBPACK_IMPORTED_MODULE_20__["default"], {
      label: "",
      onChange: backgroundHMode => setAttributes({
        backgroundHMode
      }),
      value: backgroundHMode,
      radios: [{
        "value": "color",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Color", "grigora-kit")
      }, {
        "value": "gradient",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Gradient", "grigora-kit")
      }, {
        "value": "image",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Image", "grigora-kit")
      }]
    }), backgroundHMode === "color" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', "grigora-kit"),
      value: backgroundHColor,
      onChange: backgroundHColor => setAttributes({
        backgroundHColor
      }),
      resetValue: '#ffffff'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Time', "grigora-kit"),
      max: 5,
      min: 0.1,
      step: 0.1,
      unit: "sec",
      setValue: backgroundHTransitionTime => setAttributes({
        backgroundHTransitionTime
      }),
      value: backgroundHTransitionTime,
      resetValue: 1
    })), backgroundHMode === "gradient" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_gradient_input__WEBPACK_IMPORTED_MODULE_13__["default"], {
      label: "",
      value: backgroundHGradient,
      onChange: backgroundHGradient => setAttributes({
        backgroundHGradient
      }),
      resetValue: "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed', "grigora-kit"),
      onChange: backgroundFixed => setAttributes({
        backgroundFixed
      }),
      value: backgroundFixed,
      resetValue: false
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Time', "grigora-kit"),
      max: 5,
      min: 0.1,
      step: 0.1,
      unit: "sec",
      setValue: backgroundHTransitionTime => setAttributes({
        backgroundHTransitionTime
      }),
      value: backgroundHTransitionTime,
      resetValue: 1
    })), backgroundHMode === "image" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "grigora-media-select"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
      onSelect: imageH => setAttributes({
        "imageH": {
          "id": imageH.id,
          "url": imageH.url
        }
      }),
      allowedTypes: ['image'],
      value: imageH.id,
      render: _ref3 => {
        let {
          open
        } = _ref3;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
          variant: "primary",
          onClick: open
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Image', "grigora-kit"));
      }
    }), imageH.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.FocalPointPicker, {
      className: "grigora-focalpoint-picker-h1ma",
      url: imageH.url,
      value: imageHFocus,
      onChange: imageHFocus => setAttributes({
        imageHFocus
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed', "grigora-kit"),
      onChange: backgroundFixed => setAttributes({
        backgroundFixed
      }),
      value: backgroundFixed,
      resetValue: false
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Time', "grigora-kit"),
      max: 5,
      min: 0.1,
      step: 0.1,
      unit: "sec",
      setValue: backgroundHTransitionTime => setAttributes({
        backgroundHTransitionTime
      }),
      value: backgroundHTransitionTime,
      resetValue: 1
    })));
  }

  function backgroundOverlayNormal() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_radio_input__WEBPACK_IMPORTED_MODULE_20__["default"], {
      label: "",
      onChange: backgroundOMode => setAttributes({
        backgroundOMode
      }),
      value: backgroundOMode,
      radios: [{
        "value": "color",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Color", "grigora-kit")
      }, {
        "value": "gradient",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Gradient", "grigora-kit")
      }, {
        "value": "image",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Image", "grigora-kit")
      }]
    }), backgroundOMode === "color" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', "grigora-kit"),
      value: backgroundOColor,
      onChange: backgroundOColor => setAttributes({
        backgroundOColor
      }),
      resetValue: '#ffffff'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_cssfilter_input__WEBPACK_IMPORTED_MODULE_21__["default"], {
      value: backgroundOCSS,
      setValue: backgroundOCSS => setAttributes({
        backgroundOCSS
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('CSS Filters', "grigora-kit"),
      reset: {}
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Opacity', "grigora-kit"),
      max: 1,
      min: 0,
      step: 0.05,
      unit: "",
      setValue: backgroundOOpacity => setAttributes({
        backgroundOOpacity
      }),
      value: backgroundOOpacity,
      resetValue: 0.5
    })), backgroundOMode === "gradient" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_gradient_input__WEBPACK_IMPORTED_MODULE_13__["default"], {
      label: "",
      value: backgroundOGradient,
      onChange: backgroundOGradient => setAttributes({
        backgroundOGradient
      }),
      resetValue: "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_cssfilter_input__WEBPACK_IMPORTED_MODULE_21__["default"], {
      value: backgroundOCSS,
      setValue: backgroundOCSS => setAttributes({
        backgroundOCSS
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('CSS Filters', "grigora-kit"),
      reset: {}
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed', "grigora-kit"),
      onChange: backgroundOFixed => setAttributes({
        backgroundOFixed
      }),
      value: backgroundOFixed,
      resetValue: false
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Opacity', "grigora-kit"),
      max: 1,
      min: 0,
      step: 0.05,
      unit: "",
      setValue: backgroundOOpacity => setAttributes({
        backgroundOOpacity
      }),
      value: backgroundOOpacity,
      resetValue: 0.5
    })), backgroundOMode === "image" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "grigora-media-select"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
      onSelect: imageO => setAttributes({
        "imageO": {
          "id": imageO.id,
          "url": imageO.url
        }
      }),
      allowedTypes: ['image'],
      value: imageO.id,
      render: _ref4 => {
        let {
          open
        } = _ref4;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
          variant: "primary",
          onClick: open
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Image', "grigora-kit"));
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed', "grigora-kit"),
      onChange: backgroundOFixed => setAttributes({
        backgroundOFixed
      }),
      value: backgroundOFixed,
      resetValue: false
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_cssfilter_input__WEBPACK_IMPORTED_MODULE_21__["default"], {
      value: backgroundOCSS,
      setValue: backgroundOCSS => setAttributes({
        backgroundOCSS
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('CSS Filters', "grigora-kit"),
      reset: {}
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Opacity', "grigora-kit"),
      max: 1,
      min: 0,
      step: 0.05,
      unit: "",
      setValue: backgroundOOpacity => setAttributes({
        backgroundOOpacity
      }),
      value: backgroundOOpacity,
      resetValue: 0.5
    })));
  }

  function backgroundOverlayHover() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_radio_input__WEBPACK_IMPORTED_MODULE_20__["default"], {
      label: "",
      onChange: backgroundOHMode => setAttributes({
        backgroundOHMode
      }),
      value: backgroundOHMode,
      radios: [{
        "value": "color",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Color", "grigora-kit")
      }, {
        "value": "gradient",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Gradient", "grigora-kit")
      }, {
        "value": "image",
        "text": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Image", "grigora-kit")
      }]
    }), backgroundOHMode === "color" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', "grigora-kit"),
      value: backgroundOHColor,
      onChange: backgroundOHColor => setAttributes({
        backgroundOHColor
      }),
      resetValue: '#ffffff'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_cssfilter_input__WEBPACK_IMPORTED_MODULE_21__["default"], {
      value: backgroundOHCSS,
      setValue: backgroundOHCSS => setAttributes({
        backgroundOHCSS
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('CSS Filters', "grigora-kit"),
      reset: {}
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Opacity', "grigora-kit"),
      max: 1,
      min: 0,
      step: 0.05,
      unit: "",
      setValue: backgroundOHOpacity => setAttributes({
        backgroundOHOpacity
      }),
      value: backgroundOHOpacity,
      resetValue: 0.5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Time', "grigora-kit"),
      max: 5,
      min: 0.1,
      step: 0.1,
      unit: "sec",
      setValue: backgroundOHTransitionTime => setAttributes({
        backgroundOHTransitionTime
      }),
      value: backgroundOHTransitionTime,
      resetValue: 1
    })), backgroundOHMode === "gradient" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_gradient_input__WEBPACK_IMPORTED_MODULE_13__["default"], {
      label: "",
      value: backgroundOHGradient,
      onChange: backgroundOHGradient => setAttributes({
        backgroundOHGradient
      }),
      resetValue: "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_cssfilter_input__WEBPACK_IMPORTED_MODULE_21__["default"], {
      value: backgroundOHCSS,
      setValue: backgroundOHCSS => setAttributes({
        backgroundOHCSS
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('CSS Filters', "grigora-kit"),
      reset: {}
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Opacity', "grigora-kit"),
      max: 1,
      min: 0,
      step: 0.05,
      unit: "",
      setValue: backgroundOHOpacity => setAttributes({
        backgroundOHOpacity
      }),
      value: backgroundOHOpacity,
      resetValue: 0.5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed', "grigora-kit"),
      onChange: backgroundOFixed => setAttributes({
        backgroundOFixed
      }),
      value: backgroundOFixed,
      resetValue: false
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Time', "grigora-kit"),
      max: 5,
      min: 0.1,
      step: 0.1,
      unit: "sec",
      setValue: backgroundOHTransitionTime => setAttributes({
        backgroundOHTransitionTime
      }),
      value: backgroundOHTransitionTime,
      resetValue: 1
    })), backgroundOHMode === "image" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "grigora-media-select"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
      onSelect: imageOH => setAttributes({
        "imageOH": {
          "id": imageOH.id,
          "url": imageOH.url
        }
      }),
      allowedTypes: ['image'],
      value: imageOH.id,
      render: _ref5 => {
        let {
          open
        } = _ref5;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
          variant: "primary",
          onClick: open
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Image', "grigora-kit"));
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_cssfilter_input__WEBPACK_IMPORTED_MODULE_21__["default"], {
      value: backgroundOHCSS,
      setValue: backgroundOHCSS => setAttributes({
        backgroundOHCSS
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('CSS Filters', "grigora-kit"),
      reset: {}
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed', "grigora-kit"),
      onChange: backgroundOFixed => setAttributes({
        backgroundOFixed
      }),
      value: backgroundOFixed,
      resetValue: false
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Opacity', "grigora-kit"),
      max: 1,
      min: 0,
      step: 0.05,
      unit: "",
      setValue: backgroundOHOpacity => setAttributes({
        backgroundOHOpacity
      }),
      value: backgroundOHOpacity,
      resetValue: 0.5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Time', "grigora-kit"),
      max: 5,
      min: 0.1,
      step: 0.1,
      unit: "sec",
      setValue: backgroundOHTransitionTime => setAttributes({
        backgroundOHTransitionTime
      }),
      value: backgroundOHTransitionTime,
      resetValue: 1
    })));
  }

  function textColorNormal() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text Color', "grigora-kit"),
      value: textNColor,
      onChange: textNColor => setAttributes({
        textNColor
      }),
      resetValue: ''
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Link Color', "grigora-kit"),
      value: linkNColor,
      onChange: linkNColor => setAttributes({
        linkNColor
      }),
      resetValue: ''
    }));
  }

  function textColorHover() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text Hover Color', "grigora-kit"),
      value: textHColor,
      onChange: textHColor => setAttributes({
        textHColor
      }),
      resetValue: ''
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_color_input__WEBPACK_IMPORTED_MODULE_12__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Link Hover Color', "grigora-kit"),
      value: linkHColor,
      onChange: linkHColor => setAttributes({
        linkHColor
      }),
      resetValue: ''
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Time', "grigora-kit"),
      max: 5,
      min: 0.1,
      step: 0.1,
      unit: "sec",
      setValue: transitionTime => setAttributes({
        transitionTime
      }),
      value: transitionTime,
      resetValue: 1
    }));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Layout', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_box_input__WEBPACK_IMPORTED_MODULE_19__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Padding", "grigora-kit"),
    onChange: layoutPadding => setAttributes({
      layoutPadding
    }),
    values: layoutPadding,
    resetValue: {
      "top": "0px",
      "bottom": "0px",
      "left": "0px",
      "right": "0px"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_box_input__WEBPACK_IMPORTED_MODULE_19__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Margin", "grigora-kit"),
    onChange: layoutMargin => setAttributes({
      layoutMargin
    }),
    values: layoutMargin,
    resetValue: {
      "top": "0px",
      "bottom": "0px",
      "left": "0px",
      "right": "0px"
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Structure', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_select_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Container Tag ", "grigora-kit"),
    labelPosition: "side",
    onChange: structureTag => setAttributes({
      structureTag
    }),
    value: structureTag,
    options: ['div', 'main', 'header', 'aside', 'footer', 'section', 'article'].map(function (item) {
      return {
        label: item,
        value: item
      };
    }),
    resetValue: "div"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Maximum Width', "grigora-kit"),
    onChange: structureMaxWidth => setAttributes({
      structureMaxWidth
    }),
    value: structureMaxWidth,
    resetValue: ""
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_unit_input__WEBPACK_IMPORTED_MODULE_18__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Minimum Height', "grigora-kit"),
    onChange: structureMinHeight => setAttributes({
      structureMinHeight
    }),
    value: structureMinHeight,
    resetValue: ""
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TabPanel, {
    className: "grigora-effects-settings",
    tabs: [{
      name: 'normal',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Normal', "grigora-kit"),
      className: 'tab-normal'
    }, {
      name: 'hover',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hover', "grigora-kit"),
      className: 'tab-hover'
    }]
  }, tab => {
    if (tab.name == "normal") {
      return backgroundNormal();
    } else {
      return backgroundHover();
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background Overlay', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TabPanel, {
    className: "grigora-effects-settings",
    tabs: [{
      name: 'normal',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Normal', "grigora-kit"),
      className: 'tab-normal'
    }, {
      name: 'hover',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hover', "grigora-kit"),
      className: 'tab-hover'
    }]
  }, tab => {
    if (tab.name == "normal") {
      return backgroundOverlayNormal();
    } else {
      return backgroundOverlayHover();
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text Color', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TabPanel, {
    className: "grigora-effects-settings",
    tabs: [{
      name: 'normal',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Normal', "grigora-kit"),
      className: 'tab-normal'
    }, {
      name: 'hover',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hover', "grigora-kit"),
      className: 'tab-hover'
    }]
  }, tab => {
    if (tab.name == "normal") {
      return textColorNormal();
    } else {
      return textColorHover();
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border & Effects', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TabPanel, {
    className: "grigora-effects-settings",
    tabs: [{
      name: 'normal',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Normal', "grigora-kit"),
      className: 'tab-normal'
    }, {
      name: 'hover',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hover', "grigora-kit"),
      className: 'tab-hover'
    }]
  }, tab => {
    if (tab.name == "normal") {
      return effectNormalRender();
    } else {
      return effectHoverRender();
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('On Scroll', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_select_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Animation: ", "grigora-kit"),
    labelPosition: "side",
    onChange: entranceAnimation => setAttributes({
      entranceAnimation
    }),
    value: entranceAnimation,
    options: _constants__WEBPACK_IMPORTED_MODULE_7__.ENTRANCE_ANIMATIONS,
    resetValue: "none"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_range_input__WEBPACK_IMPORTED_MODULE_10__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Transition Time', "grigora-kit"),
    max: 5,
    min: 0.1,
    unit: "sec",
    step: 0.1,
    setValue: entranceAnimationTime => setAttributes({
      entranceAnimationTime
    }),
    value: entranceAnimationTime,
    resetValue: 1
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Visibility', "grigora-kit"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hide on Desktop', "grigora-kit"),
    onChange: hideDesktop => setAttributes({
      hideDesktop
    }),
    value: hideDesktop,
    resetValue: false
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hide on Tablet', "grigora-kit"),
    onChange: hideTablet => setAttributes({
      hideTablet
    }),
    value: hideTablet,
    resetValue: false
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_toggle_input__WEBPACK_IMPORTED_MODULE_15__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hide on Mobile', "grigora-kit"),
    onChange: hideMobile => setAttributes({
      hideMobile
    }),
    value: hideMobile,
    resetValue: false
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, ` .block-id-${id} {
					padding-left: ${layoutPadding === null || layoutPadding === void 0 ? void 0 : layoutPadding.left};
					padding-right: ${layoutPadding === null || layoutPadding === void 0 ? void 0 : layoutPadding.right};
					padding-top: ${layoutPadding === null || layoutPadding === void 0 ? void 0 : layoutPadding.top};
					padding-bottom: ${layoutPadding === null || layoutPadding === void 0 ? void 0 : layoutPadding.bottom};
					margin-left: ${layoutMargin === null || layoutMargin === void 0 ? void 0 : layoutMargin.left};
					margin-right: ${layoutMargin === null || layoutMargin === void 0 ? void 0 : layoutMargin.right};
					margin-top: ${layoutMargin === null || layoutMargin === void 0 ? void 0 : layoutMargin.top};
					margin-bottom: ${layoutMargin === null || layoutMargin === void 0 ? void 0 : layoutMargin.bottom};
					${textNColor ? `color: ${textNColor};` : ``}
					${structureMaxWidth ? `max-width: ${structureMaxWidth} !important;` : ``}
					${structureMinHeight ? `min-height: ${structureMinHeight};` : ``}
					transition: ${`${transitionTime}s`};
					border-left: ${effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$left = effectNBorder.left) === null || _effectNBorder$left === void 0 ? void 0 : _effectNBorder$left.width} ${effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$left2 = effectNBorder.left) === null || _effectNBorder$left2 === void 0 ? void 0 : _effectNBorder$left2.style} ${effectNBorder !== null && effectNBorder !== void 0 && (_effectNBorder$left3 = effectNBorder.left) !== null && _effectNBorder$left3 !== void 0 && _effectNBorder$left3.color ? effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$left4 = effectNBorder.left) === null || _effectNBorder$left4 === void 0 ? void 0 : _effectNBorder$left4.color : ""};
					border-right: ${effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$right = effectNBorder.right) === null || _effectNBorder$right === void 0 ? void 0 : _effectNBorder$right.width} ${effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$right2 = effectNBorder.right) === null || _effectNBorder$right2 === void 0 ? void 0 : _effectNBorder$right2.style} ${effectNBorder !== null && effectNBorder !== void 0 && (_effectNBorder$right3 = effectNBorder.right) !== null && _effectNBorder$right3 !== void 0 && _effectNBorder$right3.color ? effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$right4 = effectNBorder.right) === null || _effectNBorder$right4 === void 0 ? void 0 : _effectNBorder$right4.color : ""};
					border-top: ${effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$top = effectNBorder.top) === null || _effectNBorder$top === void 0 ? void 0 : _effectNBorder$top.width} ${effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$top2 = effectNBorder.top) === null || _effectNBorder$top2 === void 0 ? void 0 : _effectNBorder$top2.style} ${effectNBorder !== null && effectNBorder !== void 0 && (_effectNBorder$top3 = effectNBorder.top) !== null && _effectNBorder$top3 !== void 0 && _effectNBorder$top3.color ? effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$top4 = effectNBorder.top) === null || _effectNBorder$top4 === void 0 ? void 0 : _effectNBorder$top4.color : ""};
					border-bottom: ${effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$bottom = effectNBorder.bottom) === null || _effectNBorder$bottom === void 0 ? void 0 : _effectNBorder$bottom.width} ${effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$bottom2 = effectNBorder.bottom) === null || _effectNBorder$bottom2 === void 0 ? void 0 : _effectNBorder$bottom2.style} ${effectNBorder !== null && effectNBorder !== void 0 && (_effectNBorder$bottom3 = effectNBorder.bottom) !== null && _effectNBorder$bottom3 !== void 0 && _effectNBorder$bottom3.color ? effectNBorder === null || effectNBorder === void 0 ? void 0 : (_effectNBorder$bottom4 = effectNBorder.bottom) === null || _effectNBorder$bottom4 === void 0 ? void 0 : _effectNBorder$bottom4.color : ""};
					border-top-right-radius: ${effectNBorderRadius === null || effectNBorderRadius === void 0 ? void 0 : effectNBorderRadius.topRight};
					border-top-left-radius: ${effectNBorderRadius === null || effectNBorderRadius === void 0 ? void 0 : effectNBorderRadius.topLeft};
					border-bottom-right-radius: ${effectNBorderRadius === null || effectNBorderRadius === void 0 ? void 0 : effectNBorderRadius.bottomRight};
					border-bottom-left-radius: ${effectNBorderRadius === null || effectNBorderRadius === void 0 ? void 0 : effectNBorderRadius.bottomLeft};
					${backgroundFixed || backgroundOFixed ? `` : `transform: rotateX(${effectNRotateX ? effectNRotateX : "0deg"}) rotateY(${effectNRotateY ? effectNRotateY : "0deg"}) rotateZ(${effectNRotateZ ? effectNRotateZ : "0deg"}) skewX(${effectNSkewX ? effectNSkewX : "0deg"}) skewY(${effectNSkewY ? effectNSkewY : "0deg"}) translateX(${effectNOffsetX}) translateY(${effectNOffsetY}) scale(${effectNScale});`}
					box-shadow: ${effectNShadowHO} ${effectNShadowVO} ${effectNShadowBlur} ${effectNShadowSpread} ${effectNShadowColor};
					}
					${linkNColor ? `.block-id-${id} a {color: ${linkNColor};}` : ``}
					${textHColor ? `.block-id-${id}:hover {color: ${textHColor};}` : ``}
					${linkHColor ? `.block-id-${id}:hover a {color: ${linkHColor};}` : ``}
					${hoverEffect ? `
					.block-id-${id}:hover {
						color: ${effectHColor};
						${effectHAnimation != "none" ? `animation: ${effectHAnimation} ${transitionTime}s;` : ``}
						background-color: ${!effectNBFlag ? effectHBColor : ""};
						border-left: ${effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$left = effectHBorder.left) === null || _effectHBorder$left === void 0 ? void 0 : _effectHBorder$left.width} ${effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$left2 = effectHBorder.left) === null || _effectHBorder$left2 === void 0 ? void 0 : _effectHBorder$left2.style} ${effectHBorder !== null && effectHBorder !== void 0 && (_effectHBorder$left3 = effectHBorder.left) !== null && _effectHBorder$left3 !== void 0 && _effectHBorder$left3.color ? effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$left4 = effectHBorder.left) === null || _effectHBorder$left4 === void 0 ? void 0 : _effectHBorder$left4.color : ""};
						border-right: ${effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$right = effectHBorder.right) === null || _effectHBorder$right === void 0 ? void 0 : _effectHBorder$right.width} ${effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$right2 = effectHBorder.right) === null || _effectHBorder$right2 === void 0 ? void 0 : _effectHBorder$right2.style} ${effectHBorder !== null && effectHBorder !== void 0 && (_effectHBorder$right3 = effectHBorder.right) !== null && _effectHBorder$right3 !== void 0 && _effectHBorder$right3.color ? effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$right4 = effectHBorder.right) === null || _effectHBorder$right4 === void 0 ? void 0 : _effectHBorder$right4.color : ""};
						border-top: ${effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$top = effectHBorder.top) === null || _effectHBorder$top === void 0 ? void 0 : _effectHBorder$top.width} ${effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$top2 = effectHBorder.top) === null || _effectHBorder$top2 === void 0 ? void 0 : _effectHBorder$top2.style} ${effectHBorder !== null && effectHBorder !== void 0 && (_effectHBorder$top3 = effectHBorder.top) !== null && _effectHBorder$top3 !== void 0 && _effectHBorder$top3.color ? effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$top4 = effectHBorder.top) === null || _effectHBorder$top4 === void 0 ? void 0 : _effectHBorder$top4.color : ""};
						border-bottom: ${effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$bottom = effectHBorder.bottom) === null || _effectHBorder$bottom === void 0 ? void 0 : _effectHBorder$bottom.width} ${effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$bottom2 = effectHBorder.bottom) === null || _effectHBorder$bottom2 === void 0 ? void 0 : _effectHBorder$bottom2.style} ${effectHBorder !== null && effectHBorder !== void 0 && (_effectHBorder$bottom3 = effectHBorder.bottom) !== null && _effectHBorder$bottom3 !== void 0 && _effectHBorder$bottom3.color ? effectHBorder === null || effectHBorder === void 0 ? void 0 : (_effectHBorder$bottom4 = effectHBorder.bottom) === null || _effectHBorder$bottom4 === void 0 ? void 0 : _effectHBorder$bottom4.color : ""};
						border-top-right-radius: ${effectHBorderRadius === null || effectHBorderRadius === void 0 ? void 0 : effectHBorderRadius.topRight};
						border-top-left-radius: ${effectHBorderRadius === null || effectHBorderRadius === void 0 ? void 0 : effectHBorderRadius.topLeft};
						border-bottom-right-radius: ${effectHBorderRadius === null || effectHBorderRadius === void 0 ? void 0 : effectHBorderRadius.bottomRight};
						border-bottom-left-radius: ${effectHBorderRadius === null || effectHBorderRadius === void 0 ? void 0 : effectHBorderRadius.bottomLeft};
						${backgroundFixed || backgroundOFixed ? `` : `transform: rotateX(${effectHRotateX ? effectHRotateX : "0deg"}) rotateY(${effectHRotateY ? effectHRotateY : "0deg"}) rotateZ(${effectHRotateZ ? effectHRotateZ : "0deg"}) skewX(${effectHSkewX ? effectHSkewX : "0deg"}) skewY(${effectHSkewY ? effectHSkewY : "0deg"}) translateX(${effectHOffsetX}) translateY(${effectHOffsetY}) scale(${effectHScale})`};
						box-shadow: ${effectHShadowHO} ${effectHShadowVO} ${effectHShadowBlur} ${effectHShadowSpread} ${effectHShadowColor};  
					}` : ``}
					${entranceAnimation != "none" ? `
					.block-id-${id}.animateOnce {
						animation: ${entranceAnimation} ${entranceAnimationTime}s;
					}` : ``}
					${backgroundNMode === "color" ? `.block-id-${id} .background-color { 
							background-color: ${backgroundNColor};
						}` : ``}
					${backgroundHMode ? `.block-id-${id} .background-hover-color { 
							transition: ${backgroundHTransitionTime}s;
							opacity: 0;
							background-attachment: ${backgroundFixed ? 'fixed' : ''};
							${backgroundHMode === "color" ? `background-color: ${backgroundHColor};` : ``}
							${backgroundHMode === "gradient" ? `background-image: ${backgroundHGradient};` : ``}
							${backgroundHMode === "image" ? `background-position: ${imageHFocus.x * 100}% ${imageHFocus.y * 100}%;
								background-image: url(${imageH.url});` : ``}
						}
						.block-id-${id}:hover .background-hover-color { 
							opacity: 1;
						}
						` : ``}
					${backgroundOMode ? `.block-id-${id} .background-overlay { 
							opacity: ${backgroundOOpacity};
							${backgroundOMode === "color" ? `background-color: ${backgroundOColor};` : ``}
							${backgroundOMode === "gradient" ? `background-image: ${backgroundOGradient};` : ``}
							${backgroundOMode === "image" ? `background-image: url(${imageO.url});` : ``}
							${!(0,_helpers_objEmpty__WEBPACK_IMPORTED_MODULE_9__["default"])(backgroundOCSS) ? `filter: blur(${backgroundOCSS.blur}px) brightness(${backgroundOCSS.brightness}%) contrast(${backgroundOCSS.contrast}%) saturate(${backgroundOCSS.saturation}%) hue-rotate(${backgroundOCSS.hue}deg);` : ``}
							transition: ${backgroundOHTransitionTime}s;
							background-attachment: ${backgroundOFixed ? 'fixed' : ''};
						}
						` : ``}
					${backgroundOHMode ? `.block-id-${id}:hover .background-overlay { 
							opacity: ${backgroundOHOpacity};
							${backgroundOHMode === "color" ? `background-color: ${backgroundOHColor};` : ``}
							${backgroundOHMode === "gradient" ? `background-image: ${backgroundOHGradient};` : ``}
							${backgroundOHMode === "image" ? `background-image: url(${imageOH.url});` : ``}
							${!(0,_helpers_objEmpty__WEBPACK_IMPORTED_MODULE_9__["default"])(backgroundOHCSS) ? `filter: blur(${backgroundOHCSS.blur}px) brightness(${backgroundOHCSS.brightness}%) contrast(${backgroundOHCSS.contrast}%) saturate(${backgroundOHCSS.saturation}%) hue-rotate(${backgroundOHCSS.hue}deg)` : ``}
						}
						` : ``}
					${backgroundNMode === "gradient" ? `.block-id-${id} .background-color { 
							background-image: ${backgroundNGradient};
							background-attachment: ${backgroundFixed ? 'fixed' : ''};
						}` : ``}
					${backgroundNMode === "images" ? `
					${images.length > 1 ? `
					.block-id-${id} .grigora-group-slideshow li span { 
						background-attachment: ${backgroundFixed ? 'fixed' : ''};
						-webkit-backface-visibility: hidden;
						-webkit-animation: imageAnimation-${id} ${images.length * imageDuration}s ${imageLoop ? `infinite` : `1`} 0s ${imageLoop ? `` : `forwards`};
						-moz-animation: imageAnimation-${id} ${images.length * imageDuration}s linear ${imageLoop ? `infinite` : `1`} 0s ${imageLoop ? `` : `forwards`};
						-o-animation: imageAnimation-${id} ${images.length * imageDuration}s linear ${imageLoop ? `infinite` : `1`} 0s ${imageLoop ? `` : `forwards`};
						-ms-animation: imageAnimation-${id} ${images.length * imageDuration}s linear ${imageLoop ? `infinite` : `1`} 0s ${imageLoop ? `` : `forwards`};
						animation: imageAnimation-${id} ${images.length * imageDuration}s linear ${imageLoop ? `infinite` : `1`} 0s ${imageLoop ? `` : `forwards`};
						${imageTransition === "fade" ? `opacity: 0;` : `opacity: 1;`}
						${imageTransition === "slideright" ? `transform: translateX(-100%);` : ``}
						${imageTransition === "slideleft" ? `transform: translateX(100%);` : ``}
						${imageTransition === "slideup" ? `transform: translateY(100%);` : ``}
						${imageTransition === "slidedown" ? `transform: translateY(-100%);` : ``}
					}
					${images.map(function (item, index) {
    return ` .block-id-${id} .grigora-group-slideshow li:nth-child(${index + 1}) span { 
								background-position: ${imageFocus.x * 100}% ${imageFocus.y * 100}%;
								background-image: url(${item.url});
								-webkit-animation-delay: ${index * imageDuration}s;
								-moz-animation-delay: ${index * imageDuration}s;
								-o-animation-delay: ${index * imageDuration}s;
								-ms-animation-delay: ${index * imageDuration}s;
								animation-delay: ${index * imageDuration}s;
							} `;
  }).join(' ')}
					@keyframes imageAnimation-${id} { 
						${imageTransition === "fade" ? `0% { opacity: 0; }` : ``}
						${imageTransition === "slideright" ? `0% { transform: translateX(-100%); }` : ``}
						${imageTransition === "slideleft" ? `0% { transform: translateX(100%); }` : ``}
						${imageTransition === "slideup" ? `0% { transform: translateY(100%); }` : ``}
						${imageTransition === "slidedown" ? `0% { transform: translateY(-100%); }` : ``}
						${(imageTransitionDuration * 100 / (images.length * imageDuration)).toFixed(2)}% {  
							${imageTransition === "fade" ? `opacity: 1;` : ``}
							${imageTransition === "slideright" ? `transform: translateX(0%);` : ``}
							${imageTransition === "slideleft" ? `transform: translateX(0%);` : ``}
							${imageTransition === "slideup" ? `transform: translateY(0%);` : ``}
							${imageTransition === "slidedown" ? `transform: translateY(0%);` : ``}
						}
						${((imageTransitionDuration + imageDuration) * 100 / (images.length * imageDuration)).toFixed(2)}% { 
							${imageTransition === "fade" ? `opacity: 1;` : ``}
							${imageTransition === "slideright" ? `transform: translateX(0%);` : ``}
							${imageTransition === "slideleft" ? `transform: translateX(0%);` : ``}
							${imageTransition === "slideup" ? `transform: translateY(0%);` : ``}
							${imageTransition === "slidedown" ? `transform: translateY(0%);` : ``}
						 }
						${((imageTransitionDuration * 2 + imageDuration) * 100 / (images.length * imageDuration)).toFixed(2)}% { 
							${imageTransition === "fade" ? `${imageLoop ? `opacity: 0` : `opacity: 1`};` : ``}
							${imageTransition === "slideright" ? `${imageLoop ? `transform: translateX(100%)` : `transform: translateX(0%)`};` : ``}
							${imageTransition === "slideleft" ? `${imageLoop ? `transform: translateX(-100%)` : `transform: translateX(0%)`};` : ``}
							${imageTransition === "slideup" ? `${imageLoop ? `transform: translateY(-100%)` : `transform: translateY(0%)`};` : ``}
							${imageTransition === "slidedown" ? `${imageLoop ? `transform: translateY(100%)` : `transform: translateY(0%)`};` : ``}
						}
						100% { 
							${imageTransition === "fade" ? `${imageLoop ? `opacity: 0` : `opacity: 1`};` : ``}
							${imageTransition === "slideright" ? `${imageLoop ? `transform: translateX(100%)` : `transform: translateX(0%)`};` : ``}
							${imageTransition === "slideleft" ? `${imageLoop ? `transform: translateX(-100%)` : `transform: translateX(0%)`};` : ``}
							${imageTransition === "slideup" ? `${imageLoop ? `transform: translateY(-100%)` : `transform: translateY(0%)`};` : ``}
							${imageTransition === "slidedown" ? `${imageLoop ? `transform: translateY(100%)` : `transform: translateY(0%)`};` : ``}
						}
					}` : `${images.map(function (item, index) {
    return ` .block-id-${id} .grigora-group-slideshow li:nth-child(${index + 1}) span { 
								background-position: ${imageFocus.x * 100}% ${imageFocus.y * 100}%;
								background-image: url(${item.url});
								background-attachment: ${backgroundFixed ? 'fixed' : ''};
							} `;
  }).join(' ')}`}
					` : ``}
					
					`), backgroundNMode === "color" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "background-color"
  }), backgroundNMode === "gradient" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "background-color"
  }), backgroundNMode === "images" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    class: "grigora-group-slideshow"
  }, images.map(function (item) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null));
  })), backgroundNMode === "video" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    ref: videoRef,
    autoPlay: true,
    loop: videoLoop ? true : undefined,
    preload: videoPreload
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    src: videoLink,
    type: "video/mp4"
  })), backgroundHMode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "background-hover-color"
  }), backgroundOMode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "background-overlay"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InnerBlocks, {
    renderAppender: hasInnerBlocks ? undefined : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InnerBlocks.ButtonBlockAppender
  }));
}

/***/ }),

/***/ "./src/blocks/group/icon.js":
/*!**********************************!*\
  !*** ./src/blocks/group/icon.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "50",
  height: "50",
  viewBox: "0 0 50 50",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M19.25 4.875V13.5H4.875V4.875H19.25ZM4.875 2C4.1125 2 3.38124 2.3029 2.84207 2.84207C2.3029 3.38124 2 4.1125 2 4.875L2 13.5C2 14.2625 2.3029 14.9938 2.84207 15.5329C3.38124 16.0721 4.1125 16.375 4.875 16.375H19.25C20.0125 16.375 20.7438 16.0721 21.2829 15.5329C21.8221 14.9938 22.125 14.2625 22.125 13.5V4.875C22.125 4.1125 21.8221 3.38124 21.2829 2.84207C20.7438 2.3029 20.0125 2 19.25 2H4.875ZM45.125 36.5V45.125H30.75V36.5H45.125ZM30.75 33.625C29.9875 33.625 29.2562 33.9279 28.7171 34.4671C28.1779 35.0062 27.875 35.7375 27.875 36.5V45.125C27.875 45.8875 28.1779 46.6188 28.7171 47.1579C29.2562 47.6971 29.9875 48 30.75 48H45.125C45.8875 48 46.6188 47.6971 47.1579 47.1579C47.6971 46.6188 48 45.8875 48 45.125V36.5C48 35.7375 47.6971 35.0062 47.1579 34.4671C46.6188 33.9279 45.8875 33.625 45.125 33.625H30.75ZM19.25 25V45.125H4.875V25H19.25ZM4.875 22.125C4.1125 22.125 3.38124 22.4279 2.84207 22.9671C2.3029 23.5062 2 24.2375 2 25L2 45.125C2 45.8875 2.3029 46.6188 2.84207 47.1579C3.38124 47.6971 4.1125 48 4.875 48H19.25C20.0125 48 20.7438 47.6971 21.2829 47.1579C21.8221 46.6188 22.125 45.8875 22.125 45.125V25C22.125 24.2375 21.8221 23.5062 21.2829 22.9671C20.7438 22.4279 20.0125 22.125 19.25 22.125H4.875ZM45.125 4.875V25H30.75V4.875H45.125ZM30.75 2C29.9875 2 29.2562 2.3029 28.7171 2.84207C28.1779 3.38124 27.875 4.1125 27.875 4.875V25C27.875 25.7625 28.1779 26.4938 28.7171 27.0329C29.2562 27.5721 29.9875 27.875 30.75 27.875H45.125C45.8875 27.875 46.6188 27.5721 47.1579 27.0329C47.6971 26.4938 48 25.7625 48 25V4.875C48 4.1125 47.6971 3.38124 47.1579 2.84207C46.6188 2.3029 45.8875 2 45.125 2H30.75Z",
  fill: "url(#paint0_linear_1471_3)"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
  id: "paint0_linear_1471_3",
  x1: "2",
  y1: "25",
  x2: "48",
  y2: "25",
  gradientUnits: "userSpaceOnUse"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
  "stop-color": "#A106E5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
  offset: "1",
  "stop-color": "#8502E9"
}))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (icon);

/***/ }),

/***/ "./src/blocks/group/index.js":
/*!***********************************!*\
  !*** ./src/blocks/group/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/group/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/group/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/group/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/group/block.json");
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icon */ "./src/blocks/group/icon.js");
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
  "layoutPadding": {
    "type": "object",
    "default": {
      "top": "0px",
      "bottom": "0px",
      "left": "0px",
      "right": "0px"
    }
  },
  "layoutMargin": {
    "type": "object",
    "default": {
      "top": "0px",
      "bottom": "0px",
      "left": "0px",
      "right": "0px"
    }
  },
  "backgroundNMode": {
    "type": "string",
    "default": ""
  },
  "backgroundNColor": {
    "type": "string",
    "default": "#ffffff"
  },
  "backgroundNGradient": {
    "type": "string",
    "default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
  },
  "backgroundHMode": {
    "type": "string",
    "default": ""
  },
  "backgroundHColor": {
    "type": "string",
    "default": "#ffffff"
  },
  "backgroundHGradient": {
    "type": "string",
    "default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
  },
  "backgroundHTransitionTime": {
    type: "number",
    default: 0.5
  },
  "backgroundFixed": {
    "type": "boolean",
    "default": false
  },
  "backgroundOMode": {
    "type": "string",
    "default": ""
  },
  "backgroundOColor": {
    "type": "string",
    "default": "#ffffff"
  },
  "backgroundOGradient": {
    "type": "string",
    "default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
  },
  "backgroundOOpacity": {
    type: "number",
    default: 0.5
  },
  "backgroundOCSS": {
    type: "object",
    default: {}
  },
  "backgroundOHMode": {
    "type": "string",
    "default": ""
  },
  "backgroundOHColor": {
    "type": "string",
    "default": "#ffffff"
  },
  "backgroundOHGradient": {
    "type": "string",
    "default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
  },
  "backgroundOHOpacity": {
    type: "number",
    default: 0.5
  },
  "backgroundOHCSS": {
    type: "object",
    default: {}
  },
  "backgroundOHTransitionTime": {
    type: "number",
    default: 0.5
  },
  "backgroundOFixed": {
    "type": "boolean",
    "default": false
  },
  "videoLink": {
    "type": "string",
    "default": ""
  },
  "videoLinkID": {
    "type": "number"
  },
  "videoLoop": {
    "type": "boolean",
    "default": true
  },
  "videoMuted": {
    "type": "boolean",
    "default": true
  },
  "videoPreload": {
    "type": "string",
    "default": "auto"
  },
  "videoPoster": {
    "type": "string",
    "default": ""
  },
  "images": {
    "type": "array",
    "default": []
  },
  "imageH": {
    "type": "object",
    "default": {}
  },
  "imageO": {
    "type": "object",
    "default": {}
  },
  "imageOH": {
    "type": "object",
    "default": {}
  },
  "imageFocus": {
    "type": "object",
    "default": {
      x: 0.5,
      y: 0.5
    }
  },
  "imageHFocus": {
    "type": "object",
    "default": {
      x: 0.5,
      y: 0.5
    }
  },
  "imageLoop": {
    type: "boolean",
    default: true
  },
  "imageDuration": {
    type: "number",
    default: 5
  },
  "imageTransition": {
    type: "string",
    default: "fade"
  },
  "imageTransitionDuration": {
    type: "number",
    default: 0.5
  },
  "structureTag": {
    type: "string",
    default: "div"
  },
  "structureMaxWidth": {
    type: "string",
    default: ""
  },
  "structureMinHeight": {
    type: "string",
    default: ""
  },
  "effectNBFlag": {
    "type": "boolean",
    "default": false
  },
  "effectNBGradient": {
    "type": "string",
    "default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
  },
  "effectNBColor": {
    "type": "string",
    "default": "#5093d4"
  },
  "effectNRotateX": {
    "type": "string",
    "default": '0deg'
  },
  "effectNRotateY": {
    "type": "string",
    "default": '0deg'
  },
  "effectNRotateZ": {
    "type": "string",
    "default": '0deg'
  },
  "effectNSkewX": {
    "type": "string",
    "default": '0deg'
  },
  "effectNSkewY": {
    "type": "string",
    "default": '0deg'
  },
  "effectNOffsetX": {
    "type": "string",
    "default": "0px"
  },
  "effectNOffsetY": {
    "type": "string",
    "default": "0px"
  },
  "effectNScale": {
    "type": "number",
    "default": 1
  },
  "effectNBorder": {
    "type": "object",
    "default": {
      "top": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      },
      "bottom": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      },
      "right": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      },
      "left": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      }
    }
  },
  "effectNBorderRadius": {
    "type": "object",
    "default": {
      "topLeft": "0px",
      "topRight": "0px",
      "bottomLeft": "0px",
      "bottomRight": "0px"
    }
  },
  "effectNShadowHO": {
    "type": "string",
    "default": "0px"
  },
  "effectNShadowVO": {
    "type": "string",
    "default": "0px"
  },
  "effectNShadowBlur": {
    "type": "string",
    "default": "0px"
  },
  "effectNShadowSpread": {
    "type": "string",
    "default": "0px"
  },
  "effectNShadowColor": {
    "type": "string",
    "default": "#000"
  },
  "hoverEffect": {
    "type": "boolean",
    "default": false
  },
  "effectHAnimation": {
    "type": "string",
    "default": "none"
  },
  "effectHColor": {
    "type": "string",
    "default": "#fff"
  },
  "effectHBFlag": {
    "type": "boolean",
    "default": false
  },
  "effectHBGradient": {
    "type": "string",
    "default": "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
  },
  "effectHBColor": {
    "type": "string",
    "default": "#5093d4"
  },
  "transitionTime": {
    "type": "number",
    "default": 1
  },
  "effectHRotateX": {
    "type": "string",
    "default": '0deg'
  },
  "effectHRotateY": {
    "type": "string",
    "default": '0deg'
  },
  "effectHRotateZ": {
    "type": "string",
    "default": '0deg'
  },
  "effectHSkewX": {
    "type": "string",
    "default": '0deg'
  },
  "effectHSkewY": {
    "type": "string",
    "default": '0deg'
  },
  "effectHOffsetX": {
    "type": "string",
    "default": '0px'
  },
  "effectHOffsetY": {
    "type": "string",
    "default": '0px'
  },
  "effectHScale": {
    "type": "number",
    "default": 1
  },
  "effectHBorder": {
    "type": "object",
    "default": {
      "top": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      },
      "bottom": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      },
      "right": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      },
      "left": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      }
    }
  },
  "effectHBorderRadius": {
    "type": "object",
    "default": {
      "topLeft": "0px",
      "topRight": "0px",
      "bottomLeft": "0px",
      "bottomRight": "0px"
    }
  },
  "effectHShadow": {
    "type": "boolean",
    "default": false
  },
  "effectHShadowHO": {
    "type": "string",
    "default": "0px"
  },
  "effectHShadowVO": {
    "type": "string",
    "default": "0px"
  },
  "effectHShadowBlur": {
    "type": "string",
    "default": "0px"
  },
  "effectHShadowSpread": {
    "type": "string",
    "default": "0px"
  },
  "effectHShadowColor": {
    "type": "string",
    "default": "#000"
  },
  "hideDesktop": {
    "type": "boolean",
    "default": false
  },
  "hideTablet": {
    "type": "boolean",
    "default": false
  },
  "hideMobile": {
    "type": "boolean",
    "default": false
  },
  "textNColor": {
    "type": "string",
    "default": ""
  },
  "linkNColor": {
    "type": "string",
    "default": ""
  },
  "textHColor": {
    "type": "string",
    "default": ""
  },
  "linkHColor": {
    "type": "string",
    "default": ""
  },
  "entranceAnimation": {
    "type": "string",
    "default": "none"
  },
  "entranceAnimationTime": {
    "type": "number",
    "default": 1
  }
};
const supports = {
  "anchor": true,
  "className": false
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
  supports,
  icon: _icon__WEBPACK_IMPORTED_MODULE_5__["default"]
});

/***/ }),

/***/ "./src/blocks/group/save.js":
/*!**********************************!*\
  !*** ./src/blocks/group/save.js ***!
  \**********************************/
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



function save(_ref) {
  let {
    attributes
  } = _ref;
  const {
    id,
    layoutPadding,
    layoutMargin,
    backgroundNMode,
    backgroundNColor,
    backgroundNGradient,
    backgroundHMode,
    backgroundHColor,
    backgroundHGradient,
    backgroundHTransitionTime,
    backgroundFixed,
    backgroundOMode,
    backgroundOColor,
    backgroundOGradient,
    backgroundOOpacity,
    backgroundOCSS,
    backgroundOHMode,
    backgroundOHColor,
    backgroundOHGradient,
    backgroundOHOpacity,
    backgroundOHCSS,
    backgroundOHTransitionTime,
    backgroundOFixed,
    videoLink,
    videoLinkID,
    videoLoop,
    videoMuted,
    videoPreload,
    videoPoster,
    images,
    imageH,
    imageO,
    imageOH,
    imageFocus,
    imageHFocus,
    imageLoop,
    imageDuration,
    imageTransition,
    imageTransitionDuration,
    structureTag,
    structureMaxWidth,
    structureMinHeight,
    effectNBFlag,
    effectNRotateX,
    effectNRotateY,
    effectNRotateZ,
    effectNSkewX,
    effectNSkewY,
    effectNOffsetX,
    effectNOffsetY,
    effectNScale,
    effectNBorder,
    effectNBorderRadius,
    effectNShadowHO,
    effectNShadowVO,
    effectNShadowBlur,
    effectNShadowSpread,
    effectNShadowColor,
    hoverEffect,
    effectHAnimation,
    effectHColor,
    effectHBColor,
    transitionTime,
    effectHRotateX,
    effectHRotateY,
    effectHRotateZ,
    effectHSkewX,
    effectHSkewY,
    effectHOffsetX,
    effectHOffsetY,
    effectHScale,
    effectHBorder,
    effectHBorderRadius,
    effectHShadowHO,
    effectHShadowVO,
    effectHShadowBlur,
    effectHShadowSpread,
    effectHShadowColor,
    hideDesktop,
    hideTablet,
    hideMobile,
    textNColor,
    linkNColor,
    textHColor,
    linkHColor,
    entranceAnimation,
    entranceAnimationTime
  } = attributes;
  const groupClasses = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
    "wp-block-grigora-kit-group": true,
    "wp-block-group": true,
    "grigora-kit-group-wrapper": true,
    [`block-id-${id}`]: id,
    [`animateOnce`]: entranceAnimation != "none",
    [`has-entrance-animation animateOnce`]: entranceAnimation != "none",
    "has-custom-background": backgroundNMode || backgroundHMode || backgroundOMode || backgroundOHMode
  });
  console.log(backgroundNMode);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
    className: groupClasses
  }), backgroundNMode === "color" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "background-color"
  }), backgroundNMode === "gradient" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "background-color"
  }), backgroundNMode === "images" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    class: "grigora-group-slideshow"
  }, images.map(function (item) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null));
  })), backgroundNMode === "video" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    autoPlay: true,
    loop: videoLoop ? true : undefined,
    preload: videoPreload
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    src: videoLink,
    type: "video/mp4"
  })), backgroundHMode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "background-hover-color"
  }), backgroundOMode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "background-overlay"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "inner-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null)));
}

/***/ }),

/***/ "./src/components/borderbox-input/index.js":
/*!*************************************************!*\
  !*** ./src/components/borderbox-input/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");
/* harmony import */ var _helpers_compareObj__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @helpers/compareObj */ "./src/helpers/compareObj.js");






function GrigoraBorderBoxInput(_ref) {
  let {
    value,
    onChange,
    label = "",
    resetValue = {
      "top": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      },
      "bottom": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      },
      "right": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      },
      "left": {
        color: '#72aee6',
        style: 'dashed',
        width: '0px'
      }
    }
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-borderbox-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-borderbox-input__label"
  }, label), !(0,_helpers_compareObj__WEBPACK_IMPORTED_MODULE_4__["default"])(value, resetValue) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-borderbox-input__select"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBorderBoxControl, {
    onChange: onChange,
    value: value
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraBorderBoxInput);

/***/ }),

/***/ "./src/components/borderradius-input/index.js":
/*!****************************************************!*\
  !*** ./src/components/borderradius-input/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");
/* harmony import */ var _helpers_compareObj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @helpers/compareObj */ "./src/helpers/compareObj.js");







function GrigoraBorderRadiusInput(_ref) {
  let {
    values,
    onChange,
    label = "",
    resetValue = {
      "topLeft": "4px",
      "topRight": "4px",
      "bottomLeft": "4px",
      "bottomRight": "4px"
    }
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-borderradius-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4,
    className: `grigora-borderradius-input__hstack`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-borderradius-input__label"
  }, label), !(0,_helpers_compareObj__WEBPACK_IMPORTED_MODULE_5__["default"])(values, resetValue) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-borderradius-input__select"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderRadiusControl, {
    onChange: onChange,
    values: values
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraBorderRadiusInput);

/***/ }),

/***/ "./src/components/box-input/index.js":
/*!*******************************************!*\
  !*** ./src/components/box-input/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");
/* harmony import */ var _helpers_compareObj__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @helpers/compareObj */ "./src/helpers/compareObj.js");






function GrigoraBoxInput(_ref) {
  let {
    values,
    onChange,
    label = "",
    resetValue = {
      "top": {
        "top": "15px",
        "bottom": "15px",
        "left": "30px",
        "right": "30px"
      }
    }
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-box-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-box-input__label"
  }, label), !(0,_helpers_compareObj__WEBPACK_IMPORTED_MODULE_4__["default"])(values, resetValue) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-box-input__select"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
    allowReset: false,
    onChange: onChange,
    values: values
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraBoxInput);

/***/ }),

/***/ "./src/components/color-input/index.js":
/*!*********************************************!*\
  !*** ./src/components/color-input/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");







function GrigoraColorInput(_ref) {
  let {
    value,
    onChange,
    label = "",
    resetValue = "#000"
  } = _ref;
  const palette = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useSetting)('color.palette');
  const [openPopOver, setOpenPopOver] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-color-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-color-input__label"
  }), value != resetValue && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-color-input__colorselect",
    onClick: () => {
      setOpenPopOver(true);
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
    colorValue: value
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-color-input__label"
  }, label))), openPopOver && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    placement: "left-center",
    onClose: () => {
      setOpenPopOver(false);
    },
    anchorRef: ref === null || ref === void 0 ? void 0 : ref.current,
    className: `grigora-color-input__popover`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
    clearable: false,
    value: value,
    onChange: onChange,
    disableCustomColors: false,
    showTitle: false,
    colors: palette.map(color => {
      return {
        color: `var(--wp--preset--color--${color.slug})`,
        name: color.name
      };
    })
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraColorInput);

/***/ }),

/***/ "./src/components/cssfilter-input/index.js":
/*!*************************************************!*\
  !*** ./src/components/cssfilter-input/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");
/* harmony import */ var _helpers_compareObj__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @helpers/compareObj */ "./src/helpers/compareObj.js");







function GrigoraCSSFilterInput(_ref) {
  let {
    value,
    setValue,
    label = "",
    resetValue = {}
  } = _ref;
  const [openPopOver, setOpenPopOver] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [blur, setBlur] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(value.blur ? value.blur : 5);
  const [brightness, setBrightness] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(value.brightness ? value.brightness : 100);
  const [contrast, setContrast] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(value.contrast ? value.contrast : 100);
  const [saturation, setSaturation] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(value.saturation ? value.saturation : 135);
  const [hue, setHue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(value.hue ? value.hue : 191);

  function updateValues() {
    setValue({
      blur,
      brightness,
      contrast,
      saturation,
      hue
    });
  }

  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (blur == 5 && brightness == 100 && contrast == 100 && saturation == 135 && hue == 191) {
      setValue(resetValue);
    } else {
      updateValues();
    }
  }, [blur, brightness, contrast, saturation, hue]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-cssfilter-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-cssfilter-input__label"
  }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, !(0,_helpers_compareObj__WEBPACK_IMPORTED_MODULE_4__["default"])(value, resetValue) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: () => {
      setValue(resetValue);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isSmall: true,
    variant: "secondary",
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
      icon: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16",
        fill: "currentColor",
        viewBox: "0 0 16 16"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
      }))
    }),
    onClick: () => {
      setOpenPopOver(true);

      if ((0,_helpers_compareObj__WEBPACK_IMPORTED_MODULE_4__["default"])(value, resetValue)) {
        updateValues();
      }
    }
  }), openPopOver && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    placement: "left-center",
    onClose: () => {
      setOpenPopOver(false);
    },
    anchorRef: ref === null || ref === void 0 ? void 0 : ref.current,
    className: `grigora-cssfilter-input__popover`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    value: blur,
    onChange: value => setBlur(value),
    min: 0,
    max: 10,
    withInputField: false,
    step: 0.1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Blur', "grigora-kit"),
    className: `grigora-range-input__blur`
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    value: brightness,
    onChange: value => setBrightness(value),
    min: 0,
    max: 200,
    withInputField: false,
    step: 1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Brightness', "grigora-kit"),
    className: `grigora-range-input__brightness`
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    value: contrast,
    onChange: value => setContrast(value),
    min: 0,
    max: 200,
    withInputField: false,
    step: 1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Contrast', "grigora-kit"),
    className: `grigora-range-input__contrast`
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    value: saturation,
    onChange: value => setSaturation(value),
    min: 0,
    max: 200,
    withInputField: false,
    step: 1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saturation', "grigora-kit"),
    className: `grigora-range-input__saturation`
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    value: hue,
    onChange: value => setHue(value),
    min: 0,
    max: 360,
    withInputField: false,
    step: 1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hue', "grigora-kit"),
    className: `grigora-range-input__hue`
  })))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraCSSFilterInput);

/***/ }),

/***/ "./src/components/gradient-input/index.js":
/*!************************************************!*\
  !*** ./src/components/gradient-input/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");





function GrigoraGradientInput(_ref) {
  let {
    value,
    onChange,
    label = "",
    resetValue = "linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)"
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-gradient-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-gradient-input__label"
  }, label), value != resetValue && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-gradient-input__select"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.GradientPicker, {
    value: value,
    onChange: onChange,
    clearable: false
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraGradientInput);

/***/ }),

/***/ "./src/components/radio-input/index.js":
/*!*********************************************!*\
  !*** ./src/components/radio-input/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");





function GrigoraRadioInput(_ref) {
  let {
    value,
    onChange,
    radios,
    label = "",
    resetValue = ""
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-radio-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-radio-input__label"
  }, label), value != resetValue && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-radio-input__radiobox"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalRadioGroup, {
    label: "Width",
    onChange: onChange,
    checked: value
  }, radios.map(function (item) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalRadio, {
      value: item.value
    }, item.text);
  }))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraRadioInput);

/***/ }),

/***/ "./src/components/range-input/index.js":
/*!*********************************************!*\
  !*** ./src/components/range-input/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");






function GrigoraRangeInput(_ref) {
  let {
    value,
    setValue,
    step = 1,
    min = 0,
    max = 100,
    unit = "px",
    label = "",
    resetValue = 0
  } = _ref;
  value = Number(value);

  if (isNaN(value)) {
    value = resetValue;
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `grigora-range-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "grigora-range-input__label"
  }, label), value != resetValue && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onClick: () => {
      setValue(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    spacing: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    value: value,
    onChange: setValue,
    min: min,
    max: max,
    withInputField: false,
    step: step,
    className: `grigora-range-input__slider`
  }, value == resetValue && {
    initialPosition: min
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNumberControl, {
    isShiftStepEnabled: true,
    onChange: setValue,
    shiftStep: step,
    step: step,
    value: value,
    hideHTMLArrows: true,
    min: min,
    max: max
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "grigora-range-input__unit"
  }, unit)));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraRangeInput);

/***/ }),

/***/ "./src/components/reset-button/index.js":
/*!**********************************************!*\
  !*** ./src/components/reset-button/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);



function GrigoraResetButton(_ref) {
  let {
    onClick
  } = _ref;

  function ResetIcon() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
      icon: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16",
        fill: "currentColor",
        viewBox: "0 0 16 16"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        "fill-rule": "evenodd",
        d: "M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
      }))
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isSmall: true,
    icon: ResetIcon,
    onClick: onClick
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraResetButton);

/***/ }),

/***/ "./src/components/select-input/index.js":
/*!**********************************************!*\
  !*** ./src/components/select-input/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");





function GrigoraSelectInput(_ref) {
  let {
    value,
    onChange,
    options,
    label = "",
    resetValue = "none"
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-select-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-select-input__label"
  }, label), value != resetValue && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-select-input__select"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    onChange: onChange,
    value: value,
    options: options
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraSelectInput);

/***/ }),

/***/ "./src/components/text-input/index.js":
/*!********************************************!*\
  !*** ./src/components/text-input/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");





function GrigoraTextInput(_ref) {
  let {
    value,
    onChange,
    options,
    label = "",
    resetValue = ""
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-text-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-text-input__label"
  }, label), value != resetValue && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-text-input__textbox"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    onChange: onChange,
    value: value
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraTextInput);

/***/ }),

/***/ "./src/components/toggle-input/index.js":
/*!**********************************************!*\
  !*** ./src/components/toggle-input/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");





function GrigoraToggleInput(_ref) {
  let {
    value,
    onChange,
    help,
    label = "",
    resetValue = false
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `grigora-toggle-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-toggle-input__label"
  }), value != resetValue && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grigora-toggle-input__togglebox"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: label,
    checked: !!value,
    onChange: onChange,
    help: help
  })));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraToggleInput);

/***/ }),

/***/ "./src/components/unit-input/index.js":
/*!********************************************!*\
  !*** ./src/components/unit-input/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_reset_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/reset-button */ "./src/components/reset-button/index.js");
/* harmony import */ var _helpers_objEmpty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @helpers/objEmpty */ "./src/helpers/objEmpty.js");







function GrigoraUnitInput(_ref) {
  let {
    value,
    onChange,
    units = {},
    label = "",
    resetValue = "0px"
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `grigora-unit-input`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    spacing: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "grigora-unit-input__label"
  }, label), value != resetValue && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_reset_button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onClick: () => {
      onChange(resetValue);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "grigora-unit-input__select"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUnitControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    value: value,
    onChange: onChange
  }, !(0,_helpers_objEmpty__WEBPACK_IMPORTED_MODULE_5__["default"])(units) && {
    units: units
  }))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrigoraUnitInput);

/***/ }),

/***/ "./src/constants/index.js":
/*!********************************!*\
  !*** ./src/constants/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ENTRANCE_ANIMATIONS": () => (/* binding */ ENTRANCE_ANIMATIONS),
/* harmony export */   "FONT_WEIGHTS": () => (/* binding */ FONT_WEIGHTS),
/* harmony export */   "HOVER_ANIMATIONS": () => (/* binding */ HOVER_ANIMATIONS),
/* harmony export */   "ICON_POSITIONS": () => (/* binding */ ICON_POSITIONS),
/* harmony export */   "TEXT_DECORATION": () => (/* binding */ TEXT_DECORATION),
/* harmony export */   "TEXT_STYLE": () => (/* binding */ TEXT_STYLE),
/* harmony export */   "TEXT_TRANSFORMS": () => (/* binding */ TEXT_TRANSFORMS)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

const HOVER_ANIMATIONS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', "grigora-kit"),
  value: "none"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bounce', "grigora-kit"),
  value: "bounce"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Flash', "grigora-kit"),
  value: "flash"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pulse', "grigora-kit"),
  value: "pulse"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Rubber Band', "grigora-kit"),
  value: "rubberBand"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shake X', "grigora-kit"),
  value: "shakeX"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shake Y', "grigora-kit"),
  value: "shakeY"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Head Shake', "grigora-kit"),
  value: "headShake"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Swing', "grigora-kit"),
  value: "swing"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tada', "grigora-kit"),
  value: "tada"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Wobble', "grigora-kit"),
  value: "wobble"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Jello', "grigora-kit"),
  value: "jello"
}];
const ENTRANCE_ANIMATIONS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', "grigora-kit"),
  value: "none"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bounce', "grigora-kit"),
  value: "bounce"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('backInDown', "grigora-kit"),
  value: "backInDown"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('backInLeft', "grigora-kit"),
  value: "backInLeft"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('backInRight', "grigora-kit"),
  value: "backInRight"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('backInUp', "grigora-kit"),
  value: "backInUp"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('bounceIn', "grigora-kit"),
  value: "bounceIn"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('bounceInDown', "grigora-kit"),
  value: "bounceInDown"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('bounceInLeft', "grigora-kit"),
  value: "bounceInLeft"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('bounceInRight', "grigora-kit"),
  value: "bounceInRight"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('bounceInUp', "grigora-kit"),
  value: "bounceInUp"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeIn', "grigora-kit"),
  value: "fadeIn"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInDown', "grigora-kit"),
  value: "fadeInDown"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInDownBig', "grigora-kit"),
  value: "fadeInDownBig"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInDown', "grigora-kit"),
  value: "fadeInDown"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInLeft', "grigora-kit"),
  value: "fadeInLeft"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInLeftBig', "grigora-kit"),
  value: "fadeInLeftBig"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInRight', "grigora-kit"),
  value: "fadeInRight"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInRightBig', "grigora-kit"),
  value: "fadeInRightBig"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInUp', "grigora-kit"),
  value: "fadeInUp"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInUpBig', "grigora-kit"),
  value: "fadeInUpBig"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInTopLeft', "grigora-kit"),
  value: "fadeInTopLeft"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInTopRight', "grigora-kit"),
  value: "fadeInTopRight"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInBottomLeft', "grigora-kit"),
  value: "fadeInBottomLeft"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('fadeInBottomRight', "grigora-kit"),
  value: "fadeInBottomRight"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('rotateIn', "grigora-kit"),
  value: "rotateIn"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('rotateInDownLeft', "grigora-kit"),
  value: "rotateInDownLeft"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('rotateInUpLeft', "grigora-kit"),
  value: "rotateInUpLeft"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('rotateInUpRight', "grigora-kit"),
  value: "rotateInUpRight"
}];
const ICON_POSITIONS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Left', "grigora-kit"),
  value: "left"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Right', "grigora-kit"),
  value: "right"
}];
const TEXT_TRANSFORMS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("None", "grigora-kit"),
  value: "none"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Capitalize", "grigora-kit"),
  value: "capitalize"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Uppercase", "grigora-kit"),
  value: "uppercase"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Lowercase", "grigora-kit"),
  value: "lowercase"
}];
const TEXT_STYLE = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Normal", "grigora-kit"),
  value: "normal"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Italic", "grigora-kit"),
  value: "italic"
}];
const TEXT_DECORATION = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Default", "grigora-kit"),
  value: "initial"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Overline", "grigora-kit"),
  value: "overline"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Line Through", "grigora-kit"),
  value: "line-through"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Underline", "grigora-kit"),
  value: "underline"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Underline Overline", "grigora-kit"),
  value: "underline overline"
}];
const FONT_WEIGHTS = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];

/***/ }),

/***/ "./src/helpers/compareObj.js":
/*!***********************************!*\
  !*** ./src/helpers/compareObj.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function isObject(object) {
  return object != null && typeof object === 'object';
}

function deepEqualObj(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);

    if (areObjects && !deepEqualObj(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }

  return true;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deepEqualObj);

/***/ }),

/***/ "./src/helpers/generateId.js":
/*!***********************************!*\
  !*** ./src/helpers/generateId.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prefix => {
  return `${prefix}-${new Date().getTime()}`;
});

/***/ }),

/***/ "./src/helpers/objEmpty.js":
/*!*********************************!*\
  !*** ./src/helpers/objEmpty.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEmpty);

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

/***/ "./src/blocks/group/editor.scss":
/*!**************************************!*\
  !*** ./src/blocks/group/editor.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/group/style.scss":
/*!*************************************!*\
  !*** ./src/blocks/group/style.scss ***!
  \*************************************/
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

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

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

/***/ "./src/blocks/group/block.json":
/*!*************************************!*\
  !*** ./src/blocks/group/block.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"grigora-kit/group","version":"0.1.0","title":"Advanced Group","category":"grigora-kit","description":"Group to keep items in place.","textdomain":"grigora-kit","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 			"blocks/group/index": 0,
/******/ 			"blocks/group/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/group/style-index"], () => (__webpack_require__("./src/blocks/group/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map