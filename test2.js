var chai = require('chai');
var expect = chai.expect;
var decodeSignal = require('./unit-test2');

// Check for Long, Short & Invalid motion sensor input 
describe('decodeSignal', function() {
 	
 	// Return single alphabet
	it('getSignal() should return alphabet A', function() {
		var currentSignalString = new decodeSignal([{
			signalString: 'SL',
			idletime: 4
	 	}]);
	 	expect(currentSignalString.getSignal()).to.equal('A');
	});

	// Return a word
	it('getSignal() should return alphabet AB', function() {
		var currentSignalString = new decodeSignal([{
			signalString: 'SL',
			idletime: 4
		}, {
			signalString: 'LSSS',
			idletime: 5
	 	}]);
	 	expect(currentSignalString.getSignal()).to.equal('AB');
	});

	// Return a letter with space
	it('getSignal() should return alphabet A B', function() {
		var currentSignalString = new decodeSignal([{
			signalString: 'SL',
			idletime: 9
		}, {
			signalString: 'LSSS',
			idletime: 5
	 	}]);
	 	expect(currentSignalString.getSignal()).to.equal('A B');
	});

	// Return not found when signal not in morse code table
	it('getSignal() should return A because first signal string not found', function() {
		var currentSignalString = new decodeSignal([{
			signalString: 'SLSSSSSSS',
			idletime: 9
		}, {
			signalString: 'SL',
			idletime: 5
	 	}]);
	 	expect(currentSignalString.getSignal()).to.equal('A');
	});
});