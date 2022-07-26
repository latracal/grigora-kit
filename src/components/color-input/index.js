import {
	ColorPalette,
	ColorIndicator,
	Popover,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { useSetting } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';
import { useState, useRef } from '@wordpress/element';

import GrigoraResetButton from '@components/reset-button';

function GrigoraColorInput( {
	value,
	onChange,
	label = '',
	resetValue = '#000',
} ) {
	const palette = useSetting( 'color.palette' );
	const [ openPopOver, setOpenPopOver ] = useState( false );

	const ref = useRef();

	return (
		<>
			<div className={ `grigora-color-input` }>
				<HStack spacing={ 4 }>
					<div className="grigora-color-input__label"></div>
					{ value != resetValue && (
						<GrigoraResetButton
							onClick={ () => {
								onChange( resetValue );
							} }
						/>
					) }
				</HStack>
				<div
					className="grigora-color-input__colorselect"
					onClick={ () => {
						setOpenPopOver( true );
					} }
				>
					<ColorIndicator colorValue={ value } />
					<div className="grigora-color-input__label">{ label }</div>
				</div>
			</div>
			{ openPopOver && (
				<Popover
					placement="left-center"
					onClose={ () => {
						setOpenPopOver( false );
					} }
					anchorRef={ ref?.current }
					className={ `grigora-color-input__popover` }
				>
					<ColorPalette
						clearable={ false }
						value={ value }
						onChange={ onChange }
						disableCustomColors={ false }
						showTitle={ false }
						enableAlpha
						colors={ palette.map( ( color ) => {
							return {
								color: `var(--wp--preset--color--${ color.slug })`,
								name: color.name,
							};
						} ) }
					/>
				</Popover>
			) }
		</>
	);
}

export default GrigoraColorInput;
