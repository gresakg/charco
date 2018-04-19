;(function($) {

	var txt = $("#charco").val();

	$("#charco").on('keyup',function(){
		txt = $(this).val();
		var cl = txt.length;
		$("#counter").val(cl);
	});
	$("#charco").on('paste',function() {
		var el = this;
		setTimeout(function(){
			txt = $(el).val();
			var cl = txt.length;
			$("#counter").val(cl);
		},100);
	});
	$("#req").on('change',function() {
		var reqlen = $(this).val();
		var ntxt = $("#charco").val().substr(0,reqlen);
		$("#charco").val(ntxt);
	});
	$("#oldtxt").on('click',function(){
		$("#charco").val(txt);
		$("#req").val('');
	});
	
	// named function update counter would make sense

})(jQuery);