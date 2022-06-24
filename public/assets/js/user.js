//all fields
function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
        alert("All the fields must be filled out");
        return false;

    }
}

//Password criteria
function checkForm(form) {
    if (form.pwd1.value != "") {
        if (form.pwd1.value.length < 8) {
            alert("Error: Password must contain at least eight characters!");
            form.pwd1.focus();
            return false;
        }
        re = /[0-9]/;
        if (!re.test(form.pwd1.value)) {
            alert("Error: password must contain at least one number (0-9)!");
            form.pwd1.focus();
            return false;
        }
        re = /[a-z]/;
        if (!re.test(form.pwd1.value)) {
            alert("Error: password must contain at least one lowercase letter (a-z)!");
            form.pwd1.focus();
            return false;
        }
        re = /[A-Z]/;
        if (!re.test(form.pwd1.value)) {
            alert("Error: password must contain at least one uppercase letter (A-Z)!");
            form.pwd1.focus();
            return false;
        }
    } else {
        alert("Error: Please check that you've entered and confirmed your password!");
        form.pwd1.focus();
        return false;
    }

    alert("You entered a valid password: " + form.pwd1.value);
    return true;
}

//Id Generator
var counter = 0;
function func() {
    var y = document.forms["myForm"]["fname"].value;
    if (y == ""){
        alert("Fill all the fields first")
        return false;
        

    }
    else{
        
        if (counter == 0) {
            var d = '_' + Math.random().toString(36).substr(2, 9);
            document.getElementById("demo").innerHTML = d;
            alert("Please note down this id or take a screenshot")
            counter++;

        }
        
    }
        
    }


//Pass the cursor
 function moveCursor(fromTextBox, toTextBox) 
    {
        // Get the count of characters in fromTextBox
        var length = fromTextBox.value.length;
        // Get the value of maxLength attribute from the fromTextBox
        var maxLength = fromTextBox.getAttribute("maxLength");
        if (length == maxLength) 
        {
            // If the number of charactes typed in the fromText is
            // equal to the maxLength attribute then set focus on
            // the next textbox
            document.getElementById(toTextBox).focus();
        }
    }