const express = require('express');
const path = require('path');
const PORT = 3001;
const cors = require('cors');
const db = require('../database/index.js');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cors());

app.get('/items', async (req, res) => {
  try {
    const items = await db.Item.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Error in getting items from backend', error });
  }
});

app.put('/items', async (req, res) => {
  const items = req.body;

  try {
    await db.Item.deleteMany({});
    await db.Item.insertMany(items);

    const updatedItems = await db.Item.find();
    res.status(200).send(updatedItems);
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error updating items', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}!`);
});
