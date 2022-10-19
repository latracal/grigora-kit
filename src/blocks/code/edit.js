import classnames from 'classnames';

import { useSelect } from '@wordpress/data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	store as blockEditorStore,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	DateTimePicker,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { alignLeft, alignRight, alignCenter, edit } from '@wordpress/icons';

import {
	HOVER_ANIMATIONS,
	ENTRANCE_ANIMATIONS,
	ICON_POSITIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
} from '@constants';
import generateId from '@helpers/generateId';
import uniqueIDs from '@helpers/uniqueID';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraColorInput from '@components/color-input';
import GrigoraGradientInput from '@components/gradient-input';
import GrigoraBorderBoxInput from '@components/borderbox-input';
import GrigoraBorderRadiusInput from '@components/borderradius-input';
import GrigoraUnitInput from '@components/unit-input';
import GrigoraBoxInput from '@components/box-input';
import GrigoraNumberInput from '@components/number-input';
import GrigoraTextInput from '@components/text-input';
import GrigoraToggleInput from '@components/toggle-input';
import GrigoraDateTimeInput from '@components/date-input';


import InspectorTabs from '@components/inspector-tabs';



export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	const {
		id,
		align,
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

	

	useEffect(() => {
		if (!id) {
			const tempID = generateId('code');
			setAttributes({ id: tempID });
			uniqueIDs.push(tempID);
		} else if (uniqueIDs.includes(id)) {
			const tempID = generateId('code');
			setAttributes({ id: tempID });
			uniqueIDs.push(tempID);
		} else {
			uniqueIDs.push(id);
		}

		// Create script tag and append to head
		const script = document.createElement('script');
		script.src = grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/prism-core.js';
		script.id = 'grigora-kit-prism-core';
		// script.async = true;
		document.head.appendChild(script);
		

		

		//Plugins 
		if (document.querySelector("#grigora-kit-prism-core")) {
			const scriptLine = document.createElement('script');
			scriptLine.src = grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/plugin/line-number/line-number.min.js';
			scriptLine.id = 'grigora-kit-prism-line-number';		
			document.head.appendChild(scriptLine);
			// Prism.highlightAll();
		}

		if (document.querySelector("#grigora-kit-prism-core")) {
			
			const scriptHighlight = document.createElement('script');
			scriptHighlight.src = grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/plugin/line-highlight/line-highlight.min.js';
			scriptHighlight.id = 'grigora-kit-prism-line-highlight';
			document.head.appendChild(scriptHighlight);
			// Prism.highlightAll();
		}

		if (document.querySelector("#grigora-kit-prism-core")) {
			const scriptCopy = document.createElement('script');
			scriptCopy.src = grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/plugin/copy-clipboard/copy-clipboard.min.js';
			scriptCopy.id = 'grigora-kit-prism-copy-clipboard';
			document.head.appendChild(scriptCopy);
			// Prism.highlightAll();
		}

	}, []);

	


	useEffect(() => {

		let scriptLanguage = document.querySelector('#grigora-kit-prism-' + language);

		if (!scriptLanguage) {
			const scriptLang = document.createElement('script');
			scriptLang.src = grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/' + language + '.min.js';
			scriptLang.id = 'grigora-kit-prism-' + language;
			scriptLang.onload = () => {
				if (typeof Prism !== 'undefined') {
				Prism.highlightAll();
	
			}}
			document.head.appendChild(scriptLang);
			if (typeof Prism !== 'undefined') {
				Prism.highlightAll();
	
			}
		}

		else{
			if (typeof Prism !== 'undefined') {
				Prism.highlightAll();	
			}
		}
		

	}, [language]);

	useEffect(() => {
		if (typeof Prism !== 'undefined') {
			Prism.highlightAll();
		}
	}, [showLineNumbers, highlightText]);


	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __('Align left'),
			align: 'flex-start',
		},
		{
			icon: alignCenter,
			title: __('Align center'),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __('Align right'),
			align: 'flex-end',
		},
	];

	//All languages offered by Prism js not yet added

	const LANGUAGES = [
		{
			label: 'ABAP',
			value: 'abap',
		},

		{
			label: 'ABNF',
			value: 'abnf',
		},

		{
			label: 'ActionScript',
			value: 'actionscript',
		},

		{
			label: 'Ada',
			value: 'ada',
		},

		{
			label: 'Agda',
			value: 'agda',
		},

		{
			label: 'AL',
			value: 'al',
		},

		{
			label: 'ANTLR4',
			value: 'antlr4',
		},

		{
			label: 'Apache Configuration',
			value: 'apacheconf',
		},

		{
			label: 'Apex',
			value: 'apex',
		},

		{
			label: 'APL',
			value: 'apl',
		},

		{
			label: 'AppleScript',
			value: 'applescript',
		},

		{
			label: 'AQL',
			value: 'aql',
		},

		{
			label: 'Arduino',
			value: 'arduino',
		},

		{
			label: 'ARFF',
			value: 'arff',
		},

		{
			label: 'ARM Assembly',
			value: 'armasm',
		},

		{
			label: 'Arturo',
			value: 'arturo',
		},

		{
			label: 'AsciiDoc',
			value: 'asciidoc',
		},

		{
			label: 'ASP.NET (C#)',
			value: 'aspnet',
		},

		{
			label: '6502 Assembly',
			value: 'asm6502',
		},

		{
			label: 'Atmel AVR Assembly',
			value: 'asmatmel',
		},

		{
			label: 'AutoHotkey',
			value: 'autohotkey',
		},

		{
			label: 'AutoIt',
			value: 'autoit',
		},

		{
			label: 'AviSynth',
			value: 'avisynth',
		},

		{
			label: 'Avro IDL',
			value: 'avro-idl',
		},

		{
			label: 'Awk',
			value: 'awk',
		},

		{
			label: 'Bash + Shell',
			value: 'bash',
		},

		{
			label: 'BASIC',
			value: 'basic',
		},

		{
			label: 'Batch',
			value: 'batch',
		},

		{
			label: 'BBCode',
			value: 'bbcode',
		},

		{
			label: 'BBj',
			value: 'bbj',
		},

		{
			label: 'Bicep',
			value: 'bicep',
		},

		{
			label: 'Bison',
			value: 'bison',
		},

		{
			label: 'BNF + RBNF',
			value: 'bnf',
		},

		{
			label: 'Brainfuck',
			value: 'brainfuck',
		},

		{
			label: 'Brightscript',
			value: 'brightscript',
		},

		{
			label: 'Bro',
			value: 'bro',
		},

		{
			label: 'BSL (1C:Enterprise)',
			value: 'bsl',
		},

		{
			label: 'C',
			value: 'c',
		},

		{
			label: 'C#',
			value: 'csharp',
		},

		{
			label: 'C++',
			value: 'cpp',
		},

		{
			label: 'CFScript',
			value: 'cfscript',
		},

		{
			label: 'ChaiScript',
			value: 'chaiscript',
		},

		{
			label: 'CIL',
			value: 'cil',
		},

		{
			label: 'Cilk/C',
			value: 'cilkc',
		},

		{
			label: 'Cilk/C++',
			value: 'cilkcpp',
		},

		{
			label: 'C-like',
			value: 'clike',
		},

		{
			label: 'Clojure',
			value: 'clojure',
		},

		{
			label: 'CMake',
			value: 'cmake',
		},

		{
			label: 'COBOL',
			value: 'cobol',
		},

		{
			label: 'CoffeeScript',
			value: 'coffeescript',
		},

		{
			label: 'Concurnas',
			value: 'concurnas',
		},

		{
			label: 'Content Security Policy',
			value: 'csp',
		},

		{
			label: 'Cooklang',
			value: 'cooklang',
		},

		{
			label: 'Coq',
			value: 'coq',
		},

		{
			label: 'Core',
			value: 'core',
		},

		{
			label: 'Crystal',
			value: 'crystal',
		},

		{
			label: 'Cshtml',
			value: 'cshtml',
		},

		{
			label: 'CSS Extras',
			value: 'css-extras',
		},

		{
			label: 'CSS',
			value: 'css',
		},

		{
			label: 'CSV',
			value: 'csv',
		},

		{
			label: 'Cue',
			value: 'cue',
		},

		{
			label: 'Cypher',
			value: 'cypher',
		},

		{
			label: 'D',
			value: 'd',
		},

		{
			label: 'Dart',
			value: 'dart',
		},

		{
			label: 'DataWeave',
			value: 'dataweave',
		},

		{
			label: 'DAX',
			value: 'dax',
		},

		{
			label: 'Dhall',
			value: 'dhall',
		},

		{
			label: 'Diff',
			value: 'diff',
		},

		{
			label: 'Django/Jinja2',
			value: 'django',
		},

		{
			label: 'DNS Zone file',
			value: 'dns-zone-file',
		},

		{
			label: 'Docker',
			value: 'docker',
		},

		{
			label: 'DOT (Graphviz)',
			value: 'dot',
		},

		{
			label: 'EBNF',
			value: 'ebnf',
		},

		{
			label: 'EditorConfig',
			value: 'editorconfig',
		},

		{
			label: 'Eiffel',
			value: 'eiffel',
		},

		{
			label: 'EJS + Eta',
			value: 'ejs',
		},

		{
			label: 'Elixir',
			value: 'elixir',
		},

		{
			label: 'Elm',
			value: 'elm',
		},

		{
			label: 'ERB',
			value: 'erb',
		},

		{
			label: 'Erlang',
			value: 'erlang',
		},

		{
			label: 'Etlua',
			value: 'etlua',
		},

		{
			label: 'Excel Formula',
			value: 'excel-formula',
		},

		{
			label: 'Factor',
			value: 'factor',
		},

		{
			label: 'False',
			value: 'false',
		},

		{
			label: 'Firestore Security Rules',
			value: 'firestore-security-rules',
		},

		{
			label: 'Flow',
			value: 'flow',
		},

		{
			label: 'Fortran',
			value: 'fortran',
		},

		{
			label: 'F#',
			value: 'fsharp',
		},

		{
			label: 'FreeMarker Template Language',
			value: 'ftl',
		},

		{
			label: 'GAP(CAS)',
			value: 'gap',
		},

		{
			label: 'G-code',
			value: 'gcode',
		},

		{
			label: 'GDScript',
			value: 'gdscript',
		},

		{
			label: 'GEDCOM',
			value: 'gedcom',
		},

		{
			label: 'gettext',
			value: 'gettext',
		},

		{
			label: 'Gherkin',
			value: 'gherkin',
		},

		{
			label: 'Git',
			value: 'git',
		},

		{
			label: 'GLSL',
			value: 'glsl',
		},

		{
			label: 'GML',
			value: 'gml',
		},

		{
			label: 'Gn',
			value: 'gn',
		},

		{
			label: 'Go Module',
			value: 'go-module',
		},

		{
			label: 'Go',
			value: 'go',
		},

		{
			label: 'Gradle',
			value: 'gradle',
		},

		{
			label: 'GraphQL',
			value: 'graphql',
		},

		{
			label: 'Groovy',
			value: 'groovy',
		},

		{
			label: 'Haml',
			value: 'haml',
		},

		{
			label: 'Handlebars',
			value: 'handlebars',
		},

		{
			label: 'Haskell',
			value: 'haskell',
		},

		{
			label: 'Haxe',
			value: 'haxe',
		},

		{
			label: 'HCL',
			value: 'hcl',
		},

		{
			label: 'HLSL',
			value: 'hlsl',
		},

		{
			label: 'Hoon',
			value: 'hoon',
		},

		{
			label: 'Hpkp',
			value: 'hpkp',
		},

		{
			label: 'HSTS',
			value: 'hsts',
		},

		{
			label: 'HTTP',
			value: 'http',
		},

		{
			label: 'IchigoJam',
			value: 'ichigojam',
		},

		{
			label: 'Icon',
			value: 'icon',
		},

		{
			label: 'ICU Message Format',
			value: 'icu-message-format',
		},

		{
			label: 'Idris',
			value: 'idris',
		},

		{
			label: '.ignore',
			value: 'ignore',
		},

		{
			label: 'Inform 7',
			value: 'inform7',
		},

		{
			label: 'Ini',
			value: 'ini',
		},

		{
			label: 'Io',
			value: 'io',
		},

		{
			label: 'J',
			value: 'j',
		},

		{
			label: 'Java',
			value: 'java',
		},

		{
			label: 'JavaDoc',
			value: 'javadoc',
		},

		{
			label: 'JavaDoc Like',
			value: 'javadoclike',
		},

		{
			label: 'JavaScript',
			value: 'javascript',
		},

		{
			label: 'Java stack trace',
			value: 'javastacktrace',
		},

		{
			label: 'Jexl',
			value: 'jexl',
		},

		{
			label: 'Jolie',
			value: 'jolie',
		},

		{
			label: 'JQ',
			value: 'jq',
		},

		{
			label: 'JS Doc',
			value: 'jsdoc',
		},

		{
			label: 'JS Extras',
			value: 'js-extras',
		},

		{
			label: 'JS Templates',
			value: 'js-templates',
		},

		{
			label: 'JSON',
			value: 'json',
		},

		{
			label: 'JSON5',
			value: 'json5',
		},

		{
			label: 'JSONP',
			value: 'jsonp',
		},

		{
			label: 'JS stack trace',
			value: 'jsstacktrace',
		},

		{
			label: 'JSX',
			value: 'jsx',
		},

		{
			label: 'Julia',
			value: 'julia',
		},

		{
			label: 'Keepalived Configure',
			value: 'keepalived',
		},
		
		{
			label: 'Keyman',
			value: 'keyman',
		},

		{
			label: 'Kotlin',
			value: 'kotlin',
		},

		{
			label: 'KuMir',
			value: 'kumir',
		},

		{
			label: 'Kusto',
			value: 'kusto',
		},

		{
			label: 'LaTeX',
			value: 'latex',
		},

		{
			label: 'Latte',
			value: 'latte',
		},
		
		{
			label: 'Less',
			value: 'less',
		},

		{
			label: 'LilyPond',
			value: 'lilypond',
		},

		{
			label: 'Linker Script',
			value: 'linker-script',
		},

		{
			label: 'Liquid',
			value: 'liquid',
		},

		{
			label: 'Lisp',
			value: 'lisp',
		},

		{
			label: 'LiveScript',
			value: 'livescript',
		},

		{
			label: 'LLVM IR',
			value: 'llvm',
		},

		{
			label: 'LOLCODE',
			value: 'lolcode',
		},

		{
			label: 'Lua',
			value: 'lua',
		},

		{
			label: 'Magma (CAS)',
			value: 'magma',
		},

		{
			label: 'Makefile',
			value: 'makefile',
		},

		{
			label: 'Markdown',
			value: 'markdown',
		},

		{
			label: 'Markup Templating',
			value: 'markup-templating',
		},

		{
			label: 'Mata',
			value: 'mata',
		},

		{
			label: 'MATLAB',
			value: 'matlab',
		},
		{
			label: 'MAXScript',
			value: 'maxscript',
		},

		{
			label: 'MEL',
			value: 'mel',
		},

		{
			label: 'Mermaid',
			value: 'mermaid',
		},

		{
			label: 'METAFONT',
			value: 'metafont',
		},

		{
			label: 'Mizar',
			value: 'mizar',
		},

		{
			label: 'MongoDB',
			value: 'mongodb',
		},

		{
			label: 'Monkey',
			value: 'monkey',
		},

		{
			label: 'MoonScript',
			value: 'moonscript',
		},

		{
			label: 'N1QL',
			value: 'n1ql',
		},

		{
			label: 'N4JS',
			value: 'n4js',
		},

		{
			label: 'Nand to Tetris HDL',
			value: 'nand2tetris-hdl',
		},

		{
			label: 'Naninovel Script',
			value: 'naniscript',
		},

		{
			label: 'NASM',
			value: 'nasm',
		},

		{
			label: 'NEON',
			value: 'neon',
		},

		{
			label: 'Nevod',
			value: 'nevod',
		},

		{
			label: 'Nginx',
			value: 'nginx',
		},

		{
			label: 'Nim',
			value: 'nim',
		},

		{
			label: 'Nix',
			value: 'nix',
		},

		{
			label: 'NSIS',
			value: 'nsis',
		},

		{
			label: 'Objective-C',
			value: 'objectivec',
		},

		{
			label: 'OCaml',
			value: 'ocaml',
		},
		
		{
			label: 'Odin',
			value: 'odin',
		},

		{
			label: 'OpenCL',
			value: 'opencl',
		},

		{
			label: 'OpenQasm',
			value: 'openqasm',
		},

		{
			label: 'Oz',
			value: 'oz',
		},

		{
			label: 'PARI/GP',
			value: 'parigp',
		},

		{
			label: 'Parser',
			value: 'parser',
		},

		{
			label: 'Pascal',
			value: 'pascal',
		},

		{
			label: 'Pascaligo',
			value: 'pascaligo',
		},

		{
			label: 'PC Axis',
			value: 'pcaxis',
		},

		{
			label: 'PeopleCode',
			value: 'peoplecode',
		},

		{
			label: 'Perl',
			value: 'perl',
		},

		{
			label: 'PHP',
			value: 'php',
		},

		{
			label: 'PHP Extras',
			value: 'php-extras',
		},

		{
			label: 'PHPDoc',
			value: 'phpdoc',
		},

		{
			label: 'PL/SQL',
			value: 'plsql',
		},

		{
			label: 'PlantUML',
			value: 'plantuml',
		},

		{
			label: 'PowerQuery',
			value: 'powerquery',
		},

		{
			label: 'PowerShell',
			value: 'powershell',
		},

		{
			label: 'Processing',
			value: 'processing',
		},

		{
			label: 'Prolog',
			value: 'prolog',
		},

		{
			label: 'Promql',
			value: 'promql',
		},

		{
			label: 'Properties',
			value: 'properties',
		},

		{
			label: 'Protocol Buffers',
			value: 'protobuf',
		},

		{
			label: 'PSL',
			value: 'psl',
		},

		{
			label: 'Pug',
			value: 'pug',
		},

		{
			label: 'Puppet',
			value: 'puppet',
		},

		{
			label: 'Pure',
			value: 'pure',
		},

		{
			label: 'PureBasic',
			value: 'purebasic',
		},

		{
			label: 'PureScript',
			value: 'purescript',
		},

		{
			label: 'Python',
			value: 'python',
		},
		
		{
			label: 'Q (kdb+ database)',
			value: 'q',
		},

		{
			label: 'Q#',
			value: 'qsharp',
		},

		{
			label: 'QML',
			value: 'qml',
		},

		{
			label: 'Qore',
			value: 'qore',
		},

		{
			label: 'R',
			value: 'r',
		},

		{
			label: 'Racket',
			value: 'racket',
		},

		{
			label: 'Reason',
			value: 'reason',
		},

		{
			label: 'Regex',
			value: 'regex',
		},

		{
			label: 'Rego',
			value: 'rego',
		},

		{
			label: 'Ren\'py',
			value: 'renpy',
		},

		{
			label: 'ReScript',
			value: 'rescript',
		},

		{
			label: 'REST',
			value: 'rest',
		},

		{
			label: 'Rip',
			value: 'rip',
		},

		{
			label: 'Roboconf',
			value: 'roboconf',
		},

		{
			label: 'Robot Framework',
			value: 'robotframework',
		},

		{
			label: 'Ruby',
			value: 'ruby',
		},

		{
			label: 'Rust',
			value: 'rust',
		},

		{
			label: 'SAS',
			value: 'sas',
		},

		{
			label: 'Sass (Sass)',
			value: 'sass',
		},

		{
			label: 'Sass (Scss)',
			value: 'scss',
		},

		{
			label: 'Scala',
			value: 'scala',
		},

		{
			label: 'Scheme',
			value: 'scheme',
		},

		{
			label: 'Shell Session',
			value: 'shell-session',
		},

		{
			label: 'Smali',
			value: 'smali',
		},

		{
			label: 'Smalltalk',
			value: 'smalltalk',
		},

		{
			label: 'Smarty',
			value: 'smarty',
		},

		{
			label: 'SML',
			value: 'sml',
		},

		{
			label: 'Solidity (Ethereum)',
			value: 'solidity',
		},

		{
			label: 'Solution File',
			value: 'solution-file',
		},

		{
			label: 'Soy (Closure Template)',
			value: 'soy',
		},

		{
			label: 'SPARQL',
			value: 'sparql',
		},

		{
			label: 'SQF: Status Quo Function',
			value: 'sqf',
		},

		{
			label: 'SQL',
			value: 'sql',
		},

		{
			label: 'Squirrel',
			value: 'squirrel',
		},

		{
			label: 'Stan',
			value: 'stan',
		},

		{
			label: 'Stata',
			value: 'stata',
		},

		{
			label: 'Stylus',
			value: 'stylus',
		},

		{
			label: 'Supercollider',
			value: 'supercollider',
		},

		{
			label: 'Swift',
			value: 'swift',
		},

		{
			label: 'Systemd Config file',
			value: 'systemd',
		},

		{
			label: 'T4 Text Templates (C#)',
			value: 't4-cs',
		},

		{
			label: 'T4 Text Templates (VB)',
			value: 't4-vb',
		},

		{
			label: 'T4 templating',
			value: 't4-templating',
		},

		{
			label: 'TAP',
			value: 'tap',
		},

		{
			label: 'Tcl',
			value: 'tcl',
		},

		{
			label: 'Textile',
			value: 'textile',
		},

		{
			label: 'TOML',
			value: 'toml',
		},

		{
			label: 'Tremor',
			value: 'tremor',
		},

		{
			label: 'TSX',
			value: 'tsx',
		},

		{
			label: 'TT2 (Template Toolkit 2)',
			value: 'tt2',
		},

		{
			label: 'Turtle',
			value: 'turtle',
		},

		{
			label: 'Twig',
			value: 'twig',
		},

		{
			label: 'TypeScript',
			value: 'typescript',
		},

		{
			label: 'Typoscript',
			value: 'typoscript',
		},

		{
			label: 'UnrealScript',
			value: 'unrealscript',
		},

		{
			label: 'UO Razor Script',
			value: 'uorazor',
		},

		{
			label: 'URI',
			value: 'uri',
		},

		{
			label: 'V',
			value: 'v',
		},

		{
			label: 'Vala',
			value: 'vala',
		},

		{
			label: 'VB.Net',
			value: 'vbnet',
		},

		{
			label: 'Velocity',
			value: 'velocity',
		},

		{
			label: 'Verilog',
			value: 'verilog',
		},

		{
			label: 'VHDL',
			value: 'vhdl',
		},

		{
			label: 'vim',
			value: 'vim',
		},

		{
			label: 'Visual Basic',
			value: 'visual-basic',
		},

		{
			label: 'warscript',
			value: 'warscript',
		},

		{
			label: 'WASM',
			value: 'wasm',
		},

		{
			label: 'Web IDL',
			value: 'web-idl',
		},

		{
			label: 'WGSL',
			value: 'wgsl',
		},

		{
			label: 'Wiki markup',
			value: 'wiki',
		},

		{
			label: 'Wolfram',
			value: 'wolfram',
		},

		{
			label: 'Wren',
			value: 'wren',
		},

		{
			label: 'Xeroa',
			value: 'xeroa',
		},

		{
			label: 'XML Doc (.net)',
			value: 'xml-doc',
		},

		{
			label: 'Xojo (REALbasic)',
			value: 'xojo',
		},

		{
			label: 'XQuery',
			value: 'xquery',
		},

		{
			label: 'YAML',
			value: 'yaml',
		},

		{
			label: 'YANG',
			value: 'yang',
		},

		{
			label: 'Zig',
			value: 'zig',
		},


	]

	const THEMES = [
		{
			label: 'Default',
			value: 'default',
		},

		{
			label: 'Coy',
			value: 'coy',
		},

		{
			label: 'Dark',
			value: 'dark',
		},

		{
			label: 'Funky',
			value: 'funky',
		},

		{
			label: 'Okaidia',
			value: 'okaidia',
		},

		{
			label: 'Solarized Light',
			value: 'solarizedlight',
		},

		{
			label: 'Tomorrow Night',
			value: 'tomorrownight',
		},

		{
			label: 'Twilight',
			value: 'twilight',
		},

	]

	const [editMode, setEditMode] = useState(true);

	
	useEffect(() => {
		if (typeof Prism !== 'undefined') {
			Prism.highlightAll();	
		}
	}, [editMode]);

	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={0} paddingX={3} paddingY={3}>

					<>
						<Button
							className="on-complete-buttons"
							isPressed={editMode}
							onClick={() => setEditMode(true)}
						>
							<span>
								{__('Edit Mode', 'grigora-kit')}
							</span>
						</Button>
						<Button
							className="on-complete-buttons"
							isPressed={!editMode}
							onClick={() => setEditMode(false)}
						>
							<span>{__('Display Mode', 'grigora-kit')}</span>
						</Button>
					</>

					<br></br>
					<br></br>

					<GrigoraSelectInput
						label={__('Language', 'grigora-kit')}
						onChange={(language) =>
							setAttributes({ language })
						}
						value={language}
						resetValue={"bash"}
						options={LANGUAGES}
					/>

					<GrigoraSelectInput
						label={__('Themes', 'grigora-kit')}
						onChange={(themePrism) =>
							setAttributes({ themePrism })
						}
						value={themePrism}
						resetValue={"okaidia"}
						options={THEMES}
					/>
					<GrigoraToggleInput
						label={__('Show line numbers', 'grigora-kit')}
						onChange={(showLineNumbers) =>
							setAttributes({ showLineNumbers })
						}
						value={showLineNumbers}
					/>
					<GrigoraToggleInput
						label={__('Wrap code', 'grigora-kit')}
						onChange={(wrapCode) =>
							setAttributes({ wrapCode })
						}
						value={wrapCode}
					/>

					<GrigoraTextInput
						label={__('Highlight lines ', 'grigora-kit')}
						onChange={(highlightText) =>{
							setAttributes({ highlightText })
						}
						}
						value={highlightText}
						help = {__('Enter line numbers separated by commas. For selecting range combine numbers with "-". Example: 1,2,6-10,14 ', 'grigora-kit')}
					/>


				</Spacer>
			</>
		);
	}

	function stylesSettings() {
		return (
			<>
				<Spacer marginBottom={0} paddingX={3} paddingY={3}>


					<GrigoraUnitInput
						label={__('Code Block Max Height', 'grigora-kit')}
						onChange={(containerMaxHeight) =>
							setAttributes({ containerMaxHeight })
						}

						value={containerMaxHeight}
						resetValue={'none'}
					/>


					<GrigoraUnitInput
						label={__('Container width', 'grigora-kit')}
						onChange={(containerWidth) =>
							setAttributes({ containerWidth })
						}

						value={containerWidth}
						resetValue={'100%'}
					/>

					<GrigoraRangeInput
						value={fontSize}
						setValue={(fontSize) => {
							setAttributes({
								fontSize: fontSize.toString(),
							});
						}}
						label={`Font Size`}
						resetValue={14}
					/>

				</Spacer>

			</>
		);
	}

	function advancedSettings() {
		return (
			<>

			</>
		);
	}

	const blockProps = useBlockProps({
		className: classnames({
			'grigora-kit-code': true,
			[`block-id-${id}`]: id,
		}),
		style: {},
	});

	

	return (
		<div {...blockProps}>
			 <link rel="stylesheet" href={grigora_kit_blocks_config.GRIGORA_KIT_URL +"assets/css/prism-themes/" + themePrism + '.css'}></link>
			 <link rel="stylesheet" href={grigora_kit_blocks_config.GRIGORA_KIT_URL +"assets/css/prism-plugins/line-number.css"}></link>
			 <link rel="stylesheet" href={grigora_kit_blocks_config.GRIGORA_KIT_URL +"assets/css/prism-plugins/line-highlight.css"}></link>
			 <link rel="stylesheet" href={grigora_kit_blocks_config.GRIGORA_KIT_URL +"assets/css/prism-plugins/copy-clipboard.css"}></link>

			<style>
				{`
				.block-id-${id} {
					
				}
				
				.block-id-${id} .code-editor {
					font-size: ${fontSize}px;	
					overflow-wrap: ${wrapCode ? 'break-word' : 'normal'};
					max-height: ${containerMaxHeight};
					width: ${containerWidth};
				}

				
				.block-id-${id} .code-block-container{
					font-size: ${fontSize}px;		
					overflow-x: ${wrapCode ? 'hidden' : 'auto'};
					max-height: ${containerMaxHeight};
					width: ${containerWidth};
				}

				.block-id-${id} .code-block-container .code-block{
					overflow-wrap: ${wrapCode ? 'break-word' : 'normal'};
				}
				
				` }
			</style>
			<BlockControls group="block">
				<AlignmentControl
					value={align}
					onChange={(newAlign) =>
						setAttributes({ align: newAlign })
					}
					alignmentControls={DEFAULT_ALIGNMENT_CONTROLS}
				/>
			</BlockControls>
			<InspectorControls>
				<InspectorTabs className="grigora-tabs-container">
					<TabList className="tabs-header">
						<Tab className="general">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-pencil-fill"
								viewBox="0 0 16 16"
							>
								<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
							</svg>
							{__('General', 'grigora-kit')}
						</Tab>
						<Tab className="styles">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-palette-fill"
								viewBox="0 0 16 16"
							>
								<path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
							</svg>
							{__('Styles', 'grigora-kit')}
						</Tab>
						<Tab className="advanced">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-gear-fill"
								viewBox="0 0 16 16"
							>
								<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
							</svg>
							{__('Advanced', 'grigora-kit')}
						</Tab>
					</TabList>

					<TabPanel>{generalSettings()}</TabPanel>
					<TabPanel>{stylesSettings()}</TabPanel>
					<TabPanel>{advancedSettings()}</TabPanel>
				</InspectorTabs>
			</InspectorControls>
			
			
			<div 
			>
				
				{!editMode ?
				
				<div>
					<pre 
					className=
					{
						showLineNumbers ? 'line-numbers code-block-container': 'code-block-container'
					}
					data-line = {highlightText}
					>
						<code 
						className={`language-${language} code-block`} 
						data-prismjs-copy="Copy">
							{codeText}
						</code>
					</pre>
					</div>
					
					:
						<textarea 
							value={codeText}
							className="code-editor"
							onChange={
								(e) => {
									setAttributes({ codeText: e.target.value });
								}
							}
							placeholder={__('Enter your code here...', 'grigora-kit')}
						/>

					}
					<main data-prismjs-copy="bar">
				</main>
			</div>
		</div>
	);
}
