const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const schema = Joi.object({
  genre: Joi.string().required()
});

// validates the schema
function validate(genre) {
  return schema.validate(genre);
}

const genres = ['action', 'romance', 'sci-fi', 'comedy', 'documentary'];

router.post('/', (req, res, next) => {
  // validate the new genre
  const { error, value } = validate(req.body);
  if (error) { return res.status(400).send(error.message); }

  // add it to genres
  genres.push(req.body.genre);
  res.send(req.body);
});

router.get('/', (req, res, next) => {
  // return all the genres
  res.send(genres);
});

router.put('/:genre', (req, res, next) => {
  const genre = req.params.genre;
  const newGenre = req.body.genre;
  let result;

  // data validation
  const objectsToValidate = [{ genre }, { genre: newGenre }];
  for (let i = 0; i < objectsToValidate.length; i++) {
    result = validate(objectsToValidate[i]);
    if (result.error) { return res.status(400).send(result.error.message); }
  }

  // verify that the requested genre exists
  const i = genres.indexOf(genre);
  if (i === -1) { return res.status(404).send(`Genre ${genre} not found`); }

  // update the genre
  genres[i] = newGenre;
  res.send(newGenre);
});

router.delete('/:genre', (req, res, next) => {
  const genre = req.params.genre;

  // validate the req
  const { error, value } = validate({ genre });
  if (error) { return res.status(400).send(error.message); }

  // find the index of the genre
  const i = genres.indexOf(genre);
  if (i === -1) { return res.status(404).send(`Genre ${genre} not found`)};

  // remove that genre from genres
  res.send(genres.splice(i, 1))
});

module.exports = router;