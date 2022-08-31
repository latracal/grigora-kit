import { __, _x } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Path, SVG } from '@wordpress/components';
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
			};
			this.removeGradientPicker = this.removeGradientPicker.bind( this );
		}
		removeGradientPicker() {
			this.setState( { addingGradient: false } );
			this.props.onFocus();
		}
		render() {
			const { value, isActive, onChange, activeAttributes } = this.props;
			const { addingGradient } = this.state;

			return (
				<Fragment>
					<RichTextToolbarButton
						icon={
							<SVG
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<Path
									d="M12 24C14.3869 24 16.6761 23.0518 18.364 21.364C20.0518 19.6761 21 17.3869 21 15C21 12.5175 19.317 10.644 17.352 8.457C15.381 6.264 13.125 3.7545 12 0C12 0 3 8.529 3 15C3 17.3869 3.94821 19.6761 5.63604 21.364C7.32387 23.0518 9.61305 24 12 24ZM9.969 6.969L11.031 8.031C10.596 8.466 9.339 9.9975 8.1705 12.336L6.8295 11.664C8.0595 9.2025 9.405 7.5345 9.969 6.969Z"
									fill="url(#paint0_linear_1627_2)"
								/>
								<defs>
									<linearGradient
										id="paint0_linear_1627_2"
										x1="3"
										y1="15"
										x2="21"
										y2="15"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#9F06E6" />
										<stop offset="1" stop-color="#8C03E9" />
									</linearGradient>
								</defs>
							</SVG>
						}
						title={ __( 'Grigora Gradient', 'grigora-kit' ) }
						onClick={ () => {
							this.setState( {
								addingGradient: true,
							} );
						} }
						isActive={ isActive }
					/>
					{ addingGradient && (
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
