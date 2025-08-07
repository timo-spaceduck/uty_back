const express = require('express');
const cors = require('./src/services/cors.service');
const apiKeyMiddleware = require('./src/middleware/apiKey.middleware');
require('dotenv').config();

const routes = require('./src/routes/routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to accept x-www-form-urlencoded

app.use(apiKeyMiddleware);

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
