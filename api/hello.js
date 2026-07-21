module.exports = (req, res) => {
  const { name } = req.query;
  
  if (name) {
    res.status(200).send(`Hello ${name}`);
  } else {
    res.status(400).send('Please provide your name.');
  }
};
