# SpringMicro Static Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/eae9b01d-d3ee-4780-b8c4-28daea0e5db8/deploy-status)](https://app.netlify.com/sites/laughing-poincare-746a29/deploys)

This is an app written in Svelte with the following functionality:

- Browse Templates
- Request a Quote
- Purchase a Plan via PayPal

## Development

### Environment

See `.env.example`.

```
PAYPAL_CLIENT_ID=test
PAYPAL_SECRET=test
SHEETS_API_KEY=key
SHEETS_ID=11PZRSP2vqOlA4ycHCtwMquKyHtfa8nFkX5wi3dtZIxY
SHEETS_NAME=Quotes
```

### Run server, including Netlify Functions

```
npm install
npm install -g netlify-cli
netlify dev -p 8888
```

### Scripts

```bash
# Compile global scss and JS
# The JavaScript referred to here is just Bootstrap's
npm run webpack
# Compile all
npm run build
```
