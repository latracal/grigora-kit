import {
	GradientPicker,
	__experimentalHStack as HStack,
    ColorIndicator,
	Popover,
} from '@wordpress/components';
import {
	__experimentalColorGradientControl as ColorGradientControl
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';
import GrigoraResetButton from '@components/reset-button';

function GrigoraColorGradientInput( {
	color,
    gradient,
	onColorChange,
    onGradientChange,
	label = '',
	resetColor = '',
	resetGradient = '',
} ) {

    const [ openPopOver, setOpenPopOver ] = useState( false );
    const ref = useRef();

	return (
        <>
		<div className={ `grigora-colorgradient-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-colorgradient-input__label"></div>
				{ ((color && (color != resetColor)) || (gradient && (gradient != resetGradient))) && (
					<GrigoraResetButton
						onClick={ () => {
							onColorChange( resetColor );
							onGradientChange( resetGradient );
						} }
					/>
				) }
			</HStack>
			<div
					className="grigora-colorgradient-input__colorselect"
					onClick={ () => {
						setOpenPopOver( true );
					} }
				>
					<ColorIndicator colorValue={ color ? color : gradient } />
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
                className={ `grigora-colorgradient-input__popover` }
            >
            <ColorGradientControl
                    colorValue={ color }
                    gradientValue={ gradient }
                    onColorChange={ onColorChange }
                    onGradientChange={ onGradientChange }
                    clearable = { false }
                />
            </Popover>
        ) }
        </>
	);
}

export default GrigoraColorGradientInput;
