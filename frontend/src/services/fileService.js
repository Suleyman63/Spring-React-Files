import axiosService from "./axiosService";

// const fileLoad = (file, onUploadProgress) => {
//   let formData = new FormData();
//   formData.append("file", file);
//   console.log(formData);

//   return axiosService.post("/upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     onUploadProgress,
//   });
// };

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
