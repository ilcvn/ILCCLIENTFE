import instance from "../api";

export const getMembers = (search = "", page = "", limit = "", language = "") => {
  return instance.get(`/member/?search=${search}&page=${page}&limit=${limit}&language=${language}`);
};

export const getMemberById = (id) => {
  return instance.get(`/member/${id}`);
};
