const express = require('express');
require('dotenv').config();

const routes = require('./src/routes/routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
