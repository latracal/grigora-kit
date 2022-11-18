import {
	Button,
	Modal,
	Icon,
	SearchControl,
	ToggleControl,
	TextareaControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import parse from 'html-react-parser';
import SVGIcons from '@constants/icons.json';
const isSvg = require( 'is-svg' );

function IconPicker( {
	activeIcon,
	setActiveIcon,
	hideRemoveButton,
	supportCustom = false,
	hasCustomIcon = false,
	setHasCustomIcon,
	customIcon,
	setCustomIcon,
} ) {
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const [ searchValue, setSearchValue ] = useState( '' );

	function renderSingleIcon( keyname, ignoreCustom = false ) {
		if ( ! ignoreCustom ) {
			if ( hasCustomIcon && customIcon && isSvg( customIcon ) ) {
				const icon = parse( customIcon );
				return <Icon icon={ icon } />;
			}
		}
		if ( keyname && SVGIcons[ keyname ] ) {
			const icon = parse( SVGIcons[ keyname ] );
			return <Icon icon={ icon } />;
		}
		return null;
	}

	function resetIcon() {
		setActiveIcon( '' );
		if ( supportCustom ) {
			setHasCustomIcon( false );
			setCustomIcon( '' );
		}
	}

	function searchPositive( keyname ) {
		if ( searchValue && searchValue.length > 3 ) {
			const stringArray = searchValue.trim().split( /\s+/ );
			for ( let i = 0; i < stringArray.length; i++ ) {
				var substr = stringArray[ i ];
				if ( ! keyname.includes( substr.toLowerCase() ) ) {
					return false;
				}
			}
			return true;
		}
		return true;
	}

	return (
		<>
			{ ! ( activeIcon || ( supportCustom && hasCustomIcon ) ) && (
				<>
					<div class={ `grigora-icons-selected` }>
						<Button variant="secondary" onClick={ openModal }>
							{ __( 'Select Icon', 'grigora-kit' ) }
						</Button>
					</div>
					<br></br>
					{ supportCustom && (
						<ToggleControl
							label={ __( 'Custom SVG Icon', 'grigora-kit' ) }
							checked={ hasCustomIcon }
							onChange={ () =>
								setHasCustomIcon( ! hasCustomIcon )
							}
						/>
					) }
				</>
			) }
			{ ( activeIcon || ( supportCustom && hasCustomIcon ) ) && (
				<>
					<div class={ `grigora-icons-selected-svg` }>
						{ renderSingleIcon( activeIcon ) }
					</div>
					<div class={ `grigora-icons-selected` }>
						<Button variant="secondary" onClick={ openModal }>
							{ __( 'Change Icon', 'grigora-kit' ) }
						</Button>
						{ ! hideRemoveButton && (
							<Button
								isDestructive
								variant="secondary"
								onClick={ resetIcon }
							>
								{ __( 'Remove Icon', 'grigora-kit' ) }
							</Button>
						) }
					</div>
					<br></br>
					{ supportCustom && (
						<ToggleControl
							label={ __( 'Custom SVG Icon', 'grigora-kit' ) }
							checked={ hasCustomIcon }
							onChange={ () =>
								setHasCustomIcon( ! hasCustomIcon )
							}
						/>
					) }
					{ hasCustomIcon && (
						<TextareaControl
							help={ __( 'SVG Icon HTML', 'grigora-kit' ) }
							value={ customIcon }
							onChange={ setCustomIcon }
						/>
					) }
				</>
			) }

			{ isOpen && (
				<Modal
					title="Select Icon"
					onRequestClose={ closeModal }
					overlayClassName={ `grigora-icon-picker-modal-overlay` }
				>
					<div class="grigora-icon-picker-search">
						<SearchControl
							value={ searchValue }
							onChange={ setSearchValue }
						/>
					</div>
					<div class="grigora-icon-picker">
						{ Object.keys( SVGIcons ).map( ( keyName ) => {
							if ( searchPositive( keyName ) ) {
								return (
									<div
										className={ `grigora-svg-icon ${
											activeIcon === keyName
												? 'active'
												: ''
										}` }
										onClick={ ( e ) => {
											if ( e.detail == 1 ) {
												if ( activeIcon === keyName ) {
													if ( ! hideRemoveButton ) {
														setActiveIcon( '' );
													}
												} else {
													setActiveIcon( keyName );
												}
											} else {
												setActiveIcon( keyName );
												closeModal();
											}
										} }
									>
										{ renderSingleIcon( keyName, true ) }
									</div>
								);
							}
							return null;
						} ) }
					</div>
				</Modal>
			) }
		</>
	);
}

export default IconPicker;
