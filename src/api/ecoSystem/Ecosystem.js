import instance from "../api";


export const getEcoSystem = () => {
    return instance.get("/ecosystem");
  };