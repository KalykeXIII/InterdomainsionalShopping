const axios = require('axios');
const cheerio = require('cheerio');
const domain = 'https://www.amazon.com.au/ASUS-Overclocked-Dual-Fan-DisplayPort-DUAL-RTX2060-O6G-EVO/dp/B07R18TH1X/ref=asc_df_B07R18TH1X?tag=bingshopdesk-22&linkCode=df0&hvadid=80470580721679&hvnetw=s&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=&hvtargid=pla-4584070147375759&psc=1';

get_product_name(domain);
get_product_price(domain);

function get_product_name(domain){
const url=domain;
axios(url)
.then(response => {
  const html = response.data;
  const $ = cheerio.load(html)
  const page_content = $('h1').text();
  var all_headers = page_content.split('\n');
  for (let i=0; i<all_headers.length ; i++){
      if (all_headers[i] != ''){
        console.log(all_headers[i]);
        return false
      }
  }
})
.catch(console.error)
};

function get_product_price(domain){
    const url=domain;
    axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const page_content = $('#priceblock_ourprice').text();
      console.log(page_content)
    })
    .catch(console.error)
    };