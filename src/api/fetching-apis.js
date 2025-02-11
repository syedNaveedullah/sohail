import axios from "axios";

const api = axios.create({
    // baseURL: "https://currex-backend.onrender.com",
    baseURL: "http://localhost:4000",
    withCredentials:true

});

// siginup
export const signupUser = ({ FullName, Email, Password, Phone }) => {
  console.log(FullName, Email, Password, Phone);
  return api.post("/api/v1/auth/register", {
      FullName,
      Email,
      Password,
      Phone,
    });    
};


// login
export const loginUser = async({ Email, Password }) => {
    return api.post("/api/v1/auth/login", {
        Email,
        Password,
    });
};

// send verification link
export const emailVerification= ()=>{
    return api.post("/api/v1/auth/sendVerificationLink",{}  
    )
}

// verify
export const verifyEmail=(token)=>{
    return api.post(`api/v1/auth/verifyEmail/${token}`,{})
}
export const updateProfileSetting = async (data) => {
    return api.put("/api/v1/auth/profile", data);
}