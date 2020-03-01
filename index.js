const express = require('express');
const PORT = process.env.PORT || 3000;
const genres = require('./routes/genres');

const app = express();
app.use(express.json());

app.use('/api/genres', genres);

app.listen(PORT, () => { console.log(`App is listening on port ${PORT}`); });