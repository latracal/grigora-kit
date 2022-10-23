import {
	__experimentalUnitControl as UnitControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import GrigoraResetButton from '@components/reset-button';
import isEmpty from '@helpers/objEmpty';
import { DesktopIcon, TabletIcon, MobileIcon } from '@constants/icons-react';
import { getDevice, setPreviewDevice } from '@helpers/previewDevice';

function GrigoraUnitInput( {
	value,
	onChange,
	units = {},
	label = '',
	resetValue = '0px',
	isResponsive = false,
	valueTablet,
	onChangeTablet,
	resetValueTablet,
	valueMobile,
	onChangeMobile,
	resetValueMobile,
} ) {
	const [ activeResponse, setActiveResponse ] = useState(
		getDevice().toLowerCase()
	);

	const editPostManager = useDispatch( 'core/edit-post' );
	const editSiteManager = useDispatch( 'core/edit-site' );

	return (
		<div className={ `grigora-unit-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-unit-input__label">
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
							onChange( resetValue );
							if ( isResponsive ) {
								setActiveResponse( 'desktop' );
								onChangeTablet( resetValueTablet );
								onChangeMobile( resetValueMobile );
							}
						} }
					/>
				) }
			</HStack>
			<div className="grigora-unit-input__select">
				<UnitControl
					value={
						isResponsive
							? activeResponse === 'desktop'
								? value
								: activeResponse === 'tablet'
								? valueTablet
								: valueMobile
							: value
					}
					onChange={
						isResponsive
							? activeResponse === 'desktop'
								? onChange
								: activeResponse === 'tablet'
								? onChangeTablet
								: onChangeMobile
							: onChange
					}
					{ ...( ! isEmpty( units ) && { units: units } ) }
				/>
			</div>
		</div>
	);
}

export default GrigoraUnitInput;
