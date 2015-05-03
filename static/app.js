	//Returns selected checkbox(es) values by checkboxName argument
	function getSelectedCheckboxes(checkboxNames){
		var result = [];
		var checkboxes = document.getElementsByName(checkboxNames);
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				result.push(checkboxes[i].value);
			}
		}
		return result;
	}
	//Function encodes selected choices as XML and sends to server.
	function submitOrder(){
		var sizeSelected = document.getElementById('size').value;
		var crustSelected = document.getElementById('crustType').value;
		var cheeseSelected = document.getElementById('cheese').value;
		var toppingsSelected = getSelectedCheckboxes('toppings');
		var xml = "<PizzaOrder>";
		xml += "<size>" + sizeSelected + "</size>";
		xml += "<crustType>" + crustSelected + "</crustType>";
		xml += "<cheese>" + cheeseSelected + "</cheese>";
		xml += "<topping>" + toppingsSelected.join('</topping><topping>') + "</topping>";
		xml += "</PizzaOrder>";
		// this will send the pizza order to the server.
		$.ajax({
			url: "/order",
			data: xml,
			type: 'POST',//post is sending data to server
			contentType: "text/xml",//content type tells server it is xml
			dataType: "text",
			success : function(){//data is the server response data
				alert('WACKY PIZZA ORDER SUBMITTED!');
			},
			error : function (){  
				alert('ORDER FAILED TRY AGAIN');
			} 
		});
	}