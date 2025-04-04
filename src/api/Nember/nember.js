import instance from "../api";

export const getMembers = (search = "", page = "", limit = "") => {
  return instance.get(`/member/?search=${search}&page=${page}&limit=${limit}`);
};

export const getMemberById = (id) => {
  return instance.get(`/member/${id}`);
};
