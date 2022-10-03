import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	RichText,
} from '@wordpress/block-editor';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
	color,
	justifyCenter,
} from '@wordpress/icons';
import {
	TabPanel as WPTabPanel,
	Icon,
	PanelBody,
	TextControl,
	__experimentalHStack as HStack,
	ToggleControl,
	Notice,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

import parse from 'html-react-parser';

import { ENTRANCE_ANIMATIONS } from '@constants';
import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import GrigoraRangeInput from '@components/range-input';
import GrigoraColorInput from '@components/color-input';
import IconPicker from '@components/icon-picker';
import GrigoraTextInput from '@components/text-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraNumberInput from '@components/number-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraToggleInput from '@components/toggle-input';
import SVGIcons from '@constants/icons.json';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraTypographyInput from '@components/typography-input';

import InspectorTabs from '@components/inspector-tabs';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		id,
		align,
		iconItems,
		iconSize,
		borderContainer,
		borderRadius,
		iconPadding,
		containerGap,
		displayShare,
		displayText,
		typoSize,
		typoStyle,
		typoDecoration,
		typoLetterSpacing,
		typoLineHeight,
		typoTransform,
		typoWeight,
		typoWordSpacing,
	} = attributes;

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-social-share': true,
			[ `block-id-${ id }` ]: id,
		} ),
	} );
	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'social-share' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'social-share' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
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



	function generalSettings() {
		return (
			<>
			
			<PanelBody title={ __( 'Icons Display' ) } initialOpen={false}>
				<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>
				{iconItems.map( ( item, index ) => {
				
				return (
					<GrigoraToggleInput
					label={ `Display ${item.title}` }
					value={ item.display }
					onChange={ ( change ) =>
						{
							let temp = [...iconItems];
							temp[index].display = change;
							setAttributes( { iconItems: temp } );
						}
					}
					/> 
				)
					
				}
				
				)
				}
				
			</Spacer>
			</PanelBody>

			
			<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

				<GrigoraToggleInput
						label={ `Display Share Icon` }
						value={ displayShare }
						onChange={ ( displayShare ) =>
							setAttributes( { displayShare } )
						}
						resetValue={ true }
				/>

				<GrigoraToggleInput
						label={ `Display Text` }
						value={ displayText }
						onChange={ ( displayText ) =>
							setAttributes( { displayText } )
						}
						resetValue={ false }
				/>

			</Spacer>


			
			
			</>

		);
	}

	function stylesSettings(){
		return(
			<>
				<PanelBody
					title={ __( 'Icon', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraRangeInput
						value={ iconSize }
						setValue={ ( iconSize ) => {
							setAttributes( { iconSize: iconSize.toString() } );
						} }
						label={ `Size` }
						resetValue={ 'default' }
					/>

					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( iconPadding ) => setAttributes( { iconPadding } ) }
						values={ iconPadding }
						resetValue={ {
							top: '5px',
							bottom: '5px',
							left: '5px',
							right: '5px',
						} }
					/>
					<PanelBody title={ __( 'Icons color', 'grigora-kit' ) } initialOpen={ false }>
						{iconItems.map( ( item, index ) => {
							
							return(
								<>
									<PanelBody title={ item.title } initialOpen={ false }>
										<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ item.color }
											onChange={ ( color ) => {
												let temp = [...iconItems];
												temp[index].color = color;
												setAttributes( { iconItems: temp } );
											} }
											resetValue={ 'white' }
										/>
										<GrigoraColorInput
											label={ __( 'Background Color', 'grigora-kit' ) }
											value={ item.backgroundColor }
											onChange={ ( backgroundColor ) => {
												let temp = [...iconItems];
												temp[index].backgroundColor = backgroundColor;
												setAttributes( { iconItems: temp } );
											} }
											resetValue={ item.defaultBgColor }
										/>
									</PanelBody>
								</>
							)
						})}
					</PanelBody>
				</PanelBody>

				<PanelBody
					title={ __( 'Container', 'grigora-kit' ) }
					initialOpen={ false }
				>
					
					<GrigoraBorderBoxInput
									label={ __( 'Width', 'grigora-kit' ) }
									onChange={ ( borderContainer ) => {
										if ( ! borderContainer.top ) {
											setAttributes( {
												borderContainer: {
													top: borderContainer,
													bottom: borderContainer,
													right: borderContainer,
													left: borderContainer,
												},
											} );
										} else {
											setAttributes( { borderContainer } );
										}
									} }
									value={ borderContainer }
									resetValue={ {
										top: {
											color: '#000',
											style: 'solid',
											width: '0px',
										},
										bottom: {
											color: '#000',
											style: 'solid',
											width: '0px',
										},
										right: {
											color: '#000',
											style: 'solid',
											width: '0px',
										},
										left: {
											color: '#000',
											style: 'solid',
											width: '0px',
										},
									} }
								/>

								<GrigoraBorderRadiusInput
									label={ __( 'Radius', 'grigora-kit' ) }
									onChange={ ( borderRadius ) => {
										if (
											typeof borderRadius ===
												'string' ||
											borderRadius instanceof
												String
										) {
											setAttributes( {
												borderRadius: {
													topLeft:
														borderRadius,
													topRight:
														borderRadius,
													bottomLeft:
														borderRadius,
													bottomRight:
														borderRadius,
												},
											} );
										} else {
											setAttributes( {
												borderRadius,
											} );
										}
									} }
									values={ borderRadius }
									resetValue={ {
										topLeft: '4px',
										topRight: '4px',
										bottomLeft: '4px',
										bottomRight: '4px',
									} }
								/>

					<GrigoraRangeInput
						label={ __( 'Tabs Gap', 'grigora-kit' ) }
						max={ 100 }
						min={ 10 }
						step={ 1 }
						unit={ 'px' }
						setValue={ ( containerGap ) => setAttributes( { containerGap } ) }
						value={ containerGap }
						resetValue={ 20 }
					/>
				</PanelBody>
				
				<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>		
					<GrigoraTypographyInput
							label={ __( 'Typography (Share Text)', 'grigora-kit' ) }
							size={ typoSize }
							sizeChange={ ( typoSize ) => {
								setAttributes( {
									typoSize: typoSize.toString(),
								} );
							} }
							lineHeight={ typoLineHeight }
							lineHeightChange={ ( typoLineHeight ) => {
								setAttributes( {
									typoLineHeight: typoLineHeight.toString(),
								} );
							} }
							letterSpacing={ typoLetterSpacing }
							letterSpacingChange={ ( typoLetterSpacing ) => {
								setAttributes( {
									typoLetterSpacing:
										typoLetterSpacing.toString(),
								} );
							} }
							wordSpacing={ typoWordSpacing }
							wordSpacingChange={ ( typoWordSpacing ) => {
								setAttributes( {
									typoTWordSpacing: typoWordSpacing.toString(),
								} );
							} }
							transform={ typoTransform }
							transformChange={ ( typoTransform ) =>
								setAttributes( { typoTransform } )
							}
							style={ typoStyle }
							styleChange={ ( typoStyle ) =>
								setAttributes( { typoStyle } )
							}
							decoration={ typoDecoration }
							decorationChange={ ( typoDecoration ) =>
								setAttributes( { typoDecoration } )
							}
							weight={ typoWeight }
							weightChange={ ( typoWeight ) =>
								setAttributes( { typoWeight } )
							}
						/>
				</Spacer>
			</>
		)
	}

	function handleIconClick(){
	}
	

	return (
		<div { ...blockProps }>
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
				</InspectorTabs>
			</InspectorControls>

			<style>
				{
					`
						.block-id-${ id } {
							border-left: ${ borderContainer?.left?.width } ${ borderContainer?.left?.style } ${
								borderContainer?.left?.color
									? borderContainer?.left?.color
									: ''
							};
							border-right: ${ borderContainer?.right?.width } ${
								borderContainer?.right?.style
							} ${
								borderContainer?.right?.color
									? borderContainer?.right?.color
									: ''
							};
							border-top: ${ borderContainer?.top?.width } ${ borderContainer?.top?.style } ${
								borderContainer?.top?.color
									? borderContainer?.top?.color
									: ''
							};
							border-bottom: ${ borderContainer?.bottom?.width } ${
								borderContainer?.bottom?.style
							} ${
								borderContainer?.bottom?.color
									? borderContainer?.bottom?.color
									: ''
							};

							border-top-right-radius: ${ borderRadius?.topRight };
							border-top-left-radius: ${ borderRadius?.topLeft };
							border-bottom-right-radius: ${ borderRadius?.bottomRight };
							border-bottom-left-radius: ${ borderRadius?.bottomLeft };
						}


						.block-id-${ id } .social-share-container {
							justify-content: ${ align };
							column-gap: ${ containerGap }px;

						}

						.block-id-${ id } .icon-item-container svg{
							height: ${ iconSize }px;
							width: ${ iconSize }px;
						
						}

						.block-id-${ id } .icon-item-container {
							padding-left: ${ iconPadding?.left };
							padding-right: ${ iconPadding?.right };
							padding-top: ${ iconPadding?.top };
							padding-bottom: ${ iconPadding?.bottom };
						
						}

						.block-id-${ id } .share-text{
							font-size: ${ typoSize }px;
							font-weight: ${ typoWeight };
							text-transform: ${ typoTransform };
							font-style: ${ typoStyle };
							text-decoration: ${ typoDecoration };
							line-height: ${
								typoLineHeight != 'normal'
									? `${ typoLineHeight }px`
									: `normal`
							};
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
						}



					`
				}
			</style>
		
			<div className='social-share-container'>
				{displayShare && <div className='share-icon-container'>
					<div className='arrow-design'></div>
					<div className='share-icon'>
						<Icon icon={ parse(SVGIcons[ 'share-fill' ]) } />
					</div>
					<div className='share-text'>
						<b>Share</b>
					</div>
				</div>}
				<div className='icons-container'>
					{
						iconItems.map( ( item, index ) => {
							return (<>
							
									{item.display && <div className="icon-item-container" style={{color: item.color, backgroundColor: item.backgroundColor}} onClick={() => handleIconClick()}>
										<Icon icon={ parse(SVGIcons[ item.title ]) } />
										{/* {displayText && <RichText
											tagName="div"
											value={ item.shareText }
											onChange={ ( v ) => {
												let newIcons = [ ...iconItems ];
												newIcons[ index ].shareText = v;
												setAttributes( { iconItems: newIcons } );
											} }
											placeholder={ __( `Share on...` ) }
											// className="title-class"
										/>} */}
									</div>}				
									{displayText && item.display && <RichText
											tagName="div"
											value={ item.shareText }
											onChange={ ( v ) => {
												let newIcons = [ ...iconItems ];
												newIcons[ index ].shareText = v;
												setAttributes( { iconItems: newIcons } );
											} }
											placeholder={ __( `Share on...` ) }
											className="share-text"
										/>}	
							</>				
							);
						})
					}
				</div>
			</div>

		</div>
	);
}
