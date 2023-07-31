// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/react_form_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Rest of the code...
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const { Schema, model } = mongoose; // Destructuring for Schema and model

const FormSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

const FormModel = model('Form', FormSchema);

app.post('/api/form', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const form = new FormModel({ name, email, message });
    await form.save();

    const googleSheetsUrl =
      'https://script.google.com/macros/s/AKfycbyrQBjkQyoq1BOH1xUEYgT166dmoIkDPtTHM0HOPmDxFySidy_5NvhyO_ohRdXS4yPm7Q/exec';
    await axios.post(googleSheetsUrl, req.body);

    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error); // Log the actual error
    res
      .status(500)
      .json({ message: 'Error saving form data. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});