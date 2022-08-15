import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

export default function save( { attributes, className } ) {
	const {
		id,
		countStart,
		countEnd,
		countTime,
		numFormat,
		numPrefix,
		numSuffix,
		numTSeparator,
	} = attributes;

	const counterWrapper = classnames( {
		'grigora-kit-countdown': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: counterWrapper } ) }
			data-id={ `block-id-${ id }-span` }
			data-start={ countStart }
			data-end={ countEnd }
			data-time={ countTime }
			data-prefix={ numPrefix }
			data-suffix={ numSuffix }
			data-tseparator={ numTSeparator }
			data-format={ numFormat }
		>
			<span id={ `block-id-${ id }-span` }>{ countStart }</span>
		</div>
	);
}
