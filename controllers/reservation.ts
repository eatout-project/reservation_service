import {Knex} from "knex";
import {Request, Response} from "express";
import {ReservationApiObject, ReservationWithIdApiObject} from "../ApiObjects/businessobject";

export const createReservationRequest = (req: Request, res: Response, db: Knex) => {
    const reservationApiObject: ReservationApiObject = req.body;
    db.insert(reservationApiObject).into('reservations').returning('id')
        .then(id => {
            db.select('*').from('reservations').where('id', id[0])
                .then(data => {
                    res.status(200).json(data[0]);
                })
        })
        .catch(error => {
            console.log(error);
            res.status(400).json('Could not register reservation')
        });
}

export const getCustomerReservations = (req: Request, res: Response, db: Knex) => {
    db.select('*').from('reservations').where('customerId', req.body.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json('Could not register reservation')
        });
}

export const updateReservationRequest = (req: Request, res: Response, db: Knex) => {
    const reservationApiObject: ReservationWithIdApiObject = req.body;
    db.transaction(trx => {
        trx.update(reservationApiObject).into('reservations').where('id', reservationApiObject.id)
            .then(something => {
                trx.commit();
                res.status(200).json(reservationApiObject)
            }).catch(error => {
            console.log(error);
            trx.rollback();
            res.status(400).json('internal server error')
        })
    })
}

export const getRestaurantAcceptedReservations = (req: Request, res: Response, db: Knex) => {
    console.log('in here')
    console.log('body: ', req.body);
    db.select('*').from('reservations').where('restaurantId', req.body.id).andWhere('status', 'approved')
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json('Could not find any accepted reservations')
        });
}

export const getRestaurantWaitingReservations = (req: Request, res: Response, db: Knex) => {
    db.select('*').from('reservations').where('restaurantId', req.body.id).andWhere('status', 'waiting')
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json('Could not register reservation')
        });
}