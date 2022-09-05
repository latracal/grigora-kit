import {
	Icon,
	Button,
	Popover,
	RangeControl,
	__experimentalHStack as HStack,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';

import deepEqualObj from '@helpers/compareObj';
import isEmpty from '@helpers/objEmpty';

function ScrollMovementAnimationControl( {
	value,
	onChange,
} ) {
	
	const [ openPopOver, setOpenPopOver ] = useState( false );
	const [ openPopOver2, setOpenPopOver2 ] = useState( false );
	const [ openPopOver3, setOpenPopOver3 ] = useState( false );
	const [ openPopOver4, setOpenPopOver4 ] = useState( false );
	const [ openPopOver5, setOpenPopOver5 ] = useState( false );

	const [ vertical, setVertical ] = useState( value.vertical ? value.vertical : {} );
	const [ horizontal, setHorizontal ] = useState( value.horizontal ? value.horizontal : {} );
	const [ opacity, setOpacity ] = useState( value.opacity ? value.opacity : {} );
	const [ blur, setBlur ] = useState( value.blur ? value.blur : {} );
	const [ scale, setScale ] = useState( value.scale ? value.scale : {} );

	const [ hideDesktop, setHideDesktop ] = useState( value.hideDesktop ? value.hideDesktop : false );
	const [ hideTablet, setHideTablet ] = useState( value.hideTablet ? value.hideTablet : false );
	const [ hideMobile, setHideMobile ] = useState( value.hideMobile ? value.hideMobile : false );


	const ref = useRef();

	useEffect( () => {
		onChange( { vertical, horizontal, opacity, blur, scale, hideDesktop, hideTablet, hideMobile } );
	}, [ vertical, horizontal, opacity, blur, scale, hideDesktop, hideTablet, hideMobile ] );

	return (
		<div className={ `grigora-scrollmovement-input` }>
			{/* Vertical */}
			<HStack spacing={ 4 }>
				<div className="grigora-scrollmovement-input__label">{ __('Vertical Movement', 'grigora-kit') }</div>
				<div>
					{ !deepEqualObj( vertical, {} ) && (
					<Button isSmall icon={ <Icon
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
					/> } onClick={ () => {
						setVertical( {} );
					} } />
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
								if(isEmpty(vertical)){
									setVertical( {from: 0, fromY: 100, to: 100, toY: -100} );
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
							className={ `grigora-scrollmovement-input__popover` }
						>
							<div className='inner-section'>
							<RangeControl
								value={ vertical.from }
								onChange={ ( value ) => setVertical( { ...vertical, from: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'From Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ vertical.fromY }
								onChange={ ( value ) => setVertical( { ...vertical, fromY: value } ) }
								min={ -100 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'From Displacement (Y-axis)', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
							<hr></hr>
							<div className='inner-section'>
							<RangeControl
								value={ vertical.to }
								onChange={ ( value ) => setVertical( { ...vertical, to: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'To Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ vertical.toY }
								onChange={ ( value ) => setVertical( { ...vertical, toY: value } ) }
								min={ -100 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'To Displacement (Y-axis)', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
						</Popover>
					) }
				</div>
			</HStack>
			<br></br>
			{/* Horizontal */}
			<HStack spacing={ 4 }>
				<div className="grigora-scrollmovement-input__label">{ __('Horizontal Movement', 'grigora-kit') }</div>
				<div>
					{ !deepEqualObj( horizontal, {} ) && (
					<Button isSmall icon={ <Icon
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
					/> } onClick={ () => {
						setHorizontal( {} );
					} } />
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
								if(isEmpty(horizontal)){
									setHorizontal( {from: 0, fromY: 100, to: 100, toY: -100} );
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
							className={ `grigora-scrollmovement-input__popover` }
						>
							<div className='inner-section'>
							<RangeControl
								value={ horizontal.from }
								onChange={ ( value ) => setHorizontal( { ...horizontal, from: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'From Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ horizontal.fromY }
								onChange={ ( value ) => setHorizontal( { ...horizontal, fromY: value } ) }
								min={ -100 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'From Displacement (X-axis)', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
							<hr></hr>
							<div className='inner-section'>
							<RangeControl
								value={ horizontal.to }
								onChange={ ( value ) => setHorizontal( { ...horizontal, to: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'To Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ horizontal.toY }
								onChange={ ( value ) => setHorizontal( { ...horizontal, toY: value } ) }
								min={ -100 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'To Displacement (X-axis)', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
						</Popover>
					) }
				</div>
			</HStack>
			<br></br>
			{/* Opacity */}
			<HStack spacing={ 4 }>
				<div className="grigora-scrollmovement-input__label">{ __('Opacity', 'grigora-kit') }</div>
				<div>
					{ !deepEqualObj( opacity, {} ) && (
					<Button isSmall icon={ <Icon
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
					/> } onClick={ () => {
						setOpacity( {} );
					} } />
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
								if(isEmpty(opacity)){
									setOpacity( {from: 0, fromY: 0.5, to: 100, toY: 1} );
								}
								setOpenPopOver3( true );
							}
						} }
					/>
					{ openPopOver3 && (
						<Popover
							placement="left-center"
							onClose={ () => {
								setOpenPopOver3( false );
							} }
							anchorRef={ ref?.current }
							className={ `grigora-scrollmovement-input__popover` }
						>
							<div className='inner-section'>
							<RangeControl
								value={ opacity.from }
								onChange={ ( value ) => setOpacity( { ...opacity, from: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'From Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ opacity.fromY }
								onChange={ ( value ) => setOpacity( { ...opacity, fromY: value } ) }
								min={ 0.1 }
								max={ 1 }
								step={ 0.05 }
								withInputField={ false }
								label={ __( 'From Opacity', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
							<hr></hr>
							<div className='inner-section'>
							<RangeControl
								value={ opacity.to }
								onChange={ ( value ) => setOpacity( { ...opacity, to: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'To Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ opacity.toY }
								onChange={ ( value ) => setOpacity( { ...opacity, toY: value } ) }
								min={ 0.1 }
								max={ 1 }
								step={ 0.05 }
								withInputField={ false }
								label={ __( 'To Opacity', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
						</Popover>
					) }
				</div>
			</HStack>
			<br></br>
			{/* Blur */}
			<HStack spacing={ 4 }>
				<div className="grigora-scrollmovement-input__label">{ __('Blur', 'grigora-kit') }</div>
				<div>
					{ !deepEqualObj( blur, {} ) && (
					<Button isSmall icon={ <Icon
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
					/> } onClick={ () => {
						setBlur( {} );
					} } />
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
								if(isEmpty(blur)){
									setBlur( {from: 90, fromY: 10, to: 60, toY: 0 } );
								}
								setOpenPopOver4( true );
							}
						} }
					/>
					{ openPopOver4 && (
						<Popover
							placement="left-center"
							onClose={ () => {
								setOpenPopOver4( false );
							} }
							anchorRef={ ref?.current }
							className={ `grigora-scrollmovement-input__popover` }
						>
							<div className='inner-section'>
							<RangeControl
								value={ blur.from }
								onChange={ ( value ) => setBlur( { ...blur, from: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'From Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ blur.fromY }
								onChange={ ( value ) => setBlur( { ...blur, fromY: value } ) }
								min={ 0 }
								max={ 10 }
								step={ 0.1 }
								withInputField={ false }
								label={ __( 'From Blur', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
							<hr></hr>
							<div className='inner-section'>
							<RangeControl
								value={ blur.to }
								onChange={ ( value ) => setBlur( { ...blur, to: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'To Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ blur.toY }
								onChange={ ( value ) => setBlur( { ...blur, toY: value } ) }
								min={ 0 }
								max={ 10 }
								step={ 0.1 }
								withInputField={ false }
								label={ __( 'To Blur', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
						</Popover>
					) }
				</div>
			</HStack>
			<br></br>
			{/* Scale */}
			<HStack spacing={ 4 }>
				<div className="grigora-scrollmovement-input__label">{ __('Scale', 'grigora-kit') }</div>
				<div>
					{ !deepEqualObj( scale, {} ) && (
					<Button isSmall icon={ <Icon
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
					/> } onClick={ () => {
						setScale( {} );
					} } />
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
								if(isEmpty(scale)){
									setScale( {from: 0, fromY: 0.7, to: 100, toY: 1.5} );
								}
								setOpenPopOver5( true );
							}
						} }
					/>
					{ openPopOver5 && (
						<Popover
							placement="left-center"
							onClose={ () => {
								setOpenPopOver5( false );
							} }
							anchorRef={ ref?.current }
							className={ `grigora-scrollmovement-input__popover` }
						>
							<div className='inner-section'>
							<RangeControl
								value={ scale.from }
								onChange={ ( value ) => setScale( { ...scale, from: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'From Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ scale.fromY }
								onChange={ ( value ) => setScale( { ...scale, fromY: value } ) }
								min={ 0 }
								max={ 1 }
								step={ 0.05 }
								withInputField={ false }
								label={ __( 'From Scale', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
							<hr></hr>
							<div className='inner-section'>
							<RangeControl
								value={ scale.to }
								onChange={ ( value ) => setScale( { ...scale, to: value } ) }
								min={ 0 }
								max={ 100 }
								withInputField={ false }
								label={ __( 'To Viewport', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
								marks={[
									{
									  label: __( 'Bottom', 'grigora-kit' ),
									  value: 0
									},
									{
									  label: __( 'Top', 'grigora-kit' ),
									  value: 100
									}
								  ]}
							/>
							<RangeControl
								value={ scale.toY }
								onChange={ ( value ) => setScale( { ...scale, toY: value } ) }
								min={ 0 }
								max={ 1 }
								step={ 0.05 }
								withInputField={ false }
								label={ __( 'To Scale', 'grigora-kit' ) }
								className={ `grigora-range-input__blur` }
							/>
							</div>
						</Popover>
					) }
				</div>
			</HStack>
			<br></br>
			<ToggleControl
				label={ __( 'Hide Desktop', 'grigora-kit' ) }
				checked={ !! hideDesktop }
				onChange={ () =>
					setHideDesktop( ! hideDesktop )
				}
			/>
			<ToggleControl
				label={ __( 'Hide Tablet', 'grigora-kit' ) }
				checked={ !! hideTablet }
				onChange={ () =>
					setHideTablet( ! hideTablet )
				}
			/>
			<ToggleControl
				label={ __( 'Hide Mobile', 'grigora-kit' ) }
				checked={ !! hideMobile }
				onChange={ () =>
					setHideMobile( ! hideMobile )
				}
			/>
		</div>
		
	);
}

export default ScrollMovementAnimationControl;
