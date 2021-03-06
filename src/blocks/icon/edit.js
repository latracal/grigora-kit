import classnames from 'classnames';

import { __, _x } from '@wordpress/i18n';
import { useBlockProps,
	RichText,
	BlockControls,
	InspectorControls, AlignmentControl,
	__experimentalLinkControl as LinkControl  } from '@wordpress/block-editor';
import { TabPanel, 
	PanelBody,
	ToggleControl, 
	ToolbarButton,
	Popover,
	Button,
	Icon,
	Tooltip,
	__experimentalHStack as HStack } from '@wordpress/components';
import { alignLeft, alignRight, alignCenter, alignJustify, link, linkOff } from '@wordpress/icons';
import { useState, useRef } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';


import parse from 'html-react-parser';

import './editor.scss';

import generateId from '@helpers/generateId';
import IconPicker from '@components/icon-picker';
import GrigoraColorInput from '@components/color-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import SVGIcons from '@constants/icons.json';

export default function Edit( props ) {

	const {
		attributes,
		setAttributes,
		isSelected
	} = props;

	const {
		id,
		align,
		icon,
		iconColorFlag,
		iconHoverColor,
		iconNormalColor,
		iconPadding,
		iconMargin,
		iconSize,
		url,
		opensInNewTab,
		urlnofollow,
		urlnoreferrer,
		urlsponsored,
	} = attributes;

	

	if( !id ){
		setAttributes( {"id": generateId("icon")} );
	}

	const [ openPopOver, setOpenPopOver ] = useState( false );
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const ref = useRef();

	
	function toggleEditing( ) {
		setIsEditingURL( !isEditingURL );
		setOpenPopOver( !openPopOver );
	}

	function handleFocusOutsitePopover(){
		setIsEditingURL( !isEditingURL );
		setOpenPopOver( !openPopOver );
	}


	function setActiveIcon(icon){
		setAttributes({icon});
	}

	const blockProps = useBlockProps( {
		className: classnames( {
			"grigora-kit-icon": true,
			[ `block-id-${ id }` ]: id,
			"no-icon-selected": !(icon && SVGIcons[icon])

		} ),
		style: {
		},
	} );



	function renderSingleIcon( ){
		if(icon && SVGIcons[icon]){
			const icon_parsed = parse( SVGIcons[icon] );
			return(
				icon_parsed
			);
		}
		return parse( SVGIcons["star-fill"] );
    }

	function effectIconNormalRender(){
		return(
			<>
				<GrigoraColorInput
					label={__( '', "grigora-kit" )}
					value={ iconNormalColor }
					onChange={ iconNormalColor => setAttributes( { iconNormalColor } ) }
					resetValue={'#000'}
				/>
			</>
		)
	}

	function effectIconHoverRender(){
		return(
			<>
				<GrigoraColorInput
					label={__( '', "grigora-kit" )}
					value={ iconHoverColor }
					onChange={ iconHoverColor => setAttributes( { iconHoverColor } ) }
					resetValue={'#000'}
				/>
			</>
		)
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
		}
	];

	return (
		<div {...useBlockProps()}>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={DEFAULT_ALIGNMENT_CONTROLS} 
				/>
			</BlockControls>
			<BlockControls group="block">
					<ToolbarButton
						name="link"
						icon={ url ? linkOff : link }
						title={ __( 'Link', "grigora-kit" ) }
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
						<div className='grigora-radio-input__label'>{""}</div>
						<Button isSmall icon={ <Icon
							icon={ () => (
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
								<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
								</svg>
							) }
						/> } onClick={()=>setAttributes({url:""})}/>
						</HStack>

					) }
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ { url, opensInNewTab } }
						onChange={ ( {
							url: newURL = '',
							opensInNewTab: newOpensInNewTab,
						} ) => {
							setAttributes( { url: newURL, opensInNewTab: newOpensInNewTab } );
						} }
						forceIsEditingLink={ isEditingURL }
					/>
					<div className='popover-link-controls'>
						<ToggleControl
							label={ __( 'No follow', "grigora-kit" ) }
							checked={ !! urlnofollow }
							onChange={ () =>
								setAttributes( { urlnofollow: ! urlnofollow } )
							}
						/>
						<ToggleControl
							label={ __( 'No referrer', "grigora-kit" ) }
							checked={ !! urlnoreferrer }
							onChange={ () =>
								setAttributes( { urlnoreferrer: ! urlnoreferrer } )
							}
						/>
						<ToggleControl
							label={ __( 'Sponsored', "grigora-kit" ) }
							checked={ !! urlsponsored }
							onChange={ () =>
								setAttributes( { urlsponsored: ! urlsponsored } )
							}
						/>
					</div>
				</Popover>
			) }
			</BlockControls>
			<InspectorControls>
				<HStack spacing={ 2 }>
				<div></div>
				<Tooltip text={__("Create a new Unique ID for CSS/JS actions. Click this whenever you copy and paste blocks.", "grigora-kit")}>
					<Button variant="secondary" onClick={ () => { setAttributes( {"id": generateId("icon")} ); } }>
						{__("Regenerate ID", "grigora-kit")}
					</Button>
				</Tooltip>
				<div></div>
				</HStack>
				<br></br>
				<PanelBody title={ __( 'Icon', "grigora-kit" ) } initialOpen={false}>
					<IconPicker
						activeIcon={icon}
						setActiveIcon={setActiveIcon}
					/>
					{icon && (
						<>
							<br></br>
							<GrigoraUnitInput
								label="Size"
								onChange={ iconSize => setAttributes( { iconSize } ) }
								value={ iconSize }
								resetValue={ "20px" }
							/>
							<br></br>
							<ToggleControl
								label={ __( 'Color', "grigora-kit" ) }
								checked={ !! iconColorFlag }
								onChange={ () =>
									setAttributes( { iconColorFlag: ! iconColorFlag } )
								}
							/>
							{iconColorFlag && (
								<TabPanel
									className="grigora-effects-settings"
									tabs={ [
										{
											name: 'normal',
											title: __( 'Normal', "grigora-kit" ),
											className: 'tab-normal',
										},
										{
											name: 'hover',
											title: __( 'Hover', "grigora-kit" ),
											className: 'tab-hover',
										}
									] }
								>
									{ ( tab ) => { 
										if(tab.name == "normal"){
											return effectIconNormalRender();
										}
										else{
											return effectIconHoverRender();
										}
									}
									}
								</TabPanel>
							)}
						</>
					)}
				</PanelBody>
				<PanelBody title={ __( 'Layout', "grigora-kit" ) } initialOpen={false}>
					<GrigoraBoxInput 
						label={ __( "Padding", "grigora-kit" ) }
						onChange={ iconPadding => setAttributes( { iconPadding } ) }
						values={ iconPadding }
						resetValue={{
							"top": "0px",
							"bottom": "0px",
							"left": "5px",
							"right": "5px"
						}}
					/>
					<GrigoraBoxInput 
						label={ __( "Margin", "grigora-kit" ) }
						onChange={ iconMargin => setAttributes( { iconMargin } ) }
						values={ iconMargin }
						resetValue={{
							"top": "0px",
							"bottom": "0px",
							"left": "0px",
							"right": "0px"
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<style>
					{`
					.block-id-${id} {
						padding-left: ${iconPadding?.left};
						padding-right: ${iconPadding?.right};
						padding-top: ${iconPadding?.top};
						padding-bottom: ${iconPadding?.bottom};
						margin-left: ${iconMargin?.left};
						margin-right: ${iconMargin?.right};
						margin-top: ${iconMargin?.top};
						margin-bottom: ${iconMargin?.bottom};
						justify-content: ${align};
					}
					${ (icon && icon != "none") ? `
					.block-id-${id} svg {
						width: ${iconSize};
						height: ${iconSize};
						color: ${ iconColorFlag ? iconNormalColor : "currentColor"};
					}
					.block-id-${id}:hover svg {
						color: ${ iconColorFlag ? iconHoverColor : "currentColor"};
					}
					` : `` }
					
					`}
				</style>
				{ renderSingleIcon( ) }
			</div>
		</div>
	);
}
