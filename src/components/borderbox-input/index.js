import {
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';

function GrigoraBorderBoxInput( {
	value,
	onChange,
	label = '',
	resetValue = {
		top: { color: '#72aee6', style: 'dashed', width: '0px' },
		bottom: { color: '#72aee6', style: 'dashed', width: '0px' },
		right: { color: '#72aee6', style: 'dashed', width: '0px' },
		left: { color: '#72aee6', style: 'dashed', width: '0px' },
	},
} ) {
	return (
		<div className={ `grigora-borderbox-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-borderbox-input__label">{ label }</div>
				{ ! deepEqualObj( value, resetValue ) && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
			</HStack>
			<div className="grigora-borderbox-input__select">
				<BorderBoxControl onChange={ onChange } value={ value } />
			</div>
		</div>
	);
}

export default GrigoraBorderBoxInput;
