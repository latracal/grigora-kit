/**
 * WordPress dependencies
 */
import { Path, SVG, TextControl, Popover, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { insertObject, useAnchorRef } from '@wordpress/rich-text';
import {
	MediaUpload,
	RichTextToolbarButton,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { keyboardReturn } from '@wordpress/icons';

import IconPicker from '@components/icon-picker';
import SVGIcons from '@constants/icons.json';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

const name = 'grigora-kit/icon';
const title = __( 'Inline SVG Icon', 'grigora-kit' );

export const icon = {
	name,
	title,
	keywords: [ __( 'icon', 'grigora-kit' ), __( 'svg', 'grigora-kit' ) ],
	object: true,
	className: 'grigora-kit-icon',
	tagName: 'span',

	attributes: {
		className: 'class',
		style: 'style',
		url: 'src',
		alt: 'alt',
		icon: 'data-icon',
		iconSVG: 'html',
	},
	edit: Edit,
};

function InlineUI( { value, onChange, activeObjectAttributes, contentRef } ) {
	const { style } = activeObjectAttributes;
	const [ width, setWidth ] = useState( style?.replace( /\D/g, '' ) );
	const anchorRef = useAnchorRef( {
		ref: contentRef,
		value,
		settings: icon,
	} );

	return (
		<Popover
			position="bottom center"
			focusOnMount={ false }
			anchorRef={ anchorRef }
			className="block-editor-format-toolbar__icon-popover"
		>
			<form
				className="block-editor-format-toolbar__icon-container-content"
				onSubmit={ ( event ) => {
					const newReplacements = value.replacements.slice();

					newReplacements[ value.start ] = {
						type: name,
						attributes: {
							...activeObjectAttributes,
							style: `width: ${ width }px;`,
						},
					};

					onChange( {
						...value,
						replacements: newReplacements,
					} );

					event.preventDefault();
				} }
			>
				<TextControl
					className="block-editor-format-toolbar__icon-container-value"
					type="number"
					label={ __( 'Width', 'grigora-kit' ) }
					value={ width }
					min={ 1 }
					onChange={ ( newWidth ) => setWidth( newWidth ) }
				/>
				<Button
					icon={ keyboardReturn }
					label={ __( 'Apply', 'grigora-kit' ) }
					type="submit"
				/>
			</form>
		</Popover>
	);
}

function Edit( {
	value,
	onChange,
	onFocus,
	isObjectActive,
	activeObjectAttributes,
	contentRef,
} ) {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ selectedIcon, setSelectedIcon ] = useState(
		activeObjectAttributes.icon
	);

	function openModal() {
		setIsModalOpen( true );
	}

	function closeModal() {
		setIsModalOpen( false );
	}

	function getHTML( icon ) {
		if ( icon && SVGIcons[ icon ] ) {
			return SVGIcons[ icon ];
		}

		return null;
	}

	function changeIcon( newIcon ) {
		setSelectedIcon( newIcon );
		const newReplacements = value.replacements.slice();
		newReplacements[ value.start ] = {
			type: name,
			attributes: {
				...activeObjectAttributes,
				icon: newIcon,
			},
		};

		// onChange( {
		//     ...value,
		//     replacements: newReplacements,
		// } );

		onChange(
			insertObject(
				value,
				{
					type: name,
					attributes: {
						className: `wp-image`,
						style: `width: ${ Math.min( 20, 150 ) }px;`,
						url: 'http://127.0.0.1/grigora/wp-content/uploads/2022/08/2151704_bakery_farm_field_ranching_rye_icon-2-1-1-1.webp',
						alt: 'image',
						iconSVG: getHTML( newIcon ),
					},
				},
				value.start,
				value.end
			)
		);
		onFocus();
	}

	return (
		<>
			{ isModalOpen && (
				<Popover
					position="bottom center"
					className="grigora-kit-gradient-popover"
					onClose={ closeModal }
				>
					<div className="grigora-kit-gradient-popover-contents">
						<IconPicker
							activeIcon={ selectedIcon }
							setActiveIcon={ changeIcon }
						/>
					</div>
				</Popover>
			) }
			<RichTextToolbarButton
				icon={
					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<Path d="M4 18.5h16V17H4v1.5zM16 13v1.5h4V13h-4zM5.1 15h7.8c.6 0 1.1-.5 1.1-1.1V6.1c0-.6-.5-1.1-1.1-1.1H5.1C4.5 5 4 5.5 4 6.1v7.8c0 .6.5 1.1 1.1 1.1zm.4-8.5h7V10l-1-1c-.3-.3-.8-.3-1 0l-1.6 1.5-1.2-.7c-.3-.2-.6-.2-.9 0l-1.3 1V6.5zm0 6.1l1.8-1.3 1.3.8c.3.2.7.2.9-.1l1.5-1.4 1.5 1.4v1.5h-7v-.9z" />
					</SVG>
				}
				title={ title }
				onClick={ openModal }
				isActive={ isObjectActive }
			/>

			{ /* <MediaUploadCheck>
             <RichTextToolbarButton
                 icon={
                     <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                         <Path d="M4 18.5h16V17H4v1.5zM16 13v1.5h4V13h-4zM5.1 15h7.8c.6 0 1.1-.5 1.1-1.1V6.1c0-.6-.5-1.1-1.1-1.1H5.1C4.5 5 4 5.5 4 6.1v7.8c0 .6.5 1.1 1.1 1.1zm.4-8.5h7V10l-1-1c-.3-.3-.8-.3-1 0l-1.6 1.5-1.2-.7c-.3-.2-.6-.2-.9 0l-1.3 1V6.5zm0 6.1l1.8-1.3 1.3.8c.3.2.7.2.9-.1l1.5-1.4 1.5 1.4v1.5h-7v-.9z" />
                     </SVG>
                 }
                 title={ title }
                 onClick={ openModal }
                 isActive={ isObjectActive }
             />
             { isModalOpen && (
                 <MediaUpload
                     allowedTypes={ ALLOWED_MEDIA_TYPES }
                     onSelect={ ( { id, url, alt, width: imgWidth } ) => {
                         closeModal();
                         onChange(
                             insertObject( value, {
                                 type: name,
                                 attributes: {
                                     className: `wp-image-${ id }`,
                                     style: `width: ${ Math.min(
                                         imgWidth,
                                         150
                                     ) }px;`,
                                     url,
                                     alt,
                                 },
                             } )
                         );
                         onFocus();
                     } }
                     onClose={ closeModal }
                     render={ ( { open } ) => {
                         open();
                         return null;
                     } }
                 />
             ) }
             { isObjectActive && (
                 <InlineUI
                     value={ value }
                     onChange={ onChange }
                     activeObjectAttributes={ activeObjectAttributes }
                     contentRef={ contentRef }
                 />
             ) }
         </MediaUploadCheck> */ }
			{ isObjectActive && (
				<InlineUI
					value={ value }
					onChange={ onChange }
					activeObjectAttributes={ activeObjectAttributes }
					contentRef={ contentRef }
				/>
			) }
		</>
	);
}
