const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const notesRouter = require('./routes/notes');
app.use('/notes', notesRouter);
app.get('/', (req, res) => {
  res.send('📝 Welcome to the Notes API!');
});

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  // Start the server after DB connection is successful
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
  );
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
