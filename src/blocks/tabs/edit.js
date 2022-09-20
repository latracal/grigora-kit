import classnames from 'classnames';

import {compose} from '@wordpress/compose';

import {createBlock} from '@wordpress/blocks';


import { useSelect, withSelect, withDispatch } from '@wordpress/data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SVGIcons from '@constants/icons.json';

import {
	TabPanel as WTabPanel,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	RichText,
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
import { useState, useEffect, useRef } from '@wordpress/element';
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
import { forEach } from 'lodash';

import parse from 'html-react-parser';

function Edit( props ) {
	const { attributes, setAttributes, isSelected, clientId, block, insertBlock, replaceInnerBlocks } = props;
	const { 
		id,
		tabs,
		activeTab,
		minHeight,
		maxWidth,
		showTabSubtitles,
		entranceAnimation,
		entranceAnimationTime,
		typoTSize,
		typoTStyle,
		typoTDecoration,
		typoTLetterSpacing,
		typoTLineHeight,
		typoTTransform,
		typoTWeight,
		typoTWordSpacing,
		typoSTSize,
		typoSTStyle,
		typoSTDecoration,
		typoSTLetterSpacing,
		typoSTLineHeight,
		typoSTTransform,
		typoSTWeight,
		typoSTWordSpacing,
		titleColor,
		titleHoverColor,
		titleBorderColor,
		titleBorderHoverColor,
		titleBorderActiveColor,
		bgTitleActiveColor,
		bgTitleHoverColor,
		activeColor,
		bgColor,
		borderStyle,
		borderContentStyle,
		margin,
		padding,
		borderTitle,
		effectNBorderRadius,
		contentColor,
		contentHoverColor,
		contentBgColor,
		contentBorderColor,
		contentMargin,
		contentPadding,
		borderContent,
		effectCBorderRadius,
		tabGap,
		contentGap,
	 } = attributes;

	const MY_TEMPLATE = 
		tabs.map( ( tab, index ) => {
			return [ 'grigora-kit/inner-tab', {} ]
		})
	;


	const BORDER_STYLES = [
		{ label: 'Solid', value: 'solid' },
		{ label: 'Dashed', value: 'dashed' },
		{ label: 'Dotted', value: 'dotted' },
	]

	const [renderNavigate, setRenderNavigate] = useState(-1);

	const ALLOWED_BLOCKS = [
		'grigora-kit/inner-tab',
	];

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'tabs' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'tabs' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}


	}, [] );

	function navigateLeft(index){
		let newtabs = [...tabs];
		let newBlock = [...block.innerBlocks];
		let temp = newtabs[index];
		let tempBlock = newBlock[index];
		
		if(index > 0){
			setAttributes({activeTab: index-1});
			newtabs[index] = newtabs[index-1];
			newtabs[index-1] = temp;
			newBlock[index] = newBlock[index-1];
			newBlock[index-1] = tempBlock;
			setAttributes({tabs: newtabs});
			replaceInnerBlocks( clientId, [
				...newBlock
			], false );
			
		}
	}

	function navigateRight(index){
		
		let newtabs = [...tabs];
		let newBlock = [...block.innerBlocks];
		let temp = newtabs[index];
		let tempBlock = newBlock[index];
		if(index < newtabs.length-1){
			
			newtabs[index] = newtabs[index+1];
			newtabs[index+1] = temp;
			newBlock[index] = newBlock[index+1];
			newBlock[index+1] = tempBlock;

			setAttributes({tabs: newtabs});



			replaceInnerBlocks( clientId, [
				...newBlock
			], false );

			setAttributes({activeTab: index+1});
		}
	}

	

	function renderNavigationButtons(index) {
	
		const delete_icon = parse( SVGIcons[ 'x-circle' ] );
		const left_icon = parse( SVGIcons[ 'arrow-left' ] );
		const right_icon = parse( SVGIcons[ 'arrow-right' ] );
		
		if (index < 1){
			return (
				<div className='naviagte-tab'>
					<div className='navigate-icon' onClick={() => navigateRight(index)}>{right_icon}</div>
					<div className='delete-icon' onClick={() => deleteTab(index)}>{delete_icon}</div>
				</div>
			)
		}

		else if (index == tabs.length - 1){
			return (
				<div className='naviagte-tab'>
					<div className='navigate-icon' onClick={() => navigateLeft(index)}>{left_icon}</div>
					<div className='delete-icon' onClick={() => deleteTab(index)}>{delete_icon}</div>
				</div>
			)
		}

		else{
			return (
				<div className='naviagte-tab'>
					<div className='navigate-icon' onClick={() => navigateLeft(index)}>{left_icon}</div>
					<div className='navigate-icon' onClick={() => navigateRight(index)}>{right_icon}</div>
					<div className='delete-icon' onClick={() => deleteTab(index)}>{delete_icon}</div>
				</div>
			)
		}
		
	}



	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-tabs': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: classnames( {
			'tab-contents': true,
		} ),
	},{
		template: MY_TEMPLATE,
		templateLock: "all",
		allowedBlocks: ALLOWED_BLOCKS,
	} );

	function generalSettings(){
		
		return(
			<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

				<GrigoraSelectInput
						label={ __( 'Initially Active Tab', 'grigora-kit' ) }
						onChange={ ( activeTab ) =>
							setAttributes( { activeTab: parseInt(activeTab) } )
						}
						value={ activeTab }
						resetValue={ 0 }
						options={ tabs.map(
							( { title,id }, index ) => ( {
								label: __(title, 'grigora-kit'),
								value: id,
							} )
						) }
				/>

				

				<GrigoraUnitInput
							label="Minimum Height"
							onChange={ ( minHeight ) =>
								setAttributes( { minHeight } )
							}
							units={ [
								{
									default: 1,
									label: 'px',
									value: 'px',
								},
							] }
							value={ minHeight }
							resetValue={ 'default' }
						/>	


				<GrigoraUnitInput
							label="Maximum Width"
							onChange={ ( maxWidth ) =>
								setAttributes( { maxWidth } )
							}
							units={ [
								{
									default: 1,
									label: 'px',
									value: 'px',
								},
							] }
							value={ maxWidth }
							resetValue={ 'default' }
						/>	

				<GrigoraToggleInput
						label={ `Show Tab subtitles` }
						value={ showTabSubtitles }
						onChange={ ( showTabSubtitles ) =>
							setAttributes( { showTabSubtitles } )
						}
				/>
			</Spacer>
		)
	}

	function titleNormalColorRenderer(){
		return(<>
			<GrigoraColorInput
											label={ __( 'Color', 'grigora-kit' ) }
											value={ titleColor }
											onChange={ ( titleColor ) =>
												setAttributes( { titleColor } )
											}
											resetValue={ '#000000' }
										/>

										<GrigoraColorInput
											label={ __( 'Background Color', 'grigora-kit' ) }
											value={ bgColor }
											onChange={ ( bgColor ) =>
												setAttributes( { bgColor } )
											}
											resetValue={ '#ffffff' }
										/>

										<GrigoraColorInput
											label={ __( 'Border Color', 'grigora-kit' ) }
											value={ titleBorderColor }
											onChange={ ( titleBorderColor ) =>
												setAttributes( { titleBorderColor } )
											}
											resetValue={ '#000000' }
										/>

						
									

		</>);
	}

	function titleHoverRenderer(){
		return(
			<>
				<GrigoraColorInput
					label={ __( 'Hover Color', 'grigora-kit' ) }
					value={ titleHoverColor }
					onChange={ ( titleHoverColor ) =>
						setAttributes( { titleHoverColor } )
					}
					resetValue={ '#000000' }
				/>
				<GrigoraColorInput
					label={ __( 'Background Color', 'grigora-kit' ) }
					value={ bgTitleHoverColor }
					onChange={ ( bgTitleHoverColor ) =>
						setAttributes( { bgTitleHoverColor } )
					}
					resetValue={ '#787878' }
				/>
				<GrigoraColorInput
					label={ __( 'Border Color', 'grigora-kit' ) }
					value={ titleBorderHoverColor }
					onChange={ ( titleBorderHoverColor ) =>
						setAttributes( { titleBorderHoverColor } )
					}
					resetValue={ '#000000' }
				/>
			</>
		)
	}

	function titleActiveRenderer(){
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Active Color', 'grigora-kit' ) }
					value={ activeColor }
					onChange={ ( activeColor ) =>
						setAttributes( { activeColor } )
					}
					resetValue={ '#ffffff' }
				/>

				<GrigoraColorInput
					label={ __( 'Background Color', 'grigora-kit' ) }
					value={ bgTitleActiveColor }
					onChange={ ( bgTitleActiveColor ) =>
						setAttributes( { bgTitleActiveColor } )
					}
					resetValue={ '#2E8B57' }
				/>
				
				<GrigoraColorInput
					label={ __( 'Border Color', 'grigora-kit' ) }
					value={ titleBorderActiveColor }
					onChange={ ( titleBorderActiveColor ) =>
						setAttributes( { titleBorderActiveColor } )
					}
					resetValue={ '#000000' }
				/>
			</>
		);
	}

	function contentNormalColorRenderer(){
		return (
			<>

				<GrigoraColorInput
					label={ __( 'Background Color', 'grigora-kit' ) }
					value={ contentBgColor }
					onChange={ ( contentBgColor ) =>
						setAttributes( { contentBgColor } )
					}
					resetValue={ '#ffffff' }
				/>

				<GrigoraColorInput
					label={ __( 'Border Color', 'grigora-kit' ) }
					value={ contentBorderColor }
					onChange={ ( contentBorderColor ) =>
						setAttributes( { contentBorderColor } )
					}
					resetValue={ '#000000' }
				/>

			
			<br></br>
			

			</>
		);
	}
	

	function stylesSettings(){
		return(
			<>

				<PanelBody
					title={ __( 'Container Gaps', 'grigora-kit' ) }
					initialOpen={ false }
				>

				<GrigoraRangeInput
						label={ __( 'Tabs Gap', 'grigora-kit' ) }
						max={ 100 }
						min={ 0 }
						step={ 1 }
						unit={ 'px' }
						setValue={ ( tabGap ) =>
							setAttributes( { tabGap } )
						}
						value={ tabGap }
						resetValue={ 0 }
				/>

				<GrigoraRangeInput
						label={ __( 'Tab Content Gap', 'grigora-kit' ) }
						max={ 100 }
						min={ 0 }
						step={ 1 }
						unit={ 'px' }
						setValue={ ( contentGap ) =>
							setAttributes( { contentGap } )
						}
						value={ contentGap }
						resetValue={ 0 }
				/>


				</PanelBody>


			<PanelBody
					title={ __( 'Title', 'grigora-kit' ) }
					initialOpen={ false }
				>
				<GrigoraRangeInput
							value={ typoTSize }
							setValue={ ( typoTSize ) => {
								setAttributes( {
									typoTSize: typoTSize.toString(),
								} );
							} }
							label={ `Size` }
							resetValue={ 'default' }
						/>
						<GrigoraRangeInput
							value={ typoTLineHeight }
							setValue={ ( typoTLineHeight ) => {
								setAttributes( {
									typoTLineHeight: typoTLineHeight.toString(),
								} );
							} }
							label={ `Line Height` }
							min={ 10 }
							max={ 300 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoTLetterSpacing }
							setValue={ ( typoTLetterSpacing ) => {
								setAttributes( {
									typoTLetterSpacing:
										typoTLetterSpacing.toString(),
								} );
							} }
							label={ `Letter Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoTWordSpacing }
							setValue={ ( typoTWordSpacing ) => {
								setAttributes( {
									typoTWordSpacing:
										typoTWordSpacing.toString(),
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
								onChange={ ( typoTTransform ) =>
									setAttributes( { typoTTransform } )
								}
								value={ typoTTransform }
								resetValue={ 'none' }
								options={ TEXT_TRANSFORMS }
							/>
							<GrigoraSelectInput
								label={ __( 'Style', 'grigora-kit' ) }
								onChange={ ( typoTStyle ) =>
									setAttributes( { typoTStyle } )
								}
								value={ typoTStyle }
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
								onChange={ ( typoTDecoration ) =>
									setAttributes( { typoTDecoration } )
								}
								value={ typoTDecoration }
								resetValue={ 'initial' }
								options={ TEXT_DECORATION }
							/>
							<GrigoraSelectInput
								label={ __( 'Weight', 'grigora-kit' ) }
								onChange={ ( typoTWeight ) =>
									setAttributes( { typoTWeight } )
								}
								value={ typoTWeight }
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

						<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( padding ) =>
							setAttributes( { padding } )
						}
						values={ padding }
						resetValue={ {
							top: '10px',
							bottom: '10px',
							left: '20px',
							right: '20px',
						} }
					/>
					<GrigoraBoxInput
						label={ __( 'Margin', 'grigora-kit' ) }
						onChange={ ( margin ) =>
							setAttributes( { margin } )
						}
						values={ margin }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>

				
			</PanelBody>



			<PanelBody
					title={ __( 'Subtitle', 'grigora-kit' ) }
					initialOpen={ false }
				>
				<GrigoraRangeInput
							value={ typoSTSize }
							setValue={ ( typoSTSize ) => {
								setAttributes( {
									typoSTSize: typoSTSize.toString(),
								} );
							} }
							label={ `Size` }
							resetValue={ 'default' }
						/>
						<GrigoraRangeInput
							value={ typoSTLineHeight }
							setValue={ ( typoSTLineHeight ) => {
								setAttributes( {
									typoSTLineHeight: typoSTLineHeight.toString(),
								} );
							} }
							label={ `Line Height` }
							min={ 10 }
							max={ 300 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoSTLetterSpacing }
							setValue={ ( typoSTLetterSpacing ) => {
								setAttributes( {
									typoSTLetterSpacing:
										typoSTLetterSpacing.toString(),
								} );
							} }
							label={ `Letter Spacing` }
							min={ 0 }
							max={ 150 }
							resetValue={ 'normal' }
						/>
						<GrigoraRangeInput
							value={ typoSTWordSpacing }
							setValue={ ( typoSTWordSpacing ) => {
								setAttributes( {
									typoSTWordSpacing:
										typoSTWordSpacing.toString(),
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
								onChange={ ( typoSTTransform ) =>
									setAttributes( { typoSTTransform } )
								}
								value={ typoSTTransform }
								resetValue={ 'none' }
								options={ TEXT_TRANSFORMS }
							/>
							<GrigoraSelectInput
								label={ __( 'Style', 'grigora-kit' ) }
								onChange={ ( typoSTStyle ) =>
									setAttributes( { typoSTStyle } )
								}
								value={ typoSTStyle }
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
								onChange={ ( typoSTDecoration ) =>
									setAttributes( { typoSTDecoration } )
								}
								value={ typoSTDecoration }
								resetValue={ 'initial' }
								options={ TEXT_DECORATION }
							/>
							<GrigoraSelectInput
								label={ __( 'Weight', 'grigora-kit' ) }
								onChange={ ( typoSTWeight ) =>
									setAttributes( { typoSTWeight } )
								}
								value={ typoSTWeight }
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



			<PanelBody
					title={ __( 'Title Color', 'grigora-kit' ) }
					initialOpen={ false }
				>
				<Tabs className="grigora-normal-hover-active-tabs-container">
						<TabList className="tabs-header">
							<Tab className="normal">
								{ __( 'Normal', 'grigora-kit' ) }
							</Tab>
							<Tab className="hover">
								{ __( 'Hover', 'grigora-kit' ) }
							</Tab>
							<Tab className="active">
								{ __( 'Active', 'grigora-kit' ) }
							</Tab>
						</TabList>

						<TabPanel>{ titleNormalColorRenderer() }</TabPanel>
						<TabPanel>{ titleHoverRenderer() }</TabPanel>
						<TabPanel>{ titleActiveRenderer() }</TabPanel>
				</Tabs>
					


			</PanelBody>
			<PanelBody
					title={ __( 'Content', 'grigora-kit' ) }
					initialOpen={ false }
				>

						<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( contentPadding ) =>
							setAttributes( { contentPadding } )
						}
						values={ contentPadding }
						resetValue={ {
							top: '15px',
							bottom: '15px',
							left: '15px',
							right: '15px',
						} }
					/>
					<GrigoraBoxInput
						label={ __( 'Margin', 'grigora-kit' ) }
						onChange={ ( contentMargin ) =>
							setAttributes( { contentMargin } )
						}
						values={ contentMargin }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>

				
			</PanelBody>
			<PanelBody
					title={ __( 'Content Color', 'grigora-kit' ) }
					initialOpen={ false }
				>

				{
					contentNormalColorRenderer()
				}


			</PanelBody>
			</>
		)
	}

	function advancedSettings(){
		return(
			<>
				<PanelBody
					title={ __( 'Title Border', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Border Width', 'grigora-kit' ) }
						onChange={ ( borderTitle ) =>
							setAttributes( { borderTitle } )
						}
						values={ borderTitle }
						resetValue={ {
							top: '1px',
							bottom: '1px',
							left: '1px',
							right: '1px',
						} }
					/>

					<GrigoraSelectInput
						label={ __( 'Border Style', 'grigora-kit' ) }
						onChange={ ( borderStyle ) =>
							setAttributes( { borderStyle } )
						}
						value={ borderStyle }
						resetValue={ 'solid' }
						options={ BORDER_STYLES }
					/>

					

					<GrigoraBorderRadiusInput
						label={ __( 'Radius', 'grigora-kit' ) }
						onChange={ ( effectNBorderRadius ) => {
							if (
								typeof effectNBorderRadius === 'string' ||
								effectNBorderRadius instanceof String
							) {
								setAttributes( {
									effectNBorderRadius: {
										topLeft: effectNBorderRadius,
										topRight: effectNBorderRadius,
										bottomLeft: effectNBorderRadius,
										bottomRight: effectNBorderRadius,
									},
								} );
							} else {
								setAttributes( { effectNBorderRadius } );
							}
						} }
						values={ effectNBorderRadius }
						resetValue={ {
							topLeft: '5px',
							topRight: '5px',
							bottomLeft: '0px',
							bottomRight: '0px',
						} }
					/>

					
				</PanelBody>
				<PanelBody
					title={ __( 'Content Border', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Border Width', 'grigora-kit' ) }
						onChange={ ( borderContent ) =>
							setAttributes( { borderContent } )
						}
						values={ borderContent }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>

					<br></br>
					<GrigoraSelectInput
						label={ __( 'Border Style', 'grigora-kit' ) }
						onChange={ ( borderContentStyle ) =>
							setAttributes( { borderContentStyle } )
						}
						value={ borderContentStyle }
						resetValue={ 'solid' }
						options={ BORDER_STYLES }
					/>
					<br></br>
					
					<GrigoraBorderRadiusInput
						label={ __( 'Radius', 'grigora-kit' ) }
						onChange={ ( effectCBorderRadius ) => {
							if (
								typeof effectCBorderRadius === 'string' ||
								effectCBorderRadius instanceof String
							) {
								setAttributes( {
									effectCBorderRadius: {
										topLeft: effectCBorderRadius,
										topRight: effectCBorderRadius,
										bottomLeft: effectCBorderRadius,
										bottomRight: effectCBorderRadius,
									},
								} );
							} else {
								setAttributes( { effectCBorderRadius } );
							}
						} }
						values={ effectCBorderRadius }
						resetValue={ {
							topLeft: '0px',
							topRight: '0px',
							bottomLeft: '0px',
							bottomRight: '0px',
						} }
					/>
				</PanelBody>
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

	function addTab(){
		// console.log("Create block ",createBlock( 'core/paragraph' ))
		
		// insertBlock( createBlock( 'core/paragraph' ), parseInt(block.innerBlocks.length) + 1, clientId, );
		replaceInnerBlocks( clientId, [
			...block.innerBlocks,
			createBlock( 'grigora-kit/inner-tab' ),
		], false );

		setAttributes( { tabs: [ ...tabs, { title: `Tab ${tabs.length+1}`, subtitle: '' } ] } );
		setAttributes({activeTab: tabs.length});
	}

	function deleteTab( index ) {
		const newTabs = [ ...tabs ];
		newTabs.splice( index, 1 );
		//Reduce index value of every tab after the deleted one
		for( let i = index-1; i < newTabs.length; i++ ){
			newTabs[i].title = `Tab ${i+1}`;
		}
		setAttributes( { tabs: newTabs } );
	    setAttributes({activeTab: index - 1});

		replaceInnerBlocks( clientId, [
			...block.innerBlocks.slice( 0, index ),
			...block.innerBlocks.slice( index + 1 ),
		], false );

	}

	return (
			<div { ...blockProps }>
				<InspectorControls >
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
				<style>
					{ `
					.block-id-${id} {
						row-gap: ${contentGap}px;
					}
					/* Hide all tabs */ 
					${
						`.block-id-${ id } .tab-contents .grigora-kit-inner-tab {display: none;}`
					}
					/* Show active tab */ 
					${
						`.block-id-${ id } .tab-contents .grigora-kit-inner-tab:nth-child(${activeTab+1}) {display: block;}`
					}

					${
						entranceAnimation != 'none'
							? `
					.block-id-${ id }.animateOnce {
						animation: ${ entranceAnimation } ${ entranceAnimationTime }s;
					}
					`
							: ``
					}

					.block-id-${ id } .content-container{
							max-width: ${maxWidth};
							min-height: ${minHeight};
					}

					.block-id-${ id } .title-subtitle{
						

						padding-left: ${ padding?.left };
						padding-right: ${ padding?.right };
						padding-top: ${ padding?.top };
						padding-bottom: ${ padding?.bottom };

						margin-left: ${ margin?.left };
						margin-right: ${ margin?.right };
						margin-top: ${ margin?.top };
						margin-bottom: ${ margin?.bottom };

						color: ${ titleColor };
						background-color: ${ bgColor };

						border-color: ${ titleBorderColor };
						border-left: ${ borderTitle?.left };
						border-right: ${ borderTitle?.right };
						border-top: ${ borderTitle?.top };
						border-bottom: ${ borderTitle?.bottom };

						border-style: ${ borderStyle };

						border-top-right-radius: ${ effectNBorderRadius?.topRight };
						border-top-left-radius: ${ effectNBorderRadius?.topLeft };
						border-bottom-right-radius: ${ effectNBorderRadius?.bottomRight };
						border-bottom-left-radius: ${ effectNBorderRadius?.bottomLeft };


						}

						.block-id-${ id } .title-class{
							font-size: ${ typoTSize }px;
							font-weight: ${ typoTWeight };
							text-transform: ${ typoTTransform };
							font-style: ${ typoTStyle };
							line-height: ${
								typoTLineHeight != 'normal'
									? `${ typoTLineHeight }px`
									: `normal`
							};
							letter-spacing: ${
								typoTLetterSpacing != 'normal'
									? `${ typoTLetterSpacing }px`
									: `normal`
							};
							word-spacing: ${
								typoTWordSpacing != 'normal'
									? `${ typoTWordSpacing }px`
									: `normal`
							};
						}

						.block-id-${ id } .subtitle-class{
							font-size: ${ typoSTSize }px;
							font-weight: ${ typoSTWeight };
							text-transform: ${ typoSTTransform };
							font-style: ${ typoSTStyle };
							line-height: ${
								typoSTLineHeight != 'normal'
									? `${ typoSTLineHeight }px`
									: `normal`
							};
							letter-spacing: ${
								typoSTLetterSpacing != 'normal'
									? `${ typoSTLetterSpacing }px`
									: `normal`
							};
							word-spacing: ${
								typoSTWordSpacing != 'normal'
									? `${ typoSTWordSpacing }px`
									: `normal`
							};
						}

						.block-id-${ id } .tab-titles{
							column-gap: ${ tabGap }px;
						}

						.block-id-${ id } .title-subtitle:hover{
							color: ${ titleHoverColor };
							background-color: ${ bgTitleHoverColor };
							border-color: ${ titleBorderColor };
						}

						.block-id-${ id } .tab-active .title-subtitle{
							color: ${ activeColor };
							background-color: ${ bgTitleActiveColor };
							border-color: ${ titleBorderColor };
						}

						.block-id-${ id } .content-container{
							padding-left: ${ contentPadding?.left };
							padding-right: ${ contentPadding?.right };
							padding-top: ${ contentPadding?.top };
							padding-bottom: ${ contentPadding?.bottom };

							margin-left: ${ contentMargin?.left };
							margin-right: ${ contentMargin?.right };
							margin-top: ${ contentMargin?.top };
							margin-bottom: ${ contentMargin?.bottom };


							border-left: ${ borderContent?.left };
							border-right: ${ borderContent?.right };
							border-top: ${ borderContent?.top };
							border-bottom: ${ borderContent?.bottom };


							border-style: ${ borderContentStyle };

							border-top-right-radius: ${ effectCBorderRadius?.topRight };
							border-top-left-radius: ${ effectCBorderRadius?.topLeft };
							border-bottom-right-radius: ${ effectCBorderRadius?.bottomRight };
							border-bottom-left-radius: ${ effectCBorderRadius?.bottomLeft };
							border-color: ${ contentBorderColor };

							color: ${ contentColor };
							background-color: ${ contentBgColor };


						}

						.block-id-${ id } .content-container:hover{
							color: ${ contentHoverColor };
							border-color: ${ contentBorderColor };
						}

						.block-id-${ id } .navigate-tab{
							max-width: ${maxWidth};
						}


					`
					
					}
				</style>
				<div className='tab-titles'>
					{ tabs.map((item, index) => (
						<div className={`tab-btn tab-${item.id} ${activeTab == index ? `tab-active` : ``}`} key={index} onClick={()=>{
							setAttributes({activeTab: index})
						}
							}
						onMouseEnter={()=>setRenderNavigate(index)}	
						onMouseLeave={()=>setRenderNavigate(-1)}
						>
							<div className='title-container'>
								<div>
									{renderNavigate === index && renderNavigationButtons(index)}
								</div>
								<div className='title-subtitle' >
									
									

									
									<RichText
									tagName='div'
									value={item.title}
									onChange={(v) => {
										let newTabs = [...tabs];
										newTabs[index].title = v;
										setAttributes({ tabs: newTabs });
									}}
									placeholder={ __( `Tab ${index+1}` ) }
									className='title-class'
									/>
										
									
										

									{showTabSubtitles && 
									
										<RichText
										tagName='div'
										value={item.subtitle}
										onChange={(v) => {
											let newTabs = [...tabs];
											newTabs[index].subtitle = v;
											setAttributes({ tabs: newTabs });
										}}
										placeholder={ __( 'Add subtitle...' ) }
										className='subtitle-class'
										/>
				
									
									}

								</div>
							</div>
						</div>
						))
					}
					<div className='add-tab'>
						<div class="button_plus" onClick={() => addTab()}></div>
					</div>
				</div>
				<div className='content-container'>
				<div {...innerBlocksProps} ></div>
				</div>
			</div>

	);
}

export default compose([
	withSelect((select, ownProps) => {
		const { getBlock } = select('core/block-editor');
		const { clientId } = ownProps;
		const block = getBlock(clientId);
		return {
			block,
		};
	}),
	withDispatch((dispatch) => {
		const { replaceInnerBlocks, updateBlockAttributes, insertBlock } =
			dispatch("core/block-editor");

		return {
			replaceInnerBlocks,
			updateBlockAttributes,
			insertBlock,
		};
	}),
])(Edit);
