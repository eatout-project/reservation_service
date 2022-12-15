import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import {knex} from 'knex';
import {createReservationRequest, getReservations} from "./controllers/reservation";

dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

const db = knex({
    client: 'mysql2',
    connection: {
        host: `${process.env.CUSTOMER_LOGIN_DB_HOST}`,
        port: parseInt(`${process.env.CUSTOMER_LOGIN_DB_PORT}`),
        user: `${process.env.CUSTOMER_LOGIN_DB_USER}`,
        database: `${process.env.CUSTOMER_LOGIN_DB}`
    }
});

app.post('/createReservationRequest',  (req: Request, res: Response) => createReservationRequest(req, res, db));

app.post('/getReservations',  (req: Request, res: Response) => getReservations(req, res, db));

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});