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
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
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
      set({ authUser: res.data });
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
    const { username, password } = data;
    if (!username || !password) {
      toast.error("All fields are required");
      set({ isLoggingIn: false });
      return;
    }

    const isMail = validate.isEmail(username);

    try {
      const payload = isMail
        ? { email: username, password }
        : { username, password };
      const res = await axiosInstance.post("/auth/login", payload);

      set({ authUser: res.data.data });
      toast.success(res.data.message);
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.error);
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
      toast.success("Update profile successfully");
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
    toast.success("Full name updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.error);
  } finally {
    set({ isUpdatingUserInfo: false });
  }
},

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(SOCKET_URL,{
      query:{userId : authUser._id}
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
