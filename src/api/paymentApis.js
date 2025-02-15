import axios from "axios";
const api = axios.create({
    // baseURL: "https://currex-backend.onrender.com",
    baseURL: "http://localhost:4000",
    withCredentials:true

});
export const createOrder=async(data)=>{
    console.log(data)
    return await api.post("/api/v1/transaction/create-transaction",data)
}