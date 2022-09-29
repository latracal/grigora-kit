import {
	Icon,
	Button,
	Popover,
	RangeControl,
	__experimentalHStack as HStack,
	SelectControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';

import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';
import isEmpty from '@helpers/objEmpty';
import Notice from '@components/notice';

function MouseMovementAnimationControl( {
	value,
	onChange,
	resetValue = { direction: 'opposite', displacement: 20 },
} ) {
	const [ openPopOver, setOpenPopOver ] = useState( false );
	const [ openPopOver2, setOpenPopOver2 ] = useState( false );
	const [ D2Movement, setD2Movement ] = useState(
		value.D2Movement ? value.D2Movement : {}
	);
	const [ D3Movement, setD3Movement ] = useState(
		value.D3Movement ? value.D3Movement : {}
	);

	const ref = useRef();

	useEffect( () => {
		onChange( { D2Movement, D3Movement } );
	}, [ D2Movement, D3Movement ] );

	return (
		<div className={ `grigora-mousemovement-input` }>
			<Notice
					text={ __(
						'The effect might be laggy in Block Editor, but it works smoothly in the frontend.',
						'grigora-kit'
					) }
					status={ 'success' }
				/>
			<HStack spacing={ 4 }>
				<div className="grigora-mousemovement-input__label">
					{ __( '2D Movement', 'grigora-kit' ) }
				</div>
				<div>
					{ ! deepEqualObj( D2Movement, {} ) && (
						<Button
							isSmall
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
											<path
												fill-rule="evenodd"
												d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
											/>
											<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
										</svg>
									) }
								/>
							}
							onClick={ () => {
								setD2Movement( {} );
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
								if ( isEmpty( D2Movement ) ) {
									setD2Movement( {
										direction: 'opposite',
										displacement: 35,
									} );
								}
								setOpenPopOver( true );
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
							className={ `grigora-mousemovement-input__popover` }
						>
							<SelectControl
								label={ __( 'Direction: ', 'grigora-kit' ) }
								labelPosition="side"
								onChange={ ( newDirection ) =>
									setD2Movement( {
										...D2Movement,
										direction: newDirection,
									} )
								}
								value={ D2Movement.direction }
								options={ [
									{
										label: 'Opposite',
										value: 'opposite',
									},
									{
										label: 'Same',
										value: 'same',
									},
								] }
							/>
							<RangeControl
								value={ D2Movement.displacement }
								onChange={ ( value ) =>
									setD2Movement( {
										...D2Movement,
										displacement: value,
									} )
								}
								min={ 0 }
								max={ 100 }
								withInputField={ true }
								label={ __( 'Displacement', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
						</Popover>
					) }
				</div>
			</HStack>
			<br></br>
			<HStack spacing={ 4 }>
				<div className="grigora-mousemovement-input__label">
					{ __( '3D Movement', 'grigora-kit' ) }
				</div>
				<div>
					{ ! deepEqualObj( D3Movement, {} ) && (
						<Button
							isSmall
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
											<path
												fill-rule="evenodd"
												d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
											/>
											<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
										</svg>
									) }
								/>
							}
							onClick={ () => {
								setD3Movement( {} );
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
								if ( isEmpty( D3Movement ) ) {
									setD3Movement( {
										direction: 'same',
										displacement: 20,
									} );
								}
								setOpenPopOver2( true );
							}
						} }
					/>
					{ openPopOver2 && (
						<Popover
							placement="left-center"
							onClose={ () => {
								setOpenPopOver2( false );
							} }
							anchorRef={ ref?.current }
							className={ `grigora-mousemovement-input__popover` }
						>
							<SelectControl
								label={ __( 'Direction: ', 'grigora-kit' ) }
								labelPosition="side"
								onChange={ ( newDirection ) =>
									setD3Movement( {
										...D3Movement,
										direction: newDirection,
									} )
								}
								value={ D3Movement.direction }
								options={ [
									{
										label: 'Opposite',
										value: 'opposite',
									},
									{
										label: 'Same',
										value: 'same',
									},
								] }
							/>
							<RangeControl
								value={ D3Movement.displacement }
								onChange={ ( value ) =>
									setD3Movement( {
										...D3Movement,
										displacement: value,
									} )
								}
								min={ 0 }
								max={ 100 }
								withInputField={ true }
								label={ __( 'Displacement', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
						</Popover>
					) }
				</div>
			</HStack>
			<br></br>
		</div>
	);
}

export default MouseMovementAnimationControl;
