import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes } ) {
	const { id, title, content, dismiss, titleTag, entranceAnimation, icon } = attributes;

	const wrapperClass = classnames( {
			'grigora-kit-notice': true,
			[ `block-id-${ id }` ]: id,
			[ `animateOnce` ]: entranceAnimation != 'none',
	});

	function renderSingleIcon() {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );
			return icon_parsed;
		}
		return null;
	}

	return (
		<div { ...useBlockProps.save( { className: wrapperClass } ) }>
			<div class="main-block main-style">
				<div class="icon-container icon-props">
					{ renderSingleIcon() }
				</div>
				<div class="title-content">
					<div class="title-container">
						<RichText.Content
							className='notice-title-style title-content-props title-style'
							tagName={ titleTag }
							value={ title }
						/>
						<div class="dismiss-icon-container dismiss-icon-props">
							{dismiss === 'Dismissable' && parse(SVGIcons["x-circle"])}
						</div>
					</div>
					<RichText.Content
						className='notice-content-style title-content-props'
						value={ content }
						tagName={ 'div' }
					/>
				</div>
			</div>
		</div>
	);
}
