import {
	__experimentalHStack as HStack,
} from '@wordpress/components';

import parse from 'html-react-parser';

import SVGIcons from '@constants/icons.json';

import { __ } from '@wordpress/i18n';

import GrigoraResetButton from '@components/reset-button';

function GrigoraSocialIconPicker( {
	value,
	onChange,
	options,
	label = '',
	resetValue = [
		{
			title: 'facebook',
			color: 'white',
			backgroundColor: '#3b5998',
			defaultBgColor: '#3b5998',
			display: true,
			shareText: 'Share on Facebook',
		},
		{
			title: 'twitter',
			color: 'white',
			backgroundColor: '#1da1f2',
			defaultBgColor: '#1da1f2',
			display: true,
			shareText: 'Share on Twitter',
		},
		{
			title: 'whatsapp',
			color: 'white',
			backgroundColor: '#25d366',
			defaultBgColor: '#25d366',
			display: true,
			shareText: 'Share on Whatsapp',
		},
		{
			title: 'instagram',
			color: 'white',
			backgroundColor: '#e1306c',
			defaultBgColor: '#e1306c',
			display: true,
			shareText: 'Share on Instagram',
		},
		{
			title: 'pinterest',
			color: 'white',
			backgroundColor: '#bd081c',
			defaultBgColor: '#bd081c',
			display: false,
			shareText: 'Share on Pinterest',
		},
		{
			title: 'linkedin',
			color: 'white',
			backgroundColor: '#0077b5',
			defaultBgColor: '#0077b5',
			display: false,
			shareText: 'Share on Linkedin',
		},
		{
			title: 'snapchat',
			color: 'white',
			backgroundColor: '#fffc00',
			defaultBgColor: '#fffc00',
			display: false,
			shareText: 'Share on Snapchat',
		},
		{
			title: 'reddit',
			color: 'white',
			backgroundColor: '#ff4500',
			defaultBgColor: '#ff4500',
			display: false,
			shareText: 'Share on Reddit',
		},
		{
			title: 'discord',
			color: 'white',
			backgroundColor: '#7289da',
			defaultBgColor: '#7289da',
			display: false,
			shareText: 'Share on Discord',
		},
		{
			title: 'telegram',
			color: 'white',
			backgroundColor: '#0088cc',
			defaultBgColor: '#0088cc',
			display: false,
			shareText: ' Share on Telegram',
		},
		
	],
} ) {

	return (
		<div className={ `grigora-social-icon` }>
			<HStack spacing={ 4 }>
				<h3 className="grigora-social-icon__label">{ label }</h3>
				{ value != resetValue && (
					<GrigoraResetButton
						onClick={ () => {
							onChange( resetValue );
						} }
					/>
				) }
			</HStack>

			<div className='grigora-social-icon__container'>

				{ value.map( ( item, index ) => {
					return(
						<div className="grigora-social-icon__picker" >
							<div style={{backgroundColor: item.display ? '#004b79':'black', color: 'white', width: 'fit-content', padding: '5px', borderRadius: '5px'}} 
								onClick = {() => {
									let temp = [...value];
									temp[index].display = !temp[index].display;
									onChange(temp);
								}}
							>
								{parse(SVGIcons[item.title])}
							</div>
						</div>
						
					)
				} ) }

			</div>

			
			
		</div>
	);
}

export default GrigoraSocialIconPicker;