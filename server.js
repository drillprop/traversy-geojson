const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

//connect to db
connectDB();

const app = express();

// body parser
app.use(express.json());

// enable cors
app.use(cors());

// set static folder(for frontend)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`
  )
);
