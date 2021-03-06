/*jslint evil: true */

/*members create, error, message, name, prototype, stringify, toSource,
    toString, write
*/

/*global JSON, make_parse, parse, source, tree */

// Transform a token object into an exception object and throw it.
//  http://stackoverflow.com/questions/17857670/javascript-prototype-throw-the-error-as-object-object-object-has-no-method
// Thanks Eliasib for pointing the error
Object.constructor.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t;
};

function main() {
	out.className = 'unhidden';
	$("#INIPUT").html($("#INPUT").val());
	
    var parse = make_parse();

    var source = INPUT.value;		// Almacena lo guardado en el textarea id="INPUT"
    var string, tree;
    try {
        tree = parse(source);
        //string = JSON.stringify(tree, ['type', 'value', 'from', 'to'],  4);
        string = JSON.stringify(tree, ['key', 'name', 'message',
             'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }
    OUTPUT.innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;');
};

window.onload = function() {
  PARSE.onclick = main;
  	// Si el navegador soporta localStorage y tenemos algo almacenado, pues lo cargamos en el textarea
    if (window.localStorage && localStorage.INPUT) {								
		$("#INPUT").val(localStorage.INPUT);		
    } else {
		$("#INPUT").val('var a = "hello"; // initialize a\nvar b = function(x) {\n	var c = 3;\n	return x+c;\n};')
	}
}
