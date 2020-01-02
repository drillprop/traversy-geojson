const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

// body parser
app.use(express.json());

// enable cors
app.use(cors());

app.get('/api/v1/stores', (req, res) => {
  res.send('Hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`
  )
);