# Vercel Hello POC

A minimal proof-of-concept for understanding Vercel Functions and API communication.

## Project structure

```
vercel-hello-poc/
├── api/
│   └── hello.js     # Vercel Serverless Function
├── test.js          # Local Node.js script that calls the deployed API
├── package.json
└── README.md
```

## Architecture

```
Local Node.js Script
        |
        v
HTTP Request
        |
        v
Vercel Function API (api/hello.js)
        |
        v
Processes the request
        |
        v
Returns "Hello <name>"
        |
        v
Local Script prints the response
```

## 1. Deploy the Vercel Function

### Prerequisites
- A free [Vercel](https://vercel.com) account
- Node.js installed locally
- Vercel CLI

### Steps

```bash
# Install the Vercel CLI globally (one-time)
npm install -g vercel

# From inside the vercel-hello-poc folder
cd vercel-hello-poc

# Log in to Vercel (opens browser)
vercel login

# Deploy — follow the prompts (accept defaults is fine)
vercel

# Deploy to production (gives you the permanent public URL)
vercel --prod
```

After `vercel --prod` finishes, it prints a public URL, e.g.:

```
https://vercel-hello-poc.vercel.app
```

That's your deployed API's base URL.

## 2. Example API URLs

```
https://vercel-hello-poc.vercel.app/api/hello?name=Pooja
→ Hello Pooja

https://vercel-hello-poc.vercel.app/api/hello
→ Please provide your name.
```

You can test these directly in a browser or with `curl`:

```bash
curl "https://vercel-hello-poc.vercel.app/api/hello?name=Pooja"
```

## 3. Run the local Node.js script

`test.js` does **not** generate any response itself — it only sends an HTTP
GET request to your deployed Vercel Function and prints whatever comes back.

### Configure it
Open `test.js` and set `BASE_URL` to your deployed domain from step 1:

```js
const BASE_URL = process.env.VERCEL_URL || 'https://vercel-hello-poc.vercel.app';
```

(Alternatively, set it as an environment variable instead of editing the file:
`export VERCEL_URL=https://vercel-hello-poc.vercel.app`)

### Run it

```bash
node test.js
```

Expected terminal output:

```
Requesting: https://vercel-hello-poc.vercel.app/api/hello?name=Pooja

Hello Pooja
```

You can also pass a different name as an argument:

```bash
node test.js Alex
```

```
Requesting: https://vercel-hello-poc.vercel.app/api/hello?name=Alex

Hello Alex
```

## How it works

- **`api/hello.js`**: Any file placed inside the `api/` folder in a Vercel
  project automatically becomes a serverless HTTP endpoint. Vercel maps
  `api/hello.js` to the route `/api/hello`. The function reads the `name`
  query parameter from `req.query` and returns a plain text response.
- **`test.js`**: A plain Node.js script using the built-in `https` module
  (no extra dependencies) to make a GET request to the deployed endpoint
  and print the raw response text it receives — it performs no processing
  of its own.
