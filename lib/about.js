import axios from "axios-base";

export const getAbouts = async () => {
  let data = null;
  let error = null;
  await axios
    .get("abouts?limit=1")
    .then((res) => (data = res.data.data))
    .catch((err) => (error = err.status));

  return { about: data, error };
};

export const getShortAbouts = async () => {
  let data = null;
  let error = null;
  await axios
    .get("shortabouts")
    .then((res) => (data = res.data.data))
    .catch((err) => (error = err.status));

  return { shortAbouts: data, error };
};
