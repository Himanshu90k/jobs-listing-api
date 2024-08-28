import express from 'express';
import jobs from './routes/jobs.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 8000;

// cross origin resource sharing
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

// Routes
app.use('/api/jobs', jobs);
app.use(notFound);

// ErrorHandler
app.use(errorHandler);

app.listen(port, console.log(`The server is running on port ${port}`));