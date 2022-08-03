import axios from "axios";
const api = axios.create({
    baseURL: 'https://blog-2f6c3-default-rtdb.firebaseio.com/',
    timeout:1000,
    headers:{"Content-Type": "application/json"}
});
// api.interceptors.request.use(function (config) {
//     if(localStorage.length===2){
//       return config;
//     }
//  });
export default api;