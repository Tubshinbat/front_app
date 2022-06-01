import axios from "axios-base";

export const getBanners = async () => {
  let data = null;
  let error = null;
  await axios
    .get("banners")
    .then((res) => (data = res.data.data))
    .catch((err) => (error = err.status));

  return { banners: data, error };
};
