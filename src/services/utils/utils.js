import dayjs from "dayjs";
import { CategoryData } from "../../constants";

export const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY hh:mm A");
};

export const getCategoryData = (category) => {
  const res = CategoryData.find((item) => item.value === category);
  if (res) return res;
  else return category;
};
