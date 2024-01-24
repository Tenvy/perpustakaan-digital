import moment from "moment";

export const dateConverter = (params:any) => {
  const data = moment(params).format("YYYY-MM-DD");
  return data;
};

export const dateWithTimeConverter = (params:any) => {
  const data = moment(params).format("YYYY-MM-DD HH:mm:ss");
  return data;
};