import { instance } from "./axios";

export const getTemplates = async () => {
  return instance.post("/templates/get");
};
export const addTemplate = async (data: any) => {
  return instance.post("/templates/save", data);
};
export const deleteTemplate = async (id: any) => {
  return instance.post(`/templates/delete/${id}`);
};
