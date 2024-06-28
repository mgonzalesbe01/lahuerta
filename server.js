const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

let products = [];
const adminCredentials = {
  email: 'administrador@gmail.com',
  password: 'admin123'
};

// Rutas de autenticación
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === adminCredentials.email && password === adminCredentials.password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Rutas de productos
app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';
  const newProduct = { id: Date.now(), name, description, price, imageUrl };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
