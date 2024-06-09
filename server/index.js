const express = require('express');
const path = require('path');
const PORT = 3001;
const cors = require('cors')

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});