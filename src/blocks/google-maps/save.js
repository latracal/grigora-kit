import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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
		entranceAnimation,
	} = attributes;

	const GRIGORA_MAPS_API = 'AIzaSyAeSWmYilRQSpfgQc_aZgCioDWdEIy4HdY';

	const mapsWrapper = classnames( {
		'grigora-kit-google-maps': true,
		[ `block-id-${ id }` ]: id,
		[ `animateOnce` ]: entranceAnimation != 'none',
	} );

	return (
		<div { ...useBlockProps.save( { className: mapsWrapper } ) }>
			<iframe
				width={ '100%' }
				height={ height }
				src={ `https://www.google.com/maps/embed/v1/${ mapMode }?key=${
					apiKey ? apiKey : GRIGORA_MAPS_API
				}&&${
					mapMode === 'place'
						? 'q=' + location
						: 'center=' + latitude + ',' + longitude
				}&zoom=${ zoom }&maptype=${ mapType }&language=${ language }` }
				frameborder={ '0' }
				style={ { maxWidth: maxWidth + 'px' } }
				referrerpolicy={ 'no-referrer-when-downgrade' }
				allowfullscreen
			></iframe>
		</div>
	);
}
