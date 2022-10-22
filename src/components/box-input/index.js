import {
	__experimentalBoxControl as BoxControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';
import { DesktopIcon, TabletIcon, MobileIcon } from '@constants/icons-react';
import { getDevice, setPreviewDevice } from '@helpers/previewDevice';

function GrigoraBoxInput( {
	values,
	onChange,
	label = '',
	resetValue = { top: '15px', bottom: '15px', left: '30px', right: '30px' },
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
		<div className={ `grigora-box-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-box-input__label">
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
				{ ( ! deepEqualObj( values, resetValue ) ||
					! deepEqualObj( valueTablet, resetValueTablet ) ||
					! deepEqualObj( valueMobile, resetValueMobile ) ) && (
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
			<div className="grigora-box-input__select">
				<BoxControl
					allowReset={ false }
					onChange={
						isResponsive ? (
							activeResponse === 'desktop'
								? onChange
								: activeResponse === 'tablet'
								? onChangeTablet
								: onChangeMobile
						) : onChange
					}
					values={
						isResponsive ? (
							activeResponse === 'desktop'
								? values
								: activeResponse === 'tablet'
								? valueTablet
								: valueMobile
						) : values
					}
				/>
			</div>
		</div>
	);
}

export default GrigoraBoxInput;
