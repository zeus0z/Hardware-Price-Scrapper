const fs = require('fs');
const puppeteer = require('puppeteer');


const URL = 'https://www.pichau.com.br/hardware/placa-de-video';



(async () => {

    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage();

        await page.goto(URL, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        const mySelector = '.MuiTypography-h6'

        await page.waitForSelector('.MuiTypography-h6');

        const result = await page.evaluate(() => {


            const items = Array.from(
                document.querySelectorAll('.MuiTypography-h6')
            )

            let filtro = [];

            for (let i of items) {
                filtro.push(
                    // i.getAttribute('src')
                    i.innerText
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
