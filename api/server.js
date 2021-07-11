const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.post('/test', (req, res) => { console.log(req.body); res.send("Test route") });

app.get('/', (req, res) => res.send("Hello world"));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profiles'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server is running on ${PORT}`));