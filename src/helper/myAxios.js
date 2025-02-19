import axios from "axios";

const myAxios = axios.create();

// Whenever we make a new request, this below function will be run automatically and this function will add the token automatically to the header
// this function will add token to every request
// this structure comes from the documentation
myAxios.interceptors.request.use(
    (config) => {
        // This is the place where you can do somehting special
        // Rest of the code is coming form the axios documentation
      config.headers.Authorization = `Token ${sessionStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default myAxios;