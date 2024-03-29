import classnames from 'classnames';

import { __, _x } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentControl,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	TabPanel,
	PanelBody,
	ToggleControl,
	ToolbarButton,
	Popover,
	Button,
	Icon,
	Tooltip,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
} from '@wordpress/icons';
import { useState, useRef, useEffect } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';

import parse from 'html-react-parser';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import IconPicker from '@components/icon-picker';
import GrigoraColorInput from '@components/color-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import SVGIcons from '@constants/icons.json';
import GrigoraAlignmentInput from '@components/alignment-input';
import { getDevice, getDeviceProperty } from '@helpers/previewDevice';
const isSvg = require( 'is-svg' );

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;

	const {
		id,
		align,
		icon,
		hasCustomIcon,
		customIcon,
		iconColorFlag,
		iconHoverColor,
		iconNormalColor,
		iconPadding,
		iconPaddingTablet,
		iconPaddingMobile,
		iconMargin,
		iconMarginTablet,
		iconMarginMobile,
		iconSize,
		iconSizeTablet,
		iconSizeMobile,
		url,
		opensInNewTab,
		urlnofollow,
		urlnoreferrer,
		urlsponsored,
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'icon' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'icon' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const device = getDevice();

	const [ openPopOver, setOpenPopOver ] = useState( false );
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const ref = useRef();

	function toggleEditing() {
		setIsEditingURL( ! isEditingURL );
		setOpenPopOver( ! openPopOver );
	}

	function setActiveIcon( icon ) {
		setAttributes( { icon } );
	}

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-icon': true,
			[ `block-id-${ id }` ]: id,
			'no-icon-selected': ! (
				( icon && SVGIcons[ icon ] ) ||
				( hasCustomIcon && customIcon && isSvg( customIcon ) )
			),
		} ),
		style: {},
	} );

	function renderSingleIcon() {
		if ( hasCustomIcon && customIcon && isSvg( customIcon ) ) {
			const icon_parsed = parse( customIcon );
			return icon_parsed;
		}
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );
			return icon_parsed;
		}
		return parse(
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>'
		);
	}

	function effectIconNormalRender() {
		return (
			<>
				<GrigoraColorInput
					label={ __( '', 'grigora-kit' ) }
					value={ iconNormalColor }
					onChange={ ( iconNormalColor ) =>
						setAttributes( { iconNormalColor } )
					}
					resetValue={ '#000' }
				/>
			</>
		);
	}

	function effectIconHoverRender() {
		return (
			<>
				<GrigoraColorInput
					label={ __( '', 'grigora-kit' ) }
					value={ iconHoverColor }
					onChange={ ( iconHoverColor ) =>
						setAttributes( { iconHoverColor } )
					}
					resetValue={ '' }
				/>
			</>
		);
	}

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

	return (
		<div { ...useBlockProps() }>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={ DEFAULT_ALIGNMENT_CONTROLS }
				/>
			</BlockControls>
			<BlockControls group="block">
				<ToolbarButton
					name="link"
					icon={ url ? linkOff : link }
					title={ __( 'Link', 'grigora-kit' ) }
					shortcut={ displayShortcut.primary( 'k' ) }
					onClick={ toggleEditing }
					isActive={ url ? true : false }
				/>
				{ isSelected && openPopOver && ( isEditingURL || isURLSet ) && (
					<Popover
						position="bottom center"
						onClose={ () => {
							setIsEditingURL( false );
							setOpenPopOver( false );
						} }
						anchorRef={ ref?.current }
						focusOnMount={ isEditingURL ? 'firstElement' : false }
						__unstableSlotName={ '__unstable-block-tools-after' }
					>
						{ url && (
							<HStack spacing={ 4 }>
								<div className="grigora-radio-input__label">
									{ '' }
								</div>
								<Button
									isSmall
									icon={
										<Icon
											icon={ () => (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path
														fill-rule="evenodd"
														d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
													/>
													<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
												</svg>
											) }
										/>
									}
									onClick={ () =>
										setAttributes( { url: '' } )
									}
								/>
							</HStack>
						) }
						<LinkControl
							className="wp-block-navigation-link__inline-link-input"
							value={ { url, opensInNewTab } }
							onChange={ ( {
								url: newURL = '',
								opensInNewTab: newOpensInNewTab,
							} ) => {
								setAttributes( {
									url: newURL,
									opensInNewTab: newOpensInNewTab,
								} );
							} }
							forceIsEditingLink={ isEditingURL }
						/>
						<div className="popover-link-controls">
							<ToggleControl
								label={ __( 'No follow', 'grigora-kit' ) }
								checked={ !! urlnofollow }
								onChange={ () =>
									setAttributes( {
										urlnofollow: ! urlnofollow,
									} )
								}
							/>
							<ToggleControl
								label={ __( 'No referrer', 'grigora-kit' ) }
								checked={ !! urlnoreferrer }
								onChange={ () =>
									setAttributes( {
										urlnoreferrer: ! urlnoreferrer,
									} )
								}
							/>
							<ToggleControl
								label={ __( 'Sponsored', 'grigora-kit' ) }
								checked={ !! urlsponsored }
								onChange={ () =>
									setAttributes( {
										urlsponsored: ! urlsponsored,
									} )
								}
							/>
						</div>
					</Popover>
				) }
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Icon', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<IconPicker
						activeIcon={ icon }
						setActiveIcon={ setActiveIcon }
						supportCustom
						hasCustomIcon={ hasCustomIcon }
						setHasCustomIcon={ () =>
							setAttributes( { hasCustomIcon: ! hasCustomIcon } )
						}
						customIcon={ customIcon }
						setCustomIcon={ ( customIcon ) =>
							setAttributes( { customIcon } )
						}
					/>
					{ ( icon ||
						( hasCustomIcon &&
							customIcon &&
							isSvg( customIcon ) ) ) && (
						<>
							<br></br>
							<GrigoraUnitInput
								label="Size"
								onChange={ ( iconSize ) =>
									setAttributes( { iconSize } )
								}
								value={ iconSize }
								resetValue={ '20px' }
								isResponsive
								valueTablet={ iconSizeTablet }
								onChangeTablet={ ( iconSizeTablet ) => {
									setAttributes( { iconSizeTablet } );
								} }
								resetValueTablet=""
								valueMobile={ iconSizeMobile }
								onChangeMobile={ ( iconSizeMobile ) => {
									setAttributes( { iconSizeMobile } );
								} }
								resetValueMobile=""
							/>
							<br></br>
							<ToggleControl
								label={ __( 'Color', 'grigora-kit' ) }
								checked={ !! iconColorFlag }
								onChange={ () =>
									setAttributes( {
										iconColorFlag: ! iconColorFlag,
									} )
								}
							/>
							{ iconColorFlag && (
								<TabPanel
									className="grigora-effects-settings"
									tabs={ [
										{
											name: 'normal',
											title: __(
												'Normal',
												'grigora-kit'
											),
											className: 'tab-normal',
										},
										{
											name: 'hover',
											title: __( 'Hover', 'grigora-kit' ),
											className: 'tab-hover',
										},
									] }
								>
									{ ( tab ) => {
										if ( tab.name == 'normal' ) {
											return effectIconNormalRender();
										} else {
											return effectIconHoverRender();
										}
									} }
								</TabPanel>
							) }
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Layout', 'grigora-kit' ) }
					initialOpen={ false }
				>
					<GrigoraBoxInput
						label={ __( 'Padding', 'grigora-kit' ) }
						onChange={ ( iconPadding ) =>
							setAttributes( { iconPadding } )
						}
						values={ iconPadding }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '5px',
							right: '5px',
						} }
						isResponsive
						valueTablet={ iconPaddingTablet }
						onChangeTablet={ ( iconPaddingTablet ) => {
							setAttributes( { iconPaddingTablet } );
						} }
						resetValueTablet={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
						} }
						valueMobile={ iconPaddingMobile }
						onChangeMobile={ ( iconPaddingMobile ) => {
							setAttributes( { iconPaddingMobile } );
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
						onChange={ ( iconMargin ) =>
							setAttributes( { iconMargin } )
						}
						values={ iconMargin }
						resetValue={ {
							top: '0px',
							bottom: '0px',
							left: '0px',
							right: '0px',
						} }
						isResponsive
						valueTablet={ iconMarginTablet }
						onChangeTablet={ ( iconMarginTablet ) => {
							setAttributes( { iconMarginTablet } );
						} }
						resetValueTablet={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
						} }
						valueMobile={ iconMarginMobile }
						onChangeMobile={ ( iconMarginMobile ) => {
							setAttributes( { iconMarginMobile } );
						} }
						resetValueMobile={ {
							top: '',
							bottom: '',
							left: '',
							right: '',
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<style>
					{ `
					.block-id-${ id } {
						padding-left: ${ getDeviceProperty(
							device,
							iconPadding?.left,
							iconPaddingTablet?.left,
							iconPaddingMobile?.left
						) };
						padding-right: ${ getDeviceProperty(
							device,
							iconPadding?.right,
							iconPaddingTablet?.right,
							iconPaddingMobile?.right
						) };
						padding-top: ${ getDeviceProperty(
							device,
							iconPadding?.top,
							iconPaddingTablet?.top,
							iconPaddingMobile?.top
						) };
						padding-bottom: ${ getDeviceProperty(
							device,
							iconPadding?.bottom,
							iconPaddingTablet?.bottom,
							iconPaddingMobile?.bottom
						) };
						margin-left: ${ getDeviceProperty(
							device,
							iconMargin?.left,
							iconMarginTablet?.left,
							iconMarginMobile?.left
						) };
						margin-right: ${ getDeviceProperty(
							device,
							iconMargin?.right,
							iconMarginTablet?.right,
							iconMarginMobile?.right
						) };
						margin-top: ${ getDeviceProperty(
							device,
							iconMargin?.top,
							iconMarginTablet?.top,
							iconMarginMobile?.top
						) };
						margin-bottom: ${ getDeviceProperty(
							device,
							iconMargin?.bottom,
							iconMarginTablet?.bottom,
							iconMarginMobile?.bottom
						) };
						justify-content: ${ align };
					}
					${
						( icon && icon != 'none' ) ||
						( hasCustomIcon && customIcon && isSvg( customIcon ) )
							? `
					.block-id-${ id } svg {
						width: ${ getDeviceProperty(
							device,
							iconSize,
							iconSizeTablet,
							iconSizeMobile
						) };
						height: ${ getDeviceProperty(
							device,
							iconSize,
							iconSizeTablet,
							iconSizeMobile
						) };
						color: ${ iconColorFlag ? iconNormalColor : 'currentColor' };
					}
					${
						iconColorFlag && iconHoverColor
							? `.block-id-${ id }:hover svg {
							color: ${ iconColorFlag ? iconHoverColor : 'currentColor' };
						}`
							: ``
					}
					`
							: ``
					}
					
					` }
				</style>
				{ renderSingleIcon() }
			</div>
		</div>
	);
}
