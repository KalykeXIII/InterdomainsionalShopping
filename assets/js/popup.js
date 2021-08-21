// Variable to store a reference to the background.js file
var backgroundPage;

// Create an event listener within the popup to check when the content is loaded (incorporates updates)
document.addEventListener('DOMContentLoaded', function () {

    backgroundPage = chrome.extension.getBackgroundPage();
    
    // Add event listener to the run button
    document.getElementById('add').addEventListener('click', function () {
        chrome.runtime.sendMessage({message: 'Add item'})
    });
});


/*CHECKBOX-STATE-MEMORY*/
// Because popups reload everytime they are opened this allows us to save button states and anything else mutable
function save_options() {
    var checked = document.querySelector('input[id="toggleOnOff"]').checked;
    chrome.storage.local.set({value: checked}, function() {
      });
};

function restoreOptions() {
    // Use default value = false.
    chrome.storage.local.get({
        value: false
    }, function (items) {
        document.querySelector('input[id="toggleOnOff"]').checked = items.value
    });
};
