import classnames from 'classnames';

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
	DateTimePicker
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
		hideDays,
		hideHours,
		hideMinutes,
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
		typoLSize,
		typoLStyle,
		typoLDecoration,
		typoLLetterSpacing,
		typoLLineHeight,
		typoLTransform,
		typoLWeight,
		typoLWordSpacing,
		effectNColorNumber,
		effectNColorLabel,
		effectNRotateX,
		effectNRotateY,
		effectNRotateZ,
		effectNSkewX,
		effectNSkewY,
		effectNOffsetX,
		effectNOffsetY,
		effectNScale,
		textShadowColorNumber,
		textShadowColorLabel,
		textShadowBlurNumber,
		textShadowBlurLabel,
		textShadowHorizontalNumber,
		textShadowHorizontalLabel,
		textShadowVerticalNumber,
		textShadowVerticalLabel,
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

		if(countdownDate === ""){
			setAttributes({countdownDate: new Date(Date.now() + 200000000).toString()})
		}

	}, [] );

	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __( 'Align left' ),
			align: 'flex-start',
		},
		{
			icon: alignCenter,
			title: __( 'Align center' ),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __( 'Align right' ),
			align: 'flex-end',
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
			value: '',
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
		  return <div>Completed</div>;
		} 
		
		else{
			if(orientation === "block"){
					return(
						<span class={"block"}>
							<div class={"prefix"}>
								{numPrefix}
							</div>
							{
								hideDays ? null:
								<div class={"days-container"}>
									<div class={"days"}>{format<2 ? days: zeroPad(days)}</div>
									<div class={"label"}>{dayLabel}</div>
								</div>
							}
							<div class={"divider"}>{ hideDays ? null: divider ? dividerCharacter : ''}</div>
							{
								hideHours ? null:
								<div class={"hours-container"}>
									<div class={"hours"}>{hideDays ? (format<2 ? (hours + days*24): zeroPad(hours + days*24)):(format<2 ? hours: zeroPad(hours))}</div>
									<div class={"label"}>{hourLabel}</div>
								</div>
							}
							<div class={"divider"}>{ hideHours ? null: divider ? dividerCharacter : ''}</div>

							{
								hideMinutes ? null:
								<div class={"minutes-container"}>
									<div class={"minutes"}>{hideHours ? (format<2 ? (minutes + hours*60 + days*24*60): zeroPad(minutes + hours*60 + days*24*60)):(format<2 ? minutes: zeroPad(minutes))}</div>
									<div class={"label"}>{minuteLabel}</div>
								</div>
							}
							<div class={"divider"}>{ hideMinutes ? null: divider ? dividerCharacter : ''}</div>
							<div class={"seconds-container"}>
								<div class={"seconds"}>{hideMinutes ? (format<2 ? (seconds + minutes*60 +hours*3600 + days*3600*24): (zeroPad(seconds + minutes*60 +hours*3600 + days*3600*24))):(format<2 ? seconds: zeroPad(seconds))}</div>
								<div class={"label"}>{secondLabel}</div>
							</div>
							<div class={"suffix"}>{numSuffix}</div>
						</span>
					)
				
			}


			else {
				// Render a countdown
					return (
						<span class={"inline"}>
							<div class={"prefix"}>
								{numPrefix}
							</div>
							{
								hideDays ? null:
								<div class={"days-container"}>
									<div class={"days"}>{format<2 ? days: zeroPad(days)}{dayLabel}</div>
								</div>
							}
							<div class={"divider"}>{ hideDays ? null: divider ? dividerCharacter : ''}</div>
							{
								hideHours ? null:
								<div class={"hours-container"}>
									<div class={"hours"}>{hideDays ? (format<2 ? (hours + days*24): zeroPad(hours + days*24)):(format<2 ? hours: zeroPad(hours))}{hourLabel}</div>
								</div>
							}
							<div class={"divider"}>{ hideHours ? null: divider ? dividerCharacter : ''}</div>

							{
								hideMinutes ? null:
								<div class={"minutes-container"}>
									<div class={"minutes"}>{hideHours ? (format<2 ? (minutes + hours*60 + days*24*60): zeroPad(minutes + hours*60 + days*24*60)):(format<2 ? minutes: zeroPad(minutes))}{minuteLabel}</div>
								</div>
							}
							<div class={"divider"}>{ hideMinutes ? null: divider ? dividerCharacter : ''}</div>
							<div class={"seconds-container"}>
								<div class={"seconds"}>{hideMinutes ? (format<2 ? (seconds + minutes*60 +hours*3600 + days*3600*24): (zeroPad(seconds + minutes*60 +hours*3600 + days*3600*24))):(format<2 ? seconds: zeroPad(seconds))}{secondLabel}</div>
							</div>
							<div class={"suffix"}>{numSuffix}</div>
						</span>
					);
				}
			  
			};
		}

	function effectNormalRenderNumber() {
		return (
			<>
				<PanelBody
					title={ __( 'Colors', 'grigora-kit' ) }
					initialOpen={ false }
					className={ `grigora-inside-panel` }
				>
					<GrigoraColorInput
						label={ __( 'Text', 'grigora-kit' ) }
						value={ effectNColorNumber }
						onChange={ ( effectNColorNumber ) =>
							setAttributes( { effectNColorNumber } )
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
						value={ textShadowColorNumber }
						onChange={ ( textShadowColorNumber ) =>
							setAttributes( { textShadowColorNumber } )
						}
						resetValue={ '#000' }
					/>
					<HStack spacing={ 2 }>
						<GrigoraUnitInput
							label="Blur"
							onChange={ ( textShadowBlurNumber ) =>
								setAttributes( { textShadowBlurNumber } )
							}
							value={ textShadowBlurNumber }
							resetValue={ '0px' }
						/>
						<GrigoraUnitInput
							label="Horizontal"
							onChange={ ( textShadowHorizontalNumber ) =>
								setAttributes( { textShadowHorizontalNumber } )
							}
							value={ textShadowHorizontalNumber }
							resetValue={ '0px' }
						/>
						<GrigoraUnitInput
							label="Vertical"
							onChange={ ( textShadowVerticalNumber ) =>
								setAttributes( { textShadowVerticalNumber } )
							}
							value={ textShadowVerticalNumber }
							resetValue={ '0px' }
						/>
					</HStack>
				</PanelBody>
			</>
		);
	}

	function effectNormalRenderLabel() {
		return (
			<>
				<PanelBody
					title={ __( 'Colors', 'grigora-kit' ) }
					initialOpen={ false }
					className={ `grigora-inside-panel` }
				>
					<GrigoraColorInput
						label={ __( 'Text', 'grigora-kit' ) }
						value={ effectNColorLabel }
						onChange={ ( effectNColorLabel ) =>
							setAttributes( { effectNColorLabel } )
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
						value={ textShadowColorLabel }
						onChange={ ( textShadowColorLabel ) =>
							setAttributes( { textShadowColorLabel } )
						}
						resetValue={ '#000' }
					/>
					<HStack spacing={ 2 }>
						<GrigoraUnitInput
							label="Blur"
							onChange={ ( textShadowBlurLabel ) =>
								setAttributes( { textShadowBlurLabel } )
							}
							value={ textShadowBlurLabel }
							resetValue={ '0px' }
						/>
						<GrigoraUnitInput
							label="Horizontal"
							onChange={ ( textShadowHorizontalLabel ) =>
								setAttributes( { textShadowHorizontalLabel } )
							}
							value={ textShadowHorizontalLabel }
							resetValue={ '0px' }
						/>
						<GrigoraUnitInput
							label="Vertical"
							onChange={ ( textShadowVerticalLabel ) =>
								setAttributes( { textShadowVerticalLabel } )
							}
							value={ textShadowVerticalLabel }
							resetValue={ '0px' }
						/>
					</HStack>
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

	return (
		<div { ...blockProps }>
			<style>
				{ `
				.block-id-${ id } {
					display: flex;
					justify-content: ${ align };
					
				}

				.block-id-${ id } .days, .block-id-${ id } .hours, .block-id-${ id } .minutes, .block-id-${ id } .seconds, .block-id-${ id } .prefix, .block-id-${ id } .suffix, .block-id-${ id } .divider {
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

					color: ${ effectNColorNumber };
					
					${
						( textShadowHorizontalNumber &&
							textShadowHorizontalNumber != '0px' ) ||
						( textShadowVerticalNumber &&
							textShadowVerticalNumber != '0px' ) ||
						( textShadowBlurNumber && textShadowBlurNumber != '0px' )
							? `filter: drop-shadow(${ `${
									textShadowHorizontalNumber
										? textShadowHorizontalNumber
										: '0px'
							  } ${
									textShadowVerticalNumber
										? textShadowVerticalNumber
										: '0px'
							  } ${
									textShadowBlurNumber ? textShadowBlurNumber : '0px'
							  } ${
									textShadowColorNumber
										? textShadowColorNumber
										: '#000'
							  }` });`
							: ``
					}
				}

				.block-id-${ id } .label {
					font-size: ${ typoLSize }px;
					font-weight: ${ typoLWeight };
					text-transform: ${ typoLTransform };
					font-style: ${ typoLStyle };
					line-height: ${
						typoLLineHeight != 'normal'
							? `${ typoLLineHeight }px`
							: `normal`
					};;
					letter-spacing: ${
						typoLLetterSpacing != 'normal'
							? `${ typoLLetterSpacing }px`
							: `normal`
					};
					word-spacing: ${
						typoLWordSpacing != 'normal'
							? `${ typoLWordSpacing }px`
							: `normal`
					};

					color: ${ effectNColorLabel };
					
					${
						( textShadowHorizontalLabel &&
							textShadowHorizontalLabel != '0px' ) ||
						( textShadowVerticalLabel &&
							textShadowVerticalLabel != '0px' ) ||
						( textShadowBlurLabel && textShadowBlurLabel != '0px' )
							? `filter: drop-shadow(${ `${
									textShadowHorizontalLabel
										? textShadowHorizontalLabel
										: '0px'
							  } ${
									textShadowVerticalLabel
										? textShadowVerticalLabel
										: '0px'
							  } ${
									textShadowBlurLabel ? textShadowBlurLabel : '0px'
							  } ${
									textShadowColorLabel
										? textShadowColorLabel
										: '#000'
							  }` });`
							: ``
					}
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
					<DateTimePicker
						label = "Countdown Deadline"
						currentDate = { countdownDate }
						onChange = { ( countdownDate ) => {
							setAttributes( {countdownDate} )
						} }
						is12Hour={ false }
						__nextRemoveHelpButton
						__nextRemoveResetButton
					/>
					<br></br>
					<GrigoraSelectInput
							label={ __( 'Time Format', 'grigora-kit' ) }
							onChange={ ( format ) =>
								setAttributes( { format } )
							}
							value={ format }
							resetValue={ 1 }
							options={ FORMAT }
						/>

					<GrigoraSelectInput
							label={ __( 'Orientation', 'grigora-kit' ) }
							onChange={ ( orientation ) =>
								setAttributes( { orientation } )
							}
							value={ orientation }
							resetValue={ 'block' }
							options={ ORIENTATION }
					/>

					<GrigoraToggleInput
						label={ __( 'Divider', 'grigora-kit' ) }
						onChange={ ( divider ) =>{
								setAttributes( { divider } )
								if(!divider) {
									setAttributes({dividerCharacter: ''})
								}
						}
						}
						value={ divider }
						resetValue={ false }
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
							resetValue={ '' }
							options={ DIVIDER }
						/> : <></>
					}
					<br></br>

					

					<GrigoraToggleInput
						label={ __( 'Hide Days', 'grigora-kit' ) }
						onChange={ ( hideDays ) =>{
							setAttributes( { hideDays } )
							if(!hideDays){
								setAttributes( { hideHours : false } )
								setAttributes( { hideMinutes : false } )
							}
						}
						}
						value={ hideDays }
						resetValue={ false }
						help={ __(
							'Will hide days and balance time left',
							'grigora-kit'
						) }
					/>

					<GrigoraTextInput
						label={ __( 'Days Label', 'grigora-kit' ) }
						onChange={ ( dayLabel ) =>
							setAttributes( { dayLabel } )
						}
						value={ dayLabel }
						resetValue={ 'DAYS' }
					/>
					{
						hideDays ?
						<GrigoraToggleInput
							label={ __( 'Hide Hours', 'grigora-kit' ) }
							onChange={ ( hideHours ) =>{
								setAttributes( { hideHours } )
								if(!hideHours){
									setAttributes( { hideMinutes : false } )
								}
							}
							}
							value={ hideHours }
							resetValue={ false }
							help={ __(
								'Will remove hours and balance time left',
								'grigora-kit'
							) }
						/> : null
					}

					<GrigoraTextInput
						label={ __( 'Hours Label', 'grigora-kit' ) }
						onChange={ ( hourLabel ) =>
							setAttributes( { hourLabel } )
						}
						value={ hourLabel }
						resetValue={ 'HRS' }
					/>
					{
						hideHours ?
						<GrigoraToggleInput
							label={ __( 'Hide Minutes', 'grigora-kit' ) }
							onChange={ ( hideMinutes ) =>{
								setAttributes( { hideMinutes } )
							}
							}
							value={ hideMinutes }
							resetValue={ false }
							help={ __(
								'Will remove minutes and balance time left',
								'grigora-kit'
							) }
						/> : null
					}

					<GrigoraTextInput
						label={ __( 'Minutes Label', 'grigora-kit' ) }
						onChange={ ( minuteLabel ) =>
							setAttributes( { minuteLabel } )
						}
						value={ minuteLabel }
						resetValue={ 'MINS' }
					/>

					<GrigoraTextInput
						label={ __( 'Seconds Label', 'grigora-kit' ) }
						onChange={ ( secondLabel ) =>
							setAttributes( { secondLabel } )
						}
						value={ secondLabel }
						resetValue={ 'SECS' }
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
					title={ __( 'Typography - Number', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
						value={ typoSize }
						setValue={ ( typoSize ) => {
							setAttributes( { typoSize: typoSize.toString() } );
						} }
						label={ `Size` }
						resetValue={ "default" }
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
							resetValue={ 'default' }
							options={ [{
								label: "Default",
								value: "default"
							}].concat(FONT_WEIGHTS.map( ( obj ) => {
								return {
									label: obj,
									value: obj,
								};
							} )) }
						/>
					</HStack>
				</PanelBody>
				{ orientation === "block" && (
					<PanelBody
					title={ __( 'Typography - Label', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
						value={ typoLSize }
						setValue={ ( typoLSize ) => {
							setAttributes( { typoLSize: typoLSize.toString() } );
						} }
						label={ `Size` }
						resetValue={ "default" }
					/>
					<GrigoraRangeInput
						value={ typoLLineHeight }
						setValue={ ( typoLLineHeight ) => {
							setAttributes( {
								typoLLineHeight: typoLLineHeight.toString(),
							} );
						} }
						label={ `Line Height` }
						min={ 10 }
						max={ 300 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ typoLLetterSpacing }
						setValue={ ( typoLLetterSpacing ) => {
							setAttributes( {
								typoLLetterSpacing: typoLLetterSpacing.toString(),
							} );
						} }
						label={ `Letter Spacing` }
						min={ 0 }
						max={ 150 }
						resetValue={ 'normal' }
					/>
					<GrigoraRangeInput
						value={ typoLWordSpacing }
						setValue={ ( typoLWordSpacing ) => {
							setAttributes( {
								typoLWordSpacing: typoLWordSpacing.toString(),
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
							onChange={ ( typoLTransform ) =>
								setAttributes( { typoLTransform } )
							}
							value={ typoLTransform }
							resetValue={ 'none' }
							options={ TEXT_TRANSFORMS }
						/>
						<GrigoraSelectInput
							label={ __( 'Style', 'grigora-kit' ) }
							onChange={ ( typoLStyle ) =>
								setAttributes( { typoLStyle } )
							}
							value={ typoLStyle }
							resetValue={ 'normal' }
							options={ TEXT_STYLE }
						/>
					</HStack>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							label={ __( 'Decoration', 'grigora-kit' ) }
							onChange={ ( typoLDecoration ) =>
								setAttributes( { typoLDecoration } )
							}
							value={ typoLDecoration }
							resetValue={ 'initial' }
							options={ TEXT_DECORATION }
						/>
						<GrigoraSelectInput
							label={ __( 'Weight', 'grigora-kit' ) }
							onChange={ ( typoLWeight ) =>
								setAttributes( { typoLWeight } )
							}
							value={ typoLWeight }
							resetValue={ 'default' }
							options={ [{
								label: "Default",
								value: "default"
							}].concat(FONT_WEIGHTS.map( ( obj ) => {
								return {
									label: obj,
									value: obj,
								};
							} )) }
						/>
					</HStack>
				</PanelBody>
				) }
				<PanelBody
					title={ __( 'Color & Effects - Number', 'grigora-kit' ) }
					initialOpen={ false }
				>
					{ effectNormalRenderNumber() }
				</PanelBody>
				<PanelBody
					title={ __( 'Color & Effects - Label', 'grigora-kit' ) }
					initialOpen={ false }
				>
					{ effectNormalRenderLabel() }
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
			</InspectorControls>
			<Countdown
				date={new Date(countdownDate)}
				autoStart={true}
				renderer={renderer}
			/>
			
		</div>
	);
}
