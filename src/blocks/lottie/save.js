import classnames from 'classnames';


import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
		autoplay,
		controls,
		count,
		direction,
		hover,
		loop,
		mode,
		speed,
		jsonSrc,
		heightAnimation,
		widthAnimation,
		backgroundColor,
		enqueue,
		
	} = attributes;

	const lottieWrapper = classnames( {
		'grigora-kit-lottie': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: lottieWrapper } ) }
		>
			{!enqueue && <script src={"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"}></script>}
			<lottie-player src={jsonSrc}  background={backgroundColor}  speed={speed}  style={{width: widthAnimation, height: heightAnimation}}
			count={count} mode={mode} 
			direction={direction}
			{ ...( loop && { loop: true } ) }
			{ ...( autoplay && { autoplay: true } ) }
			{ ...( hover && { hover: true } ) }
			{ ...( controls && { controls: true } ) }
			> 

			</lottie-player>
		</div>
	);
}
