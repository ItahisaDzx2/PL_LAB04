    function dump(fileName) {
       $.get(fileName, function (data) {
          $("#INPUT").val(data);
       });
    };