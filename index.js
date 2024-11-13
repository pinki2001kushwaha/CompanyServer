const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')

const app = express();
const PORT = 5000
app.use(cors())

const uri = 'mongodb+srv://shraddha:cnUhkeOKyR9XbIQp@project.k5fpz.mongodb.net/?retryWrites=true&w=majority&appName=project';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));






mongoose.connect("mongodb://localhost:27017/project", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connection successful");
}).catch((e) => {
  console.error("No connection", e); 
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true }
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

app.use(express.json());

// GET endpoint
app.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/', async (req, res) => {
  const { title, author, description } = req.body;
  try {
    const newBook = new Book({ title, author, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.delete("/:id",async(req,res)=>{
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Book deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
