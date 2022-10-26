import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
	BlockVerticalAlignmentToolbar,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentControl,
	MediaUpload,
	useSetting,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	TabPanel as WPTabPanel,
	PanelBody,
	Button,
	ToggleControl,
	FocalPointPicker,
	Tooltip,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	Toolbar,
	ToolbarButton,
    TextControl
} from '@wordpress/components';
import { useRef, useEffect } from '@wordpress/element';
import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';

import InspectorTabs from '@components/inspector-tabs';
import GrigoraTypographyInput from '@components/typography-input';
import GrigoraToggleInput from '@components/toggle-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraRangeInput from '@components/range-input';
import Googlefontloader from '@components/googlefontloader';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraTextInput from '@components/text-input';
import parse from 'html-react-parser';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const { 
		id,
		actionForSubmit,
		reCaptcha,
		reCaptchaVersion,
		siteKey,
		secretKey,
		titleAlign,
		descriptionAlign,
		TitleTag,
		titleText,
		titleTypoSize,
		titleTypoDecoration,
		titleTypoFontFamily,
		titleTypoLetterSpacing,
		titleTypoLineHeight,
		titleTypoStyle,
		titleTypoTransform,
		titleTypoWeight,
		titleTypoWordSpacing,
		titleTextColor,
		titleTextHColor,
		transitionTitleColorTime,
		titleBgColor,
		titleBgHColor,
		titlePadding,
		descriptionToggle,
		DescriptionTag,
		descriptionText,
		descriptionTypoSize,
		descriptionTypoDecoration,
		descriptionTypoFontFamily,
		descriptionTypoLetterSpacing,
		descriptionTypoLineHeight,
		descriptionTypoStyle,
		descriptionTypoTransform,
		descriptionTypoWeight,
		descriptionTypoWordSpacing,
		descriptionTextColor,
		descriptionTextHColor,
		transitionDescriptionColorTime,
		descriptionBgColor,
		descriptionBgHColor,
		descriptionPadding,
		gap,
		labelTypoSize,
		labelTypoDecoration,
		labelTypoFontFamily,
		labelTypoLetterSpacing,
		labelTypoLineHeight,
		labelTypoStyle,
		labelTypoTransform,
		labelTypoWeight,
		labelTypoWordSpacing,
		labelTextColor,
		labelTextHColor,
		transitionLabelColorTime,
		labelBgColor,
		labelBgHColor,
		labelPadding,
		buttonTypoSize,
		buttonTypoDecoration,
		buttonTypoFontFamily,
		buttonTypoLetterSpacing,
		buttonTypoLineHeight,
		buttonTypoStyle,
		buttonTypoTransform,
		buttonTypoWeight,
		buttonTypoWordSpacing,
		buttonTextColor,
		buttonTextHColor,
		transitionButtonColorTime,
		buttonBgColor,
		buttonBgHColor,
		buttonPadding,
		buttonNShadowHO,
		buttonNShadowVO,
		buttonNShadowBlur,
		buttonNShadowSpread,
		buttonNShadowColor,
		buttonHShadowHO,
		buttonHShadowVO,
		buttonHShadowBlur,
		buttonHShadowSpread,
		buttonHShadowColor,
		transitionButtonShadowTime,
		transitionButtonBorderTime,
		buttonNBorder,
		buttonHBorder,
		buttonNBorderRadius,
		buttonHBorderRadius,
		fieldTypoSize,
		fieldTypoDecoration,
		fieldTypoFontFamily,
		fieldTypoLetterSpacing,
		fieldTypoLineHeight,
		fieldTypoStyle,
		fieldTypoTransform,
		fieldTypoWeight,
		fieldTypoWordSpacing,
		fieldTextColor,
		fieldTextHColor,
		transitionFieldColorTime,
		fieldBgColor,
		fieldBgHColor,
		fieldPadding,
		fieldNShadowHO,
		fieldNShadowVO,
		fieldNShadowBlur,
		fieldNShadowSpread,
		fieldNShadowColor,
		fieldHShadowHO,
		fieldHShadowVO,
		fieldHShadowBlur,
		fieldHShadowSpread,
		fieldHShadowColor,
		transitionFieldShadowTime,
		transitionFieldBorderTime,
		fieldNBorder,
		fieldHBorder,
		fieldNBorderRadius,
		fieldHBorderRadius,
		checkboxBgColor,
		checkboxBgHColor,
		transitionCheckboxColorTime,
		checkboxPadding,
		checkboxNShadowHO,
		checkboxNShadowVO,
		checkboxNShadowBlur,
		checkboxNShadowSpread,
		checkboxNShadowColor,
		checkboxHShadowHO,
		checkboxHShadowVO,
		checkboxHShadowBlur,
		checkboxHShadowSpread,
		checkboxHShadowColor,
		transitionCheckboxShadowTime,
		transitionCheckboxBorderTime,
		checkboxNBorder,
		checkboxHBorder,
		checkboxNBorderRadius,
		checkboxHBorderRadius,
		selectTypoSize,
		selectTypoDecoration,
		selectTypoFontFamily,
		selectTypoLetterSpacing,
		selectTypoLineHeight,
		selectTypoStyle,
		selectTypoTransform,
		selectTypoWeight,
		selectTypoWordSpacing,
		selectTextColor,
		selectTextHColor,
		selectBgColor,
		selectBgHColor,
		selectPadding,
		selectNShadowHO,
		selectNShadowVO,
		selectNShadowBlur,
		selectNShadowSpread,
		selectNShadowColor,
		selectHShadowHO,
		selectHShadowVO,
		selectHShadowBlur,
		selectHShadowSpread,
		selectHShadowColor,
		transitionSelectColorTime,
		transitionSelectShadowTime,
		transitionSelectBorderTime,
		selectNBorder,
		selectHBorder,
		selectNBorderRadius,
		selectHBorderRadius,
		dateColor,
		dateHColor,
		dateBgColor,
		dateBgHColor,
		transitionDateColorTime,
		datePadding,
		dateNShadowHO,
		dateNShadowVO,
		dateNShadowBlur,
		dateNShadowSpread,
		dateNShadowColor,
		dateHShadowHO,
		dateHShadowVO,
		dateHShadowBlur,
		dateHShadowSpread,
		dateHShadowColor,
		transitionDateShadowTime,
		transitionDateBorderTime,
		dateNBorder,
		dateHBorder,
		dateNBorderRadius,
		dateHBorderRadius,
	} = attributes;

	const newTabIcon =
		"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" fill=\"currentColor\" class=\"bi bi-box-arrow-up-right\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z\"/>\n  <path fill-rule=\"evenodd\" d=\"M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z\"/>\n</svg>"


	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'forms' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'forms' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

    const { hasInnerBlocks, themeSupportsLayout } = useSelect(
		( select ) => {
			const { getBlock, getSettings } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
				themeSupportsLayout: getSettings()?.supportsLayout,
			};
		},
		[ clientId ]
	);

    const ALLOWED_BLOCKS = [ 
		'grigora-kit/form-email',
		'grigora-kit/form-text',
		'grigora-kit/form-textarea',
		'grigora-kit/form-checkbox',
		'grigora-kit/form-select',
		'grigora-kit/form-radio',
		'grigora-kit/form-hidden',
		'grigora-kit/form-submit',
		'grigora-kit/form-date'
	];

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-forms': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

    const innerBlocksProps = useInnerBlocksProps(
		{
			className: classnames( {
				'form-options': true,
			} ),
		},
        {
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
		}
	);

	function generalSettings() { 
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

					<GrigoraRangeInput
						value={ gap }
						setValue={ ( gap ) => {
							setAttributes( { gap } );
						} }
						label={ `Gap` }
						resetValue={ 5 }
					/>

					<GrigoraToggleInput
						label={ __( 'Show Description', 'grigora-kit' ) }
						value={ descriptionToggle }
						onChange={ ( descriptionToggle ) =>
							setAttributes( { descriptionToggle } )
						}
					/>

					<br/>

					<PanelBody title={ __( 'Google reCAPTCHA', 'grigora-kit' ) }
						initialOpen={ false }
					>

						<GrigoraToggleInput
							label={ __( 'Enable Google reCAPTCHA', 'grigora-kit' ) }
							value={ reCaptcha }
							onChange={ ( reCaptcha ) =>
								setAttributes( { reCaptcha } )
							}
						/>

						{
							reCaptcha &&
							<>

								<br/>

								<GrigoraSelectInput
									label={ __( 'Recaptcha Version', 'grigora-kit' ) }
									labelPosition="side"
									onChange={ ( reCaptchaVersion ) => setAttributes( {  reCaptchaVersion } ) }
									value={  reCaptchaVersion }
									options={ [
										{ label: 'V3', value: 'V3' },
										{ label: 'V2', value: 'V2' }
									] }
									resetValue={ 'V3' }
								/>

								<div style={{marginTop: '16px', marginBottom: '16px'}}>

									<a href='https://www.google.com/recaptcha/admin/create' target='_blank'>
										{ __('Get Keys', 'grigora-kit' ) } 
										<span> { parse( newTabIcon ) } </span>
									</a> 

									<span> {'   |   '} </span>

									<a href='https://developers.google.com/recaptcha/docs/v3' target='_blank'>
										{ __('Get Help', 'grigora-kit' ) } 
										<span> { parse( newTabIcon ) } </span>
									</a>

								</div>

								<GrigoraTextInput 
									label={ __( 'Site Key', 'grigora-kit' ) }
									onChange={ ( siteKey ) => setAttributes( { siteKey } ) }
									value={ siteKey }
									resetValue={ '' }
								/>

								<GrigoraTextInput 
									label={ __( 'Secret Key', 'grigora-kit' ) }
									onChange={ ( secretKey ) => setAttributes( { secretKey } ) }
									value={ secretKey }
									resetValue={ '' }
								/>

								<button 
									disabled={ (siteKey && secretKey) ? false : true}
									className='button-styling'
									style={{backgroundColor: ( (siteKey && secretKey) ?  '#1768ea' : 'gray' )}}
								>
									{ __( 'Save', 'grigora-kit' ) }
								</button>

							</>
						}

					</PanelBody>

					<PanelBody title={ __( 'Title Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>

						<GrigoraSelectInput
							label={ __( 'Title Tag', 'grigora-kit' ) }
							labelPosition="side"
							onChange={ ( TitleTag ) =>
								setAttributes( { TitleTag } )
							}
							value={ TitleTag }
							options={ [
								'h1',
								'h2',
								'h3',
								'h4',
								'h5',
								'h6',
								'p',
								'span',
								'div',
							].map( function ( item ) {
								return {
									label: item,
									value: item,
								};
							} ) }
							resetValue={ 'h3' }
						/>

						<GrigoraSelectInput
							label={ __( 'Alignment', 'grigora-kit' ) }
							labelPosition="side"
							onChange={ ( titleAlign ) => setAttributes( { titleAlign } ) }
							value={ titleAlign }
							options={ [
								{ label: 'Left', value: 'start' },
								{ label: 'Center', value: 'center' },
								{ label: 'Right', value: 'end' },
							] }
							resetValue={ 'start' }
						/>

						<br/>

						<GrigoraTypographyInput
							label={ __( 'Typography', 'grigora-kit' ) }
							size={ titleTypoSize }
							sizeChange={ ( titleTypoSize ) => {
								setAttributes( { titleTypoSize } );
							} }
							sizeReset={ 16 }
							lineHeight={ titleTypoLineHeight }
							lineHeightChange={ ( titleTypoLineHeight ) => {
								setAttributes( {
									titleTypoLineHeight:
										titleTypoLineHeight.toString(),
								} );
							} }
							letterSpacing={ titleTypoLetterSpacing }
							letterSpacingChange={ ( titleTypoLetterSpacing ) => {
								setAttributes( {
									titleTypoLetterSpacing:
										titleTypoLetterSpacing.toString(),
								} );
							} }
							wordSpacing={ titleTypoWordSpacing }
							wordSpacingChange={ ( titleTypoWordSpacing ) => {
								setAttributes( {
									titleTypoWordSpacing:
										titleTypoWordSpacing.toString(),
								} );
							} }
							transform={ titleTypoTransform }
							transformChange={ ( titleTypoTransform ) =>
								setAttributes( { titleTypoTransform } )
							}
							style={ titleTypoStyle }
							styleChange={ ( titleTypoStyle ) =>
								setAttributes( { titleTypoStyle } )
							}
							decoration={ titleTypoDecoration }
							decorationChange={ ( titleTypoDecoration ) =>
								setAttributes( { titleTypoDecoration } )
							}
							weight={ titleTypoWeight }
							weightChange={ ( titleTypoWeight ) =>
								setAttributes( { titleTypoWeight } )
							}
							hasFontFamily="true"
							fontFamilyChange={ ( titleTypoFontFamily ) =>
								setAttributes( { titleTypoFontFamily } )
							}
							fontFamily={ titleTypoFontFamily }
						/>
						
						<br />

						<PanelBody label={ __( 'Color', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											value={ titleTextColor }
											onChange={ ( titleTextColor ) =>
												setAttributes( { titleTextColor } )
											}
											resetValue={ 'black' }
											label={ __( 'Title Color', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ titleBgColor }
											onChange={ ( titleBgColor ) => setAttributes( { titleBgColor } ) }
											resetValue={ '' }
											label={ __( 'Title Background', 'grigora-kit' ) }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<div className={ `grigora-hover-effects-panel` }>
										<GrigoraColorInput
											value={ titleTextHColor }
											onChange={ ( titleTextHColor ) =>
												setAttributes( { titleTextHColor } )
											}
											resetValue={ '' }
											label={ __( 'Title Color', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ titleBgHColor }
											onChange={ ( titleBgHColor ) => setAttributes( { titleBgHColor } ) }
											resetValue={ '' }
											label={ __( 'Title Background', 'grigora-kit' ) }
										/>
										<GrigoraRangeInput
											label={ __( 'Transition Time', 'grigora-kit' ) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionTitleColorTime ) =>
												setAttributes( { transitionTitleColorTime } )
											}
											value={ transitionTitleColorTime }
											resetValue={ 0.2 }
										/>
									</div>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<GrigoraBoxInput
							label={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( titlePadding ) =>
								setAttributes( { titlePadding } )
							}
							values={ titlePadding }
							resetValue={ {
								top: '0px',
								bottom: '0px',
								left: '0px',
								right: '0px',
							} }
						/>

					</PanelBody>

					{ descriptionToggle &&
						<PanelBody title={ __( 'Description Settings', 'grigora-kit' ) }
							initialOpen={ false }
						>

							<GrigoraSelectInput
								label={ __( 'Description Tag', 'grigora-kit' ) }
								labelPosition="side"
								onChange={ ( DescriptionTag ) =>
									setAttributes( { DescriptionTag } )
								}
								value={ DescriptionTag }
								options={ [
									'h1',
									'h2',
									'h3',
									'h4',
									'h5',
									'h6',
									'p',
									'span',
									'div',
								].map( function ( item ) {
									return {
										label: item,
										value: item,
									};
								} ) }
								resetValue={ 'h3' }
							/>

							<GrigoraSelectInput
								label={ __( 'Alignment', 'grigora-kit' ) }
								labelPosition="side"
								onChange={ ( descriptionAlign ) => setAttributes( { descriptionAlign } ) }
								value={ descriptionAlign }
								options={ [
									{ label: 'Left', value: 'start' },
									{ label: 'Center', value: 'center' },
									{ label: 'Right', value: 'end' },
								] }
								resetValue={ 'start' }
							/>

							<br/>

							<GrigoraTypographyInput
								label={ __( 'Typography', 'grigora-kit' ) }
								size={ descriptionTypoSize }
								sizeChange={ ( descriptionTypoSize ) => {
									setAttributes( { descriptionTypoSize } );
								} }
								sizeReset={ 16 }
								lineHeight={ descriptionTypoLineHeight }
								lineHeightChange={ ( descriptionTypoLineHeight ) => {
									setAttributes( {
										descriptionTypoLineHeight:
											descriptionTypoLineHeight.toString(),
									} );
								} }
								letterSpacing={ descriptionTypoLetterSpacing }
								letterSpacingChange={ ( descriptionTypoLetterSpacing ) => {
									setAttributes( {
										descriptionTypoLetterSpacing:
											descriptionTypoLetterSpacing.toString(),
									} );
								} }
								wordSpacing={ descriptionTypoWordSpacing }
								wordSpacingChange={ ( descriptionTypoWordSpacing ) => {
									setAttributes( {
										descriptionTypoWordSpacing:
											descriptionTypoWordSpacing.toString(),
									} );
								} }
								transform={ descriptionTypoTransform }
								transformChange={ ( descriptionTypoTransform ) =>
									setAttributes( { descriptionTypoTransform } )
								}
								style={ descriptionTypoStyle }
								styleChange={ ( descriptionTypoStyle ) =>
									setAttributes( { descriptionTypoStyle } )
								}
								decoration={ descriptionTypoDecoration }
								decorationChange={ ( descriptionTypoDecoration ) =>
									setAttributes( { descriptionTypoDecoration } )
								}
								weight={ descriptionTypoWeight }
								weightChange={ ( descriptionTypoWeight ) =>
									setAttributes( { descriptionTypoWeight } )
								}
								hasFontFamily="true"
								fontFamilyChange={ ( descriptionTypoFontFamily ) =>
									setAttributes( { descriptionTypoFontFamily } )
								}
								fontFamily={ descriptionTypoFontFamily }
							/>
							
							<br />

							<PanelBody label={ __( 'Color', 'grigora-kit' ) }
								initialOpen={ false }
							>
								<Tabs className="grigora-normal-hover-tabs-container">
									<TabList className="tabs-header">
										<Tab className="normal">
											{ __( 'Normal', 'grigora-kit' ) }
										</Tab>
										<Tab className="hover">
											{ __( 'Hover', 'grigora-kit' ) }
										</Tab>
									</TabList>
									<TabPanel>
										<>
											<GrigoraColorInput
												value={ descriptionTextColor }
												onChange={ ( descriptionTextColor ) =>
													setAttributes( { descriptionTextColor } )
												}
												resetValue={ 'black' }
												label={ __( 'Description', 'grigora-kit' ) }
											/>
											<GrigoraColorInput
												value={ descriptionBgColor }
												onChange={ ( descriptionBgColor ) =>
													setAttributes( { descriptionBgColor } )
												}
												resetValue={ '' }
												label={ __( 'Description', 'grigora-kit' ) }
											/>
										</>
									</TabPanel>
									<TabPanel>
										<div className={ `grigora-hover-effects-panel` }>
											<GrigoraColorInput
												value={ descriptionTextHColor }
												onChange={ ( descriptionTextHColor ) =>
													setAttributes( { descriptionTextHColor } )
												}
												resetValue={ '' }
												label={ __( 'Description', 'grigora-kit' ) }
											/>
											<GrigoraColorInput
												value={ descriptionBgHColor }
												onChange={ ( descriptionBgHColor ) =>
													setAttributes( { descriptionBgHColor } )
												}
												resetValue={ '' }
												label={ __( 'Description', 'grigora-kit' ) }
											/>
											<GrigoraRangeInput
												label={ __( 'Transition Time', 'grigora-kit' ) }
												max={ 5 }
												min={ 0.1 }
												unit={ 'sec' }
												step={ 0.1 }
												setValue={ ( transitionDescriptionColorTime ) =>
													setAttributes( { transitionDescriptionColorTime } )
												}
												value={ transitionDescriptionColorTime }
												resetValue={ 0.2 }
											/>
										</div>
									</TabPanel>
								</Tabs>
							</PanelBody>

							<GrigoraBoxInput
								label={ __( 'Padding', 'grigora-kit' ) }
								onChange={ ( descriptionPadding ) =>
									setAttributes( { descriptionPadding } )
								}
								values={ descriptionPadding }
								resetValue={ {
									top: '0px',
									bottom: '0px',
									left: '0px',
									right: '0px',
								} }
							/>

						</PanelBody>
					}		

					<PanelBody title={ __( 'Actions After Submit', 'grigora-kit' ) }
						initialOpen={ false }
					>

						{
							actionForSubmit.map( (item, index) => {
								return (
									<div className='editor-forms-checkbox' >
										<input 
											type='checkbox'
											id={`action-for-submit-options-${index}`}
											checked={item.checked}
											onChange={ e => {
												let opt = [...actionForSubmit]
												opt[index].checked = e.target.checked
												setAttributes( { actionForSubmit: opt } )
											} }
										/>
										<label for={`action-for-submit-options-${index}`}> { __( item.label, 'grigora-kit' ) } </label>
										{item.helpText && <p> { __( item.helpText, 'grigora-kit' ) } </p>}
									</div>
								)
							})
						}

					</PanelBody>	

				</Spacer>
			</>
		)
	}

	function stylesSettings() { 
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

					<PanelBody title={ __( 'Label Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>

						<br/>

						<GrigoraTypographyInput
							label={ __( 'Typography', 'grigora-kit' ) }
							size={ labelTypoSize }
							sizeChange={ ( labelTypoSize ) => {
								setAttributes( { labelTypoSize } );
							} }
							sizeReset={ 16 }
							lineHeight={ labelTypoLineHeight }
							lineHeightChange={ ( labelTypoLineHeight ) => {
								setAttributes( {
									labelTypoLineHeight:
										labelTypoLineHeight.toString(),
								} );
							} }
							letterSpacing={ labelTypoLetterSpacing }
							letterSpacingChange={ ( labelTypoLetterSpacing ) => {
								setAttributes( {
									labelTypoLetterSpacing:
										labelTypoLetterSpacing.toString(),
								} );
							} }
							wordSpacing={ labelTypoWordSpacing }
							wordSpacingChange={ ( labelTypoWordSpacing ) => {
								setAttributes( {
									labelTypoWordSpacing:
										labelTypoWordSpacing.toString(),
								} );
							} }
							transform={ labelTypoTransform }
							transformChange={ ( labelTypoTransform ) =>
								setAttributes( { labelTypoTransform } )
							}
							style={ labelTypoStyle }
							styleChange={ ( labelTypoStyle ) =>
								setAttributes( { labelTypoStyle } )
							}
							decoration={ labelTypoDecoration }
							decorationChange={ ( labelTypoDecoration ) =>
								setAttributes( { labelTypoDecoration } )
							}
							weight={ labelTypoWeight }
							weightChange={ ( labelTypoWeight ) =>
								setAttributes( { labelTypoWeight } )
							}
							hasFontFamily="true"
							fontFamilyChange={ ( labelTypoFontFamily ) =>
								setAttributes( { labelTypoFontFamily } )
							}
							fontFamily={ labelTypoFontFamily }
						/>
						
						<br />

						<PanelBody title={ __( 'Color', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											value={ labelTextColor }
											onChange={ ( labelTextColor ) =>
												setAttributes( { labelTextColor } )
											}
											resetValue={ 'black' }
											label={ __( 'Label Color', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ labelBgColor }
											onChange={ ( labelBgColor ) => setAttributes( { labelBgColor } ) }
											resetValue={ '' }
											label={ __( 'Label Background', 'grigora-kit' ) }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<div className={ `grigora-hover-effects-panel` }>
											<GrigoraColorInput
												value={ labelTextHColor }
												onChange={ ( labelTextHColor ) =>
													setAttributes( { labelTextHColor } )
												}
												resetValue={ '' }
												label={ __( 'Label Color', 'grigora-kit' ) }
											/>
											<GrigoraColorInput
												value={ labelBgHColor }
												onChange={ ( labelBgHColor ) => setAttributes( { labelBgHColor } ) }
												resetValue={ '' }
												label={ __( 'Label Background', 'grigora-kit' ) }
											/>
											<GrigoraRangeInput
												label={ __( 'Transition Time', 'grigora-kit' ) }
												max={ 5 }
												min={ 0.1 }
												unit={ 'sec' }
												step={ 0.1 }
												setValue={ ( transitionLabelColorTime ) =>
													setAttributes( { transitionLabelColorTime } )
												}
												value={ transitionLabelColorTime }
												resetValue={ 0.2 }
											/>
										</div>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<GrigoraBoxInput
							label={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( labelPadding ) =>
								setAttributes( { labelPadding } )
							}
							values={ labelPadding }
							resetValue={ {
								top: '0px',
								bottom: '0px',
								left: '0px',
								right: '0px',
							} }
						/>

					</PanelBody>

					<PanelBody title={ __( 'Button Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>

						<br/>

						<GrigoraTypographyInput
							label={ __( 'Typography', 'grigora-kit' ) }
							size={ buttonTypoSize }
							sizeChange={ ( buttonTypoSize ) => {
								setAttributes( { buttonTypoSize } );
							} }
							sizeReset={ 20 }
							lineHeight={ buttonTypoLineHeight }
							lineHeightChange={ ( buttonTypoLineHeight ) => {
								setAttributes( {
									buttonTypoLineHeight:
										buttonTypoLineHeight.toString(),
								} );
							} }
							letterSpacing={ buttonTypoLetterSpacing }
							letterSpacingChange={ ( buttonTypoLetterSpacing ) => {
								setAttributes( {
									buttonTypoLetterSpacing:
										buttonTypoLetterSpacing.toString(),
								} );
							} }
							wordSpacing={ buttonTypoWordSpacing }
							wordSpacingChange={ ( buttonTypoWordSpacing ) => {
								setAttributes( {
									buttonTypoWordSpacing:
										buttonTypoWordSpacing.toString(),
								} );
							} }
							transform={ buttonTypoTransform }
							transformChange={ ( buttonTypoTransform ) =>
								setAttributes( { buttonTypoTransform } )
							}
							style={ buttonTypoStyle }
							styleChange={ ( buttonTypoStyle ) =>
								setAttributes( { buttonTypoStyle } )
							}
							decoration={ buttonTypoDecoration }
							decorationChange={ ( buttonTypoDecoration ) =>
								setAttributes( { buttonTypoDecoration } )
							}
							weight={ buttonTypoWeight }
							weightChange={ ( buttonTypoWeight ) =>
								setAttributes( { buttonTypoWeight } )
							}
							hasFontFamily="true"
							fontFamilyChange={ ( buttonTypoFontFamily ) =>
								setAttributes( { buttonTypoFontFamily } )
							}
							fontFamily={ buttonTypoFontFamily }
						/>
						
						<br />

						<GrigoraBoxInput
							label={ __('Padding', 'grigora-kit')}
							button={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( buttonPadding ) =>
								setAttributes( { buttonPadding } )
							}
							values={ buttonPadding }
							resetValue={ {
								top: '10px',
								bottom: '10px',
								left: '10px',
								right: '10px',
							} }
						/>

						<PanelBody title={ __( 'Color', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											value={ buttonTextColor }
											onChange={ ( buttonTextColor ) =>
												setAttributes( { buttonTextColor } )
											}
											resetValue={ 'white' }
											label={ __( 'Button Color', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ buttonBgColor }
											onChange={ ( buttonBgColor ) =>
												setAttributes( { buttonBgColor } )
											}
											resetValue={ '#1768ea' }
											label={ __( 'Button Background', 'grigora-kit' ) }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<div className={ `grigora-hover-effects-panel` }>
										<GrigoraColorInput
											value={ buttonTextHColor }
											onChange={ ( buttonTextHColor ) =>
												setAttributes( { buttonTextHColor } )
											}
											resetValue={ 'white' }
											label={ __( 'Button Color', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ buttonBgHColor }
											onChange={ ( buttonBgHColor ) =>
												setAttributes( { buttonBgHColor } )
											}
											resetValue={ '#1768ea' }
											label={ __( 'Button Background', 'grigora-kit' ) }
										/>
										<GrigoraRangeInput
											label={ __( 'Transition Time', 'grigora-kit' ) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionButtonColorTime ) =>
												setAttributes( { transitionButtonColorTime } )
											}
											value={ transitionButtonColorTime }
											resetValue={ 0.2 }
										/>
									</div>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Border', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>

								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( buttonNBorder ) => {
												if ( ! buttonNBorder.top ) {
													setAttributes( {
														buttonNBorder: {
															top: buttonNBorder,
															bottom: buttonNBorder,
															right: buttonNBorder,
															left: buttonNBorder,
														},
													} );
												} else {
													setAttributes( { buttonNBorder } );
												}
											} }
											value={ buttonNBorder }
											resetValue={ {
												top: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
												bottom: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
												right: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
												left: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( buttonNBorderRadius ) => {
												if (
													typeof buttonNBorderRadius ===
														'string' ||
													buttonNBorderRadius instanceof
														String
												) {
													setAttributes( {
														buttonNBorderRadius: {
															topLeft:
																buttonNBorderRadius,
															topRight:
																buttonNBorderRadius,
															bottomLeft:
																buttonNBorderRadius,
															bottomRight:
																buttonNBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														buttonNBorderRadius,
													} );
												}
											} }
											values={ buttonNBorderRadius }
											resetValue={ {
												topLeft: '5px',
												topRight: '5px',
												bottomLeft: '5px',
												bottomRight: '5px',
											} }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( buttonHBorder ) => {
												if ( ! buttonHBorder.top ) {
													setAttributes( {
														buttonHBorder: {
															top: buttonHBorder,
															bottom: buttonHBorder,
															right: buttonHBorder,
															left: buttonHBorder,
														},
													} );
												} else {
													setAttributes( { buttonHBorder } );
												}
											} }
											value={ buttonHBorder }
											resetValue={ {
												top: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
												bottom: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
												right: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
												left: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( buttonHBorderRadius ) => {
												if (
													typeof buttonHBorderRadius ===
														'string' ||
													buttonHBorderRadius instanceof
														String
												) {
													setAttributes( {
														buttonHBorderRadius: {
															topLeft:
																buttonHBorderRadius,
															topRight:
																buttonHBorderRadius,
															bottomLeft:
																buttonHBorderRadius,
															bottomRight:
																buttonHBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														buttonHBorderRadius,
													} );
												}
											} }
											values={ buttonHBorderRadius }
											resetValue={ {
												topLeft: '',
												topRight: '',
												bottomLeft: '',
												bottomRight: '',
											} }
										/>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionButtonBorderTime ) =>
												setAttributes( { transitionButtonBorderTime } )
											}
											value={ transitionButtonBorderTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Box Shadow', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ buttonNShadowColor }
											onChange={ ( buttonNShadowColor ) =>
												setAttributes( {
													buttonNShadowColor,
												} )
											}
											resetValue={ '#00000033' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ buttonNShadowHO }
												onChange={ ( buttonNShadowHO ) =>
													setAttributes( {
														buttonNShadowHO,
													} )
												}
												resetValue={ '1px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ buttonNShadowVO }
												onChange={ ( buttonNShadowVO ) =>
													setAttributes( {
														buttonNShadowVO,
													} )
												}
												resetValue={ '7px' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ buttonNShadowBlur }
												onChange={ ( buttonNShadowBlur ) =>
													setAttributes( {
														buttonNShadowBlur,
													} )
												}
												resetValue={ '14px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ buttonNShadowSpread }
												onChange={ (
													buttonNShadowSpread
												) =>
													setAttributes( {
														buttonNShadowSpread,
													} )
												}
												resetValue={ '-5px' }
											/>
										</HStack>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ buttonHShadowColor }
											onChange={ ( buttonHShadowColor ) =>
												setAttributes( {
													buttonHShadowColor,
												} )
											}
											resetValue={ '#000' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ buttonHShadowHO }
												onChange={ ( buttonHShadowHO ) =>
													setAttributes( {
														buttonHShadowHO,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ buttonHShadowVO }
												onChange={ ( buttonHShadowVO ) =>
													setAttributes( {
														buttonHShadowVO,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ buttonHShadowBlur }
												onChange={ ( buttonHShadowBlur ) =>
													setAttributes( {
														buttonHShadowBlur,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ buttonHShadowSpread }
												onChange={ (
													buttonHShadowSpread
												) =>
													setAttributes( {
														buttonHShadowSpread,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionButtonShadowTime ) =>
												setAttributes( {
													transitionButtonShadowTime,
												} )
											}
											value={ transitionButtonShadowTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

					</PanelBody>

					<PanelBody title={ __( 'Field Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>

						<br/>

						<GrigoraTypographyInput
							label={ __( 'Typography', 'grigora-kit' ) }
							size={ fieldTypoSize }
							sizeChange={ ( fieldTypoSize ) => {
								setAttributes( { fieldTypoSize } );
							} }
							sizeReset={ 20 }
							lineHeight={ fieldTypoLineHeight }
							lineHeightChange={ ( fieldTypoLineHeight ) => {
								setAttributes( {
									fieldTypoLineHeight:
										fieldTypoLineHeight.toString(),
								} );
							} }
							letterSpacing={ fieldTypoLetterSpacing }
							letterSpacingChange={ ( fieldTypoLetterSpacing ) => {
								setAttributes( {
									fieldTypoLetterSpacing:
										fieldTypoLetterSpacing.toString(),
								} );
							} }
							wordSpacing={ fieldTypoWordSpacing }
							wordSpacingChange={ ( fieldTypoWordSpacing ) => {
								setAttributes( {
									fieldTypoWordSpacing:
										fieldTypoWordSpacing.toString(),
								} );
							} }
							transform={ fieldTypoTransform }
							transformChange={ ( fieldTypoTransform ) =>
								setAttributes( { fieldTypoTransform } )
							}
							style={ fieldTypoStyle }
							styleChange={ ( fieldTypoStyle ) =>
								setAttributes( { fieldTypoStyle } )
							}
							decoration={ fieldTypoDecoration }
							decorationChange={ ( fieldTypoDecoration ) =>
								setAttributes( { fieldTypoDecoration } )
							}
							weight={ fieldTypoWeight }
							weightChange={ ( fieldTypoWeight ) =>
								setAttributes( { fieldTypoWeight } )
							}
							hasFontFamily="true"
							fontFamilyChange={ ( fieldTypoFontFamily ) =>
								setAttributes( { fieldTypoFontFamily } )
							}
							fontFamily={ fieldTypoFontFamily }
						/>
						
						<br />

						<GrigoraBoxInput
							label={ __('Padding', 'grigora-kit')}
							field={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( fieldPadding ) =>
								setAttributes( { fieldPadding } )
							}
							values={ fieldPadding }
							resetValue={ {
								top: '10px',
								bottom: '10px',
								left: '10px',
								right: '10px',
							} }
						/>

						<PanelBody title={ __( 'Color', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											value={ fieldTextColor }
											onChange={ ( fieldTextColor ) =>
												setAttributes( { fieldTextColor } )
											}
											resetValue={ 'black' }
											label={ __( 'Field color', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ fieldBgColor }
											onChange={ ( fieldBgColor ) =>
												setAttributes( { fieldBgColor } )
											}
											resetValue={ '' }
											label={ __( 'Field Background', 'grigora-kit' ) }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<div className={ `grigora-hover-effects-panel` }>
										<GrigoraColorInput
											value={ fieldTextHColor }
											onChange={ ( fieldTextHColor ) =>
												setAttributes( { fieldTextHColor } )
											}
											resetValue={ 'black' }
											label={ __( 'field', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ fieldBgHColor }
											onChange={ ( fieldBgHColor ) =>
												setAttributes( { fieldBgHColor } )
											}
											resetValue={ '' }
											label={ __( 'field', 'grigora-kit' ) }
										/>
										<GrigoraRangeInput
											label={ __( 'Transition Time', 'grigora-kit' ) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionFieldColorTime ) =>
												setAttributes( { transitionFieldColorTime } )
											}
											value={ transitionFieldColorTime }
											resetValue={ 0.2 }
										/>
									</div>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Border', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>

								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( fieldNBorder ) => {
												if ( ! fieldNBorder.top ) {
													setAttributes( {
														fieldNBorder: {
															top: fieldNBorder,
															bottom: fieldNBorder,
															right: fieldNBorder,
															left: fieldNBorder,
														},
													} );
												} else {
													setAttributes( { fieldNBorder } );
												}
											} }
											value={ fieldNBorder }
											resetValue={ {
												top: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
												bottom: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
												right: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
												left: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( fieldNBorderRadius ) => {
												if (
													typeof fieldNBorderRadius ===
														'string' ||
													fieldNBorderRadius instanceof
														String
												) {
													setAttributes( {
														fieldNBorderRadius: {
															topLeft:
																fieldNBorderRadius,
															topRight:
																fieldNBorderRadius,
															bottomLeft:
																fieldNBorderRadius,
															bottomRight:
																fieldNBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														fieldNBorderRadius,
													} );
												}
											} }
											values={ fieldNBorderRadius }
											resetValue={ {
												topLeft: '5px',
												topRight: '5px',
												bottomLeft: '5px',
												bottomRight: '5px',
											} }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( fieldHBorder ) => {
												if ( ! fieldHBorder.top ) {
													setAttributes( {
														fieldHBorder: {
															top: fieldHBorder,
															bottom: fieldHBorder,
															right: fieldHBorder,
															left: fieldHBorder,
														},
													} );
												} else {
													setAttributes( { fieldHBorder } );
												}
											} }
											value={ fieldHBorder }
											resetValue={ {
												top: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
												bottom: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
												right: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
												left: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( fieldHBorderRadius ) => {
												if (
													typeof fieldHBorderRadius ===
														'string' ||
													fieldHBorderRadius instanceof
														String
												) {
													setAttributes( {
														fieldHBorderRadius: {
															topLeft:
																fieldHBorderRadius,
															topRight:
																fieldHBorderRadius,
															bottomLeft:
																fieldHBorderRadius,
															bottomRight:
																fieldHBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														fieldHBorderRadius,
													} );
												}
											} }
											values={ fieldHBorderRadius }
											resetValue={ {
												topLeft: '',
												topRight: '',
												bottomLeft: '',
												bottomRight: '',
											} }
										/>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionFieldBorderTime ) =>
												setAttributes( { transitionFieldBorderTime } )
											}
											value={ transitionFieldBorderTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Box Shadow', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ fieldNShadowColor }
											onChange={ ( fieldNShadowColor ) =>
												setAttributes( {
													fieldNShadowColor,
												} )
											}
											resetValue={ '#00000033' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ fieldNShadowHO }
												onChange={ ( fieldNShadowHO ) =>
													setAttributes( {
														fieldNShadowHO,
													} )
												}
												resetValue={ '1px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ fieldNShadowVO }
												onChange={ ( fieldNShadowVO ) =>
													setAttributes( {
														fieldNShadowVO,
													} )
												}
												resetValue={ '7px' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ fieldNShadowBlur }
												onChange={ ( fieldNShadowBlur ) =>
													setAttributes( {
														fieldNShadowBlur,
													} )
												}
												resetValue={ '14px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ fieldNShadowSpread }
												onChange={ (
													fieldNShadowSpread
												) =>
													setAttributes( {
														fieldNShadowSpread,
													} )
												}
												resetValue={ '-5px' }
											/>
										</HStack>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ fieldHShadowColor }
											onChange={ ( fieldHShadowColor ) =>
												setAttributes( {
													fieldHShadowColor,
												} )
											}
											resetValue={ '#000' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ fieldHShadowHO }
												onChange={ ( fieldHShadowHO ) =>
													setAttributes( {
														fieldHShadowHO,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ fieldHShadowVO }
												onChange={ ( fieldHShadowVO ) =>
													setAttributes( {
														fieldHShadowVO,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ fieldHShadowBlur }
												onChange={ ( fieldHShadowBlur ) =>
													setAttributes( {
														fieldHShadowBlur,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ fieldHShadowSpread }
												onChange={ (
													fieldHShadowSpread
												) =>
													setAttributes( {
														fieldHShadowSpread,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionFieldShadowTime ) =>
												setAttributes( {
													transitionFieldShadowTime,
												} )
											}
											value={ transitionFieldShadowTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

					</PanelBody>

					<PanelBody title={ __( 'Checkbox Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>
						
						<br />

						<GrigoraBoxInput
							label={ __('Padding', 'grigora-kit')}
							checkbox={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( checkboxPadding ) =>
								setAttributes( { checkboxPadding } )
							}
							values={ checkboxPadding }
							resetValue={ {
								top: '0px',
								bottom: '0px',
								left: '0px',
								right: '0px',
							} }
						/>

						<PanelBody title={ __( 'Color', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
								<>
									<GrigoraColorInput
										value={ checkboxBgColor }
										onChange={ ( checkboxBgColor ) => setAttributes( { checkboxBgColor } ) }
										resetValue={ 'white' }
										label={ __( 'Checkbox Background', 'grigora-kit' ) }
									/>
								</>
								</TabPanel>
								<TabPanel>
									<div className={ `grigora-hover-effects-panel` }>
										<GrigoraColorInput
											value={ checkboxBgHColor }
											onChange={ ( checkboxBgHColor ) => setAttributes( { checkboxBgHColor } ) }
											resetValue={ 'white' }
											label={ __( 'Checkbox Background', 'grigora-kit' ) }
										/>
										<GrigoraRangeInput
											label={ __( 'Transition Time', 'grigora-kit' ) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionCheckboxColorTime ) =>
												setAttributes( { transitionCheckboxColorTime } )
											}
											value={ transitionCheckboxColorTime }
											resetValue={ 0.2 }
										/>
									</div>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Border', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>

								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( checkboxNBorder ) => {
												if ( ! checkboxNBorder.top ) {
													setAttributes( {
														checkboxNBorder: {
															top: checkboxNBorder,
															bottom: checkboxNBorder,
															right: checkboxNBorder,
															left: checkboxNBorder,
														},
													} );
												} else {
													setAttributes( { checkboxNBorder } );
												}
											} }
											value={ checkboxNBorder }
											resetValue={ {
												top: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												bottom: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												right: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												left: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( checkboxNBorderRadius ) => {
												if (
													typeof checkboxNBorderRadius ===
														'string' ||
													checkboxNBorderRadius instanceof
														String
												) {
													setAttributes( {
														checkboxNBorderRadius: {
															topLeft:
																checkboxNBorderRadius,
															topRight:
																checkboxNBorderRadius,
															bottomLeft:
																checkboxNBorderRadius,
															bottomRight:
																checkboxNBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														checkboxNBorderRadius,
													} );
												}
											} }
											values={ checkboxNBorderRadius }
											resetValue={ {
												topLeft: '5px',
												topRight: '5px',
												bottomLeft: '5px',
												bottomRight: '5px',
											} }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( checkboxHBorder ) => {
												if ( ! checkboxHBorder.top ) {
													setAttributes( {
														checkboxHBorder: {
															top: checkboxHBorder,
															bottom: checkboxHBorder,
															right: checkboxHBorder,
															left: checkboxHBorder,
														},
													} );
												} else {
													setAttributes( { checkboxHBorder } );
												}
											} }
											value={ checkboxHBorder }
											resetValue={ {
												top: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												bottom: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												right: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												left: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( checkboxHBorderRadius ) => {
												if (
													typeof checkboxHBorderRadius ===
														'string' ||
													checkboxHBorderRadius instanceof
														String
												) {
													setAttributes( {
														checkboxHBorderRadius: {
															topLeft:
																checkboxHBorderRadius,
															topRight:
																checkboxHBorderRadius,
															bottomLeft:
																checkboxHBorderRadius,
															bottomRight:
																checkboxHBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														checkboxHBorderRadius,
													} );
												}
											} }
											values={ checkboxHBorderRadius }
											resetValue={ {
												topLeft: '',
												topRight: '',
												bottomLeft: '',
												bottomRight: '',
											} }
										/>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionCheckboxBorderTime ) =>
												setAttributes( { transitionCheckboxBorderTime } )
											}
											value={ transitionCheckboxBorderTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Box Shadow', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ checkboxNShadowColor }
											onChange={ ( checkboxNShadowColor ) =>
												setAttributes( {
													checkboxNShadowColor,
												} )
											}
											resetValue={ '#00000033' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ checkboxNShadowHO }
												onChange={ ( checkboxNShadowHO ) =>
													setAttributes( {
														checkboxNShadowHO,
													} )
												}
												resetValue={ '1px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ checkboxNShadowVO }
												onChange={ ( checkboxNShadowVO ) =>
													setAttributes( {
														checkboxNShadowVO,
													} )
												}
												resetValue={ '7px' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ checkboxNShadowBlur }
												onChange={ ( checkboxNShadowBlur ) =>
													setAttributes( {
														checkboxNShadowBlur,
													} )
												}
												resetValue={ '14px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ checkboxNShadowSpread }
												onChange={ (
													checkboxNShadowSpread
												) =>
													setAttributes( {
														checkboxNShadowSpread,
													} )
												}
												resetValue={ '-5px' }
											/>
										</HStack>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ checkboxHShadowColor }
											onChange={ ( checkboxHShadowColor ) =>
												setAttributes( {
													checkboxHShadowColor,
												} )
											}
											resetValue={ '#000' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ checkboxHShadowHO }
												onChange={ ( checkboxHShadowHO ) =>
													setAttributes( {
														checkboxHShadowHO,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ checkboxHShadowVO }
												onChange={ ( checkboxHShadowVO ) =>
													setAttributes( {
														checkboxHShadowVO,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ checkboxHShadowBlur }
												onChange={ ( checkboxHShadowBlur ) =>
													setAttributes( {
														checkboxHShadowBlur,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ checkboxHShadowSpread }
												onChange={ (
													checkboxHShadowSpread
												) =>
													setAttributes( {
														checkboxHShadowSpread,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionCheckboxShadowTime ) =>
												setAttributes( {
													transitionCheckboxShadowTime,
												} )
											}
											value={ transitionCheckboxShadowTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

					</PanelBody>

					<PanelBody title={ __( 'Select Input Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>

						<br/>

						<GrigoraTypographyInput
							label={ __( 'Typography', 'grigora-kit' ) }
							size={ selectTypoSize }
							sizeChange={ ( selectTypoSize ) => {
								setAttributes( { selectTypoSize } );
							} }
							sizeReset={ 20 }
							lineHeight={ selectTypoLineHeight }
							lineHeightChange={ ( selectTypoLineHeight ) => {
								setAttributes( {
									selectTypoLineHeight:
										selectTypoLineHeight.toString(),
								} );
							} }
							letterSpacing={ selectTypoLetterSpacing }
							letterSpacingChange={ ( selectTypoLetterSpacing ) => {
								setAttributes( {
									selectTypoLetterSpacing:
										selectTypoLetterSpacing.toString(),
								} );
							} }
							wordSpacing={ selectTypoWordSpacing }
							wordSpacingChange={ ( selectTypoWordSpacing ) => {
								setAttributes( {
									selectTypoWordSpacing:
										selectTypoWordSpacing.toString(),
								} );
							} }
							transform={ selectTypoTransform }
							transformChange={ ( selectTypoTransform ) =>
								setAttributes( { selectTypoTransform } )
							}
							style={ selectTypoStyle }
							styleChange={ ( selectTypoStyle ) =>
								setAttributes( { selectTypoStyle } )
							}
							decoration={ selectTypoDecoration }
							decorationChange={ ( selectTypoDecoration ) =>
								setAttributes( { selectTypoDecoration } )
							}
							weight={ selectTypoWeight }
							weightChange={ ( selectTypoWeight ) =>
								setAttributes( { selectTypoWeight } )
							}
							hasFontFamily="true"
							fontFamilyChange={ ( selectTypoFontFamily ) =>
								setAttributes( { selectTypoFontFamily } )
							}
							fontFamily={ selectTypoFontFamily }
						/>
						
						<br />

						<GrigoraBoxInput
							label={ __('Padding', 'grigora-kit')}
							select={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( selectPadding ) =>
								setAttributes( { selectPadding } )
							}
							values={ selectPadding }
							resetValue={ {
								top: '10px',
								bottom: '10px',
								left: '10px',
								right: '10px',
							} }
						/>

						<PanelBody title={ __( 'Color', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											value={ selectTextColor }
											onChange={ ( selectTextColor ) =>
												setAttributes( { selectTextColor } )
											}
											resetValue={ 'black' }
											label={ __( 'select', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ selectBgColor }
											onChange={ ( selectBgColor ) =>
												setAttributes( { selectBgColor } )
											}
											resetValue={ '' }
											label={ __( 'select', 'grigora-kit' ) }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<div className={ `grigora-hover-effects-panel` }>
										<GrigoraColorInput
											value={ selectTextHColor }
											onChange={ ( selectTextHColor ) =>
												setAttributes( { selectTextHColor } )
											}
											resetValue={ 'black' }
											label={ __( 'Select Color', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ selectBgHColor }
											onChange={ ( selectBgHColor ) =>
												setAttributes( { selectBgHColor } )
											}
											resetValue={ '' }
											label={ __( 'Select Background', 'grigora-kit' ) }
										/>
										<GrigoraRangeInput
											label={ __( 'Transition Time', 'grigora-kit' ) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionSelectColorTime ) =>
												setAttributes( { transitionSelectColorTime } )
											}
											value={ transitionSelectColorTime }
											resetValue={ 0.2 }
										/>
									</div>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Border', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>

								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( selectNBorder ) => {
												if ( ! selectNBorder.top ) {
													setAttributes( {
														selectNBorder: {
															top: selectNBorder,
															bottom: selectNBorder,
															right: selectNBorder,
															left: selectNBorder,
														},
													} );
												} else {
													setAttributes( { selectNBorder } );
												}
											} }
											value={ selectNBorder }
											resetValue={ {
												top: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
												bottom: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
												right: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
												left: {
													color: '#72aee6',
													style: 'solid',
													width: '0px',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( selectNBorderRadius ) => {
												if (
													typeof selectNBorderRadius ===
														'string' ||
													selectNBorderRadius instanceof
														String
												) {
													setAttributes( {
														selectNBorderRadius: {
															topLeft:
																selectNBorderRadius,
															topRight:
																selectNBorderRadius,
															bottomLeft:
																selectNBorderRadius,
															bottomRight:
																selectNBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														selectNBorderRadius,
													} );
												}
											} }
											values={ selectNBorderRadius }
											resetValue={ {
												topLeft: '5px',
												topRight: '5px',
												bottomLeft: '5px',
												bottomRight: '5px',
											} }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( selectHBorder ) => {
												if ( ! selectHBorder.top ) {
													setAttributes( {
														selectHBorder: {
															top: selectHBorder,
															bottom: selectHBorder,
															right: selectHBorder,
															left: selectHBorder,
														},
													} );
												} else {
													setAttributes( { selectHBorder } );
												}
											} }
											value={ selectHBorder }
											resetValue={ {
												top: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
												bottom: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
												right: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
												left: {
													color: '#72aee6',
													style: 'solid',
													width: 'undefined',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( selectHBorderRadius ) => {
												if (
													typeof selectHBorderRadius ===
														'string' ||
													selectHBorderRadius instanceof
														String
												) {
													setAttributes( {
														selectHBorderRadius: {
															topLeft:
																selectHBorderRadius,
															topRight:
																selectHBorderRadius,
															bottomLeft:
																selectHBorderRadius,
															bottomRight:
																selectHBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														selectHBorderRadius,
													} );
												}
											} }
											values={ selectHBorderRadius }
											resetValue={ {
												topLeft: '',
												topRight: '',
												bottomLeft: '',
												bottomRight: '',
											} }
										/>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionSelectBorderTime ) =>
												setAttributes( { transitionSelectBorderTime } )
											}
											value={ transitionSelectBorderTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Box Shadow', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ selectNShadowColor }
											onChange={ ( selectNShadowColor ) =>
												setAttributes( {
													selectNShadowColor,
												} )
											}
											resetValue={ '#00000033' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ selectNShadowHO }
												onChange={ ( selectNShadowHO ) =>
													setAttributes( {
														selectNShadowHO,
													} )
												}
												resetValue={ '1px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ selectNShadowVO }
												onChange={ ( selectNShadowVO ) =>
													setAttributes( {
														selectNShadowVO,
													} )
												}
												resetValue={ '7px' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ selectNShadowBlur }
												onChange={ ( selectNShadowBlur ) =>
													setAttributes( {
														selectNShadowBlur,
													} )
												}
												resetValue={ '14px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ selectNShadowSpread }
												onChange={ (
													selectNShadowSpread
												) =>
													setAttributes( {
														selectNShadowSpread,
													} )
												}
												resetValue={ '-5px' }
											/>
										</HStack>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ selectHShadowColor }
											onChange={ ( selectHShadowColor ) =>
												setAttributes( {
													selectHShadowColor,
												} )
											}
											resetValue={ '#000' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ selectHShadowHO }
												onChange={ ( selectHShadowHO ) =>
													setAttributes( {
														selectHShadowHO,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ selectHShadowVO }
												onChange={ ( selectHShadowVO ) =>
													setAttributes( {
														selectHShadowVO,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ selectHShadowBlur }
												onChange={ ( selectHShadowBlur ) =>
													setAttributes( {
														selectHShadowBlur,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ selectHShadowSpread }
												onChange={ (
													selectHShadowSpread
												) =>
													setAttributes( {
														selectHShadowSpread,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionSelectShadowTime ) =>
												setAttributes( {
													transitionSelectShadowTime,
												} )
											}
											value={ transitionSelectShadowTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

					</PanelBody>

					<PanelBody title={ __( 'Date Settings', 'grigora-kit' ) }
						initialOpen={ false }
					>
						
						<br />

						<GrigoraBoxInput
							label={ __('Padding', 'grigora-kit')}
							date={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( datePadding ) =>
								setAttributes( { datePadding } )
							}
							values={ datePadding }
							resetValue={ {
								top: '0px',
								bottom: '0px',
								left: '8px',
								right: '8px',
							} }
						/>

						<PanelBody title={ __( 'Color', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
								<>
									<GrigoraColorInput
										value={ dateColor }
										onChange={ ( dateColor ) => setAttributes( { dateColor } ) }
										resetValue={ 'black' }
										label={ __( 'Date Color', 'grigora-kit' ) }
									/>
									<GrigoraColorInput
										value={ dateBgColor }
										onChange={ ( dateBgColor ) => setAttributes( { dateBgColor } ) }
										resetValue={ 'white' }
										label={ __( 'Date Background Color', 'grigora-kit' ) }
									/>
								</>
								</TabPanel>
								<TabPanel>
									<div className={ `grigora-hover-effects-panel` }>
										<GrigoraColorInput
											value={ dateHColor }
											onChange={ ( dateHColor ) => setAttributes( { dateHColor } ) }
											resetValue={ 'black' }
											label={ __( 'Date Color', 'grigora-kit' ) }
										/>
										<GrigoraColorInput
											value={ dateBgHColor }
											onChange={ ( dateBgHColor ) => setAttributes( { dateBgHColor } ) }
											resetValue={ 'white' }
											label={ __( 'Date Background', 'grigora-kit' ) }
										/>
										<GrigoraRangeInput
											label={ __( 'Transition Time', 'grigora-kit' ) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionDateColorTime ) =>
												setAttributes( { transitionDateColorTime } )
											}
											value={ transitionDateColorTime }
											resetValue={ 0.2 }
										/>
									</div>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Border', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>

								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( dateNBorder ) => {
												if ( ! dateNBorder.top ) {
													setAttributes( {
														dateNBorder: {
															top: dateNBorder,
															bottom: dateNBorder,
															right: dateNBorder,
															left: dateNBorder,
														},
													} );
												} else {
													setAttributes( { dateNBorder } );
												}
											} }
											value={ dateNBorder }
											resetValue={ {
												top: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												bottom: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												right: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												left: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( dateNBorderRadius ) => {
												if (
													typeof dateNBorderRadius ===
														'string' ||
													dateNBorderRadius instanceof
														String
												) {
													setAttributes( {
														dateNBorderRadius: {
															topLeft:
																dateNBorderRadius,
															topRight:
																dateNBorderRadius,
															bottomLeft:
																dateNBorderRadius,
															bottomRight:
																dateNBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														dateNBorderRadius,
													} );
												}
											} }
											values={ dateNBorderRadius }
											resetValue={ {
												topLeft: '5px',
												topRight: '5px',
												bottomLeft: '5px',
												bottomRight: '5px',
											} }
										/>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraBorderBoxInput
											label={ __( 'Width', 'grigora-kit' ) }
											onChange={ ( dateHBorder ) => {
												if ( ! dateHBorder.top ) {
													setAttributes( {
														dateHBorder: {
															top: dateHBorder,
															bottom: dateHBorder,
															right: dateHBorder,
															left: dateHBorder,
														},
													} );
												} else {
													setAttributes( { dateHBorder } );
												}
											} }
											value={ dateHBorder }
											resetValue={ {
												top: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												bottom: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												right: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
												left: {
													color: '#8c8f94',
													style: 'solid',
													width: '1px',
												},
											} }
										/>
										<br></br>
										<GrigoraBorderRadiusInput
											label={ __( 'Radius', 'grigora-kit' ) }
											onChange={ ( dateHBorderRadius ) => {
												if (
													typeof dateHBorderRadius ===
														'string' ||
													dateHBorderRadius instanceof
														String
												) {
													setAttributes( {
														dateHBorderRadius: {
															topLeft:
																dateHBorderRadius,
															topRight:
																dateHBorderRadius,
															bottomLeft:
																dateHBorderRadius,
															bottomRight:
																dateHBorderRadius,
														},
													} );
												} else {
													setAttributes( {
														dateHBorderRadius,
													} );
												}
											} }
											values={ dateHBorderRadius }
											resetValue={ {
												topLeft: '',
												topRight: '',
												bottomLeft: '',
												bottomRight: '',
											} }
										/>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionDateBorderTime ) =>
												setAttributes( { transitionDateBorderTime } )
											}
											value={ transitionDateBorderTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

						<PanelBody title={ __( 'Box Shadow', 'grigora-kit' ) }
							initialOpen={ false }
						>
							<Tabs className="grigora-normal-hover-tabs-container">
								<TabList className="tabs-header">
									<Tab className="normal">
										{ __( 'Normal', 'grigora-kit' ) }
									</Tab>
									<Tab className="hover">
										{ __( 'Hover', 'grigora-kit' ) }
									</Tab>
								</TabList>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ dateNShadowColor }
											onChange={ ( dateNShadowColor ) =>
												setAttributes( {
													dateNShadowColor,
												} )
											}
											resetValue={ '#00000033' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ dateNShadowHO }
												onChange={ ( dateNShadowHO ) =>
													setAttributes( {
														dateNShadowHO,
													} )
												}
												resetValue={ '1px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ dateNShadowVO }
												onChange={ ( dateNShadowVO ) =>
													setAttributes( {
														dateNShadowVO,
													} )
												}
												resetValue={ '7px' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ dateNShadowBlur }
												onChange={ ( dateNShadowBlur ) =>
													setAttributes( {
														dateNShadowBlur,
													} )
												}
												resetValue={ '14px' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ dateNShadowSpread }
												onChange={ (
													dateNShadowSpread
												) =>
													setAttributes( {
														dateNShadowSpread,
													} )
												}
												resetValue={ '-5px' }
											/>
										</HStack>
									</>
								</TabPanel>
								<TabPanel>
									<>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ dateHShadowColor }
											onChange={ ( dateHShadowColor ) =>
												setAttributes( {
													dateHShadowColor,
												} )
											}
											resetValue={ '#000' }
										/>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Horizontal',
													'grigora-kit'
												) }
												value={ dateHShadowHO }
												onChange={ ( dateHShadowHO ) =>
													setAttributes( {
														dateHShadowHO,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Vertical',
													'grigora-kit'
												) }
												value={ dateHShadowVO }
												onChange={ ( dateHShadowVO ) =>
													setAttributes( {
														dateHShadowVO,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<HStack spacing={ 2 }>
											<GrigoraUnitInput
												label={ __(
													'Blur',
													'grigora-kit'
												) }
												value={ dateHShadowBlur }
												onChange={ ( dateHShadowBlur ) =>
													setAttributes( {
														dateHShadowBlur,
													} )
												}
												resetValue={ '' }
											/>
											<GrigoraUnitInput
												label={ __(
													'Spread',
													'grigora-kit'
												) }
												value={ dateHShadowSpread }
												onChange={ (
													dateHShadowSpread
												) =>
													setAttributes( {
														dateHShadowSpread,
													} )
												}
												resetValue={ '' }
											/>
										</HStack>
										<GrigoraRangeInput
											label={ __(
												'Transition Time',
												'grigora-kit'
											) }
											max={ 5 }
											min={ 0.1 }
											unit={ 'sec' }
											step={ 0.1 }
											setValue={ ( transitionDateShadowTime ) =>
												setAttributes( {
													transitionDateShadowTime,
												} )
											}
											value={ transitionDateShadowTime }
											resetValue={ 0.2 }
										/>
									</>
								</TabPanel>
							</Tabs>
						</PanelBody>

					</PanelBody>

				</Spacer>
			</>
		)
	}

	function advancedSettings() { 
		return (
			<>
			</>
		)
	}

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<InspectorTabs className="grigora-tabs-container">
					<TabList className="tabs-header">
						<Tab className="general">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-pencil-fill"
								viewBox="0 0 16 16"
							>
								<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
							</svg>
							{ __( 'General', 'grigora-kit' ) }
						</Tab>
						<Tab className="styles">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-palette-fill"
								viewBox="0 0 16 16"
							>
								<path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
							</svg>
							{ __( 'Styles', 'grigora-kit' ) }
						</Tab>
						<Tab className="advanced">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-gear-fill"
								viewBox="0 0 16 16"
							>
								<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
							</svg>
							{ __( 'Advanced', 'grigora-kit' ) }
						</Tab>
					</TabList>

					<TabPanel>{ generalSettings() }</TabPanel>
					<TabPanel>{ stylesSettings() }</TabPanel>
					<TabPanel>{ advancedSettings() }</TabPanel>
				</InspectorTabs>
			</InspectorControls>
			{/* title styling  */}
			<style>
				{ `
					.block-id-${ id } .title-style{
						text-align: ${ titleAlign };
						transition: color ${ transitionTitleColorTime }s, background-color ${ transitionTitleColorTime }s;
						padding-left: ${ titlePadding?.left };
						padding-right: ${ titlePadding?.right };
						padding-top: ${ titlePadding?.top };
						padding-bottom: ${ titlePadding?.bottom };
						font-size: ${ titleTypoSize }px ;
						font-weight: ${ titleTypoWeight } ;
						text-transform: ${ titleTypoTransform } ;
						font-style: ${ titleTypoStyle } ;
						text-decoration: ${ titleTypoDecoration } ;
						line-height: ${
							titleTypoLineHeight != 'normal'
								? `${ titleTypoLineHeight }px`
								: `normal`
						} ;
						letter-spacing: ${
							titleTypoLetterSpacing != 'normal'
								? `${ titleTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							titleTypoWordSpacing != 'normal'
								? `${ titleTypoWordSpacing }px`
								: `normal`
						} ;
						font-family: ${ titleTypoFontFamily ? titleTypoFontFamily : '' };
						${ titleTextColor ? `color: ${ titleTextColor };` : `` }
						${ titleBgColor ? `background-color: ${ titleBgColor };` : `` }
					}
					${
						titleTextHColor ? ` .block-id-${ id } .title-style:hover {
							color: ${ titleTextHColor };
						}` : ``
					}
					${
						titleBgHColor ? ` .block-id-${ id } .title-style:hover {
							background-color: ${ titleBgHColor };
						}` : ``
					}
				`}
			</style>
			{/* description styling  */}
			<style>
				{ `
					.block-id-${ id } .description-style{
						text-align: ${ descriptionAlign };
						transition: color ${ transitionDescriptionColorTime }s, background-color ${ transitionDescriptionColorTime }s;
						padding-left: ${ descriptionPadding?.left };
						padding-right: ${ descriptionPadding?.right };
						padding-top: ${ descriptionPadding?.top };
						padding-bottom: ${ descriptionPadding?.bottom };
						font-size: ${ descriptionTypoSize }px ;
						font-weight: ${ descriptionTypoWeight } ;
						text-transform: ${ descriptionTypoTransform } ;
						font-style: ${ descriptionTypoStyle } ;
						text-decoration: ${ descriptionTypoDecoration } ;
						line-height: ${
							descriptionTypoLineHeight != 'normal'
								? `${ descriptionTypoLineHeight }px`
								: `normal`
						} ;
						letter-spacing: ${
							descriptionTypoLetterSpacing != 'normal'
								? `${ descriptionTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							descriptionTypoWordSpacing != 'normal'
								? `${ descriptionTypoWordSpacing }px`
								: `normal`
						} ;
						font-family: ${ descriptionTypoFontFamily ? descriptionTypoFontFamily : '' };
						${ descriptionTextColor ? `color: ${ descriptionTextColor };` : `` }
						${ descriptionBgColor ? `background-color: ${ descriptionBgColor };` : `` }
					}
					${
						descriptionTextHColor ? ` .block-id-${ id } .description-style:hover {
							color: ${ descriptionTextHColor };
						}` : ``
					}
					${
						descriptionBgHColor ? ` .block-id-${ id } .description-style:hover {
							background-color: ${ descriptionBgHColor };
						}` : ``
					}
				`}
			</style>
			{/* label styling  */}
			<style>
				{ `
					.block-id-${ id } .label-style{
						transition: color ${ transitionLabelColorTime }s, background-color ${ transitionLabelColorTime }s;
						padding-left: ${ labelPadding?.left };
						padding-right: ${ labelPadding?.right };
						padding-top: ${ labelPadding?.top };
						padding-bottom: ${ labelPadding?.bottom };
						font-size: ${ labelTypoSize }px ;
						font-weight: ${ labelTypoWeight } ;
						text-transform: ${ labelTypoTransform } ;
						font-style: ${ labelTypoStyle } ;
						text-decoration: ${ labelTypoDecoration } ;
						line-height: ${
							labelTypoLineHeight != 'normal'
								? `${ labelTypoLineHeight }px`
								: `normal`
						} ;
						letter-spacing: ${
							labelTypoLetterSpacing != 'normal'
								? `${ labelTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							labelTypoWordSpacing != 'normal'
								? `${ labelTypoWordSpacing }px`
								: `normal`
						} ;
						font-family: ${ labelTypoFontFamily ? labelTypoFontFamily : '' };
						${ labelTextColor ? `color: ${ labelTextColor };` : `` }
						${ labelBgColor ? `background-color: ${ labelBgColor };` : `` }
					}
					${
						labelTextHColor ? ` .block-id-${ id } .label-style:hover {
							color: ${ labelTextHColor };
						}` : ``
					}
					${
						labelBgHColor ? ` .block-id-${ id } .label-style:hover {
							background-color: ${ labelBgHColor };
						}` : ``
					}
				`}
			</style>
			{/* Button styling  */}
			<style>
				{ `
					.block-id-${ id } button{
						transition: color ${ transitionButtonColorTime }s, background-color ${ transitionButtonColorTime }s border ${ transitionButtonBorderTime }s box-shadow ${ transitionButtonShadowTime }s;
						border-left: ${ buttonNBorder?.left?.width } ${ buttonNBorder?.left?.style } ${
							buttonNBorder?.left?.color
								? buttonNBorder?.left?.color
								: ''
						} !important;
						border-right: ${ buttonNBorder?.right?.width } ${
							buttonNBorder?.right?.style
						} ${
							buttonNBorder?.right?.color
								? buttonNBorder?.right?.color
								: ''
						} !important;
						border-top: ${ buttonNBorder?.top?.width } ${ buttonNBorder?.top?.style } ${
							buttonNBorder?.top?.color
								? buttonNBorder?.top?.color
								: ''
						} !important;
						border-bottom: ${ buttonNBorder?.bottom?.width } ${
							buttonNBorder?.bottom?.style
						} ${
							buttonNBorder?.bottom?.color
								? buttonNBorder?.bottom?.color
								: ''
						} !important;
						border-top-right-radius: ${ buttonNBorderRadius?.topRight } !important;
						border-top-left-radius: ${ buttonNBorderRadius?.topLeft } !important;
						border-bottom-right-radius: ${ buttonNBorderRadius?.bottomRight } !important;
						border-bottom-left-radius: ${ buttonNBorderRadius?.bottomLeft } !important;
						box-shadow: ${ buttonNShadowHO } ${ buttonNShadowVO } ${ buttonNShadowBlur } ${ buttonNShadowSpread } ${ buttonNShadowColor } !important;
						padding-left: ${ buttonPadding?.left } !important;
						padding-right: ${ buttonPadding?.right } !important;
						padding-top: ${ buttonPadding?.top } !important;
						padding-bottom: ${ buttonPadding?.bottom } !important;
						font-size: ${ buttonTypoSize }px !important;
						font-weight: ${ buttonTypoWeight } !important;
						text-transform: ${ buttonTypoTransform } ;
						font-style: ${ buttonTypoStyle } ;
						text-decoration: ${ buttonTypoDecoration } ;
						line-height: ${
							buttonTypoLineHeight != 'normal'
								? `${ buttonTypoLineHeight }px`
								: `normal`
						} !important;
						letter-spacing: ${
							buttonTypoLetterSpacing != 'normal'
								? `${ buttonTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							buttonTypoWordSpacing != 'normal'
								? `${ buttonTypoWordSpacing }px`
								: `normal`
						} ;
						${ buttonTypoFontFamily  ? `font-family: ${ buttonTypoFontFamily } !important;` : '' }
						${ buttonTextColor ? `color: ${ buttonTextColor } !important;` : `` }
						${ buttonBgColor ? `background-color: ${ buttonBgColor } !important;` : `` }
					}
					.block-id-${ id } button:hover {
						${ buttonTextHColor ? `color: ${ buttonTextHColor } !important;` : `` }
						${ buttonBgHColor ? `background-color: ${ buttonBgHColor } !important;` : `` }
						${
							buttonHShadowHO ||
							buttonHShadowVO ||
							buttonHShadowBlur ||
							buttonHShadowSpread
								? `box-shadow: ${
										buttonHShadowHO
											? buttonHShadowHO
											: buttonNShadowHO
								} ${
										buttonHShadowVO
											? buttonHShadowVO
											: buttonNShadowVO
								} ${
										buttonHShadowBlur
											? buttonHShadowBlur
											: buttonNShadowBlur
								} ${
										buttonHShadowSpread
											? buttonHShadowSpread
											: buttonNShadowSpread
								} ${ buttonHShadowColor } !important;`
								: ``
						}
						border-left: ${ buttonHBorder?.left?.width } ${ buttonHBorder?.left?.style } ${ buttonHBorder?.left?.color ? buttonHBorder?.left?.color : '' } !important;
						border-right: ${ buttonHBorder?.right?.width } ${ buttonHBorder?.right?.style } ${ buttonHBorder?.right?.color ? buttonHBorder?.right?.color : '' } !important;
						border-top: ${ buttonHBorder?.top?.width } ${ buttonHBorder?.top?.style } ${ buttonHBorder?.top?.color ? buttonHBorder?.top?.color : '' } !important;
						border-bottom: ${ buttonHBorder?.bottom?.width } ${ buttonHBorder?.bottom?.style } ${ buttonHBorder?.bottom?.color ? buttonHBorder?.bottom?.color : '' } !important;
						${
							buttonHBorderRadius?.topRight
								? `border-top-right-radius: ${ buttonHBorderRadius?.topRight } !important;`
								: ``
						}
						${
							buttonHBorderRadius?.topLeft
								? `border-top-left-radius: ${ buttonHBorderRadius?.topLeft } !important;`
								: ``
						}
						${
							buttonHBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ buttonHBorderRadius?.bottomRight } !important;`
								: ``
						}
						${
							buttonHBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ buttonHBorderRadius?.bottomLeft } !important;`
								: ``
						}
					}
				`}
			</style>
			{/* Input Text Field styling  */}
			<style>
				{ `
					.block-id-${ id } .text-style{
						transition: color ${ transitionFieldColorTime }s, background-color ${ transitionFieldColorTime }s, border ${ transitionFieldBorderTime }s, box-shadow ${ transitionFieldShadowTime }s !important;
						border-left: ${ fieldNBorder?.left?.width } ${ fieldNBorder?.left?.style } ${
							fieldNBorder?.left?.color
								? fieldNBorder?.left?.color
								: ''
						} !important;
						border-right: ${ fieldNBorder?.right?.width } ${
							fieldNBorder?.right?.style
						} ${
							fieldNBorder?.right?.color
								? fieldNBorder?.right?.color
								: ''
						} !important;
						border-top: ${ fieldNBorder?.top?.width } ${ fieldNBorder?.top?.style } ${
							fieldNBorder?.top?.color
								? fieldNBorder?.top?.color
								: ''
						} !important;
						border-bottom: ${ fieldNBorder?.bottom?.width } ${
							fieldNBorder?.bottom?.style
						} ${
							fieldNBorder?.bottom?.color
								? fieldNBorder?.bottom?.color
								: ''
						} !important;
						border-top-right-radius: ${ fieldNBorderRadius?.topRight } !important;
						border-top-left-radius: ${ fieldNBorderRadius?.topLeft } !important;
						border-bottom-right-radius: ${ fieldNBorderRadius?.bottomRight } !important;
						border-bottom-left-radius: ${ fieldNBorderRadius?.bottomLeft } !important;
						box-shadow: ${ fieldNShadowHO } ${ fieldNShadowVO } ${ fieldNShadowBlur } ${ fieldNShadowSpread } ${ fieldNShadowColor } !important;
						padding-left: ${ fieldPadding?.left } !important;
						padding-right: ${ fieldPadding?.right } !important;
						padding-top: ${ fieldPadding?.top } !important;
						padding-bottom: ${ fieldPadding?.bottom } !important;
						font-size: ${ fieldTypoSize }px !important;
						font-weight: ${ fieldTypoWeight } !important;
						text-transform: ${ fieldTypoTransform } ;
						font-style: ${ fieldTypoStyle } ;
						text-decoration: ${ fieldTypoDecoration } ;
						line-height: ${
							fieldTypoLineHeight != 'normal'
								? `${ fieldTypoLineHeight }px`
								: `normal`
						} !important;
						letter-spacing: ${
							fieldTypoLetterSpacing != 'normal'
								? `${ fieldTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							fieldTypoWordSpacing != 'normal'
								? `${ fieldTypoWordSpacing }px`
								: `normal`
						} ;
						${ fieldTypoFontFamily  ? `font-family: ${ fieldTypoFontFamily } !important;` : '' }
						${ fieldTextColor ? `color: ${ fieldTextColor } !important;` : `` }
						${ fieldBgColor ? `background-color: ${ fieldBgColor } !important;` : `` }
					}
					.block-id-${ id } text-style:hover {
						${ fieldTextHColor ? `color: ${ fieldTextHColor } !important;` : `` }
						${ fieldBgHColor ? `background-color: ${ fieldBgHColor } !important;` : `` }
						${
							fieldHShadowHO ||
							fieldHShadowVO ||
							fieldHShadowBlur ||
							fieldHShadowSpread
								? `box-shadow: ${
										fieldHShadowHO
											? fieldHShadowHO
											: fieldNShadowHO
								} ${
										fieldHShadowVO
											? fieldHShadowVO
											: fieldNShadowVO
								} ${
										fieldHShadowBlur
											? fieldHShadowBlur
											: fieldNShadowBlur
								} ${
										fieldHShadowSpread
											? fieldHShadowSpread
											: fieldNShadowSpread
								} ${ fieldHShadowColor } !important;`
								: ``
						}
						border-left: ${ fieldHBorder?.left?.width } ${ fieldHBorder?.left?.style } ${ fieldHBorder?.left?.color ? fieldHBorder?.left?.color : '' } !important;
						border-right: ${ fieldHBorder?.right?.width } ${ fieldHBorder?.right?.style } ${ fieldHBorder?.right?.color ? fieldHBorder?.right?.color : '' } !important;
						border-top: ${ fieldHBorder?.top?.width } ${ fieldHBorder?.top?.style } ${ fieldHBorder?.top?.color ? fieldHBorder?.top?.color : '' } !important;
						border-bottom: ${ fieldHBorder?.bottom?.width } ${ fieldHBorder?.bottom?.style } ${ fieldHBorder?.bottom?.color ? fieldHBorder?.bottom?.color : '' } !important;
						${
							fieldHBorderRadius?.topRight
								? `border-top-right-radius: ${ fieldHBorderRadius?.topRight } !important;`
								: ``
						}
						${
							fieldHBorderRadius?.topLeft
								? `border-top-left-radius: ${ fieldHBorderRadius?.topLeft } !important;`
								: ``
						}
						${
							fieldHBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ fieldHBorderRadius?.bottomRight } !important;`
								: ``
						}
						${
							fieldHBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ fieldHBorderRadius?.bottomLeft } !important;`
								: ``
						}
					}
				`}
			</style>
			{/* CheckBox Input styling  */}
			<style>
				{ `
					.block-id-${ id } .checkbox-style{
						transition: background-color ${ transitionCheckboxColorTime }s, border ${ transitionCheckboxBorderTime }s, box-shadow ${ transitionCheckboxShadowTime }s !important;
						border-left: ${ checkboxNBorder?.left?.width } ${ checkboxNBorder?.left?.style } ${
							checkboxNBorder?.left?.color
								? checkboxNBorder?.left?.color
								: ''
						} !important;
						border-right: ${ checkboxNBorder?.right?.width } ${
							checkboxNBorder?.right?.style
						} ${
							checkboxNBorder?.right?.color
								? checkboxNBorder?.right?.color
								: ''
						} !important;
						border-top: ${ checkboxNBorder?.top?.width } ${ checkboxNBorder?.top?.style } ${
							checkboxNBorder?.top?.color
								? checkboxNBorder?.top?.color
								: ''
						} !important;
						border-bottom: ${ checkboxNBorder?.bottom?.width } ${
							checkboxNBorder?.bottom?.style
						} ${
							checkboxNBorder?.bottom?.color
								? checkboxNBorder?.bottom?.color
								: ''
						} !important;
						border-top-right-radius: ${ checkboxNBorderRadius?.topRight } !important;
						border-top-left-radius: ${ checkboxNBorderRadius?.topLeft } !important;
						border-bottom-right-radius: ${ checkboxNBorderRadius?.bottomRight } !important;
						border-bottom-left-radius: ${ checkboxNBorderRadius?.bottomLeft } !important;
						box-shadow: ${ checkboxNShadowHO } ${ checkboxNShadowVO } ${ checkboxNShadowBlur } ${ checkboxNShadowSpread } ${ checkboxNShadowColor } !important;
						padding-left: ${ checkboxPadding?.left } !important;
						padding-right: ${ checkboxPadding?.right } !important;
						padding-top: ${ checkboxPadding?.top } !important;
						padding-bottom: ${ checkboxPadding?.bottom } !important;
						${ checkboxBgColor ? `background-color: ${ checkboxBgColor } !important;` : `` }
					}
					.block-id-${ id } checkbox-style:hover {
						
						${ checkboxBgHColor ? `background-color: ${ checkboxBgHColor } !important;` : `` }
						${
							checkboxHShadowHO ||
							checkboxHShadowVO ||
							checkboxHShadowBlur ||
							checkboxHShadowSpread
								? `box-shadow: ${
										checkboxHShadowHO
											? checkboxHShadowHO
											: checkboxNShadowHO
								} ${
										checkboxHShadowVO
											? checkboxHShadowVO
											: checkboxNShadowVO
								} ${
										checkboxHShadowBlur
											? checkboxHShadowBlur
											: checkboxNShadowBlur
								} ${
										checkboxHShadowSpread
											? checkboxHShadowSpread
											: checkboxNShadowSpread
								} ${ checkboxHShadowColor } !important;`
								: ``
						}
						border-left: ${ checkboxHBorder?.left?.width } ${ checkboxHBorder?.left?.style } ${ checkboxHBorder?.left?.color ? checkboxHBorder?.left?.color : '' } !important;
						border-right: ${ checkboxHBorder?.right?.width } ${ checkboxHBorder?.right?.style } ${ checkboxHBorder?.right?.color ? checkboxHBorder?.right?.color : '' } !important;
						border-top: ${ checkboxHBorder?.top?.width } ${ checkboxHBorder?.top?.style } ${ checkboxHBorder?.top?.color ? checkboxHBorder?.top?.color : '' } !important;
						border-bottom: ${ checkboxHBorder?.bottom?.width } ${ checkboxHBorder?.bottom?.style } ${ checkboxHBorder?.bottom?.color ? checkboxHBorder?.bottom?.color : '' } !important;
						${
							checkboxHBorderRadius?.topRight
								? `border-top-right-radius: ${ checkboxHBorderRadius?.topRight } !important;`
								: ``
						}
						${
							checkboxHBorderRadius?.topLeft
								? `border-top-left-radius: ${ checkboxHBorderRadius?.topLeft } !important;`
								: ``
						}
						${
							checkboxHBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ checkboxHBorderRadius?.bottomRight } !important;`
								: ``
						}
						${
							checkboxHBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ checkboxHBorderRadius?.bottomLeft } !important;`
								: ``
						}
					}
				` }
			</style>
			{/* Select Input styling  */}
			<style>
				{ `
					.block-id-${ id } .select-style{
						transition: color ${ transitionSelectColorTime }s, background-color ${ transitionSelectColorTime }s, border ${ transitionSelectBorderTime }s, box-shadow ${ transitionSelectShadowTime }s !important;
						border-left: ${ selectNBorder?.left?.width } ${ selectNBorder?.left?.style } ${
							selectNBorder?.left?.color
								? selectNBorder?.left?.color
								: ''
						} !important;
						border-right: ${ selectNBorder?.right?.width } ${
							selectNBorder?.right?.style
						} ${
							selectNBorder?.right?.color
								? selectNBorder?.right?.color
								: ''
						} !important;
						border-top: ${ selectNBorder?.top?.width } ${ selectNBorder?.top?.style } ${
							selectNBorder?.top?.color
								? selectNBorder?.top?.color
								: ''
						} !important;
						border-bottom: ${ selectNBorder?.bottom?.width } ${
							selectNBorder?.bottom?.style
						} ${
							selectNBorder?.bottom?.color
								? selectNBorder?.bottom?.color
								: ''
						} !important;
						border-top-right-radius: ${ selectNBorderRadius?.topRight } !important;
						border-top-left-radius: ${ selectNBorderRadius?.topLeft } !important;
						border-bottom-right-radius: ${ selectNBorderRadius?.bottomRight } !important;
						border-bottom-left-radius: ${ selectNBorderRadius?.bottomLeft } !important;
						box-shadow: ${ selectNShadowHO } ${ selectNShadowVO } ${ selectNShadowBlur } ${ selectNShadowSpread } ${ selectNShadowColor } !important;
						padding-left: ${ selectPadding?.left } !important;
						padding-right: ${ selectPadding?.right } !important;
						padding-top: ${ selectPadding?.top } !important;
						padding-bottom: ${ selectPadding?.bottom } !important;
						font-size: ${ selectTypoSize }px !important;
						font-weight: ${ selectTypoWeight } !important;
						text-transform: ${ selectTypoTransform } ;
						font-style: ${ selectTypoStyle } ;
						text-decoration: ${ selectTypoDecoration } ;
						line-height: ${
							selectTypoLineHeight != 'normal'
								? `${ selectTypoLineHeight }px`
								: `normal`
						} !important;
						letter-spacing: ${
							selectTypoLetterSpacing != 'normal'
								? `${ selectTypoLetterSpacing }px`
								: `normal`
						} ;
						word-spacing: ${
							selectTypoWordSpacing != 'normal'
								? `${ selectTypoWordSpacing }px`
								: `normal`
						} ;
						${ selectTypoFontFamily  ? `font-family: ${ selectTypoFontFamily } !important;` : '' }
						${ selectTextColor ? `color: ${ selectTextColor } !important;` : `` }
						${ selectBgColor ? `background-color: ${ selectBgColor } !important;` : `` }
					}
					.block-id-${ id } select-style:hover {
						${ selectTextHColor ? `color: ${ selectTextHColor } !important;` : `` }
						${ selectBgHColor ? `background-color: ${ selectBgHColor } !important;` : `` }
						${
							selectHShadowHO ||
							selectHShadowVO ||
							selectHShadowBlur ||
							selectHShadowSpread
								? `box-shadow: ${
										selectHShadowHO
											? selectHShadowHO
											: selectNShadowHO
								} ${
										selectHShadowVO
											? selectHShadowVO
											: selectNShadowVO
								} ${
										selectHShadowBlur
											? selectHShadowBlur
											: selectNShadowBlur
								} ${
										selectHShadowSpread
											? selectHShadowSpread
											: selectNShadowSpread
								} ${ selectHShadowColor } !important;`
								: ``
						}
						border-left: ${ selectHBorder?.left?.width } ${ selectHBorder?.left?.style } ${ selectHBorder?.left?.color ? selectHBorder?.left?.color : '' } !important;
						border-right: ${ selectHBorder?.right?.width } ${ selectHBorder?.right?.style } ${ selectHBorder?.right?.color ? selectHBorder?.right?.color : '' } !important;
						border-top: ${ selectHBorder?.top?.width } ${ selectHBorder?.top?.style } ${ selectHBorder?.top?.color ? selectHBorder?.top?.color : '' } !important;
						border-bottom: ${ selectHBorder?.bottom?.width } ${ selectHBorder?.bottom?.style } ${ selectHBorder?.bottom?.color ? selectHBorder?.bottom?.color : '' } !important;
						${
							selectHBorderRadius?.topRight
								? `border-top-right-radius: ${ selectHBorderRadius?.topRight } !important;`
								: ``
						}
						${
							selectHBorderRadius?.topLeft
								? `border-top-left-radius: ${ selectHBorderRadius?.topLeft } !important;`
								: ``
						}
						${
							selectHBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ selectHBorderRadius?.bottomRight } !important;`
								: ``
						}
						${
							selectHBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ selectHBorderRadius?.bottomLeft } !important;`
								: ``
						}
					}
				` }
			</style>
			{/* Date Input styling  */}
			<style>
				{ `
					.block-id-${ id } .date-style{
						transition: color ${ transitionDateColorTime }s, background-color ${ transitionDateColorTime }s, border ${ transitionDateBorderTime }s, box-shadow ${ transitionDateShadowTime }s !important;
						border-left: ${ dateNBorder?.left?.width } ${ dateNBorder?.left?.style } ${
							dateNBorder?.left?.color
								? dateNBorder?.left?.color
								: ''
						} !important;
						border-right: ${ dateNBorder?.right?.width } ${
							dateNBorder?.right?.style
						} ${
							dateNBorder?.right?.color
								? dateNBorder?.right?.color
								: ''
						} !important;
						border-top: ${ dateNBorder?.top?.width } ${ dateNBorder?.top?.style } ${
							dateNBorder?.top?.color
								? dateNBorder?.top?.color
								: ''
						} !important;
						border-bottom: ${ dateNBorder?.bottom?.width } ${
							dateNBorder?.bottom?.style
						} ${
							dateNBorder?.bottom?.color
								? dateNBorder?.bottom?.color
								: ''
						} !important;
						border-top-right-radius: ${ dateNBorderRadius?.topRight } !important;
						border-top-left-radius: ${ dateNBorderRadius?.topLeft } !important;
						border-bottom-right-radius: ${ dateNBorderRadius?.bottomRight } !important;
						border-bottom-left-radius: ${ dateNBorderRadius?.bottomLeft } !important;
						box-shadow: ${ dateNShadowHO } ${ dateNShadowVO } ${ dateNShadowBlur } ${ dateNShadowSpread } ${ dateNShadowColor } !important;
						padding-left: ${ datePadding?.left } !important;
						padding-right: ${ datePadding?.right } !important;
						padding-top: ${ datePadding?.top } !important;
						padding-bottom: ${ datePadding?.bottom } !important;
						${ dateBgColor ? `background-color: ${ dateBgColor } !important;` : `` }
						${ dateColor ? `color: ${ dateColor } !important;` : `` }
					}
					.block-id-${ id } date-style:hover {
						${ dateBgHColor ? `background-color: ${ dateBgHColor } !important;` : `` }
						${ dateHColor ? `color: ${ dateHColor } !important;` : `` }
						${
							dateHShadowHO ||
							dateHShadowVO ||
							dateHShadowBlur ||
							dateHShadowSpread
								? `box-shadow: ${
										dateHShadowHO
											? dateHShadowHO
											: dateNShadowHO
								} ${
										dateHShadowVO
											? dateHShadowVO
											: dateNShadowVO
								} ${
										dateHShadowBlur
											? dateHShadowBlur
											: dateNShadowBlur
								} ${
										dateHShadowSpread
											? dateHShadowSpread
											: dateNShadowSpread
								} ${ dateHShadowColor } !important;`
								: ``
						}
						border-left: ${ dateHBorder?.left?.width } ${ dateHBorder?.left?.style } ${ dateHBorder?.left?.color ? dateHBorder?.left?.color : '' } !important;
						border-right: ${ dateHBorder?.right?.width } ${ dateHBorder?.right?.style } ${ dateHBorder?.right?.color ? dateHBorder?.right?.color : '' } !important;
						border-top: ${ dateHBorder?.top?.width } ${ dateHBorder?.top?.style } ${ dateHBorder?.top?.color ? dateHBorder?.top?.color : '' } !important;
						border-bottom: ${ dateHBorder?.bottom?.width } ${ dateHBorder?.bottom?.style } ${ dateHBorder?.bottom?.color ? dateHBorder?.bottom?.color : '' } !important;
						${
							dateHBorderRadius?.topRight
								? `border-top-right-radius: ${ dateHBorderRadius?.topRight } !important;`
								: ``
						}
						${
							dateHBorderRadius?.topLeft
								? `border-top-left-radius: ${ dateHBorderRadius?.topLeft } !important;`
								: ``
						}
						${
							dateHBorderRadius?.bottomRight
								? `border-bottom-right-radius: ${ dateHBorderRadius?.bottomRight } !important;`
								: ``
						}
						${
							dateHBorderRadius?.bottomLeft
								? `border-bottom-left-radius: ${ dateHBorderRadius?.bottomLeft } !important;`
								: ``
						}
					}
				` }
			</style>
			{/* Container styling  */}
			<style>
				{`
					.block-id-${ id } .form-options, .block-id-${ id } .main-container {
						gap: ${ gap }px;
					}
				`}
			</style>
			<div className='main-container'>
				<RichText
					value={titleText}
					tagName={TitleTag}
					placeholder={ __( 'Title ...', 'grigora-kit' )}
					onChange={ ( titleText ) => setAttributes( { titleText } ) }
					className='title-style'
				/>
				{ descriptionToggle && 
					<RichText
						value={descriptionText}
						tagName={DescriptionTag}
						placeholder={ __( 'Description ...', 'grigora-kit' )}
						onChange={ ( descriptionText ) => setAttributes( { descriptionText } ) }
						className='description-style'
					/> 
				}
				<div { ...innerBlocksProps } />
			</div>
			<Googlefontloader
				config={ {
					google: {
						families: [
							titleTypoFontFamily,
							descriptionTypoFontFamily,
							labelTypoFontFamily,
							buttonTypoFontFamily,
							fieldTypoFontFamily,
							selectTypoFontFamily,
						],
					},
				} }
			></Googlefontloader>
		</div>
	);
}