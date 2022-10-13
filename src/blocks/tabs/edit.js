import classnames from 'classnames';

import { compose } from '@wordpress/compose';

import { createBlock } from '@wordpress/blocks';

import { useSelect, withSelect, withDispatch } from '@wordpress/data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SVGIcons from '@constants/icons.json';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	RichText,
	BlockControls,
	AlignmentControl,
	InnerBlocks,
} from '@wordpress/block-editor';

import {
	PanelBody,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import { alignLeft, alignRight, alignCenter } from '@wordpress/icons';
import GrigoraAlignmentInput from '@components/alignment-input';
import { getDevice, getDeviceProperty } from '../../helpers/previewDevice';

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
import GrigoraTypographyInput from '@components/typography-input';
import Notice from '@components/notice';

import InspectorTabs from '@components/inspector-tabs';
import { forEach } from 'lodash';

import parse from 'html-react-parser';

function Edit( props ) {
	const { attributes, setAttributes, clientId, block, replaceInnerBlocks } =
		props;
	const {
		id,
		align,
		alignTablet,
		alignMobile,
		tabs,
		activeTab,
		minHeight,
		maxWidth,
		showTabSubtitles,
		entranceAnimation,
		entranceAnimationDelay,
		entranceAnimationTime,
		typoTSize,
		typoTSizeTablet,
		typoTSizeMobile,
		typoTStyle,
		typoTDecoration,
		typoTLetterSpacing,
		typoTLineHeight,
		typoTTransform,
		typoTWeight,
		typoTWordSpacing,
		typoSTSize,
		typoSTSizeTablet,
		typoSTSizeMobile,
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
		paddingTablet,
		paddingMobile,
		borderTitle,
		effectNBorderRadius,
		contentBgColor,
		contentBorderColor,
		contentMargin,
		contentPadding,
		contentPaddingTablet,
		contentPaddingMobile,
		borderContent,
		effectCBorderRadius,
		tabGap,
		tabGapTablet,
		tabGapMobile,
		contentGap,
		contentGapTablet,
		contentGapMobile,
	} = attributes;

	const MY_TEMPLATE = tabs.map( ( tab, index ) => {
		return [ 'grigora-kit/inner-tab', {} ];
	} );

	const BORDER_STYLES = [
		{ label: 'Solid', value: 'solid' },
		{ label: 'Dashed', value: 'dashed' },
		{ label: 'Dotted', value: 'dotted' },
	];

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

	const [ renderNavigate, setRenderNavigate ] = useState( -1 );
	const [ activeTabLocal, setActiveTabLocal ] = useState( activeTab );
	const device = getDevice();

	const ALLOWED_BLOCKS = [ 'grigora-kit/inner-tab' ];

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'tabs' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
			const temp_tabs = [ ...tabs ];
			temp_tabs.forEach( function ( part, index ) {
				if ( ! part.id ) {
					this[ index ] = {
						...this[ index ],
						id: generateId( `tab-${ index }` ),
					};
				}
			}, temp_tabs );
			setAttributes( { tabs: temp_tabs } );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'tabs' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
			const temp_tabs = [ ...tabs ];
			temp_tabs.forEach( function ( part, index ) {
				this[ index ] = {
					...this[ index ],
					id: generateId( `tab-${ index }` ),
				};
			}, temp_tabs );
			setAttributes( { tabs: temp_tabs } );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	function navigateLeft( index ) {
		let newtabs = [ ...tabs ];
		let newBlock = [ ...block.innerBlocks ];
		let temp = newtabs[ index ];
		let tempBlock = newBlock[ index ];

		if ( index > 0 ) {
			if ( activeTabLocal === index ) {
				setActiveTabLocal( index - 1 );
			} else if ( index === activeTabLocal + 1 ) {
				setActiveTabLocal( index );
			}
			newtabs[ index ] = newtabs[ index - 1 ];
			newtabs[ index - 1 ] = temp;
			newBlock[ index ] = newBlock[ index - 1 ];
			newBlock[ index - 1 ] = tempBlock;
			setAttributes( { tabs: newtabs } );
			replaceInnerBlocks( clientId, [ ...newBlock ], false );
		}
	}

	function navigateRight( index ) {
		let newtabs = [ ...tabs ];
		let newBlock = [ ...block.innerBlocks ];
		let temp = newtabs[ index ];
		let tempBlock = newBlock[ index ];
		if ( index < newtabs.length - 1 ) {
			if ( activeTabLocal === index ) {
				setActiveTabLocal( index + 1 );
			} else if ( index === activeTabLocal - 1 ) {
				setActiveTabLocal( index );
			}
			newtabs[ index ] = newtabs[ index + 1 ];
			newtabs[ index + 1 ] = temp;
			newBlock[ index ] = newBlock[ index + 1 ];
			newBlock[ index + 1 ] = tempBlock;
			setAttributes( { tabs: newtabs } );
			replaceInnerBlocks( clientId, [ ...newBlock ], false );
		}
	}

	function renderNavigationButtons( index ) {
		const delete_icon = parse( SVGIcons[ 'x' ] );
		const left_icon = parse( SVGIcons[ 'arrow-left-short' ] );
		const right_icon = parse( SVGIcons[ 'arrow-right-short' ] );

		if ( tabs.length === 1 ) {
			return null;
		}

		if ( index < 1 ) {
			return (
				<div className="navigate-tab">
					<div
						className="navigate-icon"
						onClick={ ( e ) => {
							e.stopPropagation();
							navigateRight( index );
						} }
					>
						{ right_icon }
					</div>
					<div
						className="delete-icon"
						onClick={ ( e ) => {
							e.stopPropagation();
							deleteTab( index );
						} }
					>
						{ delete_icon }
					</div>
				</div>
			);
		} else if ( index == tabs.length - 1 ) {
			return (
				<div className="navigate-tab">
					<div
						className="navigate-icon"
						onClick={ ( e ) => {
							e.stopPropagation();
							navigateLeft( index );
						} }
					>
						{ left_icon }
					</div>
					<div
						className="delete-icon"
						onClick={ ( e ) => {
							e.stopPropagation();
							deleteTab( index );
						} }
					>
						{ delete_icon }
					</div>
				</div>
			);
		} else {
			return (
				<div className="navigate-tab">
					<div
						className="navigate-icon"
						onClick={ ( e ) => {
							e.stopPropagation();
							navigateLeft( index );
						} }
					>
						{ left_icon }
					</div>
					<div
						className="navigate-icon"
						onClick={ ( e ) => {
							e.stopPropagation();
							navigateRight( index );
						} }
					>
						{ right_icon }
					</div>
					<div
						className="delete-icon"
						onClick={ ( e ) => {
							e.stopPropagation();
							deleteTab( index );
						} }
					>
						{ delete_icon }
					</div>
				</div>
			);
		}
	}

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-tabs': true,
			[ `block-id-${ id }` ]: id,
			[ `animateOnce` ]: entranceAnimation != 'none',
		} ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classnames( {
				'tab-contents': true,
			} ),
		},
		{
			template: MY_TEMPLATE,
			templateLock: 'all',
			allowedBlocks: ALLOWED_BLOCKS,
		}
	);

	function generalSettings() {
		return (
			<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>
				<GrigoraSelectInput
					label={ __( 'Initially Opened Tab', 'grigora-kit' ) }
					onChange={ ( activeTab ) =>
						setAttributes( { activeTab: parseInt( activeTab ) } )
					}
					value={ activeTab }
					resetValue={ 0 }
					options={ tabs.map( ( { title }, index ) => ( {
						label: title,
						value: index,
					} ) ) }
				/>

				<GrigoraUnitInput
					label="Minimum Height"
					onChange={ ( minHeight ) => setAttributes( { minHeight } ) }
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
					onChange={ ( maxWidth ) => setAttributes( { maxWidth } ) }
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
				<GrigoraAlignmentInput
					value={ align }
					onChange={ ( value ) => setAttributes( { align: value } ) }
					label={ __( 'Alignment', 'grigora-kit' ) }
					options={ [
						{
							label: __( 'Left', 'grigora-kit' ),
							value: 'start',
						},
						{
							label: __( 'Center', 'grigora-kit' ),
							value: 'center',
						},
						{
							label: __( 'Right', 'grigora-kit' ),
							value: 'end',
						},
					] }
					resetValue=""
					isResponsive
					valueTablet={ alignTablet }
					onChangeTablet={ ( alignTablet ) => {
						setAttributes( { alignTablet } );
					} }
					resetValueTablet=""
					valueMobile={ alignMobile }
					onChangeMobile={ ( alignMobile ) => {
						setAttributes( { alignMobile } );
					} }
					resetValueMobile=""
				/>
			</Spacer>
		);
	}

	function titleNormalColorRenderer() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Text', 'grigora-kit' ) }
					value={ titleColor }
					onChange={ ( titleColor ) =>
						setAttributes( { titleColor } )
					}
					resetValue={ '#000000' }
				/>

				<GrigoraColorInput
					label={ __( 'Background', 'grigora-kit' ) }
					value={ bgColor }
					onChange={ ( bgColor ) => setAttributes( { bgColor } ) }
					resetValue={ '#ffffff' }
				/>
				<GrigoraColorInput
					label={ __( 'Border', 'grigora-kit' ) }
					value={ titleBorderColor }
					onChange={ ( titleBorderColor ) =>
						setAttributes( { titleBorderColor } )
					}
					resetValue={ '#ffffff' }
				/>
				<Notice
					text={ __(
						'You can change the Title Border Width and Style from Advanced > Title Border.',
						'grigora-kit'
					) }
					status={ 'success' }
				/>
			</>
		);
	}

	function titleHoverRenderer() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Text', 'grigora-kit' ) }
					value={ titleHoverColor }
					onChange={ ( titleHoverColor ) =>
						setAttributes( { titleHoverColor } )
					}
					resetValue={ '' }
				/>
				<GrigoraColorInput
					label={ __( 'Background', 'grigora-kit' ) }
					value={ bgTitleHoverColor }
					onChange={ ( bgTitleHoverColor ) =>
						setAttributes( { bgTitleHoverColor } )
					}
					resetValue={ '' }
				/>
				<GrigoraColorInput
					label={ __( 'Border', 'grigora-kit' ) }
					value={ titleBorderHoverColor }
					onChange={ ( titleBorderHoverColor ) =>
						setAttributes( { titleBorderHoverColor } )
					}
					resetValue={ 'rgb(204, 203, 203)' }
				/>
				<Notice
					text={ __(
						'You can change the Title Border Width and Style from Advanced > Title Border.',
						'grigora-kit'
					) }
					status={ 'success' }
				/>
			</>
		);
	}

	function titleActiveRenderer() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Text', 'grigora-kit' ) }
					value={ activeColor }
					onChange={ ( activeColor ) =>
						setAttributes( { activeColor } )
					}
					resetValue={ '#46479e' }
				/>

				<GrigoraColorInput
					label={ __( 'Background', 'grigora-kit' ) }
					value={ bgTitleActiveColor }
					onChange={ ( bgTitleActiveColor ) =>
						setAttributes( { bgTitleActiveColor } )
					}
					resetValue={ '' }
				/>
				<GrigoraColorInput
					label={ __( 'Border', 'grigora-kit' ) }
					value={ titleBorderActiveColor }
					onChange={ ( titleBorderActiveColor ) =>
						setAttributes( { titleBorderActiveColor } )
					}
					resetValue={ '#46479e' }
				/>
				<Notice
					text={ __(
						'You can change the Title Border Width and Style from Advanced > Title Border.',
						'grigora-kit'
					) }
					status={ 'success' }
				/>
			</>
		);
	}

	function borderNormalColorRenderer() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Border Color', 'grigora-kit' ) }
					value={ titleBorderColor }
					onChange={ ( titleBorderColor ) =>
						setAttributes( { titleBorderColor } )
					}
					resetValue={ '#ffffff' }
				/>
			</>
		);
	}

	function borderHoverRenderer() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Border Color', 'grigora-kit' ) }
					value={ titleBorderHoverColor }
					onChange={ ( titleBorderHoverColor ) =>
						setAttributes( { titleBorderHoverColor } )
					}
					resetValue={ 'rgb(204, 203, 203)' }
				/>
			</>
		);
	}

	function borderActiveRenderer() {
		return (
			<>
				<GrigoraColorInput
					label={ __( 'Border Color', 'grigora-kit' ) }
					value={ titleBorderActiveColor }
					onChange={ ( titleBorderActiveColor ) =>
						setAttributes( { titleBorderActiveColor } )
					}
					resetValue={ '#46479e' }
				/>
			</>
		);
	}

	function stylesSettings() {
		return (
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
						setValue={ ( tabGap ) => setAttributes( { tabGap } ) }
						value={ tabGap }
						resetValue={ 0 }
						isResponsive
						valueTablet={ tabGapTablet }
						setValueTablet={ ( tabGapTablet ) => {
							setAttributes( {
								tabGapTablet: tabGapTablet.toString(),
							} );
						} }
						resetValueTablet=""
						valueMobile={ tabGapMobile }
						setValueMobile={ ( tabGapMobile ) => {
							setAttributes( {
								tabGapMobile: tabGapMobile.toString(),
							} );
						} }
						resetValueMobile=""
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
						isResponsive
						valueTablet={ contentGapTablet }
						setValueTablet={ ( contentGapTablet ) => {
							setAttributes( {
								contentGapTablet: contentGapTablet.toString(),
							} );
						} }
						resetValueTablet=""
						valueMobile={ contentGapMobile }
						setValueMobile={ ( contentGapMobile ) => {
							setAttributes( {
								contentGapMobile: contentGapMobile.toString(),
							} );
						} }
						resetValueMobile=""
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Title', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraTypographyInput
						label={ __( 'Typography (Title)', 'grigora-kit' ) }
						size={ typoTSize }
						sizeChange={ ( typoTSize ) => {
							setAttributes( {
								typoTSize: typoTSize.toString(),
							} );
						} }
						sizeProps={ {
							isResponsive: true,
							valueTablet: typoTSizeTablet,
							setValueTablet: ( typoTSizeTablet ) => {
								setAttributes( {
									typoTSizeTablet: typoTSizeTablet.toString(),
								} );
							},
							resetValueTablet: '',
							valueMobile: typoTSizeMobile,
							setValueMobile: ( typoTSizeMobile ) => {
								setAttributes( {
									typoTSizeMobile: typoTSizeMobile.toString(),
								} );
							},
							resetValueMobile: '',
						} }
						lineHeight={ typoTLineHeight }
						lineHeightChange={ ( typoTLineHeight ) => {
							setAttributes( {
								typoTLineHeight: typoTLineHeight.toString(),
							} );
						} }
						letterSpacing={ typoTLetterSpacing }
						letterSpacingChange={ ( typoTLetterSpacing ) => {
							setAttributes( {
								typoTLetterSpacing:
									typoTLetterSpacing.toString(),
							} );
						} }
						wordSpacing={ typoTWordSpacing }
						wordSpacingChange={ ( typoTWordSpacing ) => {
							setAttributes( {
								typoTWordSpacing: typoTWordSpacing.toString(),
							} );
						} }
						transform={ typoTTransform }
						transformChange={ ( typoTTransform ) =>
							setAttributes( { typoTTransform } )
						}
						style={ typoTStyle }
						styleChange={ ( typoTStyle ) =>
							setAttributes( { typoTStyle } )
						}
						decoration={ typoTDecoration }
						decorationChange={ ( typoTDecoration ) =>
							setAttributes( { typoTDecoration } )
						}
						weight={ typoTWeight }
						weightChange={ ( typoTWeight ) =>
							setAttributes( { typoTWeight } )
						}
					/>
					<br></br>
					{ showTabSubtitles && (
						<>
							<GrigoraTypographyInput
								label={ __(
									'Typography (Subtitle)',
									'grigora-kit'
								) }
								size={ typoSTSize }
								sizeChange={ ( typoSTSize ) => {
									setAttributes( {
										typoSTSize: typoSTSize.toString(),
									} );
								} }
								sizeProps={ {
									isResponsive: true,
									valueTablet: typoSTSizeTablet,
									setValueTablet: ( typoSTSizeTablet ) => {
										setAttributes( {
											typoSTSizeTablet:
												typoSTSizeTablet.toString(),
										} );
									},
									resetValueTablet: '',
									valueMobile: typoSTSizeMobile,
									setValueMobile: ( typoSTSizeMobile ) => {
										setAttributes( {
											typoSTSizeMobile:
												typoSTSizeMobile.toString(),
										} );
									},
									resetValueMobile: '',
								} }
								lineHeight={ typoSTLineHeight }
								lineHeightChange={ ( typoSTLineHeight ) => {
									setAttributes( {
										typoSTLineHeight:
											typoSTLineHeight.toString(),
									} );
								} }
								letterSpacing={ typoSTLetterSpacing }
								letterSpacingChange={ (
									typoSTLetterSpacing
								) => {
									setAttributes( {
										typoSTLetterSpacing:
											typoSTLetterSpacing.toString(),
									} );
								} }
								wordSpacing={ typoSTWordSpacing }
								wordSpacingChange={ ( typoSTWordSpacing ) => {
									setAttributes( {
										typoSTWordSpacing:
											typoSTWordSpacing.toString(),
									} );
								} }
								transform={ typoSTTransform }
								transformChange={ ( typoSTTransform ) =>
									setAttributes( { typoSTTransform } )
								}
								style={ typoSTStyle }
								styleChange={ ( typoSTStyle ) =>
									setAttributes( { typoSTStyle } )
								}
								decoration={ typoSTDecoration }
								decorationChange={ ( typoSTDecoration ) =>
									setAttributes( { typoSTDecoration } )
								}
								weight={ typoSTWeight }
								weightChange={ ( typoSTWeight ) =>
									setAttributes( { typoSTWeight } )
								}
							/>
							<br></br>
						</>
					) }
					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( padding ) => setAttributes( { padding } ) }
						values={ padding }
						resetValue={ {
							top: '10px',
							bottom: '10px',
							left: '20px',
							right: '20px',
						} }
						isResponsive
						valueTablet={ paddingTablet }
						onChangeTablet={ ( paddingTablet ) => {
							setAttributes( { paddingTablet } );
						} }
						resetValueTablet={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
						} }
						valueMobile={ paddingMobile }
						onChangeMobile={ ( paddingMobile ) => {
							setAttributes( { paddingMobile } );
						} }
						resetValueMobile={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
						} }
					/>
					<GrigoraBoxInput
						label={ __( 'Margin', 'grigora-kit' ) }
						onChange={ ( margin ) => setAttributes( { margin } ) }
						values={ margin }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
					/>
					<br></br>
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
						isResponsive
						valueTablet={ contentPaddingTablet }
						onChangeTablet={ ( contentPaddingTablet ) => {
							setAttributes( { contentPaddingTablet } );
						} }
						resetValueTablet={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
						} }
						valueMobile={ contentPaddingMobile }
						onChangeMobile={ ( contentPaddingMobile ) => {
							setAttributes( { contentPaddingMobile } );
						} }
						resetValueMobile={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
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
					<GrigoraColorInput
						label={ __( 'Background Color', 'grigora-kit' ) }
						value={ contentBgColor }
						onChange={ ( contentBgColor ) =>
							setAttributes( { contentBgColor } )
						}
						resetValue={ '#ffffff' }
					/>
					<Notice
						text={ __(
							'You can change the Content Border Width and Style from Advanced > Content Border.',
							'grigora-kit'
						) }
						status={ 'success' }
					/>
					<GrigoraColorInput
						label={ __( 'Border Color', 'grigora-kit' ) }
						value={ contentBorderColor }
						onChange={ ( contentBorderColor ) =>
							setAttributes( { contentBorderColor } )
						}
						resetValue={ '#46479e' }
					/>
				</PanelBody>
			</>
		);
	}

	function advancedSettings() {
		return (
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
							top: '0px',
							bottom: '5px',
							right: '0px',
							left: '0px',
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
							topLeft: '0px',
							topRight: '0px',
							bottomLeft: '0px',
							bottomRight: '0px',
						} }
					/>
					<br></br>
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

						<TabPanel>{ borderNormalColorRenderer() }</TabPanel>
						<TabPanel>{ borderHoverRenderer() }</TabPanel>
						<TabPanel>{ borderActiveRenderer() }</TabPanel>
					</Tabs>
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
							top: '1px',
							bottom: '0px',
							right: '0px',
							left: '0px',
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
					<GrigoraColorInput
						label={ __( 'Border Color', 'grigora-kit' ) }
						value={ contentBorderColor }
						onChange={ ( contentBorderColor ) =>
							setAttributes( { contentBorderColor } )
						}
						resetValue={ '#46479e' }
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
					<GrigoraNumberInput
						label={ __( 'Delay (ms)', 'grigora-kit' ) }
						onChange={ ( entranceAnimationDelay ) =>
							setAttributes( { entranceAnimationDelay } )
						}
						value={ entranceAnimationDelay }
						resetValue={ 0 }
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
		);
	}

	function addTab() {
		replaceInnerBlocks(
			clientId,
			[ ...block.innerBlocks, createBlock( 'grigora-kit/inner-tab' ) ],
			false
		);

		setAttributes( {
			tabs: [
				...tabs,
				{ id: generateId( 'tab' ), title: `New Tab`, subtitle: '' },
			],
		} );
		setActiveTabLocal( tabs.length );
	}

	function deleteTab( index ) {
		if ( activeTabLocal > index ) {
			setActiveTabLocal( activeTabLocal - 1 );
		} else if (
			activeTabLocal === index &&
			activeTabLocal === tabs.length - 1
		) {
			setActiveTabLocal( activeTabLocal - 1 );
		}
		const newTabs = [ ...tabs ];
		newTabs.splice( index, 1 );
		setAttributes( { tabs: newTabs } );
		replaceInnerBlocks(
			clientId,
			[
				...block.innerBlocks.slice( 0, index ),
				...block.innerBlocks.slice( index + 1 ),
			],
			false
		);
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
					<TabPanel>{ advancedSettings() }</TabPanel>
				</InspectorTabs>
			</InspectorControls>
			<style>
				{ `
					.block-id-${ id } {
						row-gap: ${ getDeviceProperty(
							device,
							contentGap,
							contentGapTablet,
							contentGapMobile
						) }px;
					}
					/* Hide all tabs */ 
					${ `.block-id-${ id } .tab-contents .grigora-kit-inner-tab {display: none;}` }
					/* Show active tab */ 
					${ `.block-id-${ id } .tab-contents .grigora-kit-inner-tab:nth-child(${
						activeTabLocal + 1
					}) {display: block;}` }

					${
						entranceAnimation != 'none'
							? `
					.block-id-${ id }.animateOnce {
						animation: ${ entranceAnimation } ${ entranceAnimationTime }s ${ entranceAnimationDelay }ms;
					}
					`
							: ``
					}

					.block-id-${ id } .tab-contents{
							max-width: ${ maxWidth };
							min-height: ${ minHeight };
					}

					.block-id-${ id } .title-subtitle{
						

						padding-left: ${ getDeviceProperty(
							device,
							padding?.left,
							paddingTablet?.left,
							paddingMobile?.left
						) };
						padding-right: ${ getDeviceProperty(
							device,
							padding?.right,
							paddingTablet?.right,
							paddingMobile?.right
						) };
						padding-top: ${ getDeviceProperty(
							device,
							padding?.top,
							paddingTablet?.top,
							paddingMobile?.top
						) };
						padding-bottom: ${ getDeviceProperty(
							device,
							padding?.bottom,
							paddingTablet?.bottom,
							paddingMobile?.bottom
						) };

						margin-left: ${ margin?.left };
						margin-right: ${ margin?.right };
						margin-top: ${ margin?.top };
						margin-bottom: ${ margin?.bottom };

						color: ${ titleColor };
						background-color: ${ bgColor };

						border-left: ${ borderTitle?.left };
						border-right: ${ borderTitle?.right };
						border-top: ${ borderTitle?.top };
						border-bottom: ${ borderTitle?.bottom };
						border-style: ${ borderStyle };
						border-color: ${ titleBorderColor };

						border-top-right-radius: ${ effectNBorderRadius?.topRight };
						border-top-left-radius: ${ effectNBorderRadius?.topLeft };
						border-bottom-right-radius: ${ effectNBorderRadius?.bottomRight };
						border-bottom-left-radius: ${ effectNBorderRadius?.bottomLeft };


						}

						.block-id-${ id } .title-class{
							font-size: ${ getDeviceProperty(
								device,
								typoTSize,
								typoTSizeTablet,
								typoTSizeMobile
							) }px;
							font-weight: ${ typoTWeight };
							text-transform: ${ typoTTransform };
							font-style: ${ typoTStyle };
							text-decoration: ${ typoTDecoration };
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
							font-size: ${ getDeviceProperty(
								device,
								typoSTSize,
								typoSTSizeTablet,
								typoSTSizeMobile
							) }px;
							font-weight: ${ typoSTWeight };
							text-transform: ${ typoSTTransform };
							font-style: ${ typoSTStyle };
							text-decoration: ${ typoSTDecoration };
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
							justify-content: ${ getDeviceProperty(
								device,
								align,
								alignTablet,
								alignMobile
							) };
							column-gap: ${ getDeviceProperty(
								device,
								tabGap,
								tabGapTablet,
								tabGapMobile
							) }px;
						}

						.block-id-${ id } .title-subtitle:hover{
							color: ${ titleHoverColor };
							background-color: ${ bgTitleHoverColor };
							border-color: ${ titleBorderHoverColor };
						}

						.block-id-${ id } .tab-active .title-subtitle{
							color: ${ activeColor };
							background-color: ${ bgTitleActiveColor };
							border-color: ${ titleBorderActiveColor };
						}

						.block-id-${ id } .tab-contents{
							padding-left: ${ getDeviceProperty(
								device,
								contentPadding?.left,
								contentPaddingTablet?.left,
								contentPaddingMobile?.left
							) };
							padding-right: ${ getDeviceProperty(
								device,
								contentPadding?.right,
								contentPaddingTablet?.right,
								contentPaddingMobile?.right
							) };
							padding-top: ${ getDeviceProperty(
								device,
								contentPadding?.top,
								contentPaddingTablet?.top,
								contentPaddingMobile?.top
							) };
							padding-bottom: ${ getDeviceProperty(
								device,
								contentPadding?.bottom,
								contentPaddingTablet?.bottom,
								contentPaddingMobile?.bottom
							) };

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

							background-color: ${ contentBgColor };
						}

						.block-id-${ id } .navigate-tab{
							max-width: ${ maxWidth };
						}


					` }
			</style>
			<div className="tab-titles">
				{ tabs.map( ( item, index ) => (
					<div
						className={ `tab-btn tab-${ index } ${
							activeTabLocal == index ? `tab-active` : ``
						}` }
						onClick={ () => {
							setActiveTabLocal( index );
						} }
						onMouseEnter={ () => setRenderNavigate( index ) }
						onMouseLeave={ () => setRenderNavigate( -1 ) }
					>
						<div className="title-container">
							{ renderNavigate === index &&
								renderNavigationButtons( index ) }
							<div className="title-subtitle">
								<RichText
									tagName="div"
									value={ item.title }
									onChange={ ( v ) => {
										let newTabs = [ ...tabs ];
										newTabs[ index ].title = v;
										setAttributes( { tabs: newTabs } );
									} }
									placeholder={ __( `Tab ${ index + 1 }` ) }
									className="title-class"
								/>

								{ showTabSubtitles && (
									<RichText
										tagName="div"
										value={ item.subtitle }
										onChange={ ( v ) => {
											let newTabs = [ ...tabs ];
											newTabs[ index ].subtitle = v;
											setAttributes( { tabs: newTabs } );
										} }
										placeholder={ __( 'Add subtitle...' ) }
										className="subtitle-class"
									/>
								) }
							</div>
						</div>
					</div>
				) ) }
				<div className="add-tab">
					<div class="button_plus" onClick={ () => addTab() }></div>
				</div>
			</div>
			<div { ...innerBlocksProps } />
		</div>
	);
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { getBlock } = select( 'core/block-editor' );
		const { clientId } = ownProps;
		const block = getBlock( clientId );
		return {
			block,
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { replaceInnerBlocks, updateBlockAttributes, insertBlock } =
			dispatch( 'core/block-editor' );

		return {
			replaceInnerBlocks,
			updateBlockAttributes,
			insertBlock,
		};
	} ),
] )( Edit );
