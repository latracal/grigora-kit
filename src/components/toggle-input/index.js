import {
	ToggleControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';

function GrigoraToggleInput( {
	value,
	onChange,
	help,
	label = '',
	resetValue = false,
	removeResetButton = false,
} ) {
	return (
		<div className={ `grigora-toggle-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-toggle-input__label"></div>
				{ value != resetValue && (!removeResetButton) && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
			</HStack>
			<div className="grigora-toggle-input__togglebox">
				<ToggleControl
					label={ label }
					checked={ !! value }
					onChange={ onChange }
					help={ help }
				/>
			</div>
		</div>
	);
}

export default GrigoraToggleInput;
