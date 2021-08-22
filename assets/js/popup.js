// Variable to store a reference to the background.js file
var backgroundPage;
// Variable to store any newly retrieved products
var new_product;
// Our overall shopping list of products
var shopping_list = [];

// Check for new products to retrieve (sent as a chrome runtime message from background.js)
chrome.runtime.onMessage.addListener( function (request) {
    // If the received message is a notice for a new product being processed
    if (request.message == 'New Product') {
            // Access the background page
            backgroundPage = chrome.extension.getBackgroundPage();
            // Set our local new_product placeholder to be the new product stored in background
            new_product = backgroundPage.product_details;
            // Console log to show this has bee retrieved correctly
            console.log(new_product)
            // Append the new product to the overall shopping list
            shopping_list.push(new_product)
            // Reset the new product placeholder
            new_product = null
            // Construct the list
            construct_shopping_list();
            // Shopping list saved
            save_options();
            }
    // If it's not a new product we don't care
    else {
        return false
    }
})


// Create an event listener within the popup to check when the content is loaded (incorporates updates)
document.addEventListener('DOMContentLoaded', function () {
    
    // Restore options from local so people can see their shopping list
    shopping_list = [];
    restoreOptions();
    // Construct the shopping list from the restored array
    construct_shopping_list();

    // Instantiate access to the background page for whatever reason
    backgroundPage = chrome.extension.getBackgroundPage();
    
    // Add event listener to the add button to send off a new product to be added
    document.getElementById('add').addEventListener('click', function () {
        // To be heard by background.js
        chrome.runtime.sendMessage({message: 'Add item'})
    });

});


// Because popups reload everytime they are opened this allows us to save the shopping list so they don't reset it accidentally by closing the popup
function save_options() {
    chrome.storage.local.set({shoppingList: shopping_list}, function () {
        });
};

// Retrieves the stored values from chrome local storage back into the popup.js variable shopping list
function restoreOptions() {
    // Use default value = false.
    chrome.storage.local.get({value: []}, function (items) {
        // Set shopping list to be the retreived value
        shopping_list = items.value
        console.log(items.value)
    });
};

function construct_shopping_list(){
// For every item in the shopping list add a new list element
for (let i = 0; i < shopping_list.length; i++){
/*--- Function to construct list elements for the shopping cart ---*/
    var node = document.createElement("li");
    node.classList.add("items");

    var div1 = document.createElement("div");
    div1.classList.add("list");

    var form = document.createElement("form");
    form.action = "comparison.html";

    var div2 = document.createElement("div");
    div2.classList.add("icon");

    var img = document.createElement("img");
    img.classList.add("image-wrap");
    img.id = "img_" + String(i + 1);
    img.src = shopping_list[i][2];
    div2.appendChild(img);
    form.appendChild(div2);

    var div3 = document.createElement("div");
    var div3text = document.createTextNode(shopping_list[i][0]);
    div3.appendChild(div3text);
    div3.classList.add("content");
    div3.id = "name_" + String(i + 1);
    form.appendChild(div3);

    var div4 = document.createElement("div");
    var div4text = document.createTextNode(shopping_list[i][1]);
    div4.appendChild(div4text);
    div4.classList.add("content");
    div4.id = "price_" + String(i + 1);
    form.appendChild(div4);

    var div5 = document.createElement("div");
    var div5text = document.createTextNode(shopping_list[i][3]);
    div5.appendChild(div5text);
    div5.classList.add("content");
    div5.id = "description_" + String(i + 1);
    form.appendChild(div5);

    // var button = document.createElement("button");
    // button.type = "submit";
    // button.onclick = function () { sendToCompare(document.getElementById("img_" + (list_item_no + 1)), "name", "price", "description") };
    // button.textContent = "Compare";
    div1.appendChild(form);
    node.appendChild(div1);
    document.getElementById("shopping_list").appendChild(node);
}
};

// function sendToCompare(img, name, price, description) {
//     localStorage.setItem("image", "img/gallery/gallery-img-01");
//     localStorage.setItem("name", name);
//     localStorage.setItem("price", price);
//     localStorage.setItem("description", description);
// }