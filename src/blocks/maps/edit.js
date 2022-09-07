import classnames from 'classnames';

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
	const { attributes, setAttributes, isSelected } = props;

	const { 
		id,
		location,
		latitude,
		longitude,
		zoom,
		mapType,
		mapMode,
		apiKey,
		height,
		maxWidth,
		layoutPadding,
		layoutMargin,
		align,
		language,
		entranceAnimation,
		entranceAnimationTime,

	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'maps' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'maps' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-maps': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	const MAP_TYPE = [
		{
			label: __( 'Normal', 'grigora-kit' ),
			value: 'roadmap',
		},
		{
			label: __( 'Satellite', 'grigora-kit' ),
			value: 'satellite',
		},
	];
	
	const MAP_MODES = [
		{
			label: __( 'Place', 'grigora-kit' ),
			value: 'place',
		},
		{
			label: __( 'View', 'grigora-kit' ),
			value: 'view',
		},
	];

	const LANGUAGE = [
		{
			label: __( 'English', 'grigora-kit' ),
			value: 'en',
		},
		{
			label: __( 'Afrikaans', 'grigora-kit' ),
			value: 'af',
		},
		{
			label: __( 'Albanian', 'grigora-kit' ),
			value: 'sq',
		},
		{
			label: __( 'Amharic', 'grigora-kit' ),
			value: 'am',
		},
		{
			label: __( 'Arabic', 'grigora-kit' ),
			value: 'ar',
		},
		{
			label: __( 'Armenian', 'grigora-kit' ),
			value: 'hy',
		},
		{
			label: __( 'Azerbaijani', 'grigora-kit' ),
			value: 'az',
		},
		{
			label: __( 'Basque', 'grigora-kit' ),
			value: 'eu',
		},
		{
			label: __( 'Belarusian', 'grigora-kit' ),
			value: 'be',
		},
		{
			label: __( 'Bengali', 'grigora-kit' ),
			value: 'bn',
		},
		{
			label: __( 'Bosnian', 'grigora-kit' ),
			value: 'bs',
		},
		{
			label: __( 'Bulgarian', 'grigora-kit' ),
			value: 'bg',
		},
		{
			label: __( 'Catalan', 'grigora-kit' ),
			value: 'ca',
		},
		{
			label: __( 'Chinese', 'grigora-kit' ),
			value: 'zh',
		},
		{
			label: __( 'Chinese (Hong Kong)', 'grigora-kit' ),
			value: 'zh-HK',
		},
		{
			label: __( 'Croatian', 'grigora-kit' ),
			value: 'hr',
		},
		{
			label: __( 'Czech', 'grigora-kit' ),
			value: 'cs',
		},
		{
			label: __( 'Danish', 'grigora-kit' ),
			value: 'da',
		},
		{
			label: __( 'Dutch', 'grigora-kit' ),
			value: 'nl',
		},
		{
			label: __( 'English (Australian)', 'grigora-kit' ),
			value: 'en-AU',
		},
		{
			label: __( 'English (Great Britain)', 'grigora-kit' ),
			value: 'en-GB',
		},
		{
			label: __( 'Estonian', 'grigora-kit' ),
			value: 'et',
		},
		{
			label: __( 'Farsi', 'grigora-kit' ),
			value: 'fa',
		},
		{
			label: __( 'Finnish', 'grigora-kit' ),
			value: 'fi',
		},
		{
			label: __( 'Filipino', 'grigora-kit' ),
			value: 'fil',
		},
		{
			label: __( 'French', 'grigora-kit' ),
			value: 'fr',
		},
		{
			label: __( 'French (Canadian)', 'grigora-kit' ),
			value: 'fr-CA',
		},
		{
			label: __( 'Galician', 'grigora-kit' ),
			value: 'gl',
		},
		{
			label: __( 'Georgian', 'grigora-kit' ),
			value: 'ka',
		},
		{
			label: __( 'German', 'grigora-kit' ),
			value: 'de',
		},
		{
			label: __( 'Greek', 'grigora-kit' ),
			value: 'el',
		},
		{
			label: __( 'Gujarati', 'grigora-kit' ),
			value: 'gu',
		},
		{
			label: __( 'Hebrew', 'grigora-kit' ),
			value: 'iw',
		},
		{
			label: __( 'Hindi', 'grigora-kit' ),
			value: 'hi',
		},
		{
			label: __( 'Hungarian', 'grigora-kit' ),
			value: 'hu',
		},
		{
			label: __( 'Icelandic', 'grigora-kit' ),
			value: 'is',
		},
		{
			label: __( 'Indonesian', 'grigora-kit' ),
			value: 'id',
		},
		{
			label: __( 'Italian', 'grigora-kit' ),
			value: 'it',
		},
		{
			label: __( 'Japanese', 'grigora-kit' ),
			value: 'ja',
		},
		{
			label: __( 'Kannada', 'grigora-kit' ),
			value: 'kn',
		},
		{
			label: __( 'Kazakh', 'grigora-kit' ),
			value: 'kk',
		},
		{
			label: __( 'Khmer', 'grigora-kit' ),
			value: 'km',
		},
		{
			label: __( 'Korean', 'grigora-kit' ),
			value: 'ko',
		},
		{
			label: __( 'Kyrgyz', 'grigora-kit' ),
			value: 'ky',
		},
		{
			label: __( 'Lao', 'grigora-kit' ),
			value: 'lo',
		},
		{
			label: __( 'Latvian', 'grigora-kit' ),
			value: 'lv',
		},
		{
			label: __( 'Lithuanian', 'grigora-kit' ),
			value: 'lt',
		},
		{
			label: __( 'Macedonian', 'grigora-kit' ),
			value: 'mk',
		},
		{
			label: __( 'Malay', 'grigora-kit' ),
			value: 'ms',
		},
		{
			label: __( 'Malayalam', 'grigora-kit' ),
			value: 'ml',
		},
		{
			label: __( 'Marathi', 'grigora-kit' ),
			value: 'mr',
		},
		{
			label: __( 'Mongolian', 'grigora-kit' ),
			value: 'mn',
		},
		{
			label: __( 'Nepali', 'grigora-kit' ),
			value: 'ne',
		},
		{
			label: __( 'Norwegian', 'grigora-kit' ),
			value: 'no',
		},
		{
			label: __( 'Polish', 'grigora-kit' ),
			value: 'pl',
		},
		{
			label: __( 'Portuguese', 'grigora-kit' ),
			value: 'pt',
		},
		{
			label: __( 'Portuguese (Brazil)', 'grigora-kit' ),
			value: 'pt-BR',
		},
		{
			label: __( 'Portuguese (Portugal)', 'grigora-kit' ),
			value: 'pt-PT',
		},
		{
			label: __( 'Romanian', 'grigora-kit' ),
			value: 'ro',
		},
		{
			label: __( 'Russian', 'grigora-kit' ),
			value: 'ru',
		},
		{
			label: __( 'Serbian', 'grigora-kit' ),
			value: 'sr',
		},
		{
			label: __( 'Sinhalese', 'grigora-kit' ),
			value: 'si',
		},
		{
			label: __( 'Slovak', 'grigora-kit' ),
			value: 'sk',
		},
		{
			label: __( 'Slovenian', 'grigora-kit' ),
			value: 'sl',
		},
		{
			label: __( 'Spanish', 'grigora-kit' ),
			value: 'es',
		},
		{
			label: __( 'Spanish (Latin America)', 'grigora-kit' ),
			value: 'es-419',
		},
		{
			label: __( 'Swahili', 'grigora-kit' ),
			value: 'sw',
		},
		{
			label: __( 'Swedish', 'grigora-kit' ),
			value: 'sv',
		},
		{
			label: __( 'Tamil', 'grigora-kit' ),
			value: 'ta',
		},
		{
			label: __( 'Telugu', 'grigora-kit' ),
			value: 'te',
		},
		{
			label: __( 'Thai', 'grigora-kit' ),
			value: 'th',
		},
		{
			label: __( 'Turkish', 'grigora-kit' ),
			value: 'tr',
		},
		{
			label: __( 'Ukrainian', 'grigora-kit' ),
			value: 'uk',
		},
		{
			label: __( 'Urdu', 'grigora-kit' ),
			value: 'ur',
		},
		{
			label: __( 'Uzbek', 'grigora-kit' ),
			value: 'uz',
		},
		{
			label: __( 'Vietnamese', 'grigora-kit' ),
			value: 'vi',
		},
		{
			label: __( 'Zulu', 'grigora-kit' ),
			value: 'zu',
		},

	];

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

	function generalSettings(){
		return (
			<>
			<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

				<GrigoraSelectInput
						label={ __( 'Map Mode', 'grigora-kit' ) }
						onChange={ ( mapMode ) =>
							setAttributes( { mapMode } )
						}
						value={ mapMode }
						resetValue={ 'place' }
						options={ MAP_MODES }
					/>
				<br></br>
				{mapMode === 'place' ? <GrigoraTextInput
								label={ __(
									'Location',
									'grigora-kit'
								) }
								onChange={ ( location ) =>
									setAttributes( { location } )
								}
								value={ location }
								resetValue={ 'Chennai' }
							/> : (<>
							
							<GrigoraRangeInput
								value={ latitude }
								setValue={ ( latitude ) => {
									setAttributes( { latitude: latitude.toString() } );
								} }
								min = { -90 }
								max = { 90 }
								label={ `Latitude` }
								resetValue={ '20.5937' }
								unit = {'deg'}
								step = {0.0001}
							/>
							
							<GrigoraRangeInput
								value={ longitude }
								setValue={ ( longitude ) => {
									setAttributes( { longitude: longitude.toString() } );
								} }
								min = {-180}
								max = {180}
								label={ `Longitude` }
								resetValue={ '78.9629' }
								unit = {'deg'}
								step = {0.0001}
							/>

							
							
							</>)}
				<br></br>
				<GrigoraRangeInput
						value={ zoom }
						setValue={ ( zoom ) => {
							setAttributes( { zoom: zoom.toString() } );
						} }
						label={ `Zoom` }
						resetValue={ '5' }
						unit = {''}
					/>
				<br></br>
				<GrigoraSelectInput
						label={ __( 'Map type', 'grigora-kit' ) }
						onChange={ ( mapType ) =>
							setAttributes( { mapType } )
						}
						value={ mapType }
						resetValue={ 'roadmap' }
						options={ MAP_TYPE }
					/>
				<br></br>
				
				<GrigoraSelectInput
						label={ __( 'Language', 'grigora-kit' ) }
						onChange={ ( language ) =>
							setAttributes( { language } )
						}
						value={ language }
						resetValue={ 'en' }
						options={ LANGUAGE }
					/>

			</Spacer>
			
			</>
		)
	}

	function stylesSettings(){
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>
				<GrigoraRangeInput
						value={ height }
						setValue={ ( height ) => {
							setAttributes( { height: height.toString() } );
						} }
						label={ `Height` }
						resetValue={ '515' }
						max={ 1024 }
						min={ 0 }
					/>
				<GrigoraRangeInput
						value={ maxWidth }
						setValue={ ( maxWidth ) => {
							setAttributes( { maxWidth: maxWidth.toString() } );
						} }
						label={ `Max width` }
						resetValue={ '720' }
						max={ 1024 }
						min={ 0 }
					/>
				<br></br>
				<GrigoraBoxInput
							label={ __( 'Padding', 'grigora-kit' ) }
							onChange={ ( layoutPadding ) =>
								setAttributes( { layoutPadding } )
							}
							values={ layoutPadding }
							resetValue={ {
								top: '10px',
								bottom: '10px',
								left: '20px',
								right: '20px',
							} }
						/>
				<GrigoraBoxInput
							label={ __( 'Margin', 'grigora-kit' ) }
							onChange={ ( layoutMargin ) =>
								setAttributes( { layoutMargin } )
							}
							values={ layoutMargin }
							resetValue={ {
								top: '0px',
								bottom: '0px',
								left: '0px',
								right: '0px',
							} }
						/>
				</Spacer>
			</>
		)
	}

	function advancedSettings(){

		return(
			<>
	

			<PanelBody
					title={ __( 'On Scroll', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<br></br>
					<GrigoraSelectInput
						label={ __( 'Animation: ', 'grigora-kit' ) }
						labelPosition="side"
						onChange={ ( entranceAnimation ) =>
							setAttributes( { entranceAnimation } )
						}
						value={ entranceAnimation }
						options={ ENTRANCE_ANIMATIONS }
						resetValue={ 'none' }
					/>
					<GrigoraRangeInput
						label={ __( 'Transition Time', 'grigora-kit' ) }
						max={ 5 }
						min={ 0.1 }
						unit={ 'sec' }
						step={ 0.1 }
						setValue={ ( entranceAnimationTime ) =>
							setAttributes( { entranceAnimationTime } )
						}
						value={ entranceAnimationTime }
						resetValue={ 1 }
					/>
				</PanelBody>


			
			
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
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={ DEFAULT_ALIGNMENT_CONTROLS }
				/>
			</BlockControls>
			<style>
				{ `
				.block-id-${ id } {
					
				}
				` }
			</style>
			Google Maps will appear here.
			<iframe width={ maxWidth } 
			height={ height } 
			src={ `https://www.google.com/maps/embed/v1/${mapMode}?key=AIzaSyAeSWmYilRQSpfgQc_aZgCioDWdEIy4HdY&&${mapMode === 'place' ? ("q=" + location) : ('center=' + latitude +',' + longitude)}&zoom=${zoom}&maptype=${mapType}&language=${language}` }
			frameborder={"0"} 
			style={{border:0}}
			referrerpolicy={"no-referrer-when-downgrade"}
			allowfullscreen
			
			>
				
			</iframe>
			
			
		</div>
	);
}
