import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));


export const getIconColor = (theme) => {
  switch (theme) {
    case "coffee":
      return "text-amber-700";
    case "dark":
      return "text-white";
    case "light":
      return "text-black";
    case "cyberpunk":
      return "text-pink-500";
    case "night":
      return "text-blue-400";
    default:
      return "text-primary";
  }
};
