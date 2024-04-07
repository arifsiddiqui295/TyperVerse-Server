require('dotenv').config();
const express = require('express');
const connectDB= require('./connection/connection.js');
const userRoutes= require('./routes/index.js');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/',userRoutes);
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});