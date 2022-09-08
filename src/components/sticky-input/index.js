import {
	Icon,
	Button,
	Popover,
	RangeControl,
	__experimentalHStack as HStack,
	SelectControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';

import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';
import isEmpty from '@helpers/objEmpty';

function StickyControl( {
	value,
	onChange,
} ) {
	
	const [ offset, setOffset ] = useState( value.offset ? value.offset : 0 );

	useEffect( () => {
		onChange( { offset } );
	}, [ offset ] );

	return (
			<HStack spacing={ 4 }>
				<NumberControl
					value={ offset }
					onChange={ (val)=>setOffset(val) }
					label={__('Offset', 'grigora-kit')}
					labelPosition={'side'}
				/>
			</HStack>		
	);
}

export default StickyControl;
