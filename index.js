const fs = require('fs');
const puppeteer = require('puppeteer');



const URL = 'https://www.instagram.com/blizzard/';



(async () => {

    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage();

        await page.goto(URL, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        

        await page.waitForSelector('article img');

        const result = await page.evaluate(() => {


            const items = Array.from(
                document.querySelectorAll('article img')
            )

            let filtro = [];

            for (let i of items) {
                filtro.push(
                     i.getAttribute('src')
                   // i.innerText
                )
            }

            return filtro;


        })

        console.log(result);
        await browser.close();


    } catch (e) {
        console.log(e.message)
    }
}





)();
