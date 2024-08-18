import { api } from "./api";

export const toURL = (base64String: Blob | undefined) => {
  return `data:image/jpeg;base64,${base64String}`;
};

export async function foodImgToFile(link: string) {
  const response = await api.get(link, { responseType: "blob" });
  const blob = response.data;
  const file = new File([blob], "image", {
    type: response.headers["content-type"],
  });

  return file;
}
