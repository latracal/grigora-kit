/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {

	const {
		attributes: { title, mediaID, mediaURL },
		setAttributes,
	} = props;

	const onSelectImage = ( media ) => {
		setAttributes( {
			mediaURL: media.url,
			mediaID: media.id,
		} );
	};

	return (
		<div {...useBlockProps()}>
			<p>
				{__('Add / Select Images', 'grigora-kit')}
			</p>
			
			<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes="image"
					value={ mediaID }
					render={ ( { open } ) => (
						<Button
							className={
								mediaID ? 'image-button' : 'button button-large'
							}
							onClick={ open }
						>
							{ ! mediaID ? (
								__( 'Upload Image', 'grigora-kit' )
							) : (
								<img
									src={ mediaURL }
									alt={ __(
										'Image',
										'grigora-kit'
									) }
								/>
							) }
						</Button>
					) }
				/>
		</div>
	);
}
