import { DateTimePicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import {
	__experimentalHStack as HStack,
} from '@wordpress/components';

import GrigoraResetButton from '@components/reset-button';
 
const GrigoraDateTimeInput = ({
    value,
	onChange,
    label = '',
    resetValue = new Date(),

}) => {
    const [ date, setDate ] = useState( new Date() );
 
    return (
        <div>
            <div className="grigora-number-input__label">{ label }</div>
            { value != resetValue && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
            <DateTimePicker
                currentDate={ date }
                // onChange={ ( newDate ) => setDate( newDate ) }
                onChange={ ( change ) => {
                    change = new Date( change );
                    if ( ! isNaN( change ) ) {
                        onChange( change );
                    }
                } }
                value={ value }
                is12Hour={ false }
                __nextRemoveHelpButton
                __nextRemoveResetButton
            />
        </div>
    );
};

export default GrigoraDateTimeInput;