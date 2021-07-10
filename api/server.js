import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.get('/', (req, res) => res.send("Hello world"));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`The server is running on ${PORT}`))