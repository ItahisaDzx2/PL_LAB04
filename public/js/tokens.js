"use strict";
// tokens.js
// created:		2010-02-23
// modified: 	2014-03-2014

// Produce an array of simple token objects from a string.
// A simple token object contains these members:
//      type: 	'name', 'string', 'number', 'operator'
//      value: 	string or number value of the token
//      from: 	index of first character of the token
//      to: 	index of the last character + 1

// Se crea función que devuelve m si al casar el lastIndex inicial coincide con el index
// Se utiliza cuando se crea la función tokens
RegExp.prototype.bexec = function(str) {		
	var i = this.lastIndex;
	var m = this.exec(str);
	if (m && m.index == i) return m;
	return null;
}

// Se crea una función que devuelve en JSON todo lo casado (id, num, string, 1operador, 2operador).
// Almacenando el type, value, from, i con ayuda de la función make
// Esta función se utiliza en parse.js
String.prototype.tokens = function () {
    var from;                   // The index of the start of the token.
    var i = 0;                  // The index of the current character.
    var n;                      // The number value.
    var m;                      // Matching
    var result = [];            // An array to hold the results.

    var WHITES              = /\s+/g;				// Casa con Carácter individual en espacio en blanco
    var ID                  = /[a-z_]\w*/gi;		// Casa con una palabra que contiene letras o dígitos y empieza con letras o _
    var NUM                 = /\b\d+(\.\d*)?([eE][+-]?\d+)?\b/g; // Casa con dígitos con coma flotante
    var STRING              = /('(\\.|[^'])*'|"(\\.|[^"])*")/g;	 // Casa con palabras entre "" ó '', y escapa \", \'
    var ONELINECOMMENT      = /\/\/.*/g;			// Casa con // comentario
    var MULTIPLELINECOMMENT = /\/[*](.|\n)*?[*]\//g;// Casa con /* comentario con multilínea */
	// Casa ===, !==, ++, +=, --, -=, ==, =<, =>, <=, <<, <>, >=, ><, >>, &&, ||
    var TWOCHAROPERATORS    = /(===|!==|[+][+=]|-[-=]|=[=<>]|[<>][=<>]|&&|[|][|])/g; 
	// Hemos añadido: ^%.
    var ONECHAROPERATORS    = /([-+*\/=()&|;:,<>{}[\]\^%.])/g; // May be some character is missing? 					  			  
    var tokens = [WHITES, ID, NUM, STRING, ONELINECOMMENT, 
                  MULTIPLELINECOMMENT, TWOCHAROPERATORS, ONECHAROPERATORS ];

    // Make a token object.
    var make = function (type, value) {
        return {
            type: type,
            value: value,
            from: from,
            to: i
        };
    };

	// El i = index of the current character, por lo que, al sumarle la longitud de la cadena casada se situa
	// en la cadena original al final de la subcadena casada. Sirve para avanzar en la cadena
    var getTok = function() {
      var str = m[0];
      i += str.length; // Warning! side effect on i
      return str;
    };

    // Begin tokenization. If the source string is empty, return nothing.
    if (!this) return; 

    // Loop through this text
    while (i < this.length) {			// Recorre hasta al final de la cadena moviendo el index = i
        tokens.forEach( function(t) { t.lastIndex = i;}); // Only ECMAScript5
        from = i;
		// Entra en la condición en la que el index sea igual al LastIndex
        // Ignore whitespace and comments
        if (m = WHITES.bexec(this) || 								
           (m = ONELINECOMMENT.bexec(this))  || 
           (m = MULTIPLELINECOMMENT.bexec(this))) { getTok(); }	// Sólo avanza en la cadena con getTok()
        // name.
        else if (m = ID.bexec(this)) {
            result.push(make('name', getTok()));
        } 
        // number.
        else if (m = NUM.bexec(this)) {
            n = +getTok();

            if (isFinite(n)) {
                result.push(make('number', n));
            } else {
                make('number', m[0]).error("Bad number");
            }
        } 
        // string
        else if (m = STRING.bexec(this)) {
            result.push(make('string', getTok().replace(/^["']|["']$/g,'')));
        } 
        // two char operator
        else if (m = TWOCHAROPERATORS.bexec(this)) {
            result.push(make('operator', getTok()));
        // single-character operator
        } else if (m = ONECHAROPERATORS.bexec(this)){
            result.push(make('operator', getTok()));
        } else {
          throw "Syntax error near '"+this.substr(i)+"'";
        }
    }
    return result;
};

