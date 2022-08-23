var __assign =
	( this && this.__assign ) ||
	function () {
		__assign =
			Object.assign ||
			function ( t ) {
				for ( var s, i = 1, n = arguments.length; i < n; i++ ) {
					s = arguments[ i ];
					for ( var p in s )
						if ( Object.prototype.hasOwnProperty.call( s, p ) )
							t[ p ] = s[ p ];
				}
				return t;
			};
		return __assign.apply( this, arguments );
	};











window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-countdown'
	);

	function assignNewCountdownInstance(
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
	) {
		function formatNumber( num ) {
			return `${ numPrefix }${ numSuffix }`;
		}

		let params = {
			enableScrollSpy: true,
			scrollSpyOnce: true,
			startVal: countStart,
			duration: countTime,
			prefix: numPrefix,
			suffix: numSuffix,
		};
		if ( numFormat ) {
			params[ 'formattingFn' ] = formatNumber;
		}
		// new Countdown( id, countEnd, params );
	}

	for ( var i = 0; i < elements.length; i++ ) {
		let id = elements[ i ].dataset.id;
		let countdownDate = elements[ i ].dataset.date;
		let numPrefix = elements[ i ].dataset.prefix;
		let numSuffix = elements[ i ].dataset.suffix;
        let divider = elements[ i ].dataset.divider;
        let dividerCharacter = elements[ i ].dataset.dividercharacter;
        let format = elements[ i ].dataset.format;
        let hideDays = elements[ i ].dataset.hidedays;
        let hideHours = elements[ i ].dataset.hidehours;
        let hideMinutes = elements[ i ].dataset.hideminutes;
        let dayLabel = elements[ i ].dataset.daylabel;
        let orientation = elements[ i ].dataset.orientation;
        let hourLabel = elements[ i ].dataset.hourlabel;
        let minuteLabel = elements[ i ].dataset.minutelabel;
        let secondLabel = elements[ i ].dataset.secondlabel;
        let completedState = elements[ i ].dataset.completedstate;
        let countdownOnComplete = elements[ i ].dataset.oncomplete;
        let onCompleteURL = elements[ i ].dataset.oncompleteurl;


		assignNewCountdownInstance(
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
		);
	}
} );
