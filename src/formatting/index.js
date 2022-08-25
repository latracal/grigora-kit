import { registerFormatType } from '@wordpress/rich-text';

import { gradient } from "./gradient";

const formats = [gradient];

formats.forEach(({ name, ...settings }) => registerFormatType(name, settings));