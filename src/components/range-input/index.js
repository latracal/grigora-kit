import {
	RangeControl,
	Button,
	__experimentalNumberControl as NumberControl,
	__experimentalUnitControl as UnitControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

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
} ) {
	value = Number( value );
	if ( isNaN( value ) ) {
		value = resetValue;
	}

	return (
		<div className={ `grigora-range-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-range-input__label">{ label }</div>
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
					value={ value }
					onChange={ setValue }
					min={ min }
					max={ max }
					withInputField={ false }
					step={ step }
					className={ `grigora-range-input__slider` }
					{ ...( value == resetValue && { initialPosition: min } ) }
				/>
				<NumberControl
					isShiftStepEnabled={ true }
					onChange={ ( newVal ) => {
						if (
							typeof newVal === 'string' ||
							newVal instanceof String
						) {
							setValue( Number( newVal ) );
						} else {
							setValue( newVal );
						}
					} }
					shiftStep={ step }
					step={ step }
					value={ value }
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
