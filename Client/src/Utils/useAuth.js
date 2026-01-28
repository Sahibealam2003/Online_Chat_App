import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import validate from "validator";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000";

export const useAuth = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  isRemovingProfile: false,
  isUpdatingUserInfo: false,
  isCheckingAuth: true,
  isDeleteingUser : false,
  onlineUsers: [],
  socket: null,

 checkAuth: async () => {
  set({ isCheckingAuth: true });

  try {
    const res = await axiosInstance.get("/auth/getUser");
    set({ authUser: res.data.data });
    get().connectSocket();
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
      set({ authUser: res.data.data });
      toast.success("Account create successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", data);

    set({ authUser: res.data.data });


    toast.success("Login successfully");
    get().connectSocket();
  } catch (error) {
    toast.error(error.response?.data?.error);
    console.log(error);
    
  } finally {
    set({ isLoggingIn: false });
  }
},


  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("User logout successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/auth/update-profile", data);

      set({ authUser: res.data });
      toast.success("Profile photo updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  removeProfile: async () => {
    set({ isRemovingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/remove-profile");
      set({ authUser: res.data.data });

      toast.success("Remove profile successfully");
    } catch (error) {
      toast.error(response?.error?.data?.error);
    } finally {
      set({ isRemovingProfile: false });
    }
  },

updateUserInfo: async (data) => {
  set({ isUpdatingUserInfo: true });
  try {
    // sirf fullName send karna
    const res = await axiosInstance.put("/auth/update-user", { fullName: data.fullName });
    set({ authUser: res.data.data });
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.error);
  } finally {
    set({ isUpdatingUserInfo: false });
  }
},
removeUser: async (user) => {
  set({ isDeleteingUser: true });

  try {
    await axiosInstance.delete(`/auth/removeUser/${user._id}`);
    set({ authUser: null });
    toast.success(`${user.fullName} account deleted successfully`);
  } catch (error) {
    toast.error(error.response?.data?.error || "Something went wrong");
  } finally {
    set({ isDeleteingUser: false });
  }
},


  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(SOCKET_URL,{
      query:{userId : authUser._id},
       transports: ["websocket"],
    });
    socket.connect();
    socket.on("getOnlineUsers",(usersId)=>{
      set({onlineUsers : usersId})
    })
    set({socket : socket})
  },
  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect()
  },
}));
