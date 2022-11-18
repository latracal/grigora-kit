import { useSelect, useDispatch } from '@wordpress/data';
import { store as editPostStore } from '@wordpress/edit-post';
import { store as editSiteStore } from '@wordpress/edit-site';

const getDevice = () => {
	const device = useSelect( ( select ) => {
		const editPostManager = select( 'core/edit-post' );
		const editSiteManager = select( 'core/edit-site' );
		if ( grigora_kit_blocks_params.current_screen === 'site-editor' ) {
			if ( editSiteManager ) {
				return editSiteManager.__experimentalGetPreviewDeviceType();
			}
		}
		if ( editPostManager ) {
			return editPostManager.__experimentalGetPreviewDeviceType();
		}
		return 'Desktop';
	}, [] );
	return device;
};

const setPreviewDevice = ( editPostManager, editSiteManager, device ) => {
	if ( grigora_kit_blocks_params.current_screen === 'site-editor' ) {
		if ( editSiteManager ) {
			editSiteManager.__experimentalSetPreviewDeviceType( device );
			return true;
		}
	}
	if ( editPostManager ) {
		editPostManager.__experimentalSetPreviewDeviceType( device );
		return true;
	}
	return false;
};

const getDeviceProperty = ( device, desktopProp, tabletProp, mobileProp ) => {
	if ( device === 'Desktop' ) {
		return desktopProp;
	}
	if ( device === 'Tablet' ) {
		return tabletProp ? tabletProp : desktopProp;
	}
	if ( device === 'Mobile' ) {
		return mobileProp ? mobileProp : desktopProp;
	}
	return desktopProp;
};

export { getDevice, getDeviceProperty, setPreviewDevice };
