import { SelectControl,
    __experimentalNumberControl as NumberControl, 
    __experimentalUnitControl as UnitControl,
    __experimentalHStack as HStack } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';

function GrigoraSelectInput( { value, onChange, options, label = "", resetValue="none" } ){


    return(
        <div className={`grigora-select-input`}>
            <HStack spacing={ 4 }>
            <div className='grigora-select-input__label'>{label}</div>
            { value != resetValue && (
                <GrigoraResetButton onClick={()=>{onChange(resetValue)}} />
            )}
            </HStack>
            <div className='grigora-select-input__select'>
                <SelectControl
                    onChange={ onChange }
                    value={ value }
                    options={options}
                />
            </div>
        </div>
    )
}

export default GrigoraSelectInput;