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

//Imports for prism
import Highlight, { defaultProps } from 'prism-react-renderer'

//Changed from theme since alias did not work
import okaidia from 'prism-react-renderer/themes/okaidia'
import  duotoneDark from 'prism-react-renderer/themes/duotoneDark'
import duotoneLight from 'prism-react-renderer/themes/duotoneLight'
import  dracula from 'prism-react-renderer/themes/dracula'
import  github from 'prism-react-renderer/themes/github'
import  nightOwl from 'prism-react-renderer/themes/nightOwl'
import  nightOwlLight from 'prism-react-renderer/themes/nightOwlLight'
import  oceanicNext from 'prism-react-renderer/themes/oceanicNext'
import  palenight from 'prism-react-renderer/themes/palenight'
import  shadesOfPurple from 'prism-react-renderer/themes/shadesOfPurple'
import  synthwave84 from 'prism-react-renderer/themes/synthwave84'
import  ultramin from 'prism-react-renderer/themes/ultramin'
import  vsDark from 'prism-react-renderer/themes/vsDark'
import  vsLight from 'prism-react-renderer/themes/vsLight'

export default function Edit( props ) {
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
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			const tempID = generateId( 'code' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else if ( uniqueIDs.includes( id ) ) {
			const tempID = generateId( 'code' );
			setAttributes( { id: tempID } );
			uniqueIDs.push( tempID );
		} else {
			uniqueIDs.push( id );
		}

		const script = document.createElement('script');

		script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/plugins/line-highlight/prism-line-highlight.js";
		script.async = true;
		script.crossorigin="anonymous";
		script.referrerpolicy="no-referrer";
		// script.integrity="sha512-O/EPA55vb65wBWu/aUh9U7YL5X2DECcaGNAC2pFkTwWCifiziaulR/5sr9n2woqcHmkbWM69yiy6MNnX5edNsw==";

		document.body.appendChild(script);

		const script2 = document.createElement('script');
		script2.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/plugins/line-highlight/prism-line-highlight.min.js";
		script2.async = true;
		script2.crossorigin="anonymous";
		script2.referrerpolicy="no-referrer";
		// script2.integrity = "sha512-MUsHA6aIEavjYGGEssYHDHg89kcl8lzc5fGblgCw0lWX2gYSq6phdSSrtMkekRwz4juQnlbI+7mCMm5BtWvLbg=="

		document.body.appendChild(script2);

		const link = document.createElement('link');
		link.rel = "stylesheet";
		link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/plugins/line-highlight/prism-line-highlight.css";

		document.head.appendChild(link);

		const link2 = document.createElement('link');
		link2.rel = "stylesheet";
		link2.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/plugins/line-highlight/prism-line-highlight.min.css";

		document.head.appendChild(link2);
		

	}, [] );

	const DEFAULT_ALIGNMENT_CONTROLS = [
		{
			icon: alignLeft,
			title: __( 'Align left' ),
			align: 'flex-start',
		},
		{
			icon: alignCenter,
			title: __( 'Align center' ),
			align: 'center',
		},
		{
			icon: alignRight,
			title: __( 'Align right' ),
			align: 'flex-end',
		},
	];

	const LANGUAGES = [
		{
			label: 'Bash',
			value: 'bash',
		},
		{
			label: 'C',
			value: 'c',
		},
		{
			label: 'C++',
			value: 'cpp',
		},
		{
			label: 'C like',
			value: 'clike',
		},
		{
			label: 'CSS',
			value: 'css',
		},
		{
			label: 'CSS Extras',
			value: 'css-extras',
		},
		{
			label: 'Javascript',
			value: 'javascript',
		},
		{
			label: 'JSON',
			value: 'json',
		},
		{
			label: 'JS Extras',
			value: 'js-extras',
		},
		{
			label: 'JSX',
			value: 'jsx',
		},

		{
			label: 'JS Templates',
			value: 'js-templates',
		},

		{
			label: 'Coffeescript',
			value: 'coffeescript',
		},

		{
			label: 'Diff',
			value: 'diff',
		},

		{
			label: 'Markup',
			value: 'markup',
		},

		{
			label: 'Git',
			value: 'git',
		},
		
		{
			label: 'Go',
			value: 'go',
		},

		{
			label: 'GraphQL',
			value: 'graphql',
		},

		{
			label: 'Markup templating',
			value: 'markup-templating',
		},

		{
			label: 'Handlebars',
			value: 'handlebars',
		},

		{
			label: 'Less',
			value: 'less',
		},

		{
			label: 'Markdown',
			value: 'markdown',
		},

		{
			label: 'Makefile',
			value: 'makefile',
		},

		{
			label: 'Objective C',
			value: 'objectivec',
		},

		{
			label: 'OCAML',
			value: 'ocaml',
		},

		{
			label: 'Python',
			value: 'python',
		},

		{
			label: 'Reason',
			value: 'reason',
		},

		{
			label: 'Sass',
			value: 'sass',
		},

		{
			label: 'SCSS',
			value: 'scss',
		},

		{
			label: 'SQL',
			value: 'sql',
		},

		{
			label: 'Stylus',
			value: 'stylus',
		},

		{
			label: 'TypeScript',
			value: 'typescript',
		},

		{
			label: 'TSX',
			value: 'tsx',
		},

		{
			label: 'Wasm',
			value: 'wasm',
		},
		
		{
			label: 'YAML',
			value: 'yaml',
		},

	]

	const THEMES = [
		{
			label: 'Okaidia',
			value: 'okaidia',
		},

		{
			label: 'Duotone Dark',
			value: 'duotoneDark',
		},

		{
			label: 'Duotone Light',
			value: 'duotoneLight',
		},

		{
			label: 'Dracula',
			value: 'dracula',
		},

		{
			label: 'Github',
			value: 'github',
		},

		{
			label: 'Night Owl',
			value: 'nightOwl',
		},

		{
			label: 'Night Owl Light',
			value: 'nightOwlLight',
		},

		{
			label: 'Oceanic Next',
			value: 'oceanicNext',
		},

		{
			label: 'Palenight',
			value: 'palenight',
		},

		{
			label: 'Shades of Purple',
			value: 'shadesOfPurple',
		},

		{
			label: 'Synthwave 84',
			value: 'synthwave84',
		},

		{
			label: 'Ultramin',
			value: 'ultramin',
		},

		{
			label: 'VS Dark',
			value: 'vsDark',
		},

		{
			label: 'VS Light',
			value: 'vsLight',
		}
	]

	const [editMode, setEditMode] = useState(true);

	let themeRender = themePrism === 'okaidia' ? okaidia :
    themePrism === 'duotoneDark' ? duotoneDark :
    themePrism === 'duotoneLight' ? duotoneLight :
    themePrism === 'dracula' ? dracula :
    themePrism === 'github' ? github :
    themePrism === 'nightOwl' ? nightOwl :
    themePrism === 'nightOwlLight' ? nightOwlLight :
    themePrism === 'oceanicNext' ? oceanicNext :
    themePrism === 'palenight' ? palenight :
    themePrism === 'shadesOfPurple' ? shadesOfPurple :
    themePrism === 'synthwave84' ? synthwave84 :
    themePrism === 'ultramin' ? ultramin :
    themePrism === 'vsDark' ? vsDark :
    themePrism === 'vsLight' ? vsLight :
    okaidia


    const styles = {
        
          boxSizing: 'border-box',
          fontFamily: '"Dank Mono", "Fira Code", monospace',
          fontSize: parseInt(fontSize),
          padding: '10px',
          overflow: 'scroll',
		  overflowWrap: wrapCode ? 'anywhere' : 'normal',
		  
		  height: '200px',
          ...themeRender.plain,
        
    }
	
	function generalSettings() {
		return (
			<>
				<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

				<>
							<Button
								className="on-complete-buttons"
								isPressed={ editMode }
								onClick={ () => setEditMode( true ) }
							>
								<span>
									{ __( 'Edit Mode', 'grigora-kit' ) }
								</span>
							</Button>
							<Button
								className="on-complete-buttons"
								isPressed={ !editMode }
								onClick={ () => setEditMode( false ) }
							>
								<span>{ __( 'Display Mode', 'grigora-kit' ) }</span>
							</Button>
				</>

				<br></br>
				<br></br>

				<GrigoraSelectInput
					label={ __( 'Language', 'grigora-kit' ) }
					onChange={ ( language ) =>
						setAttributes( { language } )
					}
					value={ language }
					resetValue={ "bash" }
					options={ LANGUAGES }
				/>
				
				<GrigoraSelectInput
					label={ __( 'Themes', 'grigora-kit' ) }
					onChange={ ( themePrism ) =>
						setAttributes( { themePrism } )
					}
					value={ themePrism }
					resetValue={ "okaidia" }
					options={ THEMES }
				/>
				<GrigoraToggleInput
					label={ __( 'Show line numbers', 'grigora-kit' ) }
					onChange={ ( showLineNumbers ) =>
						setAttributes( { showLineNumbers } )
					}
					value={ showLineNumbers }
				/>
				<GrigoraToggleInput
					label={ __( 'Wrap code', 'grigora-kit' ) }
					onChange={ ( wrapCode ) =>
						setAttributes( { wrapCode } )
					}
					value={ wrapCode }
				/>
				</Spacer>
			</>
		);
	}

	function stylesSettings() {
		return (
			<>
			<Spacer marginBottom={ 0 } paddingX={ 3 } paddingY={ 3 }>

						<GrigoraRangeInput
							value={ fontSize }
							setValue={ ( fontSize ) => {
								setAttributes( {
									fontSize: fontSize.toString(),
								} );
							} }
							label={ `Size` }
							resetValue={ 14 }
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

	const blockProps = useBlockProps( {
		className: classnames( {
			'grigora-kit-code': true,
			[ `block-id-${ id }` ]: id,
		} ),
		style: {},
	} );

	return (
		<div { ...blockProps }>
			<style>
				{ `
				.block-id-${ id } {
					
				}

				.block-id-${ id } .line {
					font-size: ${ fontSize }px;
				}
				
				
				` }
			</style>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
					alignmentControls={ DEFAULT_ALIGNMENT_CONTROLS }
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
							{ __( 'General', 'grigora-kit' ) }
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
							{ __( 'Styles', 'grigora-kit' ) }
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
							{ __( 'Advanced', 'grigora-kit' ) }
						</Tab>
					</TabList>

					<TabPanel>{ generalSettings() }</TabPanel>
					<TabPanel>{ stylesSettings() }</TabPanel>
					<TabPanel>{ advancedSettings() }</TabPanel>
				</InspectorTabs>
			</InspectorControls>
			<h1>Code Block</h1>
			<div className={ `grigora-code-input` }>
			
				{!editMode ? <Highlight {...defaultProps} theme={themeRender} code={codeText} language={language} >
					{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<div className='pre' 
					// data-line='2-5' data-src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/plugins/line-highlight/prism-line-highlight.js"
					style={styles}
					>
						{tokens.map((line, i) => (
						<div {...getLineProps({ line, key: i })} className='line'>
							{showLineNumbers && <div className='line-numbers'>{i + 1}</div>}
							{line.map((token, key) => <span 
							{...getTokenProps({ token, key })} />)
							}
						</div>
						))}
					</div>
					)}
				</Highlight>  : 
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
					</div>
			</div>
	);
}
