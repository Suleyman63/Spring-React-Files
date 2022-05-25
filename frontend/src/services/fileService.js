import axiosService from "./axiosService";

const fileLoad = (files) => {
  console.log(files);
  console.log(typeof files);
  let formData = new FormData();
  Object.keys(files).forEach((file) => {
    console.log(files[file]);
    formData.append(`files[]`, files[file]);
  });

  return axiosService.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getFiles = () => {
  return axiosService.get("/files");
};

const fileService = {
  fileLoad,
  getFiles,
};

export default fileService;
