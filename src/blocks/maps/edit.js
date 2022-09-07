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
		zoom,
		mapType,
		mapFormat,
		apiKey,
		height,
		maxWidth,
		layoutPadding,
		align,
	
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
	
	const MAP_FILTER = [
		{
			label: __( 'None', 'grigora-kit' ),
			value: 'none',
		},
		{
			label: __( 'Grayscale', 'grigora-kit' ),
			value: 'grayscale',
		},
		{
			label: __( 'Invert', 'grigora-kit' ),
			value: 'invert',
		},
		{
			label: __( 'Saturate', 'grigora-kit' ),
			value: 'saturate',
		},
		{
			label: __( 'Sepia', 'grigora-kit' ),
			value: 'sepia',
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
				<GrigoraTextInput
								label={ __(
									'Location',
									'grigora-kit'
								) }
								onChange={ ( location ) =>
									setAttributes( { location } )
								}
								value={ location }
								resetValue={ 'Chennai' }
							/>
				<br></br>
				<GrigoraRangeInput
						value={ zoom }
						setValue={ ( zoom ) => {
							setAttributes( { zoom: zoom.toString() } );
						} }
						label={ `Zoom` }
						resetValue={ '11' }
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
						label={ __( 'Map format', 'grigora-kit' ) }
						onChange={ ( mapFormat ) =>
							setAttributes( { mapFormat } )
						}
						value={ mapFormat }
						resetValue={ 'none' }
						options={ MAP_FILTER }
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
				</Spacer>
			</>
		)
	}

	function advancedSettings(){

		return(
			<>
			<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

			<GrigoraTextInput
								label={ __(
									'API Key',
									'grigora-kit'
								) }
								onChange={ ( apiKey ) =>
									setAttributes( { apiKey } )
								}
								value={ apiKey }
								resetValue={ 'Chennai' }
							/>

			</Spacer>
			
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
			src={ `https://www.google.com/maps/embed/v1/place?key=AIzaSyAeSWmYilRQSpfgQc_aZgCioDWdEIy4HdY&&q=${location}&zoom=${zoom}&maptype=${mapType}` }
			frameborder={"0"} 
			style={{border:0}}
			referrerpolicy={"no-referrer-when-downgrade"}
			allowfullscreen
			
			>
				
			</iframe>
			
			
		</div>
	);
}
