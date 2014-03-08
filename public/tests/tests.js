var assert = chai.assert;

suite('PRUEBAS PARA EL LOCALSTORAGE', function() {
	test('Soporta localStorage', function() {
		if (window.localStorage) {
			localStorage.INPUT = 'var a = "hello"; // initialize a\nvar b = function(x) {\n	var c = 3;\n	return x+c;\n};';
			assert.deepEqual(localStorage.INPUT, 'var a = "hello"; // initialize a\nvar b = function(x) {\n	var c = 3;\n	return x+c;\n};');
		}
	});
	
});

suite('PRUEBAS PARA BEXEC', function() {
	test('NULL', function() {
		var str = "dBdXXXXDBBD";
		var re = /d(b+)(d)/ig;
		re.lastIndex = 3;
		assert.equal(re.bexec(str), null);
    });	
	test('m', function() {
		var str = "dBdXXXXDBBD";
		var re = /d(b+)(d)/ig;
		re.lastIndex = 7;
		assert.equal(re.bexec(str), [ 'DBBD', 'BB', 'D', index: 7, input: 'dBdXXXXDBBD' ]);
    });	
});

suite('PRUEBAS PARA DUMP GET Y AJAX', function() {
	test('GET', function() {
		dump_get('assignment.txt');
		assert.isString($("#INPUT").val());
    });	
	test('AJAX', function() {
		dump_ajax('expression.txt');
		assert.isString($("#INPUT").val());
    });	
});

suite('PRUEBAS PARA COMPROBAR ERRORES', function() {	
	test('Operador', function() {
		INPUT.value = 'var operacion = 5 $ 3;';
        main();
		assert.match(OUTPUT.innerHTML, /Syntax error/);
	});
	
	test('Id', function() {
		INPUT.value = 'var 1$%&· = 5 + 3;';
        main();
		assert.match(OUTPUT.innerHTML, /Syntax error/);
	});
});

suite('PRUEBAS PARA LA SALIDA', function() {
	test('Asignación', function() {
		INPUT.value = 'var a = 3;';
        main();
		assert.equal(OUTPUT.innerHTML,'{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "a",\n        "arity": "name"\n    },\n    "second": {\n        "value": 3,\n        "arity": "literal"\n    }\n}');
    });	
});