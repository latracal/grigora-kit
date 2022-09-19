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

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;

	const { id, content1, content2, content3 } = attributes;
	const [width, setWidth] = useState(window.innerWidth);
	const [hover, setHover] = useState(false);
	const [hover2, setHover2] = useState(false);
	const [hover3, setHover3] = useState(false);
	const [hover4, setHover4] = useState(false);

	useEffect( () => {
		function handleWindowResize() {setWidth(window.innerWidth);}
		window.addEventListener("resize", handleWindowResize);
		handleWindowResize();
		return () => window.removeEventListener("resize", handleWindowResize);
	}, [setWidth] );

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'post-grid-1' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'post-grid-1' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-post-grid-1': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls></InspectorControls>
			<style>
				{ `
				.block-id-${ id } {
				}
				` }
			</style>
			{ 	(width > 767) && 
				<div style={{ display: "flex", flexDirection: "row" }}>
					<div style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg")`, 
						display: "flex", width: '40%',height: '56vh',
						opacity: hover ? '0.8' : '1', position: 'relative', overflow: 'hidden',
						backgroundPosition : hover ? '30%' : '20%',backgroundSize: 'cover'}}
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						<div style={{ alignSelf: "flex-end", padding: "30px" }}>
							<RichText
								value={ content1 }
								onChange={ ( content1 ) => setAttributes( { content1 } ) }
								placeholder={ __( 'Text...' ) }
								style={{backgroundColor: 'white', padding: '10px'}}
							/>
							<RichText
								value={ content2 }
								onChange={ ( content2 ) => setAttributes( { content2 } ) }
								placeholder={ __( 'Text...' ) }
								style={{color: 'white'}}
							/>
							{ hover && 
								<RichText
									value={ content3 }
									onChange={ ( content3 ) => setAttributes( { content3 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/> 
							}
						</div>
					</div>
					<div style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg")`, 
						display: "flex", width: '30%',height: '56vh',
						opacity: hover2 ? '0.8' : '1', position: 'relative', overflow: 'hidden',
						backgroundPosition : hover2 ? '30%' : '20%',backgroundSize: 'cover'}}
						onMouseEnter={() => setHover2(true)}
						onMouseLeave={() => setHover2(false)}
					>
						<div style={{ alignSelf: "flex-end", padding: "30px" }}>
							<RichText
								value={ content1 }
								onChange={ ( content1 ) => setAttributes( { content1 } ) }
								placeholder={ __( 'Text...' ) }
								style={{backgroundColor: 'white', padding: '10px'}}
							/>
							<RichText
								value={ content2 }
								onChange={ ( content2 ) => setAttributes( { content2 } ) }
								placeholder={ __( 'Text...' ) }
								style={{color: 'white'}}
							/>
							{ hover2 && 
								<RichText
									value={ content3 }
									onChange={ ( content3 ) => setAttributes( { content3 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/> 
							}
						</div>
					</div>
					<div style={{width: '30%'}}>
						<div style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg")`, 
							display: "flex", height: '28vh',
							opacity: hover3 ? '0.8' : '1', position: 'relative', overflow: 'hidden',
							backgroundPosition : hover3 ? '30%' : '20%',backgroundSize: 'cover'}}
							onMouseEnter={() => setHover3(true)}
							onMouseLeave={() => setHover3(false)}
						>
							<div style={{ alignSelf: "flex-end", padding: "30px" }}>
								<RichText
									value={ content1 }
									onChange={ ( content1 ) => setAttributes( { content1 } ) }
									placeholder={ __( 'Text...' ) }
									style={{backgroundColor: 'white', padding: '10px'}}
								/>
								<RichText
									value={ content2 }
									onChange={ ( content2 ) => setAttributes( { content2 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/>
								{ hover3 && 
									<RichText
										value={ content3 }
										onChange={ ( content3 ) => setAttributes( { content3 } ) }
										placeholder={ __( 'Text...' ) }
										style={{color: 'white'}}
									/> 
								}
							</div>
						</div>
						<div style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg")`, 
							display: "flex", height: '28vh',
							opacity: hover4 ? '0.8' : '1', position: 'relative', overflow: 'hidden',
							backgroundPosition : hover4 ? '30%' : '20%',backgroundSize: 'cover'}}
							onMouseEnter={() => setHover4(true)}
							onMouseLeave={() => setHover4(false)}
						>
							<div style={{ alignSelf: "flex-end", padding: "30px" }}>
								<RichText
									value={ content1 }
									onChange={ ( content1 ) => setAttributes( { content1 } ) }
									placeholder={ __( 'Text...' ) }
									style={{backgroundColor: 'white', padding: '10px'}}
								/>
								<RichText
									value={ content2 }
									onChange={ ( content2 ) => setAttributes( { content2 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/>
								{ hover4 && 
									<RichText
										value={ content3 }
										onChange={ ( content3 ) => setAttributes( { content3 } ) }
										placeholder={ __( 'Text...' ) }
										style={{color: 'white'}}
									/> 
								}
							</div>
						</div>
					</div>
				</div>
			}
			{
				(width <= 767) &&
				<div>
					<div style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg")`, 
						display: "flex",height: '40vh',
						opacity: hover ? '0.8' : '1', position: 'relative', overflow: 'hidden',
						backgroundPosition : hover ? '30%' : '20%',backgroundSize: 'cover'}}
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						<div style={{ alignSelf: "flex-end", padding: "30px" }}>
							<RichText
								value={ content1 }
								onChange={ ( content1 ) => setAttributes( { content1 } ) }
								placeholder={ __( 'Text...' ) }
								style={{backgroundColor: 'white', padding: '10px'}}
							/>
							<RichText
								value={ content2 }
								onChange={ ( content2 ) => setAttributes( { content2 } ) }
								placeholder={ __( 'Text...' ) }
								style={{color: 'white'}}
							/>
							{ hover && 
								<RichText
									value={ content3 }
									onChange={ ( content3 ) => setAttributes( { content3 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/> 
							}
						</div>
					</div>

					<div style={{display: 'flex', overflow: 'auto'}}>
						
						<div onMouseEnter={() => setHover2(true)}
							onMouseLeave={() => setHover2(false)}
							style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg")`, 
							display: "flex", height: '40vh', minWidth: '60%', maxWidth: '70%',
							opacity: hover2 ? '0.8' : '1', position: 'relative', overflow: 'hidden', 
							backgroundPosition : hover2 ? '30%' : '20%',backgroundSize: 'cover'}}
						>
							<div style={{ alignSelf: "flex-end", padding: "30px" }}>
								<RichText
									value={ content1 }
									onChange={ ( content1 ) => setAttributes( { content1 } ) }
									placeholder={ __( 'Text...' ) }
									style={{backgroundColor: 'white', padding: '10px'}}
								/>
								<RichText
									value={ content2 }
									onChange={ ( content2 ) => setAttributes( { content2 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/>
								{ hover2 && 
									<RichText
										value={ content3 }
										onChange={ ( content3 ) => setAttributes( { content3 } ) }
										placeholder={ __( 'Text...' ) }
										style={{color: 'white'}}
									/> 
								}
							</div>
						</div>
					
						<div style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg")`, 
							display: "flex", height: '40vh', minWidth: '60%', maxWidth: '70%',
							opacity: hover3 ? '0.8' : '1', position: 'relative', 
							backgroundPosition : hover3 ? '30%' : '20%',backgroundSize: 'cover'}}
							onMouseEnter={() => setHover3(true)}
							onMouseLeave={() => setHover3(false)}
						>
							<div style={{ alignSelf: "flex-end", padding: "30px" }}>
								<RichText
									value={ content1 }
									onChange={ ( content1 ) => setAttributes( { content1 } ) }
									placeholder={ __( 'Text...' ) }
									style={{backgroundColor: 'white', padding: '10px'}}
								/>
								<RichText
									value={ content2 }
									onChange={ ( content2 ) => setAttributes( { content2 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/>
								{ hover3 && 
									<RichText
										value={ content3 }
										onChange={ ( content3 ) => setAttributes( { content3 } ) }
										placeholder={ __( 'Text...' ) }
										style={{color: 'white'}}
									/> 
								}
							</div>
						</div>
					
						<div style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg")`, 
							display: "flex", height: '40vh', minWidth: '60%', maxWidth: '70%',
							opacity: hover4 ? '0.8' : '1', position: 'relative', overflow: 'hidden',
							backgroundPosition : hover4 ? '30%' : '20%',backgroundSize: 'cover'}}
							onMouseEnter={() => setHover4(true)}
							onMouseLeave={() => setHover4(false)}
						>
							<div style={{ alignSelf: "flex-end", padding: "30px" }}>
								<RichText
									value={ content1 }
									onChange={ ( content1 ) => setAttributes( { content1 } ) }
									placeholder={ __( 'Text...' ) }
									style={{backgroundColor: 'white', padding: '10px'}}
								/>
								<RichText
									value={ content2 }
									onChange={ ( content2 ) => setAttributes( { content2 } ) }
									placeholder={ __( 'Text...' ) }
									style={{color: 'white'}}
								/>
								{ hover4 && 
									<RichText
										value={ content3 }
										onChange={ ( content3 ) => setAttributes( { content3 } ) }
										placeholder={ __( 'Text...' ) }
										style={{color: 'white'}}
									/> 
								}
							</div>
						</div>
						</div>

					</div>
			}
		</div>
	);
}