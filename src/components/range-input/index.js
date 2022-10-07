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

import GrigoraResetButton from '@components/reset-button';
import {DesktopIcon, TabletIcon, MobileIcon} from '@constants/icons-react';

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

	const [activeResponse, setActiveResponse] = useState('desktop');

	return (
		<div className={ `grigora-range-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-range-input__label">
					{ label }
					{ isResponsive && (
						<div className='responsive-control'>
							<div className={`desktop ${activeResponse==='desktop' ? 'active': ''}`} onClick={()=>{setActiveResponse('desktop')}} title={__('Desktop', 'grigora-kit')}>
								<DesktopIcon />
							</div>
							<div className={`tablet ${activeResponse==='tablet' ? 'active': ''}`} onClick={()=>{setActiveResponse('tablet')}} title={__('Tablet', 'grigora-kit')}>
								<TabletIcon />
							</div>
							<div className={`mobile ${activeResponse==='mobile' ? 'active': ''}`} onClick={()=>{setActiveResponse('mobile')}} title={__('Mobile', 'grigora-kit')}>
								<MobileIcon />
							</div>
						</div>
					) }
				</div>
				{ ( value != resetValue || valueTablet !== resetValueTablet || valueMobile !== resetValueMobile ) && (
					<GrigoraResetButton
						onClick={ () => {
							setValue( resetValue );
							if(isResponsive){
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
					value={ activeResponse==='desktop' ? value : (activeResponse==='tablet' ? Number(valueTablet) : Number(valueMobile)) }
					onChange={ activeResponse==='desktop' ? setValue : (activeResponse==='tablet' ? setValueTablet : setValueMobile) }
					min={ min }
					max={ max }
					withInputField={ false }
					step={ step }
					className={ `grigora-range-input__slider` }
					{ ...( resetValue == (activeResponse==='desktop' ? value : (activeResponse==='tablet' ? valueTablet : valueMobile)) && { initialPosition: min } ) }
				/>
				<NumberControl
					isShiftStepEnabled={ true }
					onChange={ ( newVal ) => {
						if (
							typeof newVal === 'string' ||
							newVal instanceof String
						) {
							activeResponse==='desktop' ? setValue( Number( newVal ) ) : (activeResponse==='tablet' ? setValueTablet( Number( newVal ) ) : setValueMobile( Number( newVal ) ))
						} else {
							activeResponse==='desktop' ? setValue( newVal ) : (activeResponse==='tablet' ? setValueTablet( newVal ) : setValueMobile( newVal ))
						}
					} }
					shiftStep={ step }
					step={ step }
					value={ activeResponse==='desktop' ? value : (activeResponse==='tablet' ? valueTablet : valueMobile) }
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
