import { __experimentalUnitControl as UnitControl,
    __experimentalHStack as HStack } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';
import isEmpty from "@helpers/objEmpty";

function GrigoraUnitInput( { value, onChange, units={}, label = "", resetValue = "0px" } ){

    return(
        <div className={`grigora-unit-input`}>
            <HStack spacing={ 4 }>
            <div className='grigora-unit-input__label'>{label}</div>
            { value != resetValue && (
                <GrigoraResetButton onClick={()=>{onChange(resetValue)}} />
            )}
            </HStack>
            <div className='grigora-unit-input__select'>
                <UnitControl
                    value={ value }
                    onChange={ onChange }
                    {...( !isEmpty(units) && {units: units} )}
                />
            </div>
        </div>
    )
}

export default GrigoraUnitInput;