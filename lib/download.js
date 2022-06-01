import axios from "axios-base";

export const getDownloads = async () => {
  let data = null;
  let error = null;
  await axios
    .get("downloads")
    .then((res) => (data = res.data.data))
    .catch((err) => (error = err.status));

  return { downloads: data, error };
};
