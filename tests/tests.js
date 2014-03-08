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
	setup(function(){
		var str;
		var re;
	});
	test('NULL', function() {
		str = "dBdXXXXDBBD";
		re = /d(b+)(d)/ig;
		re.lastIndex = 3;
		assert.equal(re.bexec(str), null, 'lastIndex = 3 <> 4 = index');
    });	
	test('m', function() {
		str = "dBdXXXXDBBD";
		re = /d(b+)(d)/ig;
		re.lastIndex = 7;
		assert.isArray(re.bexec(str), '["DBBD", "BB", "D", index: 7, input: "dBdXXXXDBBD"]');
		re.lastIndex = 7;
		assert.notEqual(re.bexec(str), null, '["DBBD", "BB", "D", index: 7, input: "dBdXXXXDBBD"]');
    });	
});

suite('PRUEBAS PARA MAKE() Y GETTOK()', function() {
	setup(function(){
		var str;
		var STRING;
		var n;
		var from;
		var i;
	});
		
	test('make() y getTok()', function() {
		var make = function (type, value) {
			return {
				type: type,
				value: value,
				from: from,
				to: i
			};
		};
		var getTok = function() {
			  var str = m[0];
			  i += str.length; // Warning! side effect on i
			  return str;
		};
		str = 'var a = "string"';
		STRING = /('(\\.|[^'])*'|"(\\.|[^"])*")/g;
		i = STRING.lastIndex = 8;
		from = i;
		m = STRING.bexec(str);
		var n = getTok();
		assert.equal(n, '"string"');
		assert.equal(i, 16);
		assert.isObject(make('name', n));
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

suite('PRUEBAS PARA LA MAIN()', function() {
	test('Asignación', function() {
		INPUT.value = 'var a = 3;';
        main();
		assert.equal(OUTPUT.innerHTML,'{\n    "value": "=",\n    "arity": "binary",\n    "first": {\n        "value": "a",\n        "arity": "name"\n    },\n    "second": {\n        "value": 3,\n        "arity": "literal"\n    }\n}');
    });	
	test('Comentario', function() {
		INPUT.value = '// Comentario';
        main();
		assert.equal(OUTPUT.innerHTML, 'null');
    });	
});

suite('PRUEBAS PARA LA TOKENS()', function() {
	test('Asignación', function() {
		source = 'var a = 3;';
        tokens = source.tokens();
		assert.isArray(tokens, 'Casó con los tipos: name, name, operator, number, operator');
	});	
	test('Comentario', function() {
		source = '// Comentario';
        tokens = source.tokens();
		assert.deepEqual(tokens, [], 'Devuelve el JSON vacío xq los comentarios no los incluye');
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
	test('Variable no declarada', function() {
		var parse = make_parse();
		var source = 'if (a === 3)';
		var string, tree;
		try {
			tree = parse(source);
			string = JSON.stringify(tree, ['key', 'name', 'message',
				 'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		} catch (e) {
			string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
					'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
		};
		assert.match(string, /error/);
		assert.match(OUTPUT.innerHTML, /error/);
    });	
});