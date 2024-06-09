const dummyData = require('./dummyData');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/vital', { useNewUrlParser: true, useUnifiedTopology: true });

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
  } finally {
    mongoose.connection.close();
  }
}

insertDummyData().catch(err => console.error(err));

const read = () => {
  return Item.find({})
    .then(val => val)
    .catch(err => { console.log('Error in getting items from the back end', err); });
};

module.exports = { read, Item };
