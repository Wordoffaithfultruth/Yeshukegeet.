<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
  // Handle comment form submission
  document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Create a new comment card
    const commentCard = document.createElement('div');
    commentCard.className = 'comment-card';
    commentCard.innerHTML = 
      <h6>${name}</h6>
      <p>${comment}</p>
    `;

    // Add the new comment to the list
    document.getElementById('commentsList').appendChild(commentCard);

    // Clear the form
    document.getElementById('commentForm').reset();
  });
</script>const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/mytube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoPath: String,
});

const Video = mongoose.model("Video", videoSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("videoUpload"), async (req, res) => {
  const { title, description } = req.body;
  const newVideo = new Video({
    title,
    description,
    videoPath: req.file.path,
  });
  await newVideo.save();
  res.json({ message: "Video uploaded successfully!" });
});

// Fetch videos route
app.get("/videos", async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
<script>
  const uploadForm = document.getElementById('uploadForm');
  const progressBar = document.getElementById('progressBar');
  const uploadProgress = document.getElementById('uploadProgress');
  const uploadStatus = document.getElementById('uploadStatus');

  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    uploadProgress.style.display = 'block';

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        uploadStatus.innerHTML = `<div class="alert alert-success">File uploaded successfully!</div>`;
        progressBar.style.width = '100%';
        progressBar.textContent = '100%';
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      uploadStatus.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
  });

  uploadForm.addEventListener('change', (e) => {
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
  });
</script>
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add unique timestamp to filename
  },
});

const upload = multer({ storage });

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ message: 'File uploaded successfully!', file: req.file });
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.js"></script>
<script>
  // Upload Button Functionality
  const uploadButton = document.getElementById('upload-btn');
  const uploadInput = document.getElementById('upload-input');

  uploadButton.addEventListener('click', (e) => {
    e.preventDefault();
    uploadInput.click();
  });

  uploadInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      alert(`You have selected ${files.length} file(s):\n` + files.map(f => f.name).join('\n'));
    }
  });

  // Example Navigation Alerts
  document.getElementById('home').addEventListener('click', () => {
    alert('Navigating to Home');
  });

  document.getElementById('search').addEventListener('click', () => {
    alert('Search functionality coming soon!');
  });

  document.getElementById('notifications').addEventListener('click', () => {
    alert('No new notifications!');
  });

  document.getElementById('profile').addEventListener('click', () => {
    alert('Profile details coming soon!');
  });