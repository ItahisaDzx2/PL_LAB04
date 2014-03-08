var assert = chai.assert;

suite('PRUEBAS PARA EL LOCALSTORAGE', function() {
	test('Soporta localStorage', function() {
		if (window.localStorage) {
			localStorage.INPUT = 'var a = "hello"; // initialize a\nvar b = function(x) {\n	var c = 3;\n	return x+c;\n};';
			assert.deepEqual(localStorage.INPUT, 'var a = "hello"; // initialize a\nvar b = function(x) {\n	var c = 3;\n	return x+c;\n};');
		}
	});
});

suite('PRUEBAS PARA BEXEC()', function() {
	test('NULL', function() {
		var str = "dBdXXXXDBBD";
		var re = /d(b+)(d)/ig;
		re.lastIndex = 3;
		assert.equal(re.bexec(str), null);
    });	
});

suite('PRUEBAS PARA DUMP_GET() Y DUMP_AJAX()', function() {
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

suite('PRUEBAS PARA LA MAIN()', function() {
	test('Asignación', function() {
		INPUT.value = 'var a = 3;';
        main();
		assert.equal(OUTPUT.innerHTML,'{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "a",\n        "arity": "name"\n    },\n    "second": {\n        "value": 3,\n        "arity": "literal"\n    }\n}');
    });	
	test('Comentario', function() {
		INPUT.value = '// Comentario';
        main();
		assert.equal(OUTPUT.innerHTML,'null');
    });	
});

suite('PRUEBAS PARA LA MAIN() y MAKE_PARSE()', function() {
	test('Asignación', function() {
		var parse = make_parse();
		var source = 'var a = "2";';
		var string, tree;
		try {
			tree = parse(source);
			string = JSON.stringify(tree, ['key', 'name', 'message',
				 'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		} catch (e) {
			string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
					'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		};
		assert.equal(string,'{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "a",\n        "arity": "name"\n    },\n    "second": {\n        "value": "2",\n        "arity": "literal"\n    }\n}');
    });
	test('Operador !==', function() {
		var parse = make_parse();
		var source = 'if (3 !== 4){}';
		var string, tree;
		try {
			tree = parse(source);
			string = JSON.stringify(tree, ['key', 'name', 'message',
				 'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		} catch (e) {
			string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
					'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		};
		assert.equal(string,'{\n    "value": "if",\n    "arity": "statement",\n    "first": {\n        "value": "!==",\n        "arity": "binary",\n        "first": {\n            "value": 3,\n            "arity": "literal"\n        },\n        "second": {\n            "value": 4,\n            "arity": "literal"\n        }\n    },\n    "second": null,\n    "third": null\n}');
    });
	test('Comentario', function() {
		var parse = make_parse();
		var source = '/* Comentario */';
		var string, tree;
		try {
			tree = parse(source);
			string = JSON.stringify(tree, ['key', 'name', 'message',
				 'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		} catch (e) {
			string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
					'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		};
		assert.equal(string, 'null');
		assert.equal(OUTPUT.innerHTML, string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;'));
    });	
});