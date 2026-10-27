# AOI — Novo site

Site institucional responsivo para a AOI, com foco em soluções 3D para empresas e empreendedores:
- Placas NFC e QR Code
- Chaveiros personalizados
- Brindes corporativos
- Displays e peças sob medida

## Arquivos
- `index.html`: estrutura e conteúdo do site
- `styles.css`: identidade visual e responsividade
- `app.js`: catálogo, busca, filtros, menu mobile e integração com WhatsApp
- `products.json`: referência editável do catálogo (o catálogo demonstrativo atual está definido no início de `app.js`)
- `assets/`: pasta reservada para fotos reais, logo e outros recursos

## Antes de publicar
1. Abra `app.js`.
2. Troque `WHATSAPP_NUMBER = "5511999999999"` pelo número comercial da AOI com código do país + DDD + número, apenas dígitos.
3. Substitua as ilustrações CSS demonstrativas por fotografias reais dos produtos quando disponíveis.
4. Revise os textos, produtos, links de Instagram e condições comerciais.
5. Teste os links de orçamento no celular e no computador.

## Publicar
O site é estático e pode ser publicado em Vercel, Netlify ou hospedagem comum. Para Vercel, coloque `index.html`, `styles.css` e `app.js` na raiz do projeto. Não apague os assets ou modelos `.glb` do site anterior; integre-os depois, caso sejam necessários para o visualizador 3D.

## Observação
Os produtos e ilustrações do catálogo são demonstrativos. Os preços estão como “Sob consulta” para não divulgar valores não confirmados.
