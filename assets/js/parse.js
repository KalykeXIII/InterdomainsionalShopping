// This script contains the parse mechanism that is triggered only if the current page is deemed relevant -> see check.js

// Listen for the event that dictates that the tab contents should be parsed and call the parser function
document.addEventListener('start_parse', parser)

// Reads the contents of the page broken up by <p></p> tags
function parser() {
	
	// Firstly log that the function is running
	console.log('Parsing content')
	// Queries the current tab
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var tab = tabs[0];
		// Get the url of the current tab
		var domain = tab.url;
		// Begin a new HTTP request 
		let xhr = new XMLHttpRequest();
		// Once loaded ->
		xhr.onload = () => {
			console.log(xhr.response.body)
			// Get all elements in the body of the response that are paragraph text
			var resultText = xhr.response.body.getElementsByTagName('h1')
			// Strip out price, name, description and image
			// Then send an event message with these 4 details

			// Name
			var name_raw = xhr.response.body.getElementsByTagName('h1')[0].innerText
			var name_split = name_raw.split('\n')
			var name;
			for (let i = 0; i < name_split.length; i++){
				if (name_split[i] != ''){
					name = name_split[i]
				}
			}
			console.log(resultText)
			console.log(name)

		}
		// On error occurring log to console
		xhr.onerror = () => console.error('error');
		xhr.open("GET", domain, true);
		// IMPORTANT: response type must be a document in order to use it as a normal site object
		xhr.responseType = 'document';
		// Send the response
		xhr.send();
});	
}