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
	valueMobile,
	setValueMobile,
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
								<SVG xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22" fill="currentColor">
									<Path d="M7.65287 19.25V17.875H9.6237V15.5833H3.20703C2.84036 15.5833 2.51953 15.4458 2.24453 15.1708C1.96953 14.8958 1.83203 14.575 1.83203 14.2083V4.125C1.83203 3.75833 1.96953 3.4375 2.24453 3.1625C2.51953 2.8875 2.84036 2.75 3.20703 2.75H18.7904C19.157 2.75 19.4779 2.8875 19.7529 3.1625C20.0279 3.4375 20.1654 3.75833 20.1654 4.125V14.2083C20.1654 14.575 20.0279 14.8958 19.7529 15.1708C19.4779 15.4458 19.157 15.5833 18.7904 15.5833H12.3737V17.875H14.3445V19.25H7.65287ZM3.20703 14.2083H18.7904V4.125H3.20703V14.2083ZM3.20703 14.2083V4.125V14.2083Z"/>
								</SVG>
							</div>
							<div className={`tablet ${activeResponse==='tablet' ? 'active': ''}`} onClick={()=>{setActiveResponse('tablet')}} title={__('Tablet', 'grigora-kit')}>
								<SVG xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22"  fill="currentColor" >
									<Path d="M2.29297 18.3332C1.91102 18.3332 1.58637 18.1995 1.31901 17.9321C1.05165 17.6648 0.917969 17.3401 0.917969 16.9582V5.0415C0.917969 4.65956 1.05165 4.33491 1.31901 4.06755C1.58637 3.80018 1.91102 3.6665 2.29297 3.6665H19.7096C20.0916 3.6665 20.4162 3.80018 20.6836 4.06755C20.951 4.33491 21.0846 4.65956 21.0846 5.0415V16.9582C21.0846 17.3401 20.951 17.6648 20.6836 17.9321C20.4162 18.1995 20.0916 18.3332 19.7096 18.3332H2.29297ZM2.98047 5.0415H2.29297V16.9582H2.98047V5.0415ZM4.35547 16.9582H17.6471V5.0415H4.35547V16.9582ZM19.0221 5.0415V16.9582H19.7096V5.0415H19.0221ZM19.0221 5.0415H19.7096H19.0221ZM2.98047 5.0415H2.29297H2.98047Z"/>
								</SVG>
							</div>
							<div className={`mobile ${activeResponse==='mobile' ? 'active': ''}`} onClick={()=>{setActiveResponse('mobile')}} title={__('Mobile', 'grigora-kit')}>
								<SVG xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22"  fill="currentColor">
									<Path d="M5.95703 21.0832C5.59036 21.0832 5.26953 20.9457 4.99453 20.6707C4.71953 20.3957 4.58203 20.0748 4.58203 19.7082V2.2915C4.58203 1.92484 4.71953 1.604 4.99453 1.329C5.26953 1.054 5.59036 0.916504 5.95703 0.916504H16.0404C16.407 0.916504 16.7279 1.054 17.0029 1.329C17.2779 1.604 17.4154 1.92484 17.4154 2.2915V19.7082C17.4154 20.0748 17.2779 20.3957 17.0029 20.6707C16.7279 20.9457 16.407 21.0832 16.0404 21.0832H5.95703ZM5.95703 17.6457V19.7082H16.0404V17.6457H5.95703ZM10.9987 19.3644C11.1973 19.3644 11.3615 19.2995 11.4914 19.1696C11.6213 19.0398 11.6862 18.8755 11.6862 18.6769C11.6862 18.4783 11.6213 18.3141 11.4914 18.1842C11.3615 18.0544 11.1973 17.9894 10.9987 17.9894C10.8001 17.9894 10.6359 18.0544 10.506 18.1842C10.3761 18.3141 10.3112 18.4783 10.3112 18.6769C10.3112 18.8755 10.3761 19.0398 10.506 19.1696C10.6359 19.2995 10.8001 19.3644 10.9987 19.3644ZM5.95703 16.2707H16.0404V4.354H5.95703V16.2707ZM5.95703 2.979H16.0404V2.2915H5.95703V2.979ZM5.95703 17.6457V19.7082V17.6457ZM5.95703 2.979V2.2915V2.979Z"/>
								</SVG>
							</div>
						</div>
					) }
				</div>
				{ value != resetValue && (
					<GrigoraResetButton
						onClick={ () => {
							setValue( resetValue );
						} }
					/>
				) }
			</HStack>
			<HStack spacing={ 2 }>
				<RangeControl
					value={ activeResponse==='desktop' ? value : (activeResponse==='tablet' ? valueTablet : valueMobile) }
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
					value={ activeResponse==='desktop' ? value : (activeResponse==='tablet' ? Number(valueTablet) : Number(valueMobile)) }
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
