'use strict';

/**
 * Inicializa o script.
 * 
 * esse projeto foi desenvolvido por kirito dev
 * https://github.com/FabioSilva11
 */
async function init() {
  // Obtém o preço do produto
  const preco =
    document
      .querySelector(
        '#ui-pdp-main-container > div.ui-pdp-container__col.col-3.ui-pdp-container--column-center.pb-40 > div > div.ui-pdp-container__row.ui-pdp-with--separator--fluid.ui-pdp-with--separator--40 > div.ui-pdp-container__col.col-2.mr-32 > div.ui-pdp-price.mt-16.ui-pdp-price--size-large > div.ui-pdp-price__main-container > span > s > span.andes-money-amount__fraction'
      )
      ?.innerText.replace('.', '') || '0';

  // Obtém os centavos do preço
  const centavos =
    document.querySelector(
      'div.ui-pdp-price__second-line > span > span.price-tag-amount > span.price-tag-cents'
    )?.innerText || '0';

  // Obtém a quantidade vendida
  const vendidos = Number(document.querySelector('.ui-pdp-header__subtitle')?.innerText.split(' ')[4]);

  // Obtém o contêiner do título
  const container = document.querySelector('.ui-pdp-header__title-container');

  // Obtém o ID do anúncio
  const idAnuncio = document
    .querySelector('meta[name="twitter:app:url:iphone"]')
    ?.content.split('id=')[1];

  // Obtém informações da API do Mercado Livre
  const respostaMl = await handleMlApi(`https://api.mercadolibre.com/items?ids=${idAnuncio}`);

  const {
    body: {category_id, listing_type_id, date_created},
  } = respostaMl[0] || null;

  // Obtém a taxa de venda
  const {sale_fee_amount} =
    (await handleMlApi(
      `https://api.mercadolibre.com/sites/MLB/listing_prices?price=${preco}&listing_type_id=${listing_type_id}&category_id=${category_id}`
    )) || {};

  // Calcula valores financeiros
  const total = Number(preco + '.' + centavos) * vendidos;
  const valorUnitarioLiquido = preco - sale_fee_amount;
  const receitaTotal = valorUnitarioLiquido * vendidos;

  // Calcula informações temporais
  const dataInicio = new Date(date_created);
  const hoje = new Date();
  const umDia = 24 * 60 * 60 * 1000; // horas minutos segundos milissegundos
  const diferencaDias = Math.round(Math.abs(dataInicio - hoje) / umDia);
  const mediaDiariaReceita = receitaTotal / diferencaDias;

  // Insere informações na página após 1.5 segundos
  setTimeout(() => {
    container.insertAdjacentHTML(
      'beforebegin',
      `
        <ul class="mlext-container">
          <li>FEITO POR KIRITO</li>
          <li>Receita bruta: <span>${formatarDinheiro(total)}</span></li>
          <li>Receita líquida: <span>${formatarDinheiro(receitaTotal)}</span></li>
          <li>Receita por unidade: <span>${formatarDinheiro(valorUnitarioLiquido)}</span></li>
          <li>Receita média diária: <span>${formatarDinheiro(mediaDiariaReceita)}</span></li>
          <li>Comissão do ML: <span>${formatarDinheiro(sale_fee_amount)}</span></li>
          <li>Criado em: <span>${formatarData(dataInicio)} - ${diferencaDias} dias atrás</span></li>
        </ul>
    `
    );
  }, 1500);
}

/**
 * Formata um valor para o formato de moeda brasileira.
 * @param {number} valor - O valor a ser formatado.
 * @returns {string} - O valor formatado.
 */
function formatarDinheiro(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/**
 * Formata uma data para o formato DD/MM/AAAA.
 * @param {Date} data - A data a ser formatada.
 * @returns {string} - A data formatada.
 */
function formatarData(data) {
  const dia = data.getDate().toString().padStart(2, '0'),
    mes = (data.getMonth() + 1).toString().padStart(2, '0'),
    ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

/**
 * Manipula a chamada à API do Mercado Livre.
 * @param {string} url - A URL da API.
 * @returns {Promise} - Uma Promise que resolve com os dados da API ou rejeita em caso de erro.
 */
async function handleMlApi(url) {
  try {
    const configuracao = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const resposta = await fetch(url, configuracao);
    const respostaFinal = await resposta.json();
    return respostaFinal;
  } catch (erro) {
    console.log('Erro na requisição:', erro);
  }
}

// Inicia o script
init();
