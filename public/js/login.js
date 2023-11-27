window.onload = pageLoad;

function pageLoad(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
// check error username pass
if (urlParams.get("error")==1){
	if (window.location.href.split('/').pop()== "register.html"){
		document.getElementById('errordisplay').innerHTML = "Registration Error!"
	}else{
		document.getElementById('errordisplay').innerHTML = "Username or password does not match.";
	}
}
}

async function validateForm() {
	const username = document.getElementsByName('username')[0].value;
	const email = document.getElementsByName('email')[0].value;

	// Check email format
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailPattern.test(email)) {
		alert('Invalid email format.');
		return false;
	}

	try {
		const response = await fetch('/check-username', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username }),
		});

		const data = await response.json();

		if (data.isUsernameTaken) {
			alert('Username is already taken.');
			return false;
		} else {
			document.getElementById('errordisplay').innerHTML = '';
			return true;
		}
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}
