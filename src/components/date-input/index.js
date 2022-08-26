import { DateTimePicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __experimentalHStack as HStack } from '@wordpress/components';

import GrigoraResetButton from '@components/reset-button';

const GrigoraDateTimeInput = ( {
	value,
	onChange,
	label = '',
	resetValue = new Date(),
} ) => {
	return (
		<div>
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
			<DateTimePicker
				onChange={ ( change ) => {
					onChange( change );
				} }
				currentDate={ value }
				is12Hour={ false }
				__nextRemoveHelpButton
				__nextRemoveResetButton
			/>
		</div>
	);
};

export default GrigoraDateTimeInput;
