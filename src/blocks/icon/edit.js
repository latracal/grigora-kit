import classnames from 'classnames';

import { __, _x } from '@wordpress/i18n';
import { useBlockProps,
	RichText,
	BlockControls,
	InspectorControls, AlignmentControl  } from '@wordpress/block-editor';
import { TabPanel, 
	PanelBody,
	ToggleControl, 
	__experimentalHStack as HStack } from '@wordpress/components';
import { alignLeft, alignRight, alignCenter, alignJustify, link, linkOff } from '@wordpress/icons';

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
		setAttributes
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
		iconSize
	} = attributes;

	

	if( !id ){
		setAttributes( {"id": generateId("icon")} );
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
			<InspectorControls>
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
