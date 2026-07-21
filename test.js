// test.js
// A local Node.js script that ONLY consumes the deployed Vercel Function.
// It does not generate the "Hello ..." response itself — it just requests
// it from the API and prints whatever the API sends back.
//
// Usage:
//   node test.js
//   node test.js YourName
//
// Before running, set BASE_URL below (or via env var) to your deployed
// Vercel domain, e.g. https://vercel-hello-poc.vercel.app

const https = require('https');

// 1. Set your deployed Vercel domain here (no trailing slash).
const BASE_URL = process.env.VERCEL_URL || 'https://your-project-name.vercel.app';

// 2. Optional: pass a name as a command-line argument, default to "Pooja".
const name = process.argv[2] || 'Pooja';

const url = `${BASE_URL}/api/hello?name=${encodeURIComponent(name)}`;

console.log(`Requesting: ${url}\n`);

https
  .get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(data);
    });
  })
  .on('error', (err) => {
    console.error('Error calling the API:', err.message);
  });
