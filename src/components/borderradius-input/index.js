import { __experimentalHStack as HStack } from '@wordpress/components';
import { __experimentalBorderRadiusControl as BorderRadiusControl } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';

function GrigoraBorderRadiusInput( {
	values,
	onChange,
	label = '',
	resetValue = {
		topLeft: '4px',
		topRight: '4px',
		bottomLeft: '4px',
		bottomRight: '4px',
	},
} ) {
	return (
		<div className={ `grigora-borderradius-input` }>
			<HStack
				spacing={ 4 }
				className={ `grigora-borderradius-input__hstack` }
			>
				<div className="grigora-borderradius-input__label">
					{ label }
				</div>
				{ ! deepEqualObj( values, resetValue ) && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
			</HStack>
			<div className="grigora-borderradius-input__select">
				<BorderRadiusControl onChange={ onChange } values={ values } />
			</div>
		</div>
	);
}

export default GrigoraBorderRadiusInput;
