import {
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalHStack as HStack,
	Button,
	Icon,
	Popover,
	DateTimePicker,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';

import GrigoraResetButton from '@components/reset-button';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';

function GrigoraDateTimeInput( {
	currentDate = '',
	onChange,
	is12Hour = false,
	label = 'Date Time',
	resetValue = '',
} ) {
	const [ openPopOver, setOpenPopOver ] = useState( false );
	const ref = useRef();

	return (
		<div className={ `grigora-datetime-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-datetime-input__label">{ label }</div>
				<div>
					{ currentDate !== resetValue && (
						<GrigoraResetButton
							onClick={ () => {
								onChange( resetValue );
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
							{
								setOpenPopOver( true );
							}
						} }
					/>
				</div>
			</HStack>
			{ openPopOver && (
				<Popover
					placement="left-center"
					onClose={ () => {
						setOpenPopOver( false );
					} }
					anchorRef={ ref?.current }
					className={ `grigora-datetime-input__popover` }
				>
					<DateTimePicker
						currentDate={ currentDate }
						onChange={ onChange }
						is12Hour={ is12Hour }
						__nextRemoveHelpButton
						__nextRemoveResetButton
					/>
				</Popover>
			) }
		</div>
	);
}

export default GrigoraDateTimeInput;
