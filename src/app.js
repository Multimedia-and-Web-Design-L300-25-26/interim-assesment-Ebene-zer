import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import cryptoRoutes from './routes/cryptoRoutes.js';

const app = express();

const normalizeOrigin = (origin = '') => origin.trim().replace(/\/+$/, '');

const configuredOrigins = (process.env.CLIENT_URL || process.env.CLIENT_URLS || '')
	.split(',')
	.map((origin) => normalizeOrigin(origin))
	.filter(Boolean);

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && configuredOrigins.length === 0) {
	throw new Error('CLIENT_URL (or CLIENT_URLS) must be set in production.');
}

const allowedOrigins = configuredOrigins.length > 0 ? configuredOrigins : ['http://localhost:5173'];

app.use(
	cors({
		origin(origin, callback) {
			// Allow same-origin tools/postman requests that don't send an Origin header.
			if (!origin) {
				return callback(null, true);
			}

			const normalizedOrigin = normalizeOrigin(origin);
			if (allowedOrigins.includes(normalizedOrigin)) {
				return callback(null, true);
			}

			return callback(new Error('Not allowed by CORS'));
		},
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send('Server is up and running!');
});

app.use('/', authRoutes);
app.use('/crypto', cryptoRoutes);

export default app;
