var assert = chai.assert;

suite('PRUEBAS PARA BEXEC', function() {
	setup(function(){
		var str = "dBdXXXXDBBD";
		var re = /d(b+)(d)/ig;
	});
	test('NULL', function() {
		regexp.lastIndex = 3;
		assert.equal(re.bexec(str), null);
    });	
});

suite('PRUEBAS PARA COMPROBAR ERRORES', function() {	
	test('Operador', function() {
		INPUT.value = 'var operacion = 5 $ 3;';
        main();
		assert.match(OUTPUT.innerHTML, /Syntax error/);
	});
	
	test('Id', function() {
		INPUT.value = 'var 1111 = 5 + 3;';
        main();
		assert.match(OUTPUT.innerHTML, /Syntax error/);
	});
});

suite('PRUEBAS PARA LA SALIDA', function() {
	test('Soporta localStorage', function() {
		INPUT.value = 'var a = 3;';
        main();
		assert.equal(OUTPUT.innerHTML,'{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "a",\n        "arity": "name"\n    },\n    "second": {\n        "value": 3,\n        "arity": "literal"\n    }\n}');
    });	
});