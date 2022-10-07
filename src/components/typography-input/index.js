import {
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalHStack as HStack,
	Button,
	Icon,
	Popover,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';

import {
	HOVER_ANIMATIONS,
	ENTRANCE_ANIMATIONS,
	ICON_POSITIONS,
	TEXT_TRANSFORMS,
	TEXT_STYLE,
	TEXT_DECORATION,
	FONT_WEIGHTS,
} from '@constants';
import GrigoraResetButton from '@components/reset-button';
import deepEqualObj from '@helpers/compareObj';
import GrigoraRangeInput from '@components/range-input';
import GrigoraSelectInput from '@components/select-input';
import GrigoraFontFamilyInput from '@components/fontfamily-input';

function GrigoraTypographyInput( {
	label = 'Typography',
	size,
	sizeChange,
	sizeLabel = __( 'Size', 'grigora-kit' ),
	sizeReset = 'default',
	lineHeight,
	lineHeightChange,
	lineHeightLabel = __( 'Line Height', 'grigora-kit' ),
	lineHeightMin = 10,
	lineHeightMax = 300,
	lineHeightReset = 'normal',
	letterSpacing,
	letterSpacingChange,
	letterSpacingLabel = __( 'Letter Spacing', 'grigora-kit' ),
	letterSpacingMin = 0,
	letterSpacingMax = 150,
	letterSpacingReset = 'normal',
	wordSpacing,
	wordSpacingChange,
	wordSpacingLabel = __( 'Word Spacing', 'grigora-kit' ),
	wordSpacingMin = 0,
	wordSpacingMax = 150,
	wordSpacingReset = 'normal',
	transform,
	transformChange,
	transformOptions = TEXT_TRANSFORMS,
	transformLabel = __( 'Transform', 'grigora-kit' ),
	transformReset = 'none',
	style,
	styleChange,
	styleOptions = TEXT_STYLE,
	styleLabel = __( 'Style', 'grigora-kit' ),
	styleReset = 'normal',
	decoration,
	decorationChange,
	decorationOptions = TEXT_DECORATION,
	decorationLabel = __( 'Decoration', 'grigora-kit' ),
	decorationReset = 'initial',
	weight,
	weightChange,
	weightOptions = [
		{
			label: 'Default',
			value: 'default',
		},
	].concat(
		FONT_WEIGHTS.map( ( obj ) => {
			return {
				label: obj,
				value: obj,
			};
		} )
	),
	weightLabel = __( 'Weight', 'grigora-kit' ),
	weightReset = 'default',
	hasFontFamily,
	fontFamily,
	fontFamilyChange,
	fontFamilyLabel = __( 'Font Family:', 'grigora-kit' ),
	fontFamilyReset = '',
} ) {
	const [ openPopOver, setOpenPopOver ] = useState( false );
	const ref = useRef();

	return (
		<div className={ `grigora-typography-input` }>
			<HStack spacing={ 4 }>
				<div className="grigora-typography-input__label">{ label }</div>
				<div>
					{ ( size !== sizeReset ||
						lineHeight !== lineHeightReset ||
						letterSpacing !== letterSpacingReset ||
						wordSpacing !== wordSpacingReset ||
						transform !== transformReset ||
						style !== styleReset ||
						decoration !== decorationReset ||
						weight !== weightReset ) && (
						<GrigoraResetButton
							onClick={ () => {
								sizeChange( sizeReset );
								lineHeightChange( lineHeightReset );
								letterSpacingChange( letterSpacingReset );
								wordSpacingChange( wordSpacingReset );
								transformChange( transformReset );
								styleChange( styleReset );
								decorationChange( decorationReset );
								weightChange( weightReset );
							} }
						/>
					) }
					<Button
						isSmall
						variant="secondary"
						icon={
							<Icon
								icon={ () => (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
									</svg>
								) }
							/>
						}
						onClick={ () => {
							{
								setOpenPopOver( true );
							}
						} }
					/>
				</div>
			</HStack>
			{ openPopOver && (
				<Popover
					placement="left-center"
					onClose={ () => {
						setOpenPopOver( false );
					} }
					anchorRef={ ref?.current }
					className={ `grigora-typography-input__popover` }
				>
					<GrigoraRangeInput
						value={ size }
						setValue={ sizeChange }
						label={ sizeLabel }
						resetValue={ sizeReset }
					/>
					<GrigoraRangeInput
						value={ lineHeight }
						setValue={ lineHeightChange }
						label={ lineHeightLabel }
						min={ lineHeightMin }
						max={ lineHeightMax }
						resetValue={ lineHeightReset }
					/>
					<GrigoraRangeInput
						value={ letterSpacing }
						setValue={ letterSpacingChange }
						label={ letterSpacingLabel }
						min={ letterSpacingMin }
						max={ letterSpacingMax }
						resetValue={ letterSpacingReset }
					/>
					<GrigoraRangeInput
						value={ wordSpacing }
						setValue={ wordSpacingChange }
						label={ wordSpacingLabel }
						min={ wordSpacingMin }
						max={ wordSpacingMax }
						resetValue={ wordSpacingReset }
					/>
					<br></br>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							value={ transform }
							onChange={ transformChange }
							label={ transformLabel }
							options={ transformOptions }
							resetValue={ transformReset }
						/>
						<GrigoraSelectInput
							value={ style }
							onChange={ styleChange }
							label={ styleLabel }
							options={ styleOptions }
							resetValue={ styleReset }
						/>
					</HStack>
					<HStack spacing={ 2 } className="grigora-dropdown-hstack">
						<GrigoraSelectInput
							value={ decoration }
							onChange={ decorationChange }
							label={ decorationLabel }
							options={ decorationOptions }
							resetValue={ decorationReset }
						/>
						<GrigoraSelectInput
							value={ weight }
							onChange={ weightChange }
							label={ weightLabel }
							options={ weightOptions }
							resetValue={ weightReset }
						/>
					</HStack>
					{ hasFontFamily && (
						<GrigoraFontFamilyInput
						label={ fontFamilyLabel }
						labelPosition="side"
						onChange={ fontFamilyChange }
						value={ fontFamily }
						resetValue={ fontFamilyReset }
					/>
					) }
				</Popover>
			) }
		</div>
	);
}

export default GrigoraTypographyInput;
