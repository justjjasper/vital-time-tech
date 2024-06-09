const dummyData = require('./dummyData');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vital', { useNewUrlParser: true, useUnifiedTopology: true });

const itemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

async function insertDummyData() {
  try {
    const count = await Item.countDocuments();
    if (count === 0) {
      await Item.insertMany(dummyData);
      console.log('Dummy data inserted successfully!');
    } else {
      console.log('Database already contains data. Skipping dummy data insertion.');
    }
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
}

insertDummyData().catch(err => console.error(err));

module.exports = { Item };
