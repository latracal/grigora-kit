import { __, _x } from '@wordpress/i18n';
import { Component, Fragment, useEffect, useMemo } from '@wordpress/element';
import { toggleFormat, removeFormat, applyFormat } from '@wordpress/rich-text';
import { Popover } from '@wordpress/components';
import { RichTextToolbarButton } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import InlineGradientUI from './inline';

const name = 'grigora-kit/gradient';
const title = __( 'Grigora Gradient', 'grigora-kit' );

export const gradient = {
	name,
	title,
	tagName: 'span',
	className: 'grigora-kit-gradient',
	attributes: {
		data: 'data-gradient',
		style: 'style',
	},
	edit: class Gradient extends Component {
		constructor( props ) {
			super( props );
			this.state = {
				addingGradient: false,
				tooltipText: '',
			};
			this.removeGradientPicker = this.removeGradientPicker.bind( this );
		}
		removeGradientPicker() {
			this.setState( { addingGradient: false } );
			this.props.onFocus();
		}
		render() {
			const { value, isActive, onChange, activeAttributes } = this.props;
			const { addingGradient, tooltipText } = this.state;

			return (
				<Fragment>
					<RichTextToolbarButton
						icon={ 'editor-code' }
						title={ __( 'Grigora Gradient', 'grigora-kit' ) }
						onClick={ () => {
							this.setState( {
								addingGradient: true,
							} );
						} }
						isActive={ isActive }
					/>

					{ ( addingGradient || isActive ) && (
						<InlineGradientUI
							value={ value }
							onChange={ onChange }
							isActive={ isActive }
							activeAttributes={ activeAttributes }
							addingGradient={ addingGradient }
							removeGradientPicker={ this.removeGradientPicker }
						/>
					) }
				</Fragment>
			);
		}
	},
};
