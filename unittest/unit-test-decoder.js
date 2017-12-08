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
	'LLSSLL': 'SL'
};

function decodeSignal(inputSignal) {
	this._inputSignal = inputSignal;
}

// Get the time in array and return signal using reduce function
decodeSignal.prototype.getSignal = function() {
	if (this._inputSignal.length) {
		return this._inputSignal.reduce(function(aSignal, inputSignal) {
				if (inputSignal.idletime >= 4 && inputSignal.idletime < 8) {
					for (var key in morseTable) {
						if (inputSignal.signalString == key) {
							aSignal = aSignal + morseTable[key];
						}
					}
				}

				else if (inputSignal.idletime >=8 && inputSignal.idletime <12) {
					for (var key in morseTable) {
						if (inputSignal.signalString == key) {
							aSignal = aSignal + morseTable[key] + " ";
						}
					}
				}
				return aSignal;
		}, "");
	}
	return 0;
};

module.exports = decodeSignal;
