const fs = require('fs')
const puppeteer = require('puppeteer')


const URL = 'https://www.pichau.com.br/hardware/placa-de-video'

function extractItems() {
    
      const extractedElements = document.querySelectorAll();
      const items = [];
      for (let element of extractedElements) {
        items.push(element);
      }
      return items;
    }


(async ()=>{
 const browser = await puppeteer.launch()
 const page = await browser.newPage();
 await page.goto(URL);

 await page.evaluate(()=>{
    
 })

})();
