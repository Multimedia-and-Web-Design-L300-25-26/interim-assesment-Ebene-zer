import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';

const app = express();

app.use(express.json());

// Connect to the database
connectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});