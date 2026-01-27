    import { create } from "zustand";
    import { axiosInstance } from "../lib/axiosInstance";
    import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

    export const useChat = create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
        const res = await axiosInstance.get("/message/users");
        set({ users: res.data.users });
        } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
        set({ isUsersLoading: false });
        }
    },

   getMessages: async (userId) => {
  if (!userId) return;

  set({ isMessageLoading: true });
  try {
    const res = await axiosInstance.get(`/message/${userId}`);
    set({ messages: res.data.data }); 
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to load messages");
  } finally {
    set({ isMessageLoading: false });
  }
},

sendMessage: async (data) => {
  const { selectedUser, messages } = get();

  try {
    const res = await axiosInstance.post(
      `/message/send/${selectedUser._id}`,
      data
    );

    set({ messages: [...messages, res.data.data] });
  } catch (error) {
    toast.error(
      error.response?.data?.error || "Failed to send message"
    );
  }
},
lisitemMessages : ()=>{
const  {selectedUser} = get()
if(!selectedUser) return
const socket = useAuth.getState().socket
//todo Optm
socket.on("newMessage",(data)=>{
  if(data.senderId !== selectedUser._id) return
set({messages:[...get().messages,data]})
})
},
notLisitemMessages : () =>{
const socket = useAuth.getState().socket
socket.off("newMessage")
},

    setSelectedUser : (selectedUser) => set({selectedUser})
    }));
