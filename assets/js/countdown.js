window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'wp-block-grigora-kit-countdown'
	);

	function startCountdown(
		element,
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
		countdownOnComplete,
		onCompleteURL,
		numPrefix,
		numSuffix
	) {
		countdownDate = new Date( countdownDate ).getTime();

		// Update the count down every 1 second
		var timer = setInterval( function () {
			// Get today's date and time
			var now = new Date().getTime();

			// Find the distance between now and the count down date
			var distance = countdownDate - now;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor( distance / ( 1000 * 60 * 60 * 24 ) );
			var hours = Math.floor(
				( distance % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 )
			);
			var minutes = Math.floor(
				( distance % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 )
			);
			var seconds = Math.floor( ( distance % ( 1000 * 60 ) ) / 1000 );

			// Return Countdown based on inline or block choice
			if ( distance > 0 ) {
				if ( orientation === 'inline' ) {
					// Inline renderer variable
					let inlineRenderer =
						"<span class='inline'> <div class='prefix'>" +
						numPrefix +
						'</div>';
					if ( hideDays === 'false' ) {
						inlineRenderer +=
							"<div class='days-container'><div class='days'>";
						if ( format < 2 ) {
							inlineRenderer += days;
						} else {
							if ( days < 10 ) {
								inlineRenderer += '0' + days;
							} else {
								inlineRenderer += days;
							}
						}
						inlineRenderer += dayLabel + '</div></div>';
						inlineRenderer +=
							"<div class='divider'> " +
							dividerCharacter +
							' </div>';
					}

					if ( hideHours === 'false' ) {
						inlineRenderer +=
							"<div class='hours-container'><div class='hours'>";
						if ( hideDays === 'true' ) {
							let newHours = hours + days * 24;
							if ( format < 2 ) {
								inlineRenderer += newHours;
							} else {
								if ( newHours < 10 ) {
									inlineRenderer += '0' + newHours;
								} else {
									inlineRenderer += newHours;
								}
							}
						} else {
							if ( format < 2 ) {
								inlineRenderer += hours;
							} else {
								if ( hours < 10 ) {
									inlineRenderer += '0' + hours;
								} else {
									inlineRenderer += hours;
								}
							}
						}
						inlineRenderer += hourLabel + '</div></div>';
						inlineRenderer +=
							"<div class='divider'> " +
							dividerCharacter +
							' </div>';
					}
					if ( hideMinutes === 'false' ) {
						inlineRenderer +=
							"<div class='minutes-container'><div class='minutes'>";
						if ( hideHours === 'true' ) {
							let newMinutes =
								minutes + hours * 60 + days * 24 * 60;
							if ( format < 2 ) {
								inlineRenderer += newMinutes;
							} else {
								if ( newMinutes < 10 ) {
									inlineRenderer += '0' + newMinutes;
								} else {
									inlineRenderer += newMinutes;
								}
							}
						} else {
							if ( format < 2 ) {
								inlineRenderer += minutes;
							} else {
								if ( minutes < 10 ) {
									inlineRenderer += '0' + minutes;
								} else {
									inlineRenderer += minutes;
								}
							}
						}
						inlineRenderer += minuteLabel + '</div></div>';
						inlineRenderer +=
							"<div class='divider'> " +
							dividerCharacter +
							' </div>';
					}
					inlineRenderer +=
						"<div class='seconds-container'><div class='seconds'>";
					if ( hideMinutes === 'true' ) {
						let newSeconds =
							seconds +
							minutes * 60 +
							hours * 3600 +
							days * 24 * 3600;
						if ( format < 2 ) {
							inlineRenderer += newSeconds;
						} else {
							if ( newSeconds < 10 ) {
								inlineRenderer += '0' + newSeconds;
							} else {
								inlineRenderer += newSeconds;
							}
						}
					} else {
						if ( format < 2 ) {
							inlineRenderer += seconds;
						} else {
							if ( seconds < 10 ) {
								inlineRenderer += '0' + seconds;
							} else {
								inlineRenderer += seconds;
							}
						}
					}
					inlineRenderer += secondLabel + '</div></div>';
					inlineRenderer +=
						"<div class='suffix'>" + numSuffix + '</div>';
					inlineRenderer += '</span>';
					document.getElementById( id ).innerHTML = inlineRenderer;
				} else {
					//Block renderer variable

					let blockRenderer =
						"<span class='block'> <div class='prefix'>" +
						numPrefix +
						'</div>';
					if ( hideDays === 'false' ) {
						blockRenderer +=
							"<div class='days-container'><div class='days'>";
						if ( format < 2 ) {
							blockRenderer += days;
						} else {
							if ( days < 10 ) {
								blockRenderer += '0' + days;
							} else {
								blockRenderer += days;
							}
						}
						blockRenderer +=
							"</div><div class='label'>" +
							dayLabel +
							'</div></div>';
						blockRenderer +=
							"<div class='divider'> " +
							dividerCharacter +
							' </div>';
					}

					if ( hideHours === 'false' ) {
						blockRenderer +=
							"<div class='hours-container'><div class='hours'>";
						if ( hideDays === 'true' ) {
							let newHours = hours + days * 24;
							if ( format < 2 ) {
								blockRenderer += newHours;
							} else {
								if ( newHours < 10 ) {
									blockRenderer += '0' + newHours;
								} else {
									blockRenderer += newHours;
								}
							}
						} else {
							if ( format < 2 ) {
								blockRenderer += hours;
							} else {
								if ( hours < 10 ) {
									blockRenderer += '0' + hours;
								} else {
									blockRenderer += hours;
								}
							}
						}
						blockRenderer +=
							"</div><div class='label'>" +
							hourLabel +
							'</div></div>';
						blockRenderer +=
							"<div class='divider'> " +
							dividerCharacter +
							' </div>';
					}

					if ( hideMinutes === 'false' ) {
						blockRenderer +=
							"<div class='minutes-container'><div class='minutes'>";
						if ( hideHours === 'true' ) {
							let newMinutes =
								minutes + hours * 60 + days * 24 * 60;
							if ( format < 2 ) {
								blockRenderer += newMinutes;
							} else {
								if ( newMinutes < 10 ) {
									blockRenderer += '0' + newMinutes;
								} else {
									blockRenderer += newMinutes;
								}
							}
						} else {
							if ( format < 2 ) {
								blockRenderer += minutes;
							} else {
								if ( minutes < 10 ) {
									blockRenderer += '0' + minutes;
								} else {
									blockRenderer += minutes;
								}
							}
						}
						blockRenderer +=
							"</div><div class='label'>" +
							minuteLabel +
							'</div></div>';
						blockRenderer +=
							"<div class='divider'> " +
							dividerCharacter +
							' </div>';
					}

					blockRenderer +=
						"<div class='seconds-container'><div class='seconds'>";
					if ( hideMinutes === 'true' ) {
						let newSeconds =
							seconds +
							minutes * 60 +
							hours * 3600 +
							days * 24 * 3600;
						if ( format < 2 ) {
							blockRenderer += newSeconds;
						} else {
							if ( newSeconds < 10 ) {
								blockRenderer += '0' + newSeconds;
							} else {
								blockRenderer += newSeconds;
							}
						}
					} else {
						if ( format < 2 ) {
							blockRenderer += seconds;
						} else {
							if ( seconds < 10 ) {
								blockRenderer += '0' + seconds;
							} else {
								blockRenderer += seconds;
							}
						}
					}
					blockRenderer +=
						"</div><div class='label'>" +
						secondLabel +
						'</div></div>';
					blockRenderer +=
						"<div class='suffix'>" + numSuffix + '</div>';
					blockRenderer += '</span>';

					document.getElementById( id ).innerHTML = blockRenderer;
				}
			} else {
				clearInterval( timer );
				if ( countdownOnComplete === 'hide' ) {
					document.getElementById( id ).innerHTML = '';
				} else if ( countdownOnComplete === 'url' ) {
					window.location.replace( onCompleteURL );
				} else if ( countdownOnComplete === 'advanced' ) {
					document.getElementById( id ).innerHTML = '';
					var content = element.getElementsByClassName(
						'on-complete-content'
					);
					if ( content ) {
						content[ 0 ].style.display = 'block';
					}
				}
			}
		}, 1000 );

		return;
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
		let countdownOnComplete = elements[ i ].dataset.oncomplete;
		let onCompleteURL = elements[ i ].dataset.oncompleteurl;

        startCountdown(
            elements[ i ],
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
            countdownOnComplete,
            onCompleteURL,
            numPrefix,
            numSuffix
        );
	}
} );
