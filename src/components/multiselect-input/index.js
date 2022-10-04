import { __experimentalHStack as HStack } from '@wordpress/components';

import { MultiSelect } from 'react-multi-select-component';

import { __ } from '@wordpress/i18n';

function GrigoraMultiSelectInput( { value, onChange, options, label = '' } ) {
	return (
		<div className={ `grigora-multiselect-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-multiselect-input__label">
					{ label }
				</div>
			</HStack>
			<div className="grigora-multiselect-input__select">
				<MultiSelect
					onChange={ onChange }
					value={ value }
					options={ options }
				/>
			</div>
		</div>
	);
}

export default GrigoraMultiSelectInput;
