import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Particles from "react-particles";
import { loadFull } from "tsparticles";

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	useInnerBlocksProps,
	store as blockEditorStore,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	TabPanel as WPTabPanel,
	PanelBody,
	ToolbarButton,
	ToggleControl,
	Popover,
	Button,
	Tooltip,
	__experimentalHStack as HStack,
	__experimentalNumberControl as NumberControl,
	__experimentalSpacer as Spacer,
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
	particlesDefaultConfig1,
	particlesDefaultConfig2,
	particlesDefaultConfig3,
	particlesDefaultConfig4,
	particlesDefaultConfig5,
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
import GrigoraCodeInput from '@components/code-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraNumberInput from '@components/number-input';
import GrigoraTextInput from '@components/text-input';
import GrigoraToggleInput from '@components/toggle-input';

import InspectorTabs from '@components/inspector-tabs';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const {
		id,
		align,
		particlesid,
		structureWidth,
		structureMinHeight,
		particlesConfigSet,
		particlesConfig,
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'particles-container' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'particles-container' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const particlesInit = useCallback(async (engine) => {
		console.log(engine);
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	  }, []);
	
	  const particlesLoaded = useCallback(async (container) => {
		await console.log(container);
	  }, []);

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

	const THOUSAND_SEPARATOR = [
		{
			label: __( 'None', 'grigora-kit' ),
			value: '',
		},
		{
			label: __( ',', 'grigora-kit' ),
			value: ',',
		},
		{
			label: __( '.', 'grigora-kit' ),
			value: '.',
		},
	];

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-particles-container': true,
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

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classnames( {
				'grigora-kit-particles-container-inner': true,
			} ),
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	function selectConfig(){
		return(
			<>
				<div className='particles-container-select-control'>
					<div className='row-one'>
						<div className={`config one ${particlesConfigSet==='1' ? `active`: ``}`} onClick={()=>{setAttributes({particlesConfigSet:"1"})}}>{__('Config 1', 'grigora-kit')}</div>
						<div className={`config two ${particlesConfigSet==='2' ? `active`: ``}`} onClick={()=>{setAttributes({particlesConfigSet:"2"})}}>{__('Config 2', 'grigora-kit')}</div>
						<div className={`config three ${particlesConfigSet==='3' ? `active`: ``}`} onClick={()=>{setAttributes({particlesConfigSet:"3"})}}>{__('Config 3', 'grigora-kit')}</div>
					</div>
					<div className='row-two'>
						<div className={`config one ${particlesConfigSet==='4' ? `active`: ``}`} onClick={()=>{setAttributes({particlesConfigSet:"4"})}}>{__('Config 4', 'grigora-kit')}</div>
						<div className={`config two ${particlesConfigSet==='5' ? `active`: ``}`} onClick={()=>{setAttributes({particlesConfigSet:"5"})}}>{__('Config 5', 'grigora-kit')}</div>
						<div className={`config three ${particlesConfigSet==='custom' ? `active`: ``}`} onClick={()=>{setAttributes({particlesConfigSet:"custom"})}}>{__('Custom', 'grigora-kit')}</div>
					</div>
				</div>
			</>
		)
	}

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
					<GrigoraTextInput
						label={ __( 'ID of Particles Canvas', 'grigora-kit' ) }
						onChange={ ( particlesid ) =>
							setAttributes( { particlesid } )
						}
						value={ particlesid }
						resetValue={ 'tsparticles' }
					/>
					<GrigoraUnitInput
						label={ __( 'Maximum Width', 'grigora-kit' ) }
						onChange={ ( structureWidth ) =>
							setAttributes( { structureWidth } )
						}
						value={ structureWidth }
						resetValue={ '100%' }
					/>
					<GrigoraUnitInput
						label={ __( 'Minimum Height', 'grigora-kit' ) }
						onChange={ ( structureMinHeight ) =>
							setAttributes( { structureMinHeight } )
						}
						value={ structureMinHeight }
						resetValue={ '80vh' }
					/>
				</Spacer>
				<PanelBody title={ __( 'Particles Config', 'grigora-kit' ) } initialOpen={false}>
					{ selectConfig() }
					{ particlesConfigSet === 'custom' && (
						<>
							<GrigoraCodeInput
								label={ __( 'Minimum Height', 'grigora-kit' ) }
								onChange={ ( particlesConfig ) =>
									setAttributes( { particlesConfig } )
								}
								value={ particlesConfig }
								resetValue={ JSON.stringify(particlesDefaultConfig1, null, 2) }
							/>
						</>
					) }
				</PanelBody>
			</>
		);
	}

	function stylesSettings() {
		return (
			<>
			</>
		);
	}

	function advancedSettings() {
		return (
			<>
			</>
		);
	}	

	var particlesNode = null;

	try {
		if( particlesConfigSet === "1" ){
			
			particlesNode = <Particles
				id={ particlesid }
				init={particlesInit}
				loaded={particlesLoaded}
				options={ particlesDefaultConfig1 }
				className={'p-canvas'}
			/>
		} else if( particlesConfigSet === "2" ){
			particlesNode = <Particles
				id={ particlesid }
				init={particlesInit}
				loaded={particlesLoaded}
				options={ particlesDefaultConfig2 }
				className={'p-canvas'}
			/>
		} else if( particlesConfigSet === "3" ){
			particlesNode = <Particles
				id={ particlesid }
				init={particlesInit}
				loaded={particlesLoaded}
				options={ particlesDefaultConfig3 }
				className={'p-canvas'}
			/>
		} else if( particlesConfigSet === "4" ){
			particlesNode = <Particles
				id={ particlesid }
				init={particlesInit}
				loaded={particlesLoaded}
				options={ particlesDefaultConfig4 }
				className={'p-canvas'}
			/>
		} else if( particlesConfigSet === "5" ){
			particlesNode = <Particles
				id={ particlesid }
				init={particlesInit}
				loaded={particlesLoaded}
				options={ particlesDefaultConfig5 }
				className={'p-canvas'}
			/>
		} else{
			particlesNode = <Particles
				id={ particlesid }
				init={particlesInit}
				loaded={particlesLoaded}
				options={ JSON.parse(particlesConfig) }
				className={'p-canvas'}
			/>
		}
	} catch (e) {
		particlesNode = null;
	}

	return (
		<div { ...blockProps }>
			<style>
				{ `
				.block-id-${ id } {
					width: ${ structureWidth };
					min-height: ${ structureMinHeight };
				}
				` }
			</style>
			<BlockControls group="block">
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
			{ particlesNode }
			<div { ...innerBlocksProps } />
		</div>
	);
}
