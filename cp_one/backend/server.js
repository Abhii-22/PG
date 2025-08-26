const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir)); // Serve uploaded files statically

const mongoURI = 'mongodb://localhost:27017/pg-website';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  sharing: String,
  phoneNumber: String,
  pgName: String,
  price: Number,
  gender: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

const pgSchema = new mongoose.Schema({
  name: String,
  images: [String],
  price: Number,
  sharing: String,
  rating: Number,
  gender: String,
  location: String,
  description: String,
  facilities: [String],
  area: String
});

const Pg = mongoose.model('Pg', pgSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });
});

app.get('/api/pgs', async (req, res) => {
  try {
    const pgs = await Pg.find();
    res.json(pgs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/api/pgs', async (req, res) => {
  try {
    const newPg = new Pg(req.body);
    await newPg.save();
    res.status(201).json(newPg);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.put('/api/pgs/:id', async (req, res) => {
  try {
    const updatedPg = await Pg.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPg);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.delete('/api/pgs/:id', async (req, res) => {
  try {
    await Pg.findByIdAndDelete(req.params.id);
    res.json({ message: 'PG deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/register', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
