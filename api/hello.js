export default function handler(request, response) {
  const { name } = request.query;

  if (name) {
    return response.status(200).send(`Hello ${name}`);
  } else {
    return response.status(400).send('Please provide your name.');
  }
}
