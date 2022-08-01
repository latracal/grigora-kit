import {
	GradientPicker,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';

function GrigoraGradientInput( {
	value,
	onChange,
	label = '',
	resetValue = 'linear-gradient(135deg,rgb(23,144,214) 0%,rgb(155,81,224) 100%)',
} ) {
	return (
		<div className={ `grigora-gradient-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-gradient-input__label">{ label }</div>
				{ value != resetValue && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
			</HStack>
			<div className="grigora-gradient-input__select">
				<GradientPicker
					value={ value }
					onChange={ onChange }
					clearable={ false }
				/>
			</div>
		</div>
	);
}

export default GrigoraGradientInput;
