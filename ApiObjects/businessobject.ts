export enum ReservationStatus{
    WAITING = "waiting",
    APPROVED = "approved",
    DECLINED = "declined"
}


export interface ReservationApiObject {
    restaurantName: string;
    amountOfGuests: number;
    timeOfArrival: string;
    restaurantId: number;
    customerId: number;
    customerName: string;
    status: ReservationStatus
}

export interface ReservationWithIdApiObject {
    id: number;
    restaurantName: string;
    amountOfGuests: number;
    timeOfArrival: string;
    restaurantId: number;
    customerId: number;
    customerName: string;
    status: ReservationStatus
}

