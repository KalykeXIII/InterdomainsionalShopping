// Primary Executor of the extension functionality

// Constant event type to trigger the parse function
const run_parse = new Event('start_parse');

// Placeholder to be accessed by the popup when a new item is processed
var product_details;

// Add a listener for messages sent from the popup
chrome.runtime.onMessage.addListener( function (request) {
    // If the received message is requesting a manual run
    if (request.message == 'Add item') {
            // Log to console as a visual tracker
            console.log('Item to add')
            // Dispatch the run parse event to be caught by parse.js
            document.dispatchEvent(run_parse)
            }
    // If it ain't adding an item we don't care
    else {
            return false
    }
})

// Listen for the event that the parse.js file proclaims it is finished getting a product
document.addEventListener('got-product', function (e) {
    // Get the attached content in the event detail
    var product = e.detail
    // Log to console communicating that the paragraph has been seen (include paragraph chunk to check all are seen)    
    product_details = product;
    // Send a message to retrieve and add new product
    console.log('New product sent to popup')
    chrome.runtime.sendMessage({message: 'New Product'})
})
