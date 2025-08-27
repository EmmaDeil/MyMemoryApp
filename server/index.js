import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import connect from './src/config/database.js';
import PostRoutes from './src/routes/memoRoutes.js';
import dotenv from 'dotenv';
import UserRoutes from './src/routes/userRoutes.js';

const PORT = process.env.PORT || 5000;

dotenv.config();
connect();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());   

// Add /api prefix to match frontend expectations
app.use('/api/posts', PostRoutes);
app.use('/api/users', UserRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {  
   console.log(`server is running at http://localhost:${PORT}`);
});
