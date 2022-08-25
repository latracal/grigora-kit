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

    function startCountdown( date, id ) {
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
        // console.log(days + "d " + hours + "h "
        // + minutes + "m " + seconds + "s ");


        document.getElementById(id).innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
            
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(timer);
            console.log("EXPIRED");
        }
        }, 1000);
        return 
    }

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

        // console.log("Date is ",countdownDate);
        startCountdown(countdownDate, id);
        
        // console.log("Accessing span element", document.getElementById(id))

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
