// For cmd line testing include the below 2 lines
// const axios = require('axios');
// const cheerio = require('cheerio');

// Test run on a know page
// get_product_details('https://www.amazon.com.au/ACER-Nitro-N50-610-Acer-Desktop/dp/B08RWWY4QN/ref=sr_1_4?_encoding=UTF8&c=ts&dchild=1&keywords=Desktop+PCs&qid=1629518647&s=computers&sr=1-4&ts_id=4913308051');

// document.getElementById('add').addEventListener('click', function(){
//     var url = document.getElementById('product_url').value
//     data = get_product_details(url);

// });
// Define the core function to retrieve data from a url
function get_product_details(domain){

  // Instantiate all the variables we want to fill
var product_name;
var product_price;
var product_image;
var product_description = '';

// Redefine the domain as 'url'
const url=domain;
// Access the contents of the url using axios
axios(url)
.then(response => {
  // On receiving data back from the response
  // Define html to be the data
  const html = response.data;
  // $ = cheerio.load(html)
  // const dom = himalaya.parse(contents)
  // const html_string = JSON.stringify(dom);
  // console.log(html_string)
  // return html_string

  // const page_content = $('h1').text();
  // var all_headers = page_content.split('\n');
  // for (let i=0; i<all_headers.length ; i++){
  //     if (all_headers[i] != ''){
  //       product_name = all_headers[i]
  //       break
  //     }
  // }


  // price_raw = $('#priceblock_ourprice').text();
  // if (price_raw.match('\d') != ''){
  //   product_price = price_raw
  // }
  // else {
  //   product_price = 'Unknown'
  // }



  // product_image = $("#imgTagWrapperId").find('img').eq(0).attr('src');


  // description_raw = $("#feature-bullets").text().split('\n')
  // for (let i = 0; i < description_raw.length; i ++){
  //   if (description_raw[i] != ''){
  //     product_description += description_raw[i] + '\n'
  //   }
  // }

  // console.log(product_name)
  // console.log(product_price)
  // console.log(product_image)
  // console.log(product_description)

  // data = JSON.stringify({name: product_name, image: product_image, price: product_price, description: product_description})

  return html
})
.catch(console.error)
};
