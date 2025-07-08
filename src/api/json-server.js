import axios from "axios";

export const createAPI = (baseURL) => axios.create({ baseURL });