import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	TabPanel as WPTabPanel,
	PanelBody,
	__experimentalHStack as HStack,
	__experimentalNumberControl as NumberControl,
	__experimentalSpacer as Spacer,
	
} from '@wordpress/components';
import InspectorTabs from '@components/inspector-tabs';
import { useState, useEffect } from '@wordpress/element';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import parse from 'html-react-parser';

import GrigoraTextInput from '@components/text-input';
import GrigoraToggleInput from '@components/toggle-input';
import GrigoraSelectInput from '@components/select-input';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const { 
		id,
		required,
		showLabel,
		label,
		multiple,
		ariaDescription,
		autoFill,
		helpText,
		options
	} = attributes;

	const buttonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16"> <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path> </svg>'

	const autoCompleteOptions = [
		'email',
		'name',
		'username',
		'new-password',
		'current-password',
		'one-time-code',
		'organization-title',
		'organization',
		'street-address',
		'country',
		'country-name',
		'postal-code',
		'cc-name',
		'cc-exp',
		'cc-csc',
		'cc-type',
		'transaction-currency',
		'transaction-amount',
		'bday',
		'language',
		'sex',
		'tel',
		'tel-extension',
		'url',
		'photo',
		'impp'
	]

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'form-select-input' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'form-select-input' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-form-select-input': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	function generalSettings() {
		return (
			<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

				<GrigoraToggleInput
					label={ __( 'Required', 'grigora-kit' ) }
					value={ required }
					onChange={ ( required ) =>
						setAttributes( { required } )
					}
				/>

				<GrigoraToggleInput
					label={ __( 'Show Label', 'grigora-kit' ) }
					value={ showLabel }
					onChange={ ( showLabel ) =>
						setAttributes( { showLabel } )
					}
				/>

				<GrigoraTextInput
					label={ __( 'Label', 'grigora-kit' ) }
					onChange={ ( label ) => setAttributes( { label } ) }
					value={ label }
					resetValue={ '' }
				/>

				<GrigoraToggleInput
					label={ __( 'Multiple', 'grigora-kit' ) }
					value={ multiple }
					onChange={ ( multiple ) =>
						setAttributes( { multiple } )
					}
				/>

				<br/>

				<PanelBody
					title={ __( 'Options', 'grigora-kit' ) }
					initialOpen={ false }
				>
					{
						options.map( (item, index) => {
							return(
								<PanelBody title={ __( `Option-${index+1}`, 'grigora-kit' ) }
								initialOpen={ false }>

									<GrigoraTextInput
										label={ __( 'Label', 'grigora-kit' ) }
										onChange={ ( label ) => { 
											let currOptions = [...options]
											currOptions[index].label = label
											setAttributes( { options: currOptions } )
										} }
										value={ item.label }
										resetValue={ '' }
									/>

									<GrigoraTextInput
										label={ __( 'Value', 'grigora-kit' ) }
										onChange={ ( value ) => { 
											let currOptions = [...options]
											currOptions[index].value = value
											setAttributes( { options: currOptions } )
										} }
										value={ item.value }
										resetValue={ '' }
									/>

								</PanelBody>
							)
						})
					}
					<br/>
					<div className='forms-button-container'>
						<div onClick={() => setAttributes({ options: [...options, {label: '', value: ''} ]}) }>
							{ parse( buttonIcon ) }
						</div>
					</div>
				</PanelBody>

				<br/>

				<GrigoraTextInput
					label={ __( 'Aria Description', 'grigora-kit' ) }
					onChange={ ( ariaDescription ) => setAttributes( { ariaDescription } ) }
					value={ ariaDescription }
					resetValue={ '' }
				/>

				<GrigoraTextInput
					label={ __( 'Help', 'grigora-kit' ) }
					onChange={ ( helpText ) => setAttributes( { helpText } ) }
					value={ helpText }
					resetValue={ '' }
				/>

				<GrigoraSelectInput
					label={ __( 'Auto Fill', 'grigora-kit' ) }
					labelPosition="side"
					value={ autoFill }
					onChange={ ( autoFill ) =>
						setAttributes( { autoFill } )
					}
					resetValue={ 'email' }
					options={ autoCompleteOptions.map( function ( item ) {
						return {
							label: item,
							value: item,
						};
					} ) }
				/>
				
			</Spacer>
		);
	}

	function stylesSettings() { 
		return (
			<>
			</>
		)
	}

	function advancedSettings() { 
		return (
			<>
			</>
		)
	}
	
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<InspectorTabs className="grigora-tabs-container">
					<TabList className="tabs-header">
						<Tab className="general">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-pencil-fill"
								viewBox="0 0 16 16"
							>
								<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
							</svg>
							{ __( 'General', 'grigora-kit' ) }
						</Tab>
						<Tab className="styles">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-palette-fill"
								viewBox="0 0 16 16"
							>
								<path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
							</svg>
							{ __( 'Styles', 'grigora-kit' ) }
						</Tab>
						<Tab className="advanced">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-gear-fill"
								viewBox="0 0 16 16"
							>
								<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
							</svg>
							{ __( 'Advanced', 'grigora-kit' ) }
						</Tab>
					</TabList>

					<TabPanel>{ generalSettings() }</TabPanel>
					<TabPanel>{ stylesSettings() }</TabPanel>
					<TabPanel>{ advancedSettings() }</TabPanel>
				</InspectorTabs>
			</InspectorControls>
			<div className='main-container'>
				<label for={id}> {showLabel ? ( label + ' ' + ( required ? String.fromCodePoint(0x0002A) : '') ) : ''} </label>
				<select
					id={id}
					name={`select-input-${id}`}
					autoComplete={autoFill}
					required={required}
					multiple={multiple}
				>
					{options.map( ( item ) => {
						return(
							<option value={item.value}> { item.label } </option>
						)
					})}
				</select>
				{helpText && <p> {helpText} </p> }
			</div>
		</div>
	);
}
