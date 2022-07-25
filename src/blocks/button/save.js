import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';


export default function save( { attributes, className } ) {

	const {
		id,
		content,
		url,
		opensInNewTab,
		urlnofollow,
		urlnoreferrer,
		urlsponsored,
		align,
		hoverEffect,
		entranceAnimation,
		icon,
		iconPosition,

	} = attributes;


	const buttonWrapper = classnames( {
			"grigora-kit-button-wrapper": true,
			[ `grigora-button-align-${ align }` ]: align
		} );

	const buttonClass = classnames( {
		"grigora-kit-button": true,
		[ `block-id-${ id }` ]: id,
		"hover-effects": hoverEffect,
		[ `has-entrance-animation animateOnce` ]: entranceAnimation != "none"
	} );


	function renderSingleIcon( ){

		if(icon && SVGIcons[icon]){
			const icon_parsed = parse( SVGIcons[icon] );
	
			return(
				icon_parsed
			);
		}

		return null;

    }
	
	return (
		<div { ...useBlockProps.save( { className: buttonWrapper } ) }>
		<a 
		href={ url } 
		target={ (opensInNewTab ? "_blank" : "" )}
		rel={ `noopener${ (urlnofollow ?  " nofollow": "") }${ (urlnoreferrer? " noreferrer": "") }${ (urlsponsored? " sponsored": "") }` }
		className={`button-link`}
		>
			<div
				className={ buttonClass }
			>
				{ (icon && iconPosition == "left") && (
						<div class={`grigora-svg-icon`}>
							{ renderSingleIcon( ) }
						</div>
					)}
				<RichText.Content
					tagName={ "span" }
					identifier="content"
					value={ content }
				/>
				{ (icon && iconPosition == "right") && (
						<div class={`grigora-svg-icon`}>
							{ renderSingleIcon( ) }
						</div>
					)}
			</div>
		</a>
	</div>
	);
}
