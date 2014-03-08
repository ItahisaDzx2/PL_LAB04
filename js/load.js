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
	
	$(document).ready(function() {
		$("#fileinput").change(calculate);
	});
	
	function calculate(evt) {
		
		var f = evt.target.files[0]; 

		if (f) {
			var r = new FileReader();
			r.onload = function(e) { 
				$("#INPUT").val(e.target.result);
				if (window.localStorage) {localStorage.INPUT = e.target.result;}
			}
			r.readAsText(f);
		} else { 
			alert("Failed to load file");
		}
	}