import {
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';
import GrigoraUnitInput from '@components/unit-input';
import deepEqualObj from '@helpers/compareObj';

function GrigoraLTRBInput( {
	value,
	onChange,
	label = '',
	resetValue = {
		left: '',
		top: '',
		right: '',
		bottom: '',
	},
} ) {
	return (
		<div className={ `grigora-ltrb-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-ltrb-input__label">{ label }</div>
			</HStack>
			<div class="grigora-ltrb-input__top">
				<GrigoraUnitInput
					label="Top"
					onChange={ ( top ) => onChange( { ...value, top: top } ) }
					value={ value.top }
					resetValue={ resetValue.top }
				/>
			</div>
			<HStack spacing={ 4 }>
				<GrigoraUnitInput
					label="Left"
					onChange={ ( left ) =>
						onChange( { ...value, left: left } )
					}
					value={ value.left }
					resetValue={ resetValue.left }
				/>
				<GrigoraUnitInput
					label="Right"
					onChange={ ( right ) =>
						onChange( { ...value, right: right } )
					}
					value={ value.right }
					resetValue={ resetValue.right }
				/>
			</HStack>
			<div class="grigora-ltrb-input__bottom">
				<GrigoraUnitInput
					label="Bottom"
					onChange={ ( bottom ) =>
						onChange( { ...value, bottom: bottom } )
					}
					value={ value.bottom }
					resetValue={ resetValue.bottom }
				/>
			</div>
		</div>
	);
}

export default GrigoraLTRBInput;
