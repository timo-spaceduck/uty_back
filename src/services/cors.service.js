import cors from 'cors';

const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost:3259',
	'http://localhost:3399',
	'http://localhost:3369',
	'https://uty.lol',
	'https://www.uty.lol',
	'https://timo-dev.com',
	'https://www.timo-dev.com',
	'https://money-log.app',
	'https://www.money-log.app',
	'https://notifican.com',
	'https://www.notifican.com',
];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
};

export default cors(corsOptions);
