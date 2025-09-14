const express = require('express');
const cors = require('./src/services/cors.service');
require('dotenv').config();

const routes = require('./src/routes/routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to accept x-www-form-urlencoded

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
