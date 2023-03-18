require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());


// connect mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y66jyhy.mongodb.net/?retryWrites=true&w=majority`;

app.get('/', (req, res) => {
    res.send('Hello from laizus server!')
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})