import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

export default function save( { attributes, className } ) {
	const { 
		id,
		location,
		latitude,
		longitude,
		zoom,
		mapType,
		mapMode,
		height,
		maxWidth,
		language,
		
	 } = attributes;

	 const mapsWrapper = classnames( {
		'grigora-kit-maps': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div { ...useBlockProps.save( { className: mapsWrapper } ) }>
			<div>
				<iframe width={ maxWidth } 
				height={ height } 
				src={ `https://www.google.com/maps/embed/v1/${mapMode}?key=AIzaSyAeSWmYilRQSpfgQc_aZgCioDWdEIy4HdY&&${mapMode === 'place' ? ("q=" + location) : ('center=' + latitude +',' + longitude)}&zoom=${zoom}&maptype=${mapType}&language=${language}` }
				frameborder={"0"} 
				style={{border:0}}
				referrerpolicy={"no-referrer-when-downgrade"}
				allowfullscreen
				>	
				</iframe>
			</div>
		</div>
	);

}
