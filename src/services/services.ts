import { instance } from "./axios";

export const getService = (serviceId: string) => {
  return instance.post(`/billing/service/${serviceId}`);
};

export const getServiceInfo = (data: any) => {
  return instance.post("/billing/info", data);
};

export const getServiceCategories = () => {
  return instance.post("/billing/categories");
};

export const getServiceById = (id: string) => {
  return instance.post(`/billing/service/${id}`);
};

export const getServicesByCategoryId = (id: string) => {
  return instance.post(`/billing/by_category/${id}`);
};

export const getAllServices = () => {
  return instance.post("/billing/all_services");
};

export const paySms = () => {
  return instance.post("/billing/pay-sms");
};

export const pay = (data: any) => {
  return instance.post("/billing/pay", data);
};
