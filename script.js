let selectedRow = null;

window.onload = function() {
	// get date information from the backend
	let d = new Date();

	let month = d.getMonth() + 1;
	let day = d.getDate();

	let output = d.getFullYear() + '/' + month + '/' + day;
	document.getElementbyID("date").value = output;
}

function SearchFunction(){
	var productname = document.getElementById("productType").value;

	console.log(productname);
      if (productname == ''){
        alert("Please select the product you want.");
        return;
      }
      var xhttp = new XMLHttpRequest();
      var url = "http://studytonight.web.illinois.edu/products_keyword/"+productname;
      console.log(url);
      xhttp.open("GET", url, false);
      xhttp.onload = function() {
          console.log("button clicked");
          console.log(this.readyState);
          if ( this.status == 200) {
              console.log("successfully clicked");
              alert("Login successfully");
              console.log(this.responseText)
              //window.location = "main.html"; // Redirecting to other page.
          }else{
              console.log("asdsadsads clicked");
              //loginErrorMsg.style.opacity = 1;
              alert(this.responseText);
          }
      };
      console.log("aboou to send!")
      xhttp.send();
      console.log("about to return!")

}

$(function(){

	//button select all or cancel
	$("Add").click(function () {
		var all = $("input.select-all")[0];
		all.checked = !all.checked
		var checked = all.checked;
		$("input.select-item").each(function (index,item) {
			item.checked = checked;
		});
	});

	//button select invert
	$("Edit").click(function () {
		$("input.select-item").each(function (index,item) {
			item.checked = !item.checked;
		});
		checkSelected();
	});

	//button get selected info
	$("Delete").click(function () {
		var items=[];
		$("input.select-item:checked:checked").each(function (index,item) {
			items[index] = item.value;
		});
		if (items.length < 1) {
			alert("no selected items!!!");
		}else {
			var values = items.join(',');
			console.log(values);
			var html = $("<div></div>");
			html.html("selected:"+values);
			html.appendTo("body");
		}
	});

	//column checkbox select all or cancel
	$("input.select-all").click(function () {
		var checked = this.checked;
		$("input.select-item").each(function (index,item) {
			item.checked = checked;
		});
	});

	//check selected items
	$("input.select-item").click(function () {
		var checked = this.checked;
		console.log(checked);
		checkSelected();
	});

	//check is all selected
	function checkSelected() {
		var all = $("input.select-all")[0];
		var total = $("input.select-item").length;
		var len = $("input.select-item:checked:checked").length;
		console.log("total:"+total);
		console.log("len:"+len);
		all.checked = len===total;
	}
});

function onFormSubmit() {
	const formData = readFormData();
	if (selectedRow == null)
		insertNewRecord(formData);
	else
		updateRecord(formData);
	resetForm();
}

function readFormData() {
	var formData = {};
	formData["storeName"] = document.getElementById("storeName").value;
	formData["productName"] = document.getElementById("productName").value;
	return formData;
}

function insertNewRecord(data) {
	let table = document.getElementById("shoppingList").getElementsByTagName('tbody')[0];
	let newRow = table.insertRow(table.length);
	cell1 = newRow.insertCell(0);
	cell1.innerHTML = data.storeName;
	cell2 = newRow.insertCell(1);
	cell2.innerHTML = data.productName;
}

function resetForm() {
	document.getElementById("storeName").value = "";
	document.getElementById("productName").value = "";
	document.getElementById("quantity").value = "";
	document.getElementById("price").value = "";
	selectedRow = null;
}

function onEdit(td) {
	selectedRow = td.parentElement.parentElement;
	document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
	document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
	document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
	document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
	selectedRow.cells[0].innerHTML = formData.fullName;
	selectedRow.cells[1].innerHTML = formData.empCode;
	selectedRow.cells[2].innerHTML = formData.salary;
	selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
	if (confirm('Are you sure to delete this record ?')) {
		row = td.parentElement.parentElement;
		document.getElementById("employeeList").deleteRow(row.rowIndex);
		resetForm();
	}
}