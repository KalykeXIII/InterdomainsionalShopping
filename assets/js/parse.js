// Listen for the event that dictates that the tab contents should be parsed and call the parser function
document.addEventListener('start_parse', parser)

// Reads the contents of the page
function parser() {
	
	// Firstly log that the function is running
	console.log('Parsing content')
	// Queries the current tab
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		// Isolates the current tab
		var tab = tabs[0];
		// Get the url of the current tab
		var domain = tab.url;
		// Begin a new HTTP request 
		let xhr = new XMLHttpRequest();
		// Once loaded ->
		xhr.onload = () => {
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

			// Price 
			var price = xhr.response.getElementById('priceblock_ourprice').innerText
			// Check there is a valid price (it includes digits)
			if (price.match('\d') == '' ){
				price = 'NA'
			}

			// Image
			var img_wrapper = xhr.response.getElementById('imgTagWrapperId')
			var image = img_wrapper.getElementsByTagName('img')[0].src

			// Description
			var description_wrapper = xhr.response.getElementById('feature-bullets').innerText
			var desc_split = description_wrapper.split('\n')
			var desc = ''
			for (let i = 0; i < desc_split.length; i++){
				if (desc_split[i] != ''){
					desc += desc_split[i] + '\n'
				}
			}

			// console.log(name, price, image, desc)

			// Create an event titled product retrieved
			var product = new CustomEvent('got-product', {"detail": [name, price, image, desc]})

			// Dispatch event
			document.dispatchEvent(product)
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