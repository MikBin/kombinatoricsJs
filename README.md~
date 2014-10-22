# Javascript library of auxiliary functions for daily programming



A collection of routines for programming in javascript

## Dependencies

no dependencies, works with commonJs, amd, or browser global

## Usage Examples

```javascript
	var auxil = require('./auxil');

	/*example of logging to file*/
	var log = auxil.Logger({
    'storeTime': true,
    'id': 'testSCript-1',
    'fs': fs,
    'filePath': 'tstlog.txt'
	});

	/*example of logging to stout using util in nodejs*/
	var logU = auxil.Logger({
    	'util': util,
    	'defaultDepth': 2
	});

	/*recoursive fibonacci to use in memoize*/
	function fibonacci(n) {
   		if (n < 2){
     		return 1;
   		} else {
     		return fibonacci(n-2) + fibonacci(n-1);
   		}
	}
	/*testing memoize*/
	var tstCache = {};
	var fib = auxil.memoize(fibonacci, {
    	limit: 100,
    	cache: tstCache
	});


	/*set up for caseof*/
	var cases = {
    	'1': function() {
        	log.log(fib(~~ (10 * Math.random())));
    	},
    	'2': function() {
        	log.log(fib(~~ (100 * Math.random())));
    	},
    	'default': function() {
        	log.log('default');

    	}
	};

	/*testing caseOf and memoize method*/
	var caseSwitch = auxil.caseOf(cases);

	for (var i = 0; i < 5000; ++i) {
    	caseSwitch(~~(Math.random() * 3));
	}

	/*logging cache*/
	logU.log(tstCache);


```





