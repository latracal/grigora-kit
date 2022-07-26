import {
	__experimentalNumberControl as NumberControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';

function GrigoraNumberInput( {
	value,
	onChange,
	min = undefined,
	max = undefined,
	label = '',
	resetValue = 0,
} ) {
	return (
		<div className={ `grigora-number-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-number-input__label">{ label }</div>
				{ value != resetValue && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
			</HStack>
			<div className="grigora-number-input__select">
				<NumberControl
					max={ max }
					min={ min }
					onChange={ ( change ) => {
						change = Number( change );
						if ( ! isNaN( change ) ) {
							onChange( change );
						}
					} }
					value={ value }
				/>
			</div>
		</div>
	);
}

export default GrigoraNumberInput;
