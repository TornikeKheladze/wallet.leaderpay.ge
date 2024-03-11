import { instance } from "./axios";

export const getAboutUs = () => {
  return instance.post("/pages/about_us");
};

export const getServicePageInfo = () => {
  return instance.post("/pages/service");
};
export const getRules = () => {
  return instance.post("/pages/rules");
};
export const getAML = () => {
  return instance.post("/pages/aml");
};

export const getPrivacyInfo = () => {
  return instance.post("/pages/privacy");
};

export const getContact = () => {
  return instance.post("/pages/contact");
};

export const getContracts = () => {
  return instance.post("/pages/contracts");
};

export const getCashouts = () => {
  return instance.post("/pages/cashout");
};
export const getNewsList = (data: any) => {
  return instance.post("/news/list", data);
};
export const getSingleNew = (id: any) => {
  return instance.post(`news/get/${id}`);
};

export const sendMessage = async (data: any) => {
  return instance.post("/landing/contact", data);
};
