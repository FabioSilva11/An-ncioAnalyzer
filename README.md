# AnúncioAnalyzer

![Logo da AnúncioAnalyzer](https://github.com/FabioSilva11/AnuncioAnalyzer/blob/main/Capturar.PNG)

![Logo da AnúncioAnalyzer](https://github.com/FabioSilva11/AnuncioAnalyzer/blob/main/Screenshot.jpg)



AnúncioAnalyzer é uma extensão para Google Chrome desenvolvida por Kirito Dev (fabio silva)

## Manifesto (manifest.json)

O arquivo `manifest.json` é essencial para extensões do Chrome. Neste caso, a extensão está configurada para ser ativada em URLs específicas do Mercado Livre (`https://*.mercadolivre.com.br/*`). Isso indica que a extensão funcionará apenas nesses domínios.

## Estilo (style.css)

O arquivo `style.css` define o estilo visual da extensão. Utiliza uma paleta de cores com tons predominantemente de preto, branco e verde (`hsl(113, 89%, 48%)`). Os estilos são aplicados a elementos como contêineres e itens de lista, proporcionando uma aparência limpa e moderna.

## Código JavaScript (index.js)

O código JavaScript em `index.js` realiza diversas tarefas. Inicialmente, ele obtém informações sobre o produto da página do Mercado Livre, como preço, quantidade vendida e data de criação do anúncio. Em seguida, faz chamadas à API do Mercado Livre para obter informações adicionais.

O script calcula valores financeiros, como receita bruta, receita líquida e comissão do Mercado Livre. Além disso, realiza cálculos temporais, como a diferença de dias desde a criação do anúncio. Após os cálculos, insere uma lista formatada na página, exibindo informações importantes de maneira organizada.

## Funcionalidades Principais:

- **Obtenção de Dados:** Extrai informações relevantes da página do Mercado Livre.
- **Chamadas à API:** Utiliza a API do Mercado Livre para obter dados adicionais.
- **Cálculos Financeiros:** Calcula receita bruta, líquida e outras métricas financeiras.
- **Inserção Dinâmica:** Insere uma lista formatada na página para exibir os resultados.

## Como Usar

1. Clone o repositório.
2. Abra o Google Chrome e vá para `chrome://extensions/`.
3. Ative o "Modo do desenvolvedor".
4. Clique em "Carregar sem compactação" e selecione a pasta do projeto.

## Contribuindo

Sinta-se à vontade para contribuir. Abra uma issue ou envie um pull request.
