const express = require("express");

const router = express.Router();
const Book = require("../models/book");
// INSERT 7 SAMPLE BOOKS (CREATE)
router.get("/seed", async (req, res) => {
  try {
    await Book.insertMany([
  {
    title: "JavaScript Essentials",
    author: "Mark Ethan",
    category: "Programming",
    publishedYear: 2018,
    availableCopies: 5
  },
  {
    title: "Node.js in Action",
    author: "Alex Young",
    category: "Programming",
    publishedYear: 2020,
    availableCopies: 3
  },
  {
    title: "MongoDB Basics",
    author: "Kristina Chodorow",
    category: "Database",
    publishedYear: 2017,
    availableCopies: 4
  },
  {
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Database",
    publishedYear: 2016,
    availableCopies: 2
  },
  {
    title: "The Time Machine",
    author: "H. G. Wells",
    category: "Fiction",
    publishedYear: 1895,
    availableCopies: 6
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    publishedYear: 1988,
    availableCopies: 3
  },
  {
    title: "Artificial Intelligence Basics",
    author: "Tom Taulli",
    category: "AI",
    publishedYear: 2019,
    availableCopies: 5
  },
  {
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "Networking",
    publishedYear: 2015,
    availableCopies: 2
  }
]
);

    res.json({ message: "7 books inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});
// GET books by category
router.get("/category/:category", async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category books" });
  }
});


router.post("/add", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: "Book added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});
router.get("/category/:cat", async (req, res) => {
  const books = await Book.find({ category: req.params.cat });
  res.json(books);
});
router.put("/copies/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.availableCopies + req.body.change < 0)
      return res.status(400).json({ error: "Negative stock not allowed" });

    book.availableCopies += req.body.change;
    await book.save();
    res.json({ message: "Copies updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  if (book.availableCopies !== 0)
    return res.status(400).json({ error: "Copies still available" });

  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});
module.exports = router;
