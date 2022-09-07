import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const { id, title, content, dismiss, titleTag, entranceAnimation, icon } = attributes;

	const wrapperClass = classnames( {
			'grigora-kit-notice': true,
			[ `block-id-${ id }` ]: id,
			[ `animateOnce` ]: entranceAnimation != 'none',
	});

	const titleClass =  classnames( {
			[ `notice-title-style` ]: true,
		} );

	const contentClass =  classnames( {
			[ `notice-content-style` ]: true,
		} );

	const iconClass = classnames( {
			[ `icon-container` ]: true,
		} );

	function renderSingleIcon() {
		if ( icon && SVGIcons[ icon ] ) {
			const icon_parsed = parse( SVGIcons[ icon ] );
			return icon_parsed;
		}
		return null;
	}

	return (
		<div { ...useBlockProps.save( { className: wrapperClass } ) }>
			<div className={ iconClass }>
				{ renderSingleIcon() }
			</div>
			<div class={`title-content`}>
				<div class={`title-container`}>
					<RichText.Content
						className={ titleClass }
						tagName={ titleTag }
						value={ title }
					/>
					<div class={`dismiss-icon-container`}>
						{dismiss === 'Dismissable' && parse(SVGIcons["x-circle"])}
					</div>
				</div>
				<RichText.Content
					className={ contentClass }
					value={ content }
				/>
			</div>
		</div>
	);
}
