import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
		codeText,
		language,
		showLineNumbers,
		themePrism,
		fontSize,
		wrapCode,
		containerMaxHeight,
		containerWidth,
		highlightText,
	} = attributes;

	const codeWrapper = classnames( {
		'grigora-kit-code': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: codeWrapper } ) }
		>
			 <script src={grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/prism-core.js'}></script>
			 <script src={grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/' + language + '.min.js'}></script>
			 {showLineNumbers && <script src={grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/plugin/line-number/line-number.min.js'}></script>}
			 {highlightText && <script src={grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/plugin/line-highlight/line-highlight.min.js'}></script>}
			 <script src={grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/plugin/copy-clipboard/copy-clipboard.min.js'}></script>

			 <link rel="stylesheet" href={grigora_kit_blocks_config.GRIGORA_KIT_URL +"assets/css/prism-themes/" + themePrism + '.css'}></link>
			 <link rel="stylesheet" href={grigora_kit_blocks_config.GRIGORA_KIT_URL +"assets/css/prism-plugins/line-number.css"}></link>
			 <link rel="stylesheet" href={grigora_kit_blocks_config.GRIGORA_KIT_URL +"assets/css/prism-plugins/line-highlight.css"}></link>
			 <link rel="stylesheet" href={grigora_kit_blocks_config.GRIGORA_KIT_URL +"assets/css/prism-plugins/copy-clipboard.css"}></link>
			<div>
					<pre 
					className={showLineNumbers ? 'line-numbers code-block-container': 'code-block-container'}
					data-line = {highlightText}
					>
						<code 
						className={`language-${language} code-block`} 
						data-prismjs-copy="Copy">
							{codeText}
						</code>
					</pre>
			</div>
		</div>
	);
}
