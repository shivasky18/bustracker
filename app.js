const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000; 

app.use(express.static(path.join(__dirname, './')));

const uri='mongodb://localhost:27017/';
// const uri ='mongodb+srv://saivardhanvemulamncl:sai7626@bustracker.z9ztvx3.mongodb.net/';
// const uri =''
// const uri ='mongodb+srv://saivardhanvemulamncl:<password>@bustracker.z9ztvx3.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri); 
app.get('/api/buses', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('BusTracker');
    const collection = database.collection('BusData');
    const buses = await collection.find({}).toArray();
    res.json(buses);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.listen(port, () => {
  console.log(`Server running on  http://localhost:3000/`);
});
