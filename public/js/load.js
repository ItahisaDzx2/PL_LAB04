	function dump_ajax(fileName) {
		$.ajax({
			url : fileName,
            dataType: "text",
            success : function (data) {
				$("#INPUT").val(data);
            }
        });
      }
	function dump_get(fileName) {
		$.get(fileName, function (data) {
			$("#INPUT").val(data);
		});
	};