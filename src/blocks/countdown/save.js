import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import parse from 'html-react-parser';

export default function save( { attributes, className } ) {
	const {
		id,
		countdownDate,
		divider,
		dividerCharacter,
		format,
		hideDays,
		hideHours,
		hideMinutes,
		dayLabel,
		orientation,
		hourLabel,
		minuteLabel,
		secondLabel,
		completedState,
		countdownOnComplete,
		onCompleteURL,
		numPrefix,
		numSuffix,

	} = attributes;

	const counterWrapper = classnames( {
		'grigora-kit-countdown': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: counterWrapper } ) }
			data-id={ `block-id-${ id }-span` }
			data-date={countdownDate}
			data-prefix={ numPrefix }
			data-suffix={ numSuffix }
			data-divider={ divider }
			data-dividercharacter={ dividerCharacter }
			data-format={ format }
			data-hidedays={ hideDays }
			data-hidehours={ hideHours }
			data-hideminutes={ hideMinutes }
			data-daylabel={ dayLabel }
			data-orientation={ orientation }
			data-hourlabel={ hourLabel }
			data-minutelabel={ minuteLabel }
			data-secondlabel={ secondLabel }
			data-completedstate={ completedState }
			data-oncomplete={ countdownOnComplete }
			data-oncompleteurl={ onCompleteURL }
		>
			<span id={ `block-id-${ id }-span` }></span>
			{/* {completedState && (<div>
				<InnerBlocks.Content />
			</div>)} */}
		</div>
	);
}
