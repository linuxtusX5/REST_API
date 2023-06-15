import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import DB from '../config/connectionDB';
import routes from './routes';

dotenv.config();

DB();

const app = express();

app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/v1/user', routes())
const PORT: number = parseInt(process.env.PORT ?? '1337', 10)
app.listen(PORT, () => {
    console.log(`Server running on${process.env.DEV_MODE} port: ${PORT}`)
})
