import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import {knex} from 'knex';
import {createReservationRequest} from "./controllers/reservation";

dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

const db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port:3308,
        user: 'root',
        database: 'db'
    }
});

app.post('/createReservationRequest',  (req: Request, res: Response) => createReservationRequest(req, res, db));

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});