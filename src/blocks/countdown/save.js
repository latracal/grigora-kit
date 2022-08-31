import classnames from 'classnames';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		id,
		countdownDate,
		divider,
		dividerCharacter,
		format,
		hideDays,
		hideHours,
		hideMinutes,
		dayLabel,
		orientation,
		hourLabel,
		minuteLabel,
		secondLabel,
		completedState,
		countdownOnComplete,
		onCompleteURL,
		numPrefix,
		numSuffix,
	} = attributes;

	const counterWrapper = classnames( {
		'grigora-kit-countdown': true,
		[ `block-id-${ id }` ]: id,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: counterWrapper } ) }
			data-id={ `block-id-${ id }-span` }
			data-date={ countdownDate }
			data-prefix={ numPrefix }
			data-suffix={ numSuffix }
			data-divider={ divider }
			data-dividercharacter={ dividerCharacter }
			data-format={ format }
			data-hidedays={ hideDays }
			data-hidehours={ hideHours }
			data-hideminutes={ hideMinutes }
			data-daylabel={ dayLabel }
			data-orientation={ orientation }
			data-hourlabel={ hourLabel }
			data-minutelabel={ minuteLabel }
			data-secondlabel={ secondLabel }
			data-completedstate={ completedState }
			data-oncomplete={ countdownOnComplete }
			data-oncompleteurl={ onCompleteURL }
		>
			<span id={ `block-id-${ id }-span` }>
				{ orientation === 'block' ? (
					<span class="block">
						<div class="prefix">{ numPrefix }</div>
						{ hideDays ? null : (
							<>
								<div class="days-container">
									<div class="days">
										{ format > 1 ? '00' : '0' }
									</div>
									<div class="label">{ dayLabel }</div>
								</div>
								<div class="divider"> </div>
							</>
						) }

						{ hideHours ? null : (
							<>
								<div class="hours-container">
									<div class="hours">
										{ format > 1 ? '00' : '0' }
									</div>
									<div class="label">{ hourLabel }</div>
								</div>
								<div class="divider"> </div>
							</>
						) }

						{ hideMinutes ? null : (
							<>
								<div class="minutes-container">
									<div class="minutes">
										{ format > 1 ? '00' : '0' }
									</div>
									<div class="label">{ minuteLabel }</div>
								</div>
								<div class="divider"> </div>
							</>
						) }

						<div class="seconds-container">
							<div class="seconds">
								{ format > 1 ? '00' : '0' }
							</div>
							<div class="label">{ secondLabel }</div>
						</div>
						<div class="suffix">{ numSuffix }</div>
					</span>
				) : (
					<span class="inline">
						<div class={ 'prefix' }>{ numPrefix }</div>
						{ hideDays ? null : (
							<>
								<div class={ 'days-container' }>
									<div class={ 'days' }>
										{ format > 1 ? '00' : '0' }
										{ dayLabel }
									</div>
								</div>
								<div class={ 'divider' }></div>
							</>
						) }

						{ hideHours ? null : (
							<>
								<div class={ 'hours-container' }>
									<div class={ 'hours' }>
										{ format > 1 ? '00' : '0' }
										{ hourLabel }
									</div>
								</div>
								<div class={ 'divider' }></div>
							</>
						) }

						{ hideMinutes ? null : (
							<>
								<div class={ 'minutes-container' }>
									<div class={ 'minutes' }>
										{ format > 1 ? '00' : '0' }
										{ minuteLabel }
									</div>
								</div>
								<div class={ 'divider' }></div>
							</>
						) }

						<div class={ 'seconds-container' }>
							<div class={ 'seconds' }>
								{ format > 1 ? '00' : '0' }
								{ secondLabel }
							</div>
						</div>
						<div class={ 'suffix' }>{ numSuffix }</div>
					</span>
				) }
			</span>
			{ countdownOnComplete === 'advanced' && (
				<div className="on-complete-content">
					<InnerBlocks.Content />
				</div>
			) }
		</div>
	);
}
