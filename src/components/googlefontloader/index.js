import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import WebFont from 'webfontloader';
import PropTypes from 'prop-types';
import statuses from './statuses';

const noop = () => {};

class Googlefontloader extends Component {
	componentWillMount() {
		const { config, onStatus } = this.props;
		if ( config?.google?.families[ 0 ] ) {
			WebFont.load( {
				...config,
				loading: () => onStatus( statuses.loading ),
				active: () => onStatus( statuses.active ),
				inactive: () => onStatus( statuses.inactive ),
			} );
		}
	}

	componentDidUpdate( prevProps, prevState ) {
		const { onStatus, config } = this.props;
		if ( prevProps.config !== config ) {
			if ( config?.google?.families[ 0 ] ) {
				WebFont.load( {
					...config,
					loading: () => onStatus( statuses.loading ),
					active: () => onStatus( statuses.active ),
					inactive: () => onStatus( statuses.inactive ),
					context: frames[ 'editor-canvas' ],
				} );
			}
		}
	}

	render() {
		const { children } = this.props;
		return children || null;
	}
}

Googlefontloader.propTypes = {
	config: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	onStatus: PropTypes.func.isRequired,
	onFontStatus: PropTypes.func.isRequired,
};

Googlefontloader.defaultProps = {
	onStatus: noop,
	onFontStatus: noop,
};

export default Googlefontloader;
