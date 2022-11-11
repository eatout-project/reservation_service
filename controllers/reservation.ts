import {Knex} from "knex";
import {Request, Response} from "express";
import {ReservationApiObject} from "../ApiObjects/businessobject";

export const createReservationRequest = (req: Request, res: Response, db: Knex) => {
    console.log(req.body);
    const reservationApiObject: ReservationApiObject = req.body;
    db.insert(reservationApiObject).into('reservations')
        .then(affectedRows => res.status(200).json(reservationApiObject))
        .catch(error => {
            console.log(error);
            res.status(400).json('Could not register reservation')
        });
}