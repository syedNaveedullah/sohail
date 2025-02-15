import axios from "axios";
import Cookies from "js-cookie";

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

//logout
export const logoutUser = async () => {
    return api.post("/api/v1/auth/logout");
}


// sending reset password link
export const forgetPasswordLink = async (Email) => {
    return api.post("/api/v1/auth/forgetPassword", {
        Email,
    });
}


// reset password
export const resetPassword = async ({token, newPassword}) => {
    return api.post(`/api/v1/auth/resetpassword/${token}`, { newPassword, });
}



// get profile
export const getProfile = async () => {
    const response = await api.get("/api/v1/auth/profile", {});
    return response.data;
};

// change password
export const changePassword = async ({ oldPassword, newPassword }) => {
    return await api.put("/api/v1/auth/changePassword", {
        oldPassword,
        newPassword,
    }
);
};

// update profile
export const updateProfile = async ({ FullName }) => {
    return await api.put("/api/v1/auth/profile", {
        FullName,
    }
);
};