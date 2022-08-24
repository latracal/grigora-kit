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

    var CountDown = /** @class */ ( function () {
        function CountDown( target, date, options ) {
            var _this = this;
            this.options = options
            this.defaults = {
                countdownDate: '',
                countdownOnComplete: 'hide',
                onCompleteURL: '',
                completedState: false,
                divider: false,
                dividerCharacter: '',
                format: 1,
                orientation: 'block',
                hideDays: false,
                hideHours: false,
                hideMinutes: false,
                dayLabel: 'DAYS',
                hourLabel: 'HRS',
                minuteLabel: 'MINS',
                secondLabel: 'SECS',
                numSuffix: '',
                numPrefix: '',
            }
            this.el =
			typeof target === 'string'
				? document.getElementById( target )
				: target;
        }

        CountDown.prototype.start = function (callback) {
            console.log("Prototype start activated")
            if ( this.error ) {
                return;
            }
            this.callback = callback;
            var countDownDate = new Date(this.countdownDate).getTime();

            // Update the count down every 1 second
            var timer = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();
                
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
                
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
            // Output the result in an element with id="demo"
            console.log(days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ");

            this.printValue(countDownDate)
                
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(timer);
                console.log("EXPIRED");
            }
            }, 1000);
        }

        CountDown.prototype.printValue = function ( date ) {
            var result = this.formattingFn( date );
            if (
                this.el.tagName === 'text' ||
                this.el.tagName === 'tspan'
            ) {
                this.el.textContent = result;
            } else {
                this.el.innerHTML = result;
            }
        };
            

    return CountDown;
    
    } )();



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
		function formatNumber( date ) {
            var countdownDate = new Date(date).getTime();

            // Update the count down every 1 second
            var timer = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();
                
            // Find the distance between now and the count down date
            var distance = countdownDate - now;
                
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
            // Output the result in an element with id="demo"
            console.log(days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ");
                
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(timer);
                console.log("EXPIRED");
            }
            }, 1000);
			return `${ numPrefix } ${days}d  ${hours}h ${months}m  ${seconds}s ${ numSuffix }`;
		}

		let params = {
			enableScrollSpy: true,
			scrollSpyOnce: true,
			prefix: numPrefix,
			suffix: numSuffix,
            countdownDate: countdownDate,
		};

        if (countdownDate){
            params[ 'formattingFn' ] = formatNumber;
        }

		new CountDown( id, countdownDate, params );
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
