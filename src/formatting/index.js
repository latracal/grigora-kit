import { registerFormatType } from '@wordpress/rich-text';

import { gradient } from './gradient';
// import { icon } from './icon';

const formats = [ gradient ];

formats.forEach( ( { name, ...settings } ) =>
	registerFormatType( name, settings )
);
