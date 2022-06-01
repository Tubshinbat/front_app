import axios from "axios-base";

export const getInfo = async () => {
  let info = {};
  let err = null;
  await axios
    .get("webinfo")
    .then((res) => {
      info = res.data.data;
    })
    .catch((error) => {
      err = error.status;
    });

  return { info, error: err };
};

export const getSocials = async () => {
  let data = null;
  let error = null;
  await axios
    .get("slinks")
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      error = err;
    });

  return { socialLinks: data, error };
};
