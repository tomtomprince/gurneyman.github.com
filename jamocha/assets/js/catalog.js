/*
 * All the JS required for controlling the catalog.
 */


$(document).ready(function(){
	addTabEvent();
	addCartButtonEvent();
});

/*
	Sets an onClick event for tab category links
	Listens for all of them but ignores any child
	of an li with the "active" class.
*/
function addTabEvent(){
	$("#catalog li a").click(function(){
		if(!($(this).parent().hasClass("active"))){
			$(".tab-content").hide();
			$(".tab-content").fadeIn("slow");
		}
	});
}

function addCartButtonEvent(){
	$('.buy .btn').click(function(){
		var name = $(this).parentsUntil(".tab_head").children(".item_head").data("name");
		var qty;
		
		// If a cookie exists, add one more of this type of item.
		if($.cookies.get(name)){
			var qty = $.cookies.get(name);
			$.cookies.set(name, (qty + 1));
		}
		else
		{
			$.cookies.set(name, 1);
		}
		
		alert("You currently have " + $.cookies.get(name) + " " + name + " in your cart.");
		
	});
}