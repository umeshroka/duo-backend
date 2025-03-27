// npm
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

// Import routers
const authRouter = require('./controllers/auth');
const artistsRouter = require('./controllers/artists');
const artworksRouter = require('./controllers/artworks');
const masterclassesRouter = require('./controllers/masterclasses');
const servicesRouter = require('./controllers/services');
const editorialsRouter = require('./controllers/editorials');
const playgroundRouter = require('./controllers/playground');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/auth', authRouter);
app.use('/artists', artistsRouter);
app.use('/artworks', artworksRouter);
app.use('/masterclasses', masterclassesRouter);
app.use('/services', servicesRouter);
app.use('/editorials', editorialsRouter);
app.use('/ai-artwork', playgroundRouter);

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('The express app is ready!');
});
