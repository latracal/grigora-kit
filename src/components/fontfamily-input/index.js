import {
	SelectControl,
	__experimentalNumberControl as NumberControl,
	__experimentalUnitControl as UnitControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';
import G_FONTS from '@constants/gfonts.json';

function GrigoraFontFamilyInput( {
	value,
	onChange,
    options = G_FONTS,
	label = '',
	resetValue = '',
} ) {
	return (
		<div className={ `grigora-fontfamily-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-fontfamily-input__label">{ label }</div>
				{ value != resetValue && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
			</HStack>
			<div className="grigora-fontfamily-input__select">
				<SelectControl
					onChange={ onChange }
					value={ value }
					options={ [{
                        label: "Default",
                        value: "",
                    }].concat(options.map( function ( item ) {
                        return {
                            label: item,
                            value: item,
                        };
                    } )) }
				/>
			</div>
		</div>
	);
}

export default GrigoraFontFamilyInput;
