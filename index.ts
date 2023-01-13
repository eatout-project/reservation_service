import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import {knex} from 'knex';
import {
    createReservationRequest,
    getCustomerReservations,
    getRestaurantAcceptedReservations, getRestaurantWaitingReservations,
    updateReservationRequest
} from "./controllers/reservation";

dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.RESERVATION_DB_HOST ? `${process.env.RESERVATION_DB_HOST}` : `127.0.0.1`,
        port: process.env.RESERVATION_DB_PORT ? parseInt(`${process.env.RESERVATION_DB_PORT}`) : 3308,
        user: process.env.RESERVATION_DB_USER ? `${process.env.RESERVATION_DB_USER}` : `root`,
        database: process.env.RESERVATION_DB ? `${process.env.RESERVATION_DB}` : 'db'
    }
});

console.log(
    {
        host: process.env.CUSTOMER_LOGIN_DB_HOST ? `${process.env.CUSTOMER_LOGIN_DB_HOST}` : `127.0.0.1`,
        port: process.env.CUSTOMER_LOGIN_DB_PORT ? parseInt(`${process.env.CUSTOMER_LOGIN_DB_PORT}`) : 3308,
        user: process.env.CUSTOMER_LOGIN_DB_USER ? `${process.env.CUSTOMER_LOGIN_DB_USER}` : `root`,
        database: process.env.CUSTOMER_LOGIN_DB ? `${process.env.CUSTOMER_LOGIN_DB}` : 'db'
    }
)

app.post('/createReservationRequest',  (req: Request, res: Response) => createReservationRequest(req, res, db));

app.post('/getReservations',  (req: Request, res: Response) => getCustomerReservations(req, res, db));

app.post('/getAcceptedReservations',  (req: Request, res: Response) => getRestaurantAcceptedReservations(req, res, db));

app.post('/getWaitingReservations',  (req: Request, res: Response) => getRestaurantWaitingReservations(req, res, db));

app.post('/updateReservationRequest', (req: Request, res: Response) => updateReservationRequest(req, res, db))

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});