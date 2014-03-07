var assert = chai.assert;

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
		assert.equal(re.bexec(str), null);
    });	
});

suite('PRUEBAS PARA DUMP GET Y AJAX', function() {
	test('NULL', function() {
		dump_get('assignment.txt');
		assert.equal($("#INPUT").val(), 'var a = 2;');
    });	
	test('m', function() {
		dump_ajax(expression);
		assert.equal($("#INPUT").val(), 'var a = 2+3*5;');
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