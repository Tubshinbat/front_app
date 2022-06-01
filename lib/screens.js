import axios from "axios-base";

export const getScreens = async () => {
  let data = null;
  let error = null;

  await axios
    .get("screens")
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      error = err;
    });
  return { screens: data, error };
};
