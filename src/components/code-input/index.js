import Editor from 'react-simple-code-editor'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwlLight'

import {
	__experimentalBoxControl as BoxControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';




function GrigoraCodeInput( {
	value,
	onChange,
	label = '',
	resetValue = '',
} ) {


    const styles = {
        root: {
          boxSizing: 'border-box',
          fontFamily: '"Dank Mono", "Fira Code", monospace',
          ...theme.plain
        }
    }

    const highlight = code => (
        <Highlight {...defaultProps} theme={theme} code={code} language="json">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                </div>
              ))}
            </>
          )}
        </Highlight>
      )

	return (
		<div className={ `grigora-code-input` }>
			<Editor
                value={value}
                onValueChange={onChange}
                highlight={highlight}
                padding={10}
                style={styles.root}
            />
		</div>
	);
}

export default GrigoraCodeInput;
