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
		apiKey,
		mapType,
		mapMode,
		height,
		maxWidth,
		language,
		entranceAnimation
		
	 } = attributes;

	 const mapsWrapper = classnames( {
		'grigora-kit-maps': true,
		[ `block-id-${ id }` ]: id,
	} );

	const mapsClass = classnames( {
		'grigora-kit-maps': true,
		[ `block-id-${ id }` ]: id,
		[ `animateOnce` ]: entranceAnimation != 'none',
	} );

	return (
		<div { ...useBlockProps.save( { className: mapsWrapper } ) }>
			<div className={ mapsClass }>
				<iframe width={parseInt(maxWidth) > 583 ? 583 : parseInt(maxWidth)} 
				height={ height } 
				src={ `https://www.google.com/maps/embed/v1/${mapMode}?key=${apiKey}&&${mapMode === 'place' ? ("q=" + location) : ('center=' + latitude +',' + longitude)}&zoom=${zoom}&maptype=${mapType}&language=${language}` }
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
