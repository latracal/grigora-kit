import { __experimentalBoxControl as BoxControl,
    __experimentalHStack as HStack } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';

function GrigoraBoxInput( { values, onChange, label = "", resetValue={"top":{ "top": "15px", "bottom": "15px", "left": "30px", "right": "30px"}} } ){

    return(
        <div className={`grigora-box-input`}>
            <HStack spacing={ 4 }>
            <div className='grigora-box-input__label'>{label}</div>
            { !deepEqualObj(values, resetValue) && (
                <GrigoraResetButton onClick={()=>{onChange(resetValue)}} />
            )}
            </HStack>
            <div className='grigora-box-input__select'>
                <BoxControl 
                    allowReset={ false }
                    onChange={ onChange }
                    values={ values }
                />
            </div>
        </div>
    )
}

export default GrigoraBoxInput;