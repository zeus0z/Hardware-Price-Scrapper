const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express();

const URL='https://www.blogdoanderson.com';

app.get('/noticias_anderson', (req,res)=>{
    axios(URL)
    .then(response =>{
        const URL_HTML=response.data;
        const $ = cheerio.load(URL_HTML);
        const articles = [];
    
        $('.post', URL_HTML).each(function () {
            const TITULO = $([this]).find('.h3' ,'.entry-title').text();  
            const URL_ESPECIFICA = $(this).find('a').attr('href');
            articles.push({
                TITULO,
                URL_ESPECIFICA
            })
        })
        res.json(articles);
    
    })
    .catch(error => console.log(error));
    

})


app.listen(8000, () => console.log('Backend running on port 8000'));
