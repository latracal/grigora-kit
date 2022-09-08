import { Button, Icon } from '@wordpress/components';

function Notice( { text, status='success' } ) {

    const classes = `grigora-notice status-${status}`;

	return(
        <div className={classes}>
            {text}
        </div>
    );
}

export default Notice;
