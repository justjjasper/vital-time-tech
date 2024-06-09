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
    const items = await db.Item.find(); // Correct method to fetch all items
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Error in getting items from backend', error });
  }
});

app.put('/items', async (req, res) => {
  const items = req.body;

  try {
    // Clear the existing collection
    await db.Item.deleteMany({});

    // Insert the new items
    await db.Item.insertMany(items);

    res.status(200).send({ message: 'Items updated successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating items', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
