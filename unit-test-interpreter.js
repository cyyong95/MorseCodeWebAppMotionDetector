function checkTime(inputTime) {
	this._inputTime = inputTime;
}

// Get the time in array and return signal using reduce function
checkTime.prototype.getSignal = function() {
	if (this._inputTime.length) {
		return this._inputTime.reduce(function(aSignal, inputTime) {

				// If motion sensor input time between 0 and 7, give short motion
				if (inputTime.timetaken >0 && inputTime.timetaken <7) {
					var tmpabc = 'S';
				} 
				// If motion sensor input time more than 6, give long motion
				else if (inputTime.timetaken > 6) {
					var tmpabc = 'L';
				} 
				// If motion sensor input time is negative, give invalid
				else {
					return 'invalid';
				}
				return tmpabc;
		}, "");
	}
	return 0;
};

module.exports = checkTime;
