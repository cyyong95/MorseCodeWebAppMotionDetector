var chai = require('chai');
var expect = chai.expect;
var checkTime = require('./unit-test1');

// Check for Long, Short & Invalid motion sensor input 
describe('checkTime', function() {
 	
 	// Check for short signal
	it('getSignal() should return signal "S"', function() {
		var findTotal = new checkTime([{
		 	timetaken: 3
	 	}]);
	 	expect(findTotal.getSignal()).to.equal('S');
	});

	// Check for long signal
	it('getSignal() should return signal "L"', function() {
		var findTotal = new checkTime([{
		 	timetaken: 8
	 	}]);
	 	expect(findTotal.getSignal()).to.equal('L');
	});

	// Check for invalid signal
	it('getSignal() should return invalid', function() {
		var findTotal = new checkTime([{
		 	timetaken: -1
	 	}]);
	 	expect(findTotal.getSignal()).to.equal('invalid');
	});
});
