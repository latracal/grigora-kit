import {
	TextControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';

function GrigoraTextInput( {
	value,
	onChange,
	options,
	label = '',
	resetValue = '',
	help = '',
} ) {
	return (
		<div className={ `grigora-text-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-text-input__label">{ label }</div>
				{ value != resetValue && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
			</HStack>
			<div className="grigora-text-input__textbox">
				<TextControl onChange={ onChange } value={ value } />
			</div>
			<div>{help}</div>
		</div>
	);
}

export default GrigoraTextInput;
