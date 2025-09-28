import express from 'express';
import cors from './src/services/cors.service.js';
import dotenv from 'dotenv';
dotenv.config();

import routes from './src/routes/routes.js';
import { initDB } from "./src/models/index.js"

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors);

// app.use();
app.use(express.urlencoded({ extended: true })); // to accept x-www-form-urlencoded

app.use('/api', routes);

await initDB()

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
