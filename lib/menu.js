import axios from "axios-base";

export const getMenus = async () => {
  let data = null;
  let error = null;

  await axios
    .get("menu")
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      error = err;
    });
  return { menus: data, error };
};
