// Morse Code Data Structure
var morseTable = { 
	'SL'   : 'A', 
	'LSSS' : 'B', 
	'LSLS' : 'C', 
	'LSS'  : 'D', 
	'S'    : 'E', 
	'SSLS' : 'F', 
	'LLS'  : 'G', 
	'SSSS' : 'H', 
	'SS'   : 'I', 
	'SLLL' : 'J', 
	'LSL'  : 'K', 
	'SLSS' : 'L', 
	'LL'   : 'M', 
	'LS'   : 'N', 
	'LLL'  : 'O', 
	'SLLS' : 'P', 
	'LLSL' : 'Q', 
	'SLS'  : 'R', 
	'SSS'  : 'S', 
	'L'    : 'T', 
	'SSL'  : 'U', 
	'SSSL' : 'V', 
	'SLL'  : 'W', 
	'LSSL' : 'X', 
	'LSLL' : 'Y', 
	'LLSS' : 'Z',
	'LLSSLL': 'SL',
	'LLLL'	: '0',
	'SLLLL'	: '1',	
	'SSLLL'	: '2',
	'SSSLL'	: '3',
	'SSSSL'	: '	4',
	'SSSSS'	: '5',
	'LSSSS'	: '6',
	'LLSSS'	: '7',
	'LLLSS'	: '8',
	'LLLLS'	: '9',
	'SLSLSL': '.',
	'LLSSLL': ',',
	'LLLSSS': ':',
	'SSLLSS':'?',
	'SLLLLS': "'",
	'LSSSSL':'-',	
	'LSSLS':'/',
	'LSLLSL': '[]',
	'SLSSLS': '"',
	'SLLSLS': '@',
	'LSSSL': '=',
	'SSSLSL': 'SK'
};

// Server side initialisation
var five = require('johnny-five');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var motionFlag = false;
var motionStartTime;
var motionEndTime;
var checkTimeDifference; // check idle time
var checkTimeDifference2; // check time in between on/off
var inputStartTime;
var inputEndTime;
var firstRoundFlag = 1;
var motionString = "";
var realString = "";

// Server use and get from directory
app.use(express.static(__dirname + ''));
app.get('/', function(req, res) {
	res.sendFile(__dirname +'/index.html');
});

// Server log onto port 3000
server.listen(3000);
console.log("Server is logged onto port 3000");


// Declare Arduino board
board = new five.Board();

// Handle arduino board actions
board.on ("ready", function() {

	// Initialize motion sensor
	motionSensor = new five.Motion(7);

	// Check for duration then add "S" or "L"
	function pushSignals(timeDif) {
			// If time more than 6 (start at 7), push Long motion else push Short motion
			if (timeDif > 6) {
				console.log("Long motion detected");
				console.log("Motion duration:", timeDif, "seconds");
				io.emit('longSignal');
				motionString = motionString + "L";
			}
			// If time more than 0 less than 7 (1 to 6)
			else if (timeDif > 0 && timeDif < 7) {
				console.log("Short motion detected");
				console.log("Motion duration:", timeDif, "seconds");
				io.emit('shortSignal');
				motionString = motionString + "S";
			}

			// If time is negative, print invalid
			else {
				console.log("Invalid motion input");
			}
	}

	// Decode the string without any space after decoding
	function decodeStringWithoutSpace(stringToDecode) {
		// Compare motion string with morse code table
		var decodedResult;
		console.log("The string to decode is:", stringToDecode);
		for (var key in morseTable) {
			// If string matches with code in morse table
			if (key == stringToDecode) {
				decodedResult = morseTable[key];
				return decodedResult;
			}
		}
		// If nothing is found, return empty string
		decodedResult = "";
		return decodedResult;
	}

	// Decode the string with space after decoding
	function decodeStringWithSpace(stringToDecode) {
		// Compare motion string with morse code table
		var decodedResult;
		console.log("String to decode is:", stringToDecode);
		for (var key in morseTable) {
			// If string matches with code in morse table
			if (key == stringToDecode) {
				decodedResult = morseTable[key] + " ";
				return decodedResult
			}
		}
		// If nothing is found, return empty string
		decodedResult = "";
		return decodedResult;
	}

	// Let motion sensor calibrate
	motionSensor.on('calibrated', function() {
		console.log("Motion calibrated");
	});

	// Motion sensor starts
	motionSensor.on('motionstart', function (data) {
		if (motionFlag) {
			// stop watch resets back to 0 and doesnt start
			console.log("Motion detected");

			// Get time when motion sensor started
			motionStartTime = new Date().getTime();

			// Start checking for LS signals
			inputStartTime = new Date().getTime();
			
			// Check if its first round, if yes skip, else decode + space / decode
			if (firstRoundFlag == 1) {

				firstRoundFlag = firstRoundFlag + 1;

			} else {

				// Check time for 2 purpose
				// 1. Decode + Add space for word
				// 2. Decode between letters
				checkTimeDifference = (motionStartTime-motionEndTime)/1000;
				console.log("Idle time:", checkTimeDifference);

				// If idle time > 20 seconds, 
				if (checkTimeDifference >= 12) {
					// add last decode for the message 
					console.log("Motion sensor switched off");
					console.log("The output string is:", realString);		//ssslsl
					io.emit('realString', realString);
					motionFlag = false;
				} 

				// Decode and add space
				else if (checkTimeDifference >= 8 && checkTimeDifference < 12) {
					if (motionString == 'SSSLSL'){
						console.log("End of transmission !");
						motionFlag = false;
					} else {
						var tmp = "" + decodeStringWithSpace(motionString);
						motionString = "";
						realString = realString + tmp;
						console.log("The current string is:", realString);
						io.emit('realString', realString);
					}

				// Normal decode without space
				} else if (checkTimeDifference >= 4 && checkTimeDifference < 8) {
					// decode function here
					if (motionString == 'SSSLSL'){
						console.log("End of transmission !");
						motionFlag = false;
					} else {
						var tmp2 = "" + decodeStringWithoutSpace(motionString);
						motionString = "";
						realString = realString + tmp2;
						console.log("The current string is:", realString);
						io.emit('realString', realString);
					}
				}
			}
		}
	});

	// Motion sensor ends
	motionSensor.on('motionend', function (data) {
	
		if (motionFlag) {
			// Time when motion sensor stop getting input
			inputEndTime = new Date().getTime();

			checkTimeDifference2 = (inputEndTime - inputStartTime)/1000;

			// If time > 7, push Long motion else push Short motion
			pushSignals(checkTimeDifference2);

			console.log("Current string:", motionString);
			io.emit('currentSignalString', motionString);

			// Get time when motion sensor processing ends
			console.log("Motion ends");
			motionEndTime = new Date().getTime();
		}
	});
});

io.sockets.on('connection', function(socket) {
	// Swtich motion sensor on and off
    socket.on('motion:switch', function() {

    	// If flag is True, change to False to turn it off
    	// Else if flag is False, change to True to turn it on
    	// Sends signal to client telling it that Motion Sensor switch has been clicked
        if (motionFlag) {
        	console.log("Motion sensor switched off");
        	motionFlag = false;
        	io.emit('mapMotionOff');

        	// Reset all the variables
        	firstRoundFlag = 1;
        	motionString = "";
        	realString = "";

        	// Reset signals sent to client page
        	io.emit('clearCurrentSignal');
        	io.emit('clearSignalString');
        	io.emit('clearOutputString');

        } else {
        	console.log("Motion sensor switched on");
        	motionFlag = true;
        	io.emit('mapMotionOn');
        }
    });
});