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
import { alignLeft, alignRight, alignCenter } from '@wordpress/icons';

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
		highlightLines,
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

		//Create script tag and append to head
		const script = document.createElement('script');
		script.src = grigora_kit_blocks_config.GRIGORA_KIT_URL + 'assets/js/prism/prism-core.js';
		script.async = true;
		document.head.appendChild(script);

	}, []);

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

	//All languages offered by Prism js

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

		//Column 2

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

	


	const styles = {

		boxSizing: 'border-box',
		fontFamily: '"Dank Mono", "Fira Code", monospace',
		fontSize: parseInt(fontSize),
		padding: '10px',
		overflow: 'auto',
		overflowWrap: wrapCode ? 'anywhere' : 'normal',
		resize: 'both',
		height: 'max-content',
		maxHeight: containerMaxHeight,
		minHeight: '150px',
		width: containerWidth,
		

	}

	function setHighlightLines(highlightText){
		if(highlightText){
			let highlightLinesTextArray = highlightText.split(',')
			// .map(Number)
			let highlightLinesArray = []
			for (let i = 0; i < highlightLinesTextArray.length; i++) {
				if (highlightLinesTextArray[i].includes('-')) {
					let range = highlightLinesTextArray[i].split('-')
					let start = parseInt(range[0])
					let end = parseInt(range[1])
					for (let j = start; j <= end; j++) {
						highlightLinesArray.push(j-1)
					}
				}
				else{
					highlightLinesArray.push(parseInt(highlightLinesTextArray[i])-1)
				}

			}

			

			let obj = {}
			for (let i = 0; i < highlightLinesArray.length; i++) {
				if(!obj[highlightLinesArray[i]] && typeof highlightLinesArray[i] == 'number'){
					obj[highlightLinesArray[i]] = true
				}
		}
		
			setAttributes({ highlightLines: obj })
			
		
	}

	else{
		setAttributes({ highlightLines: {} })
	}
		
	}


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
							setHighlightLines(highlightText)
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
						label={__('Container Height', 'grigora-kit')}
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
			{themePrism === 'default' && <link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/grigora-kit/assets/css/prism-themes/default.css"></link>}
			{themePrism === 'dark' && <link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/grigora-kit/assets/css/prism-themes/dark.css"></link>}
			{themePrism === 'funky' && <link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/grigora-kit/assets/css/prism-themes/funky.css"></link>}
			{themePrism === 'okaidia' && <link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/grigora-kit/assets/css/prism-themes/okaidia.css"></link>}
			{themePrism === 'twilight' && <link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/grigora-kit/assets/css/prism-themes/twilight.css"></link>}
			{themePrism === 'coy' && <link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/grigora-kit/assets/css/prism-themes/coy.css"></link>}
			{themePrism === 'solarizedlight' && <link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/grigora-kit/assets/css/prism-themes/solarized.css"></link>}
			{themePrism === 'tomorrownight' && <link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/grigora-kit/assets/css/prism-themes/tomorrow.css"></link>}
			<style>
				{`
				.block-id-${id} {
					
				}

				.block-id-${id} .line {
					font-size: ${fontSize}px;
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
				<button class="copy-to-clipboard-button" type="button" data-copy-state="copy">
					<span>Copy</span>
				</button>
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
			{/* <script src={"http://localhost/wordpress/wp-content/plugins/grigora-kit/js-front/prism/prism-python.js"}></script> */}
			
			{/* <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">
				<span>Copy</span>
			</button> */}
			<div 
			// className={`grigora-code-input`}
			>

				{editMode ?
				
				<div 
				// className="Code"
				>
					<pre>
						<code className={`language-python`}>{codeText}</code>
					</pre>
					</div>
					
					:
						<textarea style={styles}
							value={codeText}
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
