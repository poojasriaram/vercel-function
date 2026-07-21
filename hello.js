// api/hello.js
// A simple Vercel Serverless Function.
// Vercel automatically turns any file inside /api into an HTTP endpoint.
// This one responds to GET /api/hello?name=Pooja

export default function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    res.status(200).send('Please provide your name.');
    return;
  }

  res.status(200).send(`Hello ${name}`);
}
