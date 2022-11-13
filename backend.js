const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express();

const URL = 'https://www.blogdoanderson.com';

app.get('/noticias_anderson', (req, res) => {
    axios(URL)
        .then(response => {
            //recebe o HTML da pagina e coloca numa constante
            const URL_HTML = response.data;

            //usa o cheerio pra fazer o crawling na constante definida
            const $ = cheerio.load(URL_HTML);

            const articles = [];

            //usando o cheerio (com isso $), pegue todas as divs com classe .post dentro do HTML
            //após isso, rodar essa função em cada div encontrada
            $('.post', URL_HTML).each(function () {
                const TITULO = $([this]).find('.h3', '.entry-title').text();  //classe h3 dentro de divs com classe. entry-title 
                const URL_ESPECIFICA = $(this).find('a').attr('href'); //pega todos os links, e aí pega os links deles
                articles.push({
                    TITULO,
                    URL_ESPECIFICA
                })
            })
            res.json(articles);

        })
        .catch(error => console.log(error));


})


app.get('/pombo_gpu', (req, res) => {

    const URL = 'https://www.pichau.com.br/hardware/placa-de-video';

    axios(URL)
        .then(response => {
            const HTML = response.data;
            const $ = cheerio.load(HTML);
            const ITEMS = [];

            const individual_item_class_name='[class=MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 MuiGrid-grid-lg-3 MuiGrid-grid-xl-2]';

            $(individual_item_class_name).each(function(){
                const NOME_DO_PRODUTO = $(this).find('h2').text();
                const FOTO_DO_PRODUTO = $(this).find('img').attr('src');
                const LINK_DO_PRODUTO =  $(this).find('a').attr('href');

                ITEMS.push({NOME_DO_PRODUTO,FOTO_DO_PRODUTO,LINK_DO_PRODUTO})
            } )

            
            res.json(ITEMS)

        })
        .catch(err => res.send(err))





})


app.listen(8000, () => console.log('Backend running on port 8000'));
