import classnames from 'classnames';

import Countdown, { zeroPad } from 'react-countdown';
import { useSelect } from '@wordpress/data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	store as blockEditorStore,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	DateTimePicker,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { alignLeft, alignRight, alignCenter } from '@wordpress/icons';

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

import InspectorTabs from '@components/inspector-tabs';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

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
		countdownOnComplete,
		onCompleteURL,
		numPrefix,
		numSuffix,
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
		effectNPerspective,
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

		if ( countdownDate === '' ) {
			setAttributes( {
				countdownDate: new Date( Date.now() + 200000000 ).toString(),
			} );
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
	];

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
	];

	const ON_COMPLETE = [
		{
			label: __( 'Do Nothing', 'grigora-kit' ),
			value: 'nothing',
		},
		{
			label: __( 'Hide', 'grigora-kit' ),
			value: 'hide',
		},
		{
			label: __( 'Redirect to URL', 'grigora-kit' ),
			value: 'url',
		},
		{
			label: __( 'Show Content', 'grigora-kit' ),
			value: 'advanced',
		},
	];

	const [ previewExpired, setPreviewExpired ] = useState( false );

	const renderer = ( { days, hours, minutes, seconds, completed } ) => {
		const blockRenderer = () => {
			return (
				<span class={ 'block' }>
					<div class={ 'prefix' }>{ numPrefix }</div>
					{ hideDays ? null : (
						<div class={ 'days-container' }>
							<div class={ 'days' }>
								{ format < 2 ? days : zeroPad( days ) }
							</div>
							<div class={ 'label' }>{ dayLabel }</div>
						</div>
					) }
					<div class={ 'divider' }>
						{ hideDays ? null : divider ? dividerCharacter : '' }
					</div>
					{ hideHours ? null : (
						<div class={ 'hours-container' }>
							<div class={ 'hours' }>
								{ hideDays
									? format < 2
										? hours + days * 24
										: zeroPad( hours + days * 24 )
									: format < 2
									? hours
									: zeroPad( hours ) }
							</div>
							<div class={ 'label' }>{ hourLabel }</div>
						</div>
					) }
					<div class={ 'divider' }>
						{ hideHours ? null : divider ? dividerCharacter : '' }
					</div>

					{ hideMinutes ? null : (
						<div class={ 'minutes-container' }>
							<div class={ 'minutes' }>
								{ hideHours
									? format < 2
										? minutes + hours * 60 + days * 24 * 60
										: zeroPad(
												minutes +
													hours * 60 +
													days * 24 * 60
										  )
									: format < 2
									? minutes
									: zeroPad( minutes ) }
							</div>
							<div class={ 'label' }>{ minuteLabel }</div>
						</div>
					) }
					<div class={ 'divider' }>
						{ hideMinutes ? null : divider ? dividerCharacter : '' }
					</div>
					<div class={ 'seconds-container' }>
						<div class={ 'seconds' }>
							{ hideMinutes
								? format < 2
									? seconds +
									  minutes * 60 +
									  hours * 3600 +
									  days * 3600 * 24
									: zeroPad(
											seconds +
												minutes * 60 +
												hours * 3600 +
												days * 3600 * 24
									  )
								: format < 2
								? seconds
								: zeroPad( seconds ) }
						</div>
						<div class={ 'label' }>{ secondLabel }</div>
					</div>
					<div class={ 'suffix' }>{ numSuffix }</div>
				</span>
			);
		};

		const inlineRenderer = () => {
			return (
				<span class={ 'inline' }>
					<div class={ 'prefix' }>{ numPrefix }</div>
					{ hideDays ? null : (
						<div class={ 'days-container' }>
							<div class={ 'days' }>
								{ format < 2 ? days : zeroPad( days ) }
								{ dayLabel }
							</div>
						</div>
					) }
					<div class={ 'divider' }>
						{ hideDays ? null : divider ? dividerCharacter : '' }
					</div>
					{ hideHours ? null : (
						<div class={ 'hours-container' }>
							<div class={ 'hours' }>
								{ hideDays
									? format < 2
										? hours + days * 24
										: zeroPad( hours + days * 24 )
									: format < 2
									? hours
									: zeroPad( hours ) }
								{ hourLabel }
							</div>
						</div>
					) }
					<div class={ 'divider' }>
						{ hideHours ? null : divider ? dividerCharacter : '' }
					</div>

					{ hideMinutes ? null : (
						<div class={ 'minutes-container' }>
							<div class={ 'minutes' }>
								{ hideHours
									? format < 2
										? minutes + hours * 60 + days * 24 * 60
										: zeroPad(
												minutes +
													hours * 60 +
													days * 24 * 60
										  )
									: format < 2
									? minutes
									: zeroPad( minutes ) }
								{ minuteLabel }
							</div>
						</div>
					) }
					<div class={ 'divider' }>
						{ hideMinutes ? null : divider ? dividerCharacter : '' }
					</div>
					<div class={ 'seconds-container' }>
						<div class={ 'seconds' }>
							{ hideMinutes
								? format < 2
									? seconds +
									  minutes * 60 +
									  hours * 3600 +
									  days * 3600 * 24
									: zeroPad(
											seconds +
												minutes * 60 +
												hours * 3600 +
												days * 3600 * 24
									  )
								: format < 2
								? seconds
								: zeroPad( seconds ) }
							{ secondLabel }
						</div>
					</div>
					<div class={ 'suffix' }>{ numSuffix }</div>
				</span>
			);
		};
		if ( completed ) {
			if ( orientation === 'block' ) {
				return blockRenderer();
			} else {
				return inlineRenderer();
			}
		} else {
			if ( orientation === 'block' ) {
				return blockRenderer();
			} else {
				// Render a countdown
				return inlineRenderer();
			}
		}
	};

	function effectNormalRenderNumber() {
		return (
			<>
				<PanelBody
					title={ __( 'Colors', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraColorInput
						label={ __( 'Number', 'grigora-kit' ) }
						value={ effectNColorNumber }
						onChange={ ( effectNColorNumber ) =>
							setAttributes( { effectNColorNumber } )
						}
						resetValue={ '#444444' }
					/>

					<GrigoraColorInput
						label={ __( 'Label', 'grigora-kit' ) }
						value={ effectNColorLabel }
						onChange={ ( effectNColorLabel ) =>
							setAttributes( { effectNColorLabel } )
						}
						resetValue={ '#444444' }
					/>
				</PanelBody>
			</>
		);
	}

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>
					<DateTimePicker
						label="Countdown Deadline"
						currentDate={ countdownDate }
						onChange={ ( countdownDate ) => {
							setAttributes( { countdownDate } );
							let pickedDate = new Date( countdownDate );
							let today = new Date();
						} }
						is12Hour={ false }
						__nextRemoveHelpButton
						__nextRemoveResetButton
					/>
					<br></br>
					<GrigoraSelectInput
						label={ __( 'Countdown On Complete', 'grigora-kit' ) }
						onChange={ ( countdownOnComplete ) =>
							setAttributes( { countdownOnComplete } )
						}
						value={ countdownOnComplete }
						resetValue={ 'nothing' }
						options={ ON_COMPLETE }
					/>
					{ countdownOnComplete == 'url' && (
						<GrigoraTextInput
							label={ __(
								'URL (https:// or http:// format)',
								'grigora-kit'
							) }
							onChange={ ( onCompleteURL ) =>
								setAttributes( { onCompleteURL } )
							}
							value={ onCompleteURL }
							resetValue={ '' }
						/>
					) }
					{ countdownOnComplete === 'advanced' && (
						<>
							<Button
								className="on-complete-buttons"
								isPressed={ ! previewExpired }
								onClick={ () => setPreviewExpired( false ) }
							>
								<span>
									{ __( 'Countdown', 'grigora-kit' ) }
								</span>
							</Button>
							<Button
								className="on-complete-buttons"
								isPressed={ previewExpired }
								onClick={ () => setPreviewExpired( true ) }
							>
								<span>{ __( 'Content', 'grigora-kit' ) }</span>
							</Button>
						</>
					) }
					<GrigoraSelectInput
						label={ __( 'Time Format', 'grigora-kit' ) }
						onChange={ ( format ) => setAttributes( { format } ) }
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
						onChange={ ( divider ) => {
							setAttributes( { divider } );
							if ( ! divider ) {
								setAttributes( { dividerCharacter: '' } );
							}
						} }
						value={ divider }
						resetValue={ false }
						help={ __( 'Formatting for time left', 'grigora-kit' ) }
					/>
					{ divider ? (
						<GrigoraSelectInput
							label={ __( 'Divider format', 'grigora-kit' ) }
							onChange={ ( dividerCharacter ) =>
								setAttributes( { dividerCharacter } )
							}
							value={ dividerCharacter }
							resetValue={ '' }
							options={ DIVIDER }
						/>
					) : (
						<></>
					) }
					<br></br>

					<GrigoraToggleInput
						label={ __( 'Hide Days', 'grigora-kit' ) }
						onChange={ ( hideDays ) => {
							setAttributes( { hideDays } );
							if ( ! hideDays ) {
								setAttributes( { hideHours: false } );
								setAttributes( { hideMinutes: false } );
							}
						} }
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
					{ hideDays ? (
						<GrigoraToggleInput
							label={ __( 'Hide Hours', 'grigora-kit' ) }
							onChange={ ( hideHours ) => {
								setAttributes( { hideHours } );
								if ( ! hideHours ) {
									setAttributes( { hideMinutes: false } );
								}
							} }
							value={ hideHours }
							resetValue={ false }
							help={ __(
								'Will remove hours and balance time left',
								'grigora-kit'
							) }
						/>
					) : null }

					<GrigoraTextInput
						label={ __( 'Hours Label', 'grigora-kit' ) }
						onChange={ ( hourLabel ) =>
							setAttributes( { hourLabel } )
						}
						value={ hourLabel }
						resetValue={ 'HRS' }
					/>
					{ hideHours ? (
						<GrigoraToggleInput
							label={ __( 'Hide Minutes', 'grigora-kit' ) }
							onChange={ ( hideMinutes ) => {
								setAttributes( { hideMinutes } );
							} }
							value={ hideMinutes }
							resetValue={ false }
							help={ __(
								'Will remove minutes and balance time left',
								'grigora-kit'
							) }
						/>
					) : null }

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
				</Spacer>
			</>
		);
	}

	function stylesSettings() {
		return (
			<>
				{ effectNormalRenderNumber() }
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
						resetValue={ 'default' }
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
							options={ [
								{
									label: 'Default',
									value: 'default',
								},
							].concat(
								FONT_WEIGHTS.map( ( obj ) => {
									return {
										label: obj,
										value: obj,
									};
								} )
							) }
						/>
					</HStack>
				</PanelBody>
				{ orientation === 'block' && (
					<PanelBody
						title={ __( 'Typography - Label', 'grigora-kit' ) }
						initialOpen={ false }
					>
						<GrigoraRangeInput
							value={ typoLSize }
							setValue={ ( typoLSize ) => {
								setAttributes( {
									typoLSize: typoLSize.toString(),
								} );
							} }
							label={ `Size` }
							resetValue={ 'default' }
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
									typoLLetterSpacing:
										typoLLetterSpacing.toString(),
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
									typoLWordSpacing:
										typoLWordSpacing.toString(),
								} );
							} }
							label={ `Word Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<br></br>
						<HStack
							spacing={ 2 }
							className="grigora-dropdown-hstack"
						>
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
						<HStack
							spacing={ 2 }
							className="grigora-dropdown-hstack"
						>
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
								options={ [
									{
										label: 'Default',
										value: 'default',
									},
								].concat(
									FONT_WEIGHTS.map( ( obj ) => {
										return {
											label: obj,
											value: obj,
										};
									} )
								) }
							/>
						</HStack>
					</PanelBody>
				) }
			</>
		);
	}

	function advancedSettings() {
		return (
			<>
				<PanelBody
					title={ __( 'Transforms', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraUnitInput
						label={ __( 'Perspective', 'grigora-kit' ) }
						onChange={ ( effectNPerspective ) =>
							setAttributes( { effectNPerspective } )
						}
						value={ effectNPerspective }
						resetValue={ '' }
					/>
					<br></br>
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
				<PanelBody
					title={ __( 'Text Shadow - Number', 'grigora-kit' ) }
					initialOpen={ false }
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
				<PanelBody
					title={ __( 'Text Shadow - Label', 'grigora-kit' ) }
					initialOpen={ false }
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
						( textShadowBlurNumber &&
							textShadowBlurNumber != '0px' )
							? `filter: drop-shadow(${ `${
									textShadowHorizontalNumber
										? textShadowHorizontalNumber
										: '0px'
							  } ${
									textShadowVerticalNumber
										? textShadowVerticalNumber
										: '0px'
							  } ${
									textShadowBlurNumber
										? textShadowBlurNumber
										: '0px'
							  } ${
									textShadowColorNumber
										? textShadowColorNumber
										: '#000'
							  }` });`
							: ``
					}
				}

				.block-id-${ id } .label, .block-id-${ id } .completed {
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
									textShadowBlurLabel
										? textShadowBlurLabel
										: '0px'
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
					transform: ${ effectNPerspective ? `perspective(${ effectNPerspective })` : `` } rotateX(${ effectNRotateX ? effectNRotateX : '0deg' }) rotateY(${
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
			{ previewExpired === false ? (
				<Countdown
					date={ new Date( countdownDate ) }
					autoStart={ true }
					renderer={ renderer }
				/>
			) : (
				<InnerBlocks
					renderAppender={
						hasInnerBlocks
							? undefined
							: InnerBlocks.ButtonBlockAppender
					}
				/>
			) }
		</div>
	);
}
