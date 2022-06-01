import axios from "axios-base";

export const getHows = async () => {
  let data = null;
  let error = null;
  await axios
    .get("hows")
    .then((res) => (data = res.data.data))
    .catch((err) => (error = err.status));

  return { hows: data, error };
};
