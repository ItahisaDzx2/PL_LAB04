
window.onload = function() {		// Cuando se cargue la página se ejecuta lo que está aquí dentro
	// Si el navegador soporta localStorage y tenemos algo almacenado, pues lo cargamos en el textarea
    if (window.localStorage && localStorage.INPUT) {								
		$("#INPUT").val(localStorage.INPUT);		
    } else {
		$("#INPUT").val('var a = "hello"; // initialize a\nvar b = function(x) {\n	var c = 3;\n	return x+c;\n};')
	}
};