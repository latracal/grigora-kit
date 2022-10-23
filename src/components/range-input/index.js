import {
	RangeControl,
	Button,
	__experimentalNumberControl as NumberControl,
	__experimentalUnitControl as UnitControl,
	__experimentalHStack as HStack,
	SVG,
	Path,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import GrigoraResetButton from '@components/reset-button';
import { DesktopIcon, TabletIcon, MobileIcon } from '@constants/icons-react';
import { getDevice, setPreviewDevice } from '@helpers/previewDevice';

function GrigoraRangeInput( {
	value,
	setValue,
	step = 1,
	min = 0,
	max = 100,
	unit = 'px',
	label = '',
	resetValue = 0,
	isResponsive = false,
	valueTablet,
	setValueTablet,
	resetValueTablet,
	valueMobile,
	setValueMobile,
	resetValueMobile,
} ) {
	value = Number( value );
	if ( isNaN( value ) ) {
		value = resetValue;
	}

	const [ activeResponse, setActiveResponse ] = useState(
		getDevice().toLowerCase()
	);

	const editPostManager = useDispatch( 'core/edit-post' );
	const editSiteManager = useDispatch( 'core/edit-site' );

	return (
		<div className={ `grigora-range-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-range-input__label">
					{ label }
					{ isResponsive && (
						<div className="responsive-control">
							<div
								className={ `desktop ${
									activeResponse === 'desktop' ? 'active' : ''
								}` }
								onClick={ () => {
									setActiveResponse( 'desktop' );
								} }
								title={ __( 'Desktop', 'grigora-kit' ) }
							>
								<DesktopIcon />
							</div>
							<div
								className={ `tablet ${
									activeResponse === 'tablet' ? 'active' : ''
								}` }
								onClick={ () => {
									setActiveResponse( 'tablet' );
								} }
								title={ __( 'Tablet', 'grigora-kit' ) }
							>
								<TabletIcon />
							</div>
							<div
								className={ `mobile ${
									activeResponse === 'mobile' ? 'active' : ''
								}` }
								onClick={ () => {
									setActiveResponse( 'mobile' );
								} }
								title={ __( 'Mobile', 'grigora-kit' ) }
							>
								<MobileIcon />
							</div>
						</div>
					) }
				</div>
				{ ( value != resetValue ||
					valueTablet !== resetValueTablet ||
					valueMobile !== resetValueMobile ) && (
					<GrigoraResetButton
						onClick={ () => {
							setValue( resetValue );
							if ( isResponsive ) {
								setActiveResponse( 'desktop' );
								setValueTablet( resetValueTablet );
								setValueMobile( resetValueMobile );
							}
						} }
					/>
				) }
			</HStack>
			<HStack spacing={ 2 }>
				<RangeControl
					value={
						isResponsive
							? activeResponse === 'desktop'
								? value
								: activeResponse === 'tablet'
								? Number( valueTablet )
								: Number( valueMobile )
							: value
					}
					onChange={
						isResponsive
							? activeResponse === 'desktop'
								? setValue
								: activeResponse === 'tablet'
								? setValueTablet
								: setValueMobile
							: setValue
					}
					min={ min }
					max={ max }
					withInputField={ false }
					step={ step }
					className={ `grigora-range-input__slider` }
					{ ...( resetValue ==
						( activeResponse === 'desktop'
							? value
							: activeResponse === 'tablet'
							? valueTablet
							: valueMobile ) && { initialPosition: min } ) }
				/>
				<NumberControl
					isShiftStepEnabled={ true }
					onChange={ ( newVal ) => {
						if (
							typeof newVal === 'string' ||
							newVal instanceof String
						) {
							isResponsive
								? activeResponse === 'desktop'
									? setValue( Number( newVal ) )
									: activeResponse === 'tablet'
									? setValueTablet( Number( newVal ) )
									: setValueMobile( Number( newVal ) )
								: setValue( Number( newVal ) );
						} else {
							isResponsive
								? activeResponse === 'desktop'
									? setValue( newVal )
									: activeResponse === 'tablet'
									? setValueTablet( newVal )
									: setValueMobile( newVal )
								: setValue( newVal );
						}
					} }
					shiftStep={ step }
					step={ step }
					value={
						isResponsive
							? activeResponse === 'desktop'
								? value
								: activeResponse === 'tablet'
								? valueTablet
								: valueMobile
							: value
					}
					hideHTMLArrows={ true }
					min={ min }
					max={ max }
				></NumberControl>
				<div className="grigora-range-input__unit">{ unit }</div>
			</HStack>
		</div>
	);
}

export default GrigoraRangeInput;
