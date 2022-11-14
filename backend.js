const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');


const app = express();

app.get('/pombo_gpu', (req, res) => {

    const URL = 'https://www.pichau.com.br/hardware/placa-de-video';

    axios(URL)
        .then(response => {
            const HTML = response.data;
            const $ = cheerio.load(HTML);
            const ITEMS = ['Products'];

            const wrapperProdutos = '[class="MuiGrid-root jss176 MuiGrid-container MuiGrid-spacing-xs-3"]';
            const divProduto = '[data-cy="list-product"]';

            const produtos = $(divProduto, HTML).each(function () {
          
                const NOME_DO_PRODUTO = $('h2', this).text();

                //segundo filho, index 1 no caso
                //primeiro filho
                //primeiro filho de novo
                //terceiro filho

                //a prazo
                //segundo filho, index 1 no caso
                //terceiro filho
                //primeiro filho 
                //primeiro filho


                const VALOR_A_VISTA = $(this).find('[class="MuiCardContent-root jss442"]').text();

            //    const VALOR_A_PRAZO = $(this).find('div.jss221').text();

                const FOTO_DO_PRODUTO = $(this).find('img').attr('src');

                const LINK_DO_PRODUTO = `https://www.pichau.com.br${$(this).attr('href')}`;

                ITEMS.push({ NOME_DO_PRODUTO, VALOR_A_VISTA, FOTO_DO_PRODUTO, LINK_DO_PRODUTO })

            });





            res.json(ITEMS)

        })
        .catch(err => console.log(err))

})


app.listen(8000, () => console.log('Backend running on port 8000'));
