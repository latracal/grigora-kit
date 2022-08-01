import {
	Icon,
	Button,
	Popover,
	RangeControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';

import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';

function GrigoraCSSFilterInput( {
	value,
	setValue,
	label = '',
	resetValue = {},
} ) {
	const [ openPopOver, setOpenPopOver ] = useState( false );

	const [ blur, setBlur ] = useState( value.blur ? value.blur : 5 );
	const [ brightness, setBrightness ] = useState(
		value.brightness ? value.brightness : 100
	);
	const [ contrast, setContrast ] = useState(
		value.contrast ? value.contrast : 100
	);
	const [ saturation, setSaturation ] = useState(
		value.saturation ? value.saturation : 135
	);
	const [ hue, setHue ] = useState( value.hue ? value.hue : 191 );

	function updateValues() {
		setValue( { blur, brightness, contrast, saturation, hue } );
	}

	const ref = useRef();

	useEffect( () => {
		if (
			blur == 5 &&
			brightness == 100 &&
			contrast == 100 &&
			saturation == 135 &&
			hue == 191
		) {
			setValue( resetValue );
		} else {
			updateValues();
		}
	}, [ blur, brightness, contrast, saturation, hue ] );

	return (
		<div className={ `grigora-cssfilter-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-cssfilter-input__label">{ label }</div>
				<div>
					{ ! deepEqualObj( value, resetValue ) && (
						<GrigoraResetButton
							onClick={ () => {
								setValue( resetValue );
							} }
						/>
					) }
					<Button
						isSmall
						variant="secondary"
						icon={
							<Icon
								icon={ () => (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
									</svg>
								) }
							/>
						}
						onClick={ () => {
							setOpenPopOver( true );
							if ( deepEqualObj( value, resetValue ) ) {
								updateValues();
							}
						} }
					/>
					{ openPopOver && (
						<Popover
							placement="left-center"
							onClose={ () => {
								setOpenPopOver( false );
							} }
							anchorRef={ ref?.current }
							className={ `grigora-cssfilter-input__popover` }
						>
							<RangeControl
								value={ blur }
								onChange={ ( value ) => setBlur( value ) }
								min={ 0 }
								max={ 10 }
								withInputField={ false }
								step={ 0.1 }
								label={ __( 'Blur', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							<RangeControl
								value={ brightness }
								onChange={ ( value ) => setBrightness( value ) }
								min={ 0 }
								max={ 200 }
								withInputField={ false }
								step={ 1 }
								label={ __( 'Brightness', 'grigora-kit' ) }
								className={ `grigora-range-input__brightness` }
							/>
							<RangeControl
								value={ contrast }
								onChange={ ( value ) => setContrast( value ) }
								min={ 0 }
								max={ 200 }
								withInputField={ false }
								step={ 1 }
								label={ __( 'Contrast', 'grigora-kit' ) }
								className={ `grigora-range-input__contrast` }
							/>
							<RangeControl
								value={ saturation }
								onChange={ ( value ) => setSaturation( value ) }
								min={ 0 }
								max={ 200 }
								withInputField={ false }
								step={ 1 }
								label={ __( 'Saturation', 'grigora-kit' ) }
								className={ `grigora-range-input__saturation` }
							/>
							<RangeControl
								value={ hue }
								onChange={ ( value ) => setHue( value ) }
								min={ 0 }
								max={ 360 }
								withInputField={ false }
								step={ 1 }
								label={ __( 'Hue', 'grigora-kit' ) }
								className={ `grigora-range-input__hue` }
							/>
						</Popover>
					) }
				</div>
			</HStack>
		</div>
	);
}

export default GrigoraCSSFilterInput;
