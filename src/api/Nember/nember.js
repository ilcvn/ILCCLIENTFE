import instance from "../api";

export const getAllMember = () => {
  return instance.get("/member");
};
export const getMemberById = (id) => {
  return instance.get(`/member/${id}`);
};
