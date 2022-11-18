import {
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalHStack as HStack,
	Toolbar,
	ToolbarButton,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';
import { DesktopIcon, TabletIcon, MobileIcon } from '@constants/icons-react';
import { getDevice, setPreviewDevice } from '@helpers/previewDevice';

function GrigoraAlignmentInput( {
	value,
	onChange,
	options,
	label = '',
	resetValue = '',
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
		<div className={ `grigora-alignment-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-alignment-input__label">
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
			<Toolbar label={ label } className="alignment-toolbar">
				{ options.map( ( item, index ) => (
					<ToolbarButton
						isActive={
							item.value ===
							( activeResponse === 'desktop'
								? value
								: activeResponse === 'tablet'
								? valueTablet
								: valueMobile )
						}
						onClick={ () => {
							if (
								item.value ===
								( activeResponse === 'desktop'
									? value
									: activeResponse === 'tablet'
									? valueTablet
									: valueMobile )
							) {
								activeResponse === 'desktop'
									? onChange( '' )
									: activeResponse === 'tablet'
									? onChangeTablet( '' )
									: onChangeMobile( '' );
							} else {
								activeResponse === 'desktop'
									? onChange( item.value )
									: activeResponse === 'tablet'
									? onChangeTablet( item.value )
									: onChangeMobile( item.value );
							}
						} }
						className="inner-btn"
					>
						{ item.label }
					</ToolbarButton>
				) ) }
			</Toolbar>
		</div>
	);
}

export default GrigoraAlignmentInput;
