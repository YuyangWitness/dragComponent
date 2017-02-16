(function(w){
	var a = function(el){
		el.addEventListener("click",function(){
			alert("a");
		})
	}
	w.a = a;
})(window)
