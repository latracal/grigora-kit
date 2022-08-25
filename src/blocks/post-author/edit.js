import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import { __, _x } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentControl,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	TabPanel as WPTabPanel,
	PanelBody,
	ToggleControl,
	ToolbarButton,
	Popover,
	Button,
	Icon,
	Tooltip,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import {
	alignLeft,
	alignRight,
	alignCenter,
	alignJustify,
	link,
	linkOff,
	arrowRight,
	arrowDown,
	arrowLeft,
} from '@wordpress/icons';
import { useState, useRef, useEffect } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';
import { displayShortcut } from '@wordpress/keycodes';

import parse from 'html-react-parser';

import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraFontFamilyInput from '@components/fontfamily-input';
import GrigoraColorGradientInput from '@components/colorgradient-input';
import GrigoraTextInput from '@components/text-input';
import InspectorTabs from '@components/inspector-tabs';
import SVGIcons from '@constants/icons.json';
import Googlefontloader from '@components/googlefontloader';
import GrigoraToggleInput from '@components/toggle-input';


export default function Edit( props ) {
	const { attributes, setAttributes, isSelected, context: { postType, postId, queryId } } = props;

	const { id, align, layout, author, showAvatar, showName, NameTag, nameLink, showBio } = attributes;

	const isDescendentOfQueryLoop = Number.isFinite( queryId );
	const { authorId, authorDetails, authors } = useSelect(
		( select ) => {
			const { getEditedEntityRecord, getUser, getUsers } =
				select( coreStore );
			const _authorId = getEditedEntityRecord(
				'postType',
				postType,
				postId
			)?.author;

			return {
				authorId: _authorId,
				authorDetails: _authorId ? getUser( _authorId ) : null,
				authors: getUsers( { who: 'authors' } ),
			};
		},
		[ postType, postId ]
	);

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'post-author' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'post-author' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-post-author': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __( 'Align left' ),
			align: 'start',
		},
		{
			icon: alignCenter,
			title: __( 'Align center' ),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __( 'Align right' ),
			align: 'end',
		},
	];

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 4 } paddingY={ 3 }>
			{ !! authors?.length && (
				<GrigoraSelectInput
					label={ __( 'Author', 'grigora-kit' ) }
					value={ author }
					options={  [
						{
							label: __( 'Current Author', 'grigora-kit' ),
							value: -1,
						},
					].concat(authors.map( ( { id, name } ) => {
						return {
							value: id,
							label: name,
						};
					} )) }
					resetValue={ -1 }
					onChange={ ( author ) =>
						setAttributes({ author }) }
				/>
			) }
			<GrigoraToggleInput
				label={ __( 'Show avatar', 'grigora-kit' ) }
				value={ showAvatar }
				onChange={ () =>
					setAttributes( { showAvatar: ! showAvatar } )
				}
				resetValue={ true }
			/>
			<GrigoraToggleInput
				label={ __( 'Show name', 'grigora-kit' ) }
				value={ showName }
				onChange={ () =>
					setAttributes( { showName: ! showName } )
				}
				resetValue={ true }
			/>
			{ showName && (
				<>
					<GrigoraSelectInput
					label={ __( 'HTML Tag', 'grigora-kit' ) }
					value={ NameTag }
					options={ [
						'h1',
						'h2',
						'h3',
						'h4',
						'h5',
						'h6',
						'p',
						'span',
						'div',
					].map( function ( item ) {
						return {
							label: item,
							value: item,
						};
					} ) }
					resetValue={ "h3" }
					onChange={ ( NameTag ) =>
						setAttributes({ NameTag }) }
					/>
					<GrigoraSelectInput
					label={ __( 'Link', 'grigora-kit' ) }
					value={ nameLink }
					options={ [
						{
							label: "None",
							value: "none"
						},
						{
							label: "Website",
							value: "website"
						},
						{
							label: "Posts Archive",
							value: "postsarchive"
						},
					] }
					resetValue={ "none" }
					onChange={ ( nameLink ) =>
						setAttributes({ nameLink }) }
					/>
				</>
			) }
			<GrigoraToggleInput
				label={ __( 'Show bio', 'grigora-kit' ) }
				value={ showBio }
				onChange={ () =>
					setAttributes( { showBio: ! showBio } )
				}
				resetValue={ true }
			/>
			<GrigoraSelectInput
					label={ __( 'Layout', 'grigora-kit' ) }
					value={ layout }
					options={ [
						{
							label: "Left",
							value: "left"
						},
						{
							label: "Above",
							value: "above"
						},
						{
							label: "Right",
							value: "right"
						},
					] }
					resetValue={ "left" }
					onChange={ ( layout ) =>
						setAttributes({ layout }) }
					/>
				</Spacer>
			</>
		);
	}

	function stylesSettings() {
		return (
			<></>
		);
	}

	function advancedSettings() {
		return (
			<></>
		);
	}

	return (
		<div { ...blockProps }>
			<InspectorControls>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={ DEFAULT_ALIGNMENT_CONTROLS }
				/>
			</BlockControls>
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
			<style>
				{ `
				.block-id-${ id } {
				}
				` }
			</style>
			{ showAvatar && authorDetails && (
					<div className="wp-block-post-author__avatar">
						<img
							width={ attributes.avatarSize }
							src={
								authorDetails.avatar_urls[
									attributes.avatarSize
								]
							}
							alt={ authorDetails.name }
						/>
					</div>
				) }
				<div className="wp-block-post-author__content">
					<p className="wp-block-post-author__name">
						{ authorDetails?.name || __( 'Post Author' ) }
					</p>
					{ showBio && (
						<p
							className="wp-block-post-author__bio"
							dangerouslySetInnerHTML={ {
								__html: authorDetails?.description,
							} }
						/>
					) }
				</div>
		</div>
	);
}
