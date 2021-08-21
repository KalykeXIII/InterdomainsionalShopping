// Primary Executor of the extension functionality
const run_parse = new Event('start_parse');

// Add a listener for messages sent from the popup
chrome.runtime.onMessage.addListener( function (request) {
    // If the received message is requesting a manual run
    if (request.message == 'Add item') {
            console.log('Add Item')
            document.dispatchEvent(run_parse)
            }
        else {
            return false
    }
})


// Wait for response from the test to run page anf then log run statement
document.addEventListener('run', function () {
    // Set running to be true
    running = true;
    // Log the event trigger
    console.log('Parse the page contents')
    // Dispatch an event to trigger the 'run-parse' function
    document.dispatchEvent(run_parse)
    return false
});
