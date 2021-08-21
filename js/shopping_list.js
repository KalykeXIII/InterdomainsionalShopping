get_product_details(domain);

function get_product_details(domain){

var product_name;
var product_price;
var product_image;
var product_description = '';

const url=domain;
axios(url)
.then(response => {
  const html = response.data;
  const $ = cheerio.load(html)
  const page_content = $('h1').text();
  var all_headers = page_content.split('\n');
  for (let i=0; i<all_headers.length ; i++){
      if (all_headers[i] != ''){
        product_name = all_headers[i]
        break
      }
  }
  price_raw = $('#priceblock_ourprice').text();
  if (price_raw.match('\d') != ''){
    product_price = price_raw
  }
  else {
    product_price = 'Unknown'
  }

  product_image = $("#imgTagWrapperId").find('img').eq(0).attr('src');

  description_raw = $("#feature-bullets").text().split('\n')
  for (let i = 0; i < description_raw.length; i ++){
    if (description_raw[i] != ''){
      product_description += description_raw[i] + '\n'
    }
  }

  console.log(product_name)
  console.log(product_price)
  console.log(product_image)
  console.log(product_description)

  data = JSON.stringify({name: product_name, image: product_image, price: product_price, description: product_description})

  return data
})
.catch(console.error)
};
