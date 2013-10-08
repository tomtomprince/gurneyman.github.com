/*
 * All the JS required for controlling the catalog.
 */

var prices = { 
	"Brazilian Santos" : 9.95, 
	"Ethiopian Yirgacheffe" : 9.95, 
	"Decaf Breakfast Blend" : 9.95, 
	"Bodium French Press": 19.95, 
	"Bodium Bean Grinder" : 19.95

};
$(document).ready(function(){
	
	// add event handlers
	addCartButtonEvent();

	// Initial Cart Load
	cartUpdate();
});

function buildItem(itemName){
	
	var newTableRow = "";
	if(itemName){ // Only create the new tr if cookies exist. Otherwise it is emptied
		newTableRow += '<tr class="cart_item">';
		newTableRow += 		'<td><span class="citem_name">' + itemName + '</span></td><!-- Must match name of cookie -->';
		newTableRow +=			'<td class="citem_qty"><input type="text" class="input-mini" value="' + $.cookies.get(itemName) +'"></input></td>';
		newTableRow +=			'<td class="citem_uprice">' + prices[itemName] + '</td>';
		newTableRow +=			'<td class="citem_price dollarCol">' + (parseFloat(prices[itemName]) * $.cookies.get(itemName)).toFixed(2) + ' </td>';
		newTableRow += '</tr>';
	}
	// Insert newly created table row before the subtotal
	$("#subtotal").before(newTableRow);
}

function cartUpdate(){
	
	// Get updated quantities and update cookies appropriately
	$('.cart_item').each(function(){
		var cookieName = $(this).find('.citem_name').text();
		var newQty = $(this).find('.citem_qty input').val();
		
		// Set the cookie again, with a value of null if newQty is less than 1
		$.cookies.set(cookieName, (newQty > 0) ? newQty : null);
	});

	// Clear all the items out
	$('.cart_item').remove();
	// Reload and rebuild
	var ary = $.cookies.get();
	if(ary){
	for(var i in ary){
		buildItem(i);
	}
	}

	// Recalculate subtotal and update
	subTotal();
	calcTax();
	calcTotal();

}
function clearCart(){
	// Get cookies
	$('.cart_item').each(function(){
		var cookieName = $(this).find('.citem_name').text();
		var newQty = 0;
		
		// Set the cookie again, with a value of null if newQty is less than 1
		$.cookies.set(cookieName, (newQty > 0) ? newQty : null);
	});

	cartUpdate();
}
/* Functions only called when cartUpdate() is called */
function calcTotal() {
	var subTotal = parseFloat($('#subtotalval').text());
	var taxAmt = parseFloat($('#taxAmt').text());
	var total = subTotal + taxAmt;
	$('#total').text("$" + total.toFixed(2));
}
function calcTax(){
	var subTotal = parseFloat($('#subtotalval').text());
	var taxRate = parseFloat($('#taxRate').text()) / 100;
	var taxAmt = subTotal * taxRate;
	$('#taxAmt').text(taxAmt.toFixed(2));
}
function subTotal(){
	var sum = 0;

	$('.citem_price').each(function(){
		sum += parseFloat($(this).text());
	});
	
	$('#subtotalval').text(sum.toFixed(2));
}
function addCartButtonEvent(){
	$('#cart_update').click(function(){
		cartUpdate();
	});
	$('#cart_clear').click(function(){
		clearCart();
	});
	$('#cart_checkout').click(function(){
		alert("Your total is " + $('#total').text());
	});
}