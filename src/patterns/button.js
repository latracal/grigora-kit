import {
	Button
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {openModal, closeModal} from './modal';

const GrigoraImportButton = () =>{
	return (
        <>
            <Button className={ `grigora-pattern-import-btn` } isPrimary onClick={()=>openModal()}>
                {__('Grigora Library','grigora-kit')}
            </Button>
        </>
	);
}

export default GrigoraImportButton;
