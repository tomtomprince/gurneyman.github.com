/*
 * All the JS required for controlling the catalog.
 */

$(document).ready(function(){
		
		
		/*  Begin xml parsing JS */
		/*
		 * This is the function that does the actual parsing. It is called whenever
		 * $.ajax() successfully retrieves an xml file.
		 * 
		 */
		
		function parse(document){
			
			// First, let's find our divs that are going to hold our data within shop.html
			var categories = $("#categories");
			var items = $("#items");
			var featured = [];
			

			// Next, clear them out
			categories.text("");
			items.text("");
			
			/*	
				This is where all the code to populate data goes
				For each category, I'll want to:
					1)	Add the name of the category as a list item in the categories div
					2)	add the items within into a hidden submenu containing all the items
					3)	add any featured items to the featured array
					4)	add click logic so the categories show/hide their submenus.
					5)	add click logic so the items display detailed information in the items div
					6)	By default, populate items with items from the featured array. If there are no
						featured items, display all items from the first category.
			*/

			// Start the list in categories div
			categories.append('<ul>');

			// Work through each category
			$(document).find("category").each(function(){
			    
			    var current 	= $(this);
			    var catType		= current.find('type').text();
			    var itemsAry 	= [];
				
				// Keep track of how many items we've processed.
				// This acts as a subscript 
				var itemNum = 0;

				// Create an array with all our item info.
				current.find('item').each(function(){
				    
				    // Test code for finding object attributes
					//alert("found: " + current.find('item name')[itemNum].innerHTML);
				    

				    var obj = { };
				        
				    obj.name 		= current.find('item name')[itemNum].innerHTML;
				    obj.imgurl 		= current.find('item imgurl')[itemNum].innerHTML;
				    obj.description = current.find('item description')[itemNum].innerHTML;
				    obj.price 		= current.find('item price')[itemNum].innerHTML;
				    obj.quantity 	= current.find('item quantity')[itemNum].innerHTML;
				    obj.featured 	= current.find('item featured')[itemNum].innerHTML;

				    // Move to the next Item
				    itemNum++;
				    
				    // Test code to cycle through obj and make sure values are correct.
				    //for (attr in obj){
				    //	alert("obj." + attr + " = " + obj[attr]);
				    //}
				    
				   
			    	itemsAry.push(obj);

			    	// 
			    	if(obj.featured === "true")
			    	{
			    		alert(obj.featured);
			    	}
				});

				



			    	// Anything that needs to be added to #categories goes here.

			    	// Build the top of the category list
		    		categories.append(
		    			'<li>'+ catType +
				    		'<ul>'					
					); // End of .append


					// Add the items
					for(item in itemsAry)
					{
						var iName = itemsAry[item].name;
						var iNameTrimmed = iName.replace(" ", "");
						categories.append(
							
							'<li><a href="#" id="' + iNameTrimmed + '">' + iName + '</a></li>'
						); // End of .append

						
						// onClick() load itemsAry[item].allattributes into #items
						// I'm not sure why spaces are messing things up
						// It's not the link generating code.
						// It works when I
						var clickid = '#' + iNameTrimmed;
						alert(clickid);
						$(clickid).click(function(){
							alert(clickid + "clicked");
						});
					} // End of item for loop
					// Build the bottom and close it out.
					categories.append(
						'</ul>' +
							'</li>'
					); // End of .append
			}); // end of .find("category")
			
			// End the category menu list
			categories.append('</ul>');
			/* This works. Use as a template for loading data.
			$(document).find("item").each(function(){
			    $("#catalog").append(
				'<p>Name: '+$(this).find('name').text() +
				'<br /> Description: '+$(this).find('description').text()+
				'<br /> Price: '+$(this).find('price').text()+
				'<br /> Quantity: '+$(this).find('quantity').text()+
				'</p>'
				);// End of .append
			*/
		}// End of parse
		
		$.ajax({
			type: "GET",
		    url: 'assets/data/catalog.xml', // name of file you want to parse
		    dataType: "xml",
		    success: parse,
			error: function(){alert("Error: Something went wrong");}
		});
		/* End xml parsing JS */		
});
		
