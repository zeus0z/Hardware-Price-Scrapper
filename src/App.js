
import { useEffect, useState } from 'react';
import './App.css';

import { executablePath } from 'puppeteer';
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());


function App() {

  const [loading, setLoading] = useState(false);
  const [data,setData] = useState(null);


  const PICHAU = 'https://www.pichau.com.br/hardware/placa-de-video';
  const TERA = 'https://www.terabyteshop.com.br/hardware/placas-de-video';

  const scrap = async () => {


    try {

      setLoading(true);

      const browser = await puppeteer.launch({
        headless: true,
        executablePath: executablePath(),
        //Se esse ai em cima não funcionar, usa esse:
        // executablePath: require('puppeteer').executablePath(),
        args: ["--no-sandbox"]
      })
      const page = (await browser.pages())[0];

      await page.goto(PICHAU, {
        waitUntil: "networkidle2"
      });

      await page.waitForTimeout(5000)
      await page.screenshot({ path: 'stealth.png', fullPage: true })



      // -------------- EVALUATE------------------------------------

      const result = await page.evaluate(() => {

        let selector = '.MuiTypography-h6'   // <----------- SELECTOR AQUI

        const mapFn = function (i) {
          return i.innerText
        }

        const items = Array.from(
          document.querySelectorAll(selector),
          mapFn
        )

        return items;
      })

      setData(result);
      setLoading(false);
      
      await browser.close();


    } catch (e) {
      console.log(e.message)
    }
  }



  const log = () => {
    console.log('olá mundo')
  }


  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------

  if (loading) return <h1>Loading...</h1>


  return (
    
    <div className="App">

      <h1>Noticias</h1>

      <button onClick={scrap}> Run Scrap Function</button>
      <button onClick={log}>LOG!</button>

    </div>
  );
}

export default App;
