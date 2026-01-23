import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import validate from "validator";
export const useAuth = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  isUpdatingUserInfo: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      
      const res = await axiosInstance.get("/auth/getUser");
      set({ authUser: res.data.data });
      
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account create successfully");

      set({ authUser: res });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },
login : async (data) =>{
  set({isLoggingIn :true})
const {username,password}  = data
 if (!username || !password) {
      toast.error("All fields are required");
      set({isLoggingIn :false})
      return;
    }

    const isMail = validate.isEmail(username)

  try {
    const payload = isMail ? {email :username,password} : {username, password}
    const res = await axiosInstance.post('/auth/login',payload)
    
    set({authUser:res.data.data})
    toast.success(res.message)
  } catch (error) {
   toast.error(error.response?.data?.error);

    
  }finally{
    set({isLoggingIn:false})
  }
},

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("User logout successfully");
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
