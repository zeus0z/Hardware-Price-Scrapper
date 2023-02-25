import puppeteer from 'puppeteer';
import { useEffect } from 'react';

const useScrapImages = (URL) => {


    const openPageOnPuppeteer = async () =>{

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(URL);
        await page.screenshot({
            path:'teste.png'
        });

        await browser.close();

    }


    useEffect(()=>{
      
        openPageOnPuppeteer();



    },[])



 
}

export default useScrapImages