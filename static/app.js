function getSelectedRadioValue(radioName) {
	   var radios = document.getElementsByName(radioName);
	   for (var i = 0; i < radios.length; i++) {
		   if (radios[i].checked) {
			   return radios[i].value;
		   } 
	   } 
	   return null;
	}
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
	
	function submitOrder(){
		// this will alert the size that the user selected
		var sizeSelected = document.getElementById('size').value;
		var crustSelected = document.getElementById('crustType').value;
		var cheeseSelected = getSelectedRadioValue('cheese');
		var toppingsSelected = getSelectedCheckboxes('toppings');
		
		//var cheeseSelected = document.getElementById('cheese').value;
		alert('Size selected is : ' + sizeSelected);
		alert('Crusty the clown selected is : ' + crustSelected);
		alert('Cheese selected is : ' + cheeseSelected);
		
		var xml = "<PizzaOrder>";
		xml += "<size>" + sizeSelected + "</size>";
		xml += "<crustType>" + crustSelected + "</crustType>";
		xml += "<cheese>" + cheeseSelected + "</cheese>";
		xml += "<toppings><topping>" + toppingsSelected.join('</topping></topping>') + "</topping></toppings>";
		xml += "<PizzaOrder>";
		
		
		//var xml = "<PizzaOrder><size>" + sizeSelected + "</size><crustType>" + crustSelected + "</crustType></PizzaOrder>";
		alert('sending: ' + xml);
		alert('Your undead pizza toppings are : ' + toppingsSelected);
		
		// this will send the pizza order to the server.
		$.ajax({
			url: "/order",
			data: xml, //data sending to server 'MEOWMIX'
			type: 'POST',//post is sending data to server
			contentType: "text/xml",//content type tells server it is xml
			dataType: "text",
			success : function(data){//data is the server response data
				alert('done'+ data);//'you sent me ''MEOWMIX''
			},
			error : function (xhr, ajaxOptions, thrownError){  
				console.log(xhr.status);          
				console.log(thrownError);
			} 
		});
	}