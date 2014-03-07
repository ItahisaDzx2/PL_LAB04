	function dump_ajax(fileName) {
		$.ajax({
			url : fileName,
            dataType: "text",
            success : function (data) {
				$("#INPUT").val(data);
				// Si el navegador soporta localStore almacenamos en el localStorage los datos introducidos
				if (window.localStorage) {localStorage.INPUT = data;}
            }
        });
      }
	function dump_get(fileName) {
		$.get(fileName, function (data) {
			$("#INPUT").val(data);
			if (window.localStorage) {localStorage.INPUT = data;}
		});
	};