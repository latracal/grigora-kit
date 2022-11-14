import {
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { useSetting } from '@wordpress/block-editor';
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

	// palette variable is added optionally from the release of WP 6.1 as it breaks the block if not passed.
	const palette = useSetting( 'color.palette' );

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
				<BorderBoxControl
					onChange={ onChange }
					value={ value }
					colors={ palette.map( ( color ) => {
						return {
							color: `var(--wp--preset--color--${ color.slug })`,
							name: color.name,
						};
					} ) }
				/>
			</div>
		</div>
	);
}

export default GrigoraBorderBoxInput;
