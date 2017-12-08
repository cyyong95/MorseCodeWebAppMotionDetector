var main = function() {

	// Initialise variables
	var socket = io.connect('http://localhost:3000');
	var stringFlag = true;

	// Turn motion detector on and off
    $('#motion-toggle').click(function(e){
    	socket.emit('motion:switch');
    	e.preventDefault();
    });

	// Get long signal and pass to client
	socket.on('longSignal', function() {
		$('#current-signal').text("L");
        $('#current-signal').html("L");
	});

	// Get long signal and pass to client
	socket.on('shortSignal', function() {
		$('#current-signal').text("S");
        $('#current-signal').html("S");
	});

	// Get signal string
	socket.on('currentSignalString', function(msg) {
		$('#current-signal-string').text(msg);
        $('#current-signal-string').html(msg);
	});

	// Get output-string
	socket.on('realString', function(msg) {
		$('#output-string').text(msg);
        $('#output-string').html(msg);
	});

	// Update the client that motion sensor is switched off
    socket.on('mapMotionOn', function() {
        var currentMotionDisplay = 'Off';
        $('#motion-toggle').text(currentMotionDisplay);
        $('#motion-toggle').html(currentMotionDisplay);
    });

    // Update the client that motion sensor is switched on
    socket.on('mapMotionOff', function() {
        var currentMotionDisplay = 'On';
        $('#motion-toggle').text(currentMotionDisplay);
        $('#motion-toggle').html(currentMotionDisplay);
    });

    // Get output-string
	socket.on('clearCurrentSignal', function() {
		// var tmp1 = $('#current-signal').text();
		$('#current-signal').text("");
        $('#current-signal').html("");
	});

	// Get output-string
	socket.on('clearSignalString', function() {
		// var tmp2 = $('#current-signal-string').text();
		$('#current-signal-string').text("");
        $('#current-signal-string').html("");
	});

	// Get output-string
	socket.on('clearOutputString', function() {
		// var tmp3 = $('#output-string').text();
		$('#output-string').text("");
        $('#output-string').html("");
	});

}

$(document).ready(main);