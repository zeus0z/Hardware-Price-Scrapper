
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const { scrollPageToBottom } = require('puppeteer-autoscroll-down')
const { executablePath } = require('puppeteer')




const PICHAU = 'https://www.pichau.com.br/hardware/placa-de-video';
const TERA = 'https://www.terabyteshop.com.br/hardware/placas-de-video';

(async () => {


    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: executablePath(),
            //Se esse ai em cima não funcionar, usa esse:
            // executablePath: require('puppeteer').executablePath(),
            args: ["--no-sandbox"]
        })
        const page = (await browser.pages())[0];


        await page.goto(PICHAU, {
            waitUntil: "networkidle0"
        });

        await scrollPageToBottom(page, { size: 1000, delay: 2000, stepsLimit: 40 })

        // -------------- EVALUATE------------------------------------

        const result = await page.evaluate(() => {

            const getProductsNames = () => {
                let selector = '.MuiTypography-h6'
                const mapFn = function (i) {

                    return i.innerText;
                }
                const items = Array.from(
                    document.querySelectorAll(selector),
                    mapFn
                )

                return items;
            }

            const getImagesSources = () => {
                let selector = '#__next > main > div:nth-child(2) > div > div > div> div > a > div > div > div > div > img'
                const mapFn = function (i) {

                    return i.src;
                }
                const items = Array.from(
                    document.querySelectorAll(selector),
                    mapFn
                )

                    return items;
            }

           
            return getProductsNames;
         


           
        })

       console.log(result);
        await browser.close();


    } catch (e) {
        console.log(e.message)
    }
}

)();


/*
------------------div pai

'#__next > main > div:nth-child(2) > div > div> div > div'

------------------imagem
'#__next > main > div:nth-child(2) > div > div > div> div > a > div > div > div > div > img'


------------------texto
'.MuiTypography-h6'

*/