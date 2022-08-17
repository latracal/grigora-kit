import classnames from 'classnames';

import { DateTimePicker } from '@wordpress/components';
import Countdown,{zeroPad} from "react-countdown";

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	TabPanel,
	PanelBody,
	ToolbarButton,
	ToggleControl,
	Popover,
	Button,
	Tooltip,
	__experimentalHStack as HStack,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useState, useRef, useCallback, useEffect } from '@wordpress/element';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
} from '@wordpress/icons';

import {
	HOVER_ANIMATIONS,
	ENTRANCE_ANIMATIONS,
	ICON_POSITIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
} from '@constants';
import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraNumberInput from '@components/number-input';
import GrigoraTextInput from '@components/text-input';
import GrigoraToggleInput from '@components/toggle-input';
import GrigoraDateTimeInput from '@components/date-input';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	

	const {
		id,
		align,
		countdownDate,
		divider,
		dividerCharacter,
		format,
		showDays,
		showHours,
		showMinutes,
		dayLabel,
		orientation,
		hourLabel,
		minuteLabel,
		secondLabel,
		// countStart,
		// countEnd,
		// countTime,
		// numFormat,
		numPrefix,
		numSuffix,
		numTSeparator,
		typoSize,
		typoStyle,
		typoDecoration,
		typoLetterSpacing,
		typoLineHeight,
		typoTransform,
		typoWeight,
		typoWordSpacing,
		effectNColor,
		effectNRotateX,
		effectNRotateY,
		effectNRotateZ,
		effectNSkewX,
		effectNSkewY,
		effectNOffsetX,
		effectNOffsetY,
		effectNScale,
		textShadowColor,
		textShadowBlur,
		textShadowHorizontal,
		textShadowVertical,
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'countdown' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'countdown' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
		console.log("On load up ",countdownDate)
		console.log("On load up current Date ",Date.now())
	}, [] );

	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __( 'Align left' ),
			align: 'start',
		},
		{
			icon: alignCenter,
			title: __( 'Align center' ),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __( 'Align right' ),
			align: 'end',
		},
	];
	
	
	const FORMAT = [
		{
			label: __( '00', 'grigora-kit' ),
			value: 2,
		},
		{
			label: __( '0', 'grigora-kit' ),
			value: 1,
		},
	];

	const ORIENTATION = [
		{
			label: __( 'Inline', 'grigora-kit' ),
			value: 'inline',
		},
		{
			label: __( 'Block', 'grigora-kit' ),
			value: 'block',
		},
	]

	

	const DIVIDER = [
		{
			label: __( 'None', 'grigora-kit' ),
			value: ' ',
		},
		{
			label: __( ':', 'grigora-kit' ),
			value: ':',
		},
		{
			label: __( '/', 'grigora-kit' ),
			value: '/',
		},
	]

	const renderer = ({ days, hours, minutes, seconds, completed}) => {
		if (completed) {
		  // Render a completed state
		  return <div>Completed</div>;
		} 
		
		else{
			if(orientation === "block"){
				return(
					<span style={{display: 'flex'}}>
						<div>
							<div style={{textAlign: 'center'}}>{showDays?(format<2 ? days: zeroPad(days)):null}</div>
							<div style={{textAlign: 'center'}}>{showDays?dayLabel:null}</div>
						</div>
						{dividerCharacter}
						<div>
							<div style={{textAlign: 'center'}}>{showHours?(format<2 ? hours: zeroPad(hours)):null}</div>
							<div style={{textAlign: 'center'}}>{showHours?hourLabel:null}</div>
						</div>
						{dividerCharacter}
						<div>
							<div style={{textAlign: 'center'}}>{showMinutes?(format<2 ? minutes: zeroPad(minutes)):null}</div>
							<div style={{textAlign: 'center'}}>{showMinutes?minuteLabel:null}</div>
						</div>
						{dividerCharacter}
						<div>
							<div style={{textAlign: 'center'}}>{format<2 ? seconds: zeroPad(seconds)}</div>
							<div style={{textAlign: 'center'}}>{secondLabel}</div>
						</div>
					</span>
				)
			}


			else {
				// Render a countdown
				return (
				  <span>
					{showDays?(format<2 ? days: zeroPad(days)):null}
					{showDays?dayLabel:null}
					{dividerCharacter}
					{showHours?(format<2 ? hours: zeroPad(hours)):null}
					{showHours?hourLabel:null}
					{dividerCharacter}
					{showMinutes?(format<2 ? minutes: zeroPad(minutes)):null}
					{showMinutes?minuteLabel:null}
					{dividerCharacter}
					{format<2 ? seconds: zeroPad(seconds)}
					{secondLabel}
				  </span>
				);
			  }
			};
		}

	function effectNormalRender() {
		return (
			<>
				<PanelBody
					title={ __( 'Colors', 'grigora-kit' ) }
					initialOpen={ false }
					className={ `grigora-inside-panel` }
				>
					<GrigoraColorInput
						label={ __( 'Text', 'grigora-kit' ) }
						value={ effectNColor }
						onChange={ ( effectNColor ) =>
							setAttributes( { effectNColor } )
						}
						resetValue={ '#444444' }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Text Shadow', 'grigora-kit' ) }
					initialOpen={ false }
					className={ `grigora-inside-panel` }
				>
					<GrigoraColorInput
						label={ __( 'Color', 'grigora-kit' ) }
						value={ textShadowColor }
						onChange={ ( textShadowColor ) =>
							setAttributes( { textShadowColor } )
						}
						resetValue={ '#000' }
					/>
					<HStack spacing={ 2 }>
						<GrigoraUnitInput
							label="Blur"
							onChange={ ( textShadowBlur ) =>
								setAttributes( { textShadowBlur } )
							}
							value={ textShadowBlur }
							resetValue={ '0px' }
						/>
						<GrigoraUnitInput
							label="Horizontal"
							onChange={ ( textShadowHorizontal ) =>
								setAttributes( { textShadowHorizontal } )
							}
							value={ textShadowHorizontal }
							resetValue={ '0px' }
						/>
						<GrigoraUnitInput
							label="Vertical"
							onChange={ ( textShadowVertical ) =>
								setAttributes( { textShadowVertical } )
							}
							value={ textShadowVertical }
							resetValue={ '0px' }
						/>
					</HStack>
				</PanelBody>
				<PanelBody
					title={ __( 'Transforms', 'grigora-kit' ) }
					initialOpen={ false }
					className={ `grigora-inside-panel` }
				>
					<p>{ __( 'Rotate', 'grigora-kit' ) }</p>
					<HStack spacing={ 2 }>
						<GrigoraUnitInput
							label="X"
							onChange={ ( effectNRotateX ) =>
								setAttributes( { effectNRotateX } )
							}
							units={ [
								{
									default: 1,
									label: 'deg',
									value: 'deg',
								},
							] }
							value={ effectNRotateX }
							resetValue={ '0deg' }
						/>
						<GrigoraUnitInput
							label="Y"
							onChange={ ( effectNRotateY ) =>
								setAttributes( { effectNRotateY } )
							}
							units={ [
								{
									default: 1,
									label: 'deg',
									value: 'deg',
								},
							] }
							value={ effectNRotateY }
							resetValue={ '0deg' }
						/>
						<GrigoraUnitInput
							label="Z"
							onChange={ ( effectNRotateZ ) =>
								setAttributes( { effectNRotateZ } )
							}
							units={ [
								{
									default: 1,
									label: 'deg',
									value: 'deg',
								},
							] }
							value={ effectNRotateZ }
							resetValue={ '0deg' }
						/>
					</HStack>
					<br></br>
					<p>{ __( 'Skew', 'grigora-kit' ) }</p>
					<HStack spacing={ 2 }>
						<GrigoraUnitInput
							label="X"
							onChange={ ( effectNSkewX ) =>
								setAttributes( { effectNSkewX } )
							}
							units={ [
								{
									default: 1,
									label: 'deg',
									value: 'deg',
								},
							] }
							value={ effectNSkewX }
							resetValue={ '0deg' }
						/>
						<GrigoraUnitInput
							label="Y"
							onChange={ ( effectNSkewY ) =>
								setAttributes( { effectNSkewY } )
							}
							units={ [
								{
									default: 1,
									label: 'deg',
									value: 'deg',
								},
							] }
							value={ effectNSkewY }
							resetValue={ '0deg' }
						/>
					</HStack>
					<br></br>
					<p>{ __( 'Offset', 'grigora-kit' ) }</p>
					<HStack spacing={ 2 }>
						<GrigoraUnitInput
							label="X"
							onChange={ ( effectNOffsetX ) =>
								setAttributes( { effectNOffsetX } )
							}
							value={ effectNOffsetX }
							resetValue={ '0px' }
						/>
						<GrigoraUnitInput
							label="Y"
							onChange={ ( effectNOffsetY ) =>
								setAttributes( { effectNOffsetY } )
							}
							value={ effectNOffsetY }
							resetValue={ '0px' }
						/>
					</HStack>
					<br></br>
					<GrigoraRangeInput
						label={ __( 'Scale', 'grigora-kit' ) }
						max={ 2 }
						min={ 0 }
						step={ 0.1 }
						unit={ 'x' }
						setValue={ ( effectNScale ) =>
							setAttributes( { effectNScale } )
						}
						value={ effectNScale }
						resetValue={ 1 }
					/>
				</PanelBody>
			</>
		);
	}

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-countdown': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	// const formatCurrency = ( value ) =>
	// 	new Intl.NumberFormat( 'en', {
	// 		notation: 'compact',
	// 	} ).format( value );

	// const handleFormatCurrency = useCallback(
	// 	( countEnd ) =>
	// 		`${ numPrefix }${ formatCurrency( countEnd ) }${ numSuffix }`,
	// 	[ countEnd, numPrefix, numSuffix ]
	// );

	return (
		<div { ...blockProps }>
			<style>
				{ `
				.block-id-${ id } {
					text-align: ${ align };
					font-size: ${ typoSize }px;
					font-weight: ${ typoWeight };
					text-transform: ${ typoTransform };
					font-style: ${ typoStyle };
					line-height: ${
						typoLineHeight != 'normal'
							? `${ typoLineHeight }px`
							: `normal`
					};;
					letter-spacing: ${
						typoLetterSpacing != 'normal'
							? `${ typoLetterSpacing }px`
							: `normal`
					};
					word-spacing: ${
						typoWordSpacing != 'normal'
							? `${ typoWordSpacing }px`
							: `normal`
					};
					color: ${ effectNColor };
					text-shadow: ${ `${ textShadowHorizontal ? textShadowHorizontal : '0px' } ${
						textShadowVertical ? textShadowVertical : '0px'
					} ${
						textShadowBlur ? textShadowBlur : '0px'
					} ${ textShadowColor }` };
				}

				.block-id-${ id } span {
					text-decoration: ${ typoDecoration };
					transform: rotateX(${ effectNRotateX ? effectNRotateX : '0deg' }) rotateY(${
					effectNRotateY ? effectNRotateY : '0deg'
				}) rotateZ(${
					effectNRotateZ ? effectNRotateZ : '0deg'
				}) skewX(${ effectNSkewX ? effectNSkewX : '0deg' }) skewY(${
					effectNSkewY ? effectNSkewY : '0deg'
				}) translateX(${ effectNOffsetX }) translateY(${ effectNOffsetY }) scale(${ effectNScale });
				}
				` }
			</style>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={ DEFAULT_ALIGNMENT_CONTROLS }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Countdown', 'grigora-kit' ) }>
					{/* <GrigoraNumberInput
						label="Start"
						onChange={ ( countStart ) =>
							setAttributes( { countStart } )
						}
						value={ countStart }
						resetValue={ 0 }
					/> */}
					<br></br>
					{/* <DateTimePicker
						onChange={ ( countdownDate ) => setAttributes( {countdownDate} ) }
						currentDate = { Date.now() }
						is12Hour={ false }
						value = { countdownDate }
						__nextRemoveHelpButton
						__nextRemoveResetButton
        			/> */}
					<GrigoraDateTimeInput
						label = "Countdown Deadline"
						value = { countdownDate }
						onChange = { ( countdownDate ) => {
							setAttributes( {countdownDate} )
						} }
						resetValue = { new Date() }
					/>
					<br></br>
					<GrigoraSelectInput
							label={ __( 'Time Format', 'grigora-kit' ) }
							onChange={ ( format ) =>
								setAttributes( { format } )
							}
							value={ format }
							resetValue={ '00' }
							options={ FORMAT }
						/>

					<GrigoraSelectInput
							label={ __( 'Orientation', 'grigora-kit' ) }
							onChange={ ( orientation ) =>
								setAttributes( { orientation } )
							}
							value={ orientation }
							resetValue={ 'inline' }
							options={ ORIENTATION }
					/>

					<GrigoraToggleInput
						label={ __( 'Divider', 'grigora-kit' ) }
						onChange={ ( divider ) =>
							setAttributes( { divider } )
						}
						value={ divider }
						resetValue={ true }
						help={ __(
							'Formatting for time left',
							'grigora-kit'
						) }
					/>
					{
						divider ? 
						<GrigoraSelectInput
							label={ __( 'Divider format', 'grigora-kit' ) }
							onChange={ ( dividerCharacter ) =>
								setAttributes( { dividerCharacter } )
							}
							value={ dividerCharacter }
							resetValue={ ':' }
							options={ DIVIDER }
						/> : <></>
					}
					<br></br>

					

					<GrigoraToggleInput
						label={ __( 'Show Days', 'grigora-kit' ) }
						onChange={ ( showDays ) =>
							setAttributes( { showDays } )
						}
						value={ showDays }
						resetValue={ false }
						help={ __(
							'Will remove the standard format and show days',
							'grigora-kit'
						) }
					/>

					<GrigoraTextInput
						label={ __( 'Days Label', 'grigora-kit' ) }
						onChange={ ( dayLabel ) =>
							setAttributes( { dayLabel } )
						}
						value={ dayLabel }
						resetValue={ 'd' }
					/>

					<GrigoraToggleInput
						label={ __( 'Show Hours', 'grigora-kit' ) }
						onChange={ ( showHours ) =>
							setAttributes( { showHours } )
						}
						value={ showHours }
						resetValue={ false }
						help={ __(
							'Will remove the standard format and show hours',
							'grigora-kit'
						) }
					/>

					<GrigoraTextInput
						label={ __( 'Hours Label', 'grigora-kit' ) }
						onChange={ ( hourLabel ) =>
							setAttributes( { hourLabel } )
						}
						value={ hourLabel }
						resetValue={ 'h' }
					/>
					
					<GrigoraToggleInput
						label={ __( 'Show Minutes', 'grigora-kit' ) }
						onChange={ ( showMinutes ) =>
							setAttributes( { showMinutes } )
						}
						value={ showMinutes }
						resetValue={ false }
						help={ __(
							'Will remove the standard format and show minutes',
							'grigora-kit'
						) }
					/>

					<GrigoraTextInput
						label={ __( 'Minutes Label', 'grigora-kit' ) }
						onChange={ ( minuteLabel ) =>
							setAttributes( { minuteLabel } )
						}
						value={ minuteLabel }
						resetValue={ 'm' }
					/>

					<GrigoraTextInput
						label={ __( 'Seconds Label', 'grigora-kit' ) }
						onChange={ ( secondLabel ) =>
							setAttributes( { secondLabel } )
						}
						value={ secondLabel }
						resetValue={ 's' }
					/>

					<br></br>
					<GrigoraTextInput
						label={ __( 'Prefix', 'grigora-kit' ) }
						onChange={ ( numPrefix ) =>
							setAttributes( { numPrefix } )
						}
						value={ numPrefix }
						resetValue={ '' }
					/>
					<GrigoraTextInput
						label={ __( 'Suffix', 'grigora-kit' ) }
						onChange={ ( numSuffix ) =>
							setAttributes( { numSuffix } )
						}
						value={ numSuffix }
						resetValue={ '' }
					/>
					
					
				</PanelBody>
				<PanelBody
					title={ __( 'Typography', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
						value={ typoSize }
						setValue={ ( typoSize ) => {
							setAttributes( { typoSize } );
						} }
						label={ `Size` }
						resetValue={ 50 }
					/>
					<GrigoraRangeInput
						value={ typoLineHeight }
						setValue={ ( typoLineHeight ) => {
							setAttributes( {
								typoLineHeight: typoLineHeight.toString(),
							} );
						} }
						label={ `Line Height` }
						min={ 10 }
						max={ 300 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ typoLetterSpacing }
						setValue={ ( typoLetterSpacing ) => {
							setAttributes( {
								typoLetterSpacing: typoLetterSpacing.toString(),
							} );
						} }
						label={ `Letter Spacing` }
						min={ 0 }
						max={ 150 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ typoWordSpacing }
						setValue={ ( typoWordSpacing ) => {
							setAttributes( {
								typoWordSpacing: typoWordSpacing.toString(),
							} );
						} }
						label={ `Word Spacing` }
						min={ 0 }
						max={ 150 }
						resetValue={ 'normal' }
					/>
					<br></br>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							label={ __( 'Transform', 'grigora-kit' ) }
							onChange={ ( typoTransform ) =>
								setAttributes( { typoTransform } )
							}
							value={ typoTransform }
							resetValue={ 'none' }
							options={ TEXT_TRANSFORMS }
						/>
						<GrigoraSelectInput
							label={ __( 'Style', 'grigora-kit' ) }
							onChange={ ( typoStyle ) =>
								setAttributes( { typoStyle } )
							}
							value={ typoStyle }
							resetValue={ 'normal' }
							options={ TEXT_STYLE }
						/>
					</HStack>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							label={ __( 'Decoration', 'grigora-kit' ) }
							onChange={ ( typoDecoration ) =>
								setAttributes( { typoDecoration } )
							}
							value={ typoDecoration }
							resetValue={ 'initial' }
							options={ TEXT_DECORATION }
						/>
						<GrigoraSelectInput
							label={ __( 'Weight', 'grigora-kit' ) }
							onChange={ ( typoWeight ) =>
								setAttributes( { typoWeight } )
							}
							value={ typoWeight }
							resetValue={ '500' }
							options={ FONT_WEIGHTS.map( ( obj ) => {
								return {
									label: obj,
									value: obj,
								};
							} ) }
						/>
					</HStack>
				</PanelBody>
				<PanelBody
					title={ __( 'Color & Effects', 'grigora-kit' ) }
					initialOpen={ false }
				>
					{ effectNormalRender() }
				</PanelBody>
			</InspectorControls>
			{numPrefix} 
			<Countdown
			 date={countdownDate}
			 autoStart={true}
			 renderer={renderer}
			/>
			{numSuffix}
		</div>
	);
}