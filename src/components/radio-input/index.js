import {
	TextControl,
	__experimentalHStack as HStack,
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';

function GrigoraRadioInput( {
	value,
	onChange,
	radios,
	label = '',
	resetValue = '',
} ) {
	return (
		<div className={ `grigora-radio-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-radio-input__label">{ label }</div>
				{ value != resetValue && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
			</HStack>
			<div className="grigora-radio-input__radiobox">
				<RadioGroup
					label="Width"
					onChange={ onChange }
					checked={ value }
				>
					{ radios.map( function ( item ) {
						return (
							<Radio value={ item.value }>{ item.text }</Radio>
						);
					} ) }
				</RadioGroup>
			</div>
		</div>
	);
}

export default GrigoraRadioInput;
