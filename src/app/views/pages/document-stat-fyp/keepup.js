//Function to display instructor input form
function showinstructor() {
	var x = document.getElementById("myContent");
	var y = document.getElementById("instructor");
    if(y.style.display == "none"){
    	if(x.style.display == "block"){
    		x.style.display = "none";
    	}
    	y.style.display="block";
    	$('html,body').animate({
        scrollTop: $("#instructor").offset().top
    }, 'slow');
    }
}

//Function to display student input form
function showcontent() {
	var x = document.getElementById("myContent");
	var y = document.getElementById("instructor");
    if(x.style.display == "none"){
    	if(y.style.display == "block"){
    		y.style.display = "none";
    	}
    	x.style.display="block";
    	$('html,body').animate({
        scrollTop: $("#myContent").offset().top
    }, 'slow');
    }
}

//Function to Validate User ID
//Valid Student User ID: 12345
//Valid Instructor User ID: 67890
function checkuser(){
	var x = document.getElementById("uuid").value
	console.log("hi")
	if(x == "12345"){
		showcontent()
	}else if(x == "67890"){
		showinstructor()
	}else{
		var text = "Invalid User ID. Try Again."
		document.getElementById("validtext").innerHTML = text;
		return false;
	}
}

//Function to validate Student Form Input
function validateForm(){
	var x = document.forms["form"]["textinput"].value;
	var y = document.getElementById("fileselect").files.length;
	var y = document.forms["form"]["fileselect"].value;
	if (x=="" && y== 0){
		alert("No file selected and no text input.");
		return false;
	}
	if (x!="" && y!=0){
		alert("Choose ONE method of input.");
		return false;
	}
}

//Function to submit request to server 
$(document).ready(function(){
	//var form = document.getElementById("form")
	$("#form").submit(function(e){
		e.preventDefault();
		validation = validateForm();
		if (validation == false){
			return false;
		} else{
		var formData= new FormData($('form')[0]);
			$("#btnSubmit").prop("disabled",true);
			$('html,body').animate({scrollTop: $("#loading").offset().top
    		}, 'slow');
        	$("#loading").show();
			$.ajax({
				type:"POST",
				url:"keepup.php",
				data: formData,
				processData: false,
				contentType: false,
				cache: false
			}).done(function(data, textStatus, err){
				$("#loading").hide();
				document.write(data);
			})
		}
	})
})

