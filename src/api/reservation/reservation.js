import instance from "../api";
export const createReservation = (data) => {
    return instance.post('/reservation', data);
  };